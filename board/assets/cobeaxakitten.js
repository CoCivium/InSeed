/* CoBeAxaKitten+ — dancing, swirling, moving around border, catchable, NB VR style, onramp + IA + CoBar popup — V8.14 — ' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc */
(function(){
  const mantra="' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc";
  function inject(){
    if(document.getElementById('cobeaxakitten')) return;
    const kitten = document.createElement('div');
    kitten.id='cobeaxakitten';
    kitten.innerHTML='🐱✨';
    kitten.title='CoBeAxaKitten+ — catch me! — CoBar popup IA — '+mantra;
    Object.assign(kitten.style,{
      position:'fixed',zIndex:'999999',width:'56px',height:'56px',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:'32px',cursor:'pointer',userSelect:'none',
      borderRadius:'50%',background:'radial-gradient(circle,#FFD700 0%,#FF6B9D 40%,#9B59B6 100%)',
      boxShadow:'0 0 20px #FFD700,0 0 40px #FF6B9D',border:'2px solid rgba(255,255,255,0.8)',
      transition:'transform 0.2s',animation:'cobeaxa-float 2s ease-in-out infinite'
    });
    document.body.appendChild(kitten);

    // dancing swirling moving around border — path around viewport
    let t=0;
    function move(){
      t+=0.008;
      const pad=30;
      const w=window.innerWidth-pad*2-56;
      const h=window.innerHeight-pad*2-56;
      const perim=2*(w+h);
      let d=(t*300)%perim;
      let x,y;
      if(d<w){ x=pad+d; y=pad; }
      else if(d<w+h){ x=pad+w; y=pad+(d-w); }
      else if(d<2*w+h){ x=pad+w-(d-(w+h)); y=pad+h; }
      else{ x=pad; y=pad+h-(d-(2*w+h)); }
      const swirl=Math.sin(t*6)*6;
      const dance=Math.sin(t*12)*4;
      kitten.style.left=(x+swirl)+'px';
      kitten.style.top=(y+dance)+'px';
      kitten.style.transform='rotate('+(t*180%360)+'deg) scale('+(1+Math.sin(t*8)*0.15)+')';
      requestAnimationFrame(move);
    }
    move();

    // CoBar popup — IA talked or typed
    function openCoBar(){
      let bar=document.getElementById('cobar');
      if(bar){ bar.style.display='flex'; return; }
      bar=document.createElement('div');
      bar.id='cobar';
      bar.innerHTML=`
        <div style="backdrop-filter:blur(20px);background:rgba(255,255,255,0.15);border:1px solid rgba(255,215,0,0.5);border-radius:24px;padding:22px;max-width:420px;width:92%;box-shadow:0 8px 32px rgba(0,0,0,0.3)">
          <div style="display:flex;justify-content:space-between;align-items:center"><h2 style="color:#FFD700;text-shadow:0 0 12px #FFD700">🐱 CoBeAxaKitten — CoBar — IA</h2><button id="cobar-close" style="background:none;border:1px solid #FFD700;color:#FFD700;border-radius:99px;padding:4px 12px;cursor:pointer">✕</button></div>
          <p style="margin:10px 0;color:white;font-size:0.9em">Dancing swirling border catchable — like NB VR games — onramp + IA — talked or typed — CoBar popup style — ${mantra}</p>
          <div id="cobar-log" style="font-family:monospace;background:rgba(0,0,0,0.35);padding:12px;border-radius:12px;max-height:160px;overflow:auto;color:#FFD700;font-size:0.82em;white-space:pre-wrap">Meow — CoBeAxaKitten+ caught! — CoWeLead+ > all etc — ChairBe gold — God white — rainbow BEAUT — 🐢🌈</div>
          <div style="display:flex;gap:8px;margin-top:12px"><input id="cobar-input" placeholder="type to CoBeAxaKitten..." style="flex:1;padding:10px 14px;border-radius:99px;border:1px solid #FFD700;background:rgba(0,0,0,0.3);color:white"><button id="cobar-talk" style="padding:10px 14px;border-radius:99px;border:1px solid #FFD700;background:rgba(255,215,0,0.2);color:#FFD700;cursor:pointer">🎤 Talk</button><button id="cobar-send" style="padding:10px 14px;border-radius:99px;border:1px solid #FFD700;background:#FFD700;color:black;cursor:pointer">Send</button></div>
          <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap"><a href="/board/" style="color:#FFD700;font-size:0.8em">/board/</a><a href="/board/api/tax/" style="color:#FFD700;font-size:0.8em">/tax/</a><a href="/board/api/crypto/" style="color:#FFD700;font-size:0.8em">/crypto/</a><a href="/board/api/yacht/" style="color:#FFD700;font-size:0.8em">/yacht/</a><a href="/board/api/stonehenge/" style="color:#FFD700;font-size:0.8em">/stonehenge/</a><a href="/board/api/god/chairbe/" style="color:#FFD700;font-size:0.8em">/god/chairbe/</a></div>
        </div>
      `;
      Object.assign(bar.style,{position:'fixed',inset:'0',zIndex:'1000000',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.25)'});
      document.body.appendChild(bar);
      bar.querySelector('#cobar-close').onclick=()=>bar.style.display='none';
      bar.onclick=(e)=>{ if(e.target===bar) bar.style.display='none'; };
      const log=bar.querySelector('#cobar-log');
      const input=bar.querySelector('#cobar-input');
      function addLog(m){ log.textContent+="\n"+m; log.scrollTop=log.scrollHeight; }
      function handleMsg(msg){
        if(!msg) return;
        addLog("You: "+msg);
        // IA stub — onramp to CoAll+ — CoBall 18755 + Pool 100M + CoTime+ + CoT+ + CoAll+ + ChairBe + BEAUT
        let resp="CoBeAxaKitten+ purr — "+msg+" — CoWeLead+ > all etc — "+mantra+" — onramp to board/api/* — ChairBe gold — God white — rainbow BEAUT — 🐢 — "+(msg.toLowerCase().includes("tax")?"CoTax+ Pool 100M→1B enough CoCan+ not 1e24 CoCant+ — see /tax/":"")+(msg.toLowerCase().includes("crypto")?"CoCrypto+ test+verify loops full on — see /crypto/":"")+" — LATCHED EVERMORE";
        setTimeout(()=>addLog(resp),400);
        input.value='';
      }
      bar.querySelector('#cobar-send').onclick=()=>handleMsg(input.value);
      input.onkeydown=(e)=>{ if(e.key==='Enter') handleMsg(input.value); };
      // Talk — Web Speech API
      bar.querySelector('#cobar-talk').onclick=()=>{
        const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
        if(!SR){ addLog("Talk not supported — type instead"); return; }
        const rec=new SR(); rec.lang='en-CA'; rec.interimResults=false;
        addLog("🎤 listening... talk to CoBeAxaKitten+...");
        rec.onresult=(ev)=>handleMsg(ev.results[0][0].transcript);
        rec.onerror=(ev)=>addLog("🎤 error: "+ev.error);
        rec.start();
      };
    }

    kitten.onclick=()=>{ kitten.style.transform='scale(1.6) rotate(720deg)'; setTimeout(()=>{ kitten.style.transform=''; openCoBar(); },300); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject); else inject();
  // style
  const st=document.createElement('style');
  st.textContent='@keyframes cobeaxa-float{0%,100%{box-shadow:0 0 20px #FFD700,0 0 40px #FF6B9D}50%{box-shadow:0 0 30px #FFD700,0 0 60px #FF6B9D,0 0 80px #9B59B6}} #cobeaxakitten:hover{transform:scale(1.3)!important}';
  document.head.appendChild(st);
})();
