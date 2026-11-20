"use strict";
// Isolated InSeed candidate-source acceptance; no hosted URL, publishing, tokens or remote command.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const {pathToFileURL} = require("node:url");
const {execFileSync} = require("node:child_process");
const {chromium} = require("playwright-core");
const EXPECTED_GIT_BLOB = "94df1e4233ff9093d5044d723ae833b4885d8c7a";
const TAGS = ["wcag2a","wcag2aa","wcag21a","wcag21aa"];
const OUT = path.resolve("out/inseed-contrast-proof-r0");
const sha256 = d => crypto.createHash("sha256").update(d).digest("hex");
const blob = d => crypto.createHash("sha1").update("blob "+d.length+"\0").update(d).digest("hex");
function browserPath() {
  for (const c of ["google-chrome","google-chrome-stable","chromium"]) {
    try {return execFileSync("which",[c],{encoding:"utf8"}).trim();} catch {}
  }
  throw Error("HOLD_NO_CHROME");
}
async function main() {
  fs.mkdirSync(OUT,{recursive:true});
  const receipt = {
    schema:"InSeed.FirstUse.OpaqueContrastCandidateCanary.R0",
    state:"HOLD_PENDING",
    source_git_blob_sha1:null,
    observed_at_utc:new Date().toISOString(),
    source_commit:process.env.GITHUB_SHA||"UNATTESTED",
    authority:"SOURCE_CI_ONLY",
    variants:[], reasons:[],
    nonclaims:["NO_HUMAN_ACCEPTANCE","NO_HOSTED_PAGE_TEST","NO_DOMAIN_MUTATION",
      "NO_PUBLIC_RELEASE","NO_3IND","NO_COEX","NO_PHANTOM_ACK"]
  };
  let browser=null;
  try {
    const src=fs.readFileSync("index.html");
    const actual=blob(src);
    receipt.source_git_blob_sha1=actual;
    receipt.source_sha256=sha256(src);
    if(actual!==EXPECTED_GIT_BLOB)throw Error("HOLD_CANDIDATE_BYTES_DRIFT");
    const axe=fs.readFileSync(require.resolve("axe-core/axe.min.js"),"utf8");
    browser=await chromium.launch({executablePath:browserPath(),headless:true,
      args:["--no-sandbox","--disable-dev-shm-usage"]});
    for(const v of [{name:"mobile390",width:390,height:844},{name:"desktop1365",width:1365,height:900}]) {
      const ctx=await browser.newContext({viewport:{width:v.width,height:v.height},
        reducedMotion:"reduce",deviceScaleFactor:1});
      let blocked=0;const errors=[];
      await ctx.route(/^https?:/i, async r=>{blocked++;await r.abort("blockedbyclient");});
      const page=await ctx.newPage();
      page.on("pageerror",e=>errors.push(e.name||"PAGE_ERROR"));
      try {
        await page.goto(pathToFileURL(path.resolve("index.html")).href,{waitUntil:"load",timeout:15000});
        await page.addScriptTag({content:axe});
        const result=await page.evaluate(async tags=>window.axe.run(document,{
          runOnly:{type:"tag",values:tags},resultTypes:["violations","incomplete"]
        }),TAGS);
        const unresolved=result.incomplete.filter(x=>x.id==="color-contrast")
          .reduce((n,x)=>n+x.nodes.length,0);
        const vcount=result.violations.length;
        const overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth));
        const img=await page.screenshot({fullPage:true});
        const imageName=v.name+".png";
        fs.writeFileSync(path.join(OUT,imageName),img);
        receipt.variants.push({
          viewport:v.name,violations:vcount,
          unresolved_contrast_nodes:unresolved,
          other_incomplete_rules:result.incomplete.filter(x=>x.id!=="color-contrast").map(x=>x.id),
          blocked_network_requests:blocked,
          page_errors:errors.length,overflow_px:overflow,
          screenshot:{file:imageName,sha256:sha256(img)}
        });
        if(vcount||unresolved||errors.length||blocked||overflow>2)
          receipt.reasons.push("HOLD_VIEWPORT_"+v.name);
      } finally {await ctx.close();}
    }
    receipt.state=receipt.reasons.length?"HOLD_CANDIDATE_ACCESSIBILITY":"PASS_SOURCE_COLOR_CONTRAST_PROBES_NOT_HUMAN_ACCEPTANCE";
    if(receipt.reasons.length)process.exitCode=1;
  } catch(e) {
    receipt.state="HOLD_CANDIDATE_TEST_ERROR";
    receipt.reasons.push(String(e.message||e).slice(0,120).replace(/https?:\/\/\S+/g,"URL_REDACTED"));
    process.exitCode=2;
  } finally {
    if(browser)await browser.close();
    fs.writeFileSync(path.join(OUT,"receipt.json"),JSON.stringify(receipt,null,2)+"\n");
    console.log(JSON.stringify({state:receipt.state,viewports:receipt.variants.map(x=>({
      viewport:x.viewport,violations:x.violations,incomplete_contrast:x.unresolved_contrast_nodes
    })),reasons:receipt.reasons}));
  }
}
main().catch(e=>{console.error("HOLD_UNHANDLED",e.name);process.exitCode=3;});
