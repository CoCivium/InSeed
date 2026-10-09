/* CoGBR Infinite Canvas — vast pixel maxed CoQuantum + inbetweens + rels + spooky + non-material + God + more + boundless beyond digital + exemplar CoSoftware forkable — V8.17 */
(function(){
  const mantra="' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc";
  const config={rells:["Material Rels — Gold","Non-Material Rels — Violet","Spooky Rels — Teal","God Rels — White/Gold","CoQuantum — Cyan","Exemplar Software Rels","Inbetweens","CoMap+","CoCrystalMorph+","GodView","CoAura+","CoTheoryAll","CoEnerget","CoSongrels"]};
  function create(){
    if(document.getElementById('cogbr-canvas')) return;
    const wrap=document.createElement('div'); wrap.id='cogbr-canvas';
    Object.assign(wrap.style,{position:'fixed',inset:'0',zIndex:'9998',pointerEvents:'none',overflow:'hidden'});
    const cv=document.createElement('canvas'); cv.width=innerWidth*2; cv.height=innerHeight*2;
    Object.assign(cv.style,{width:'100%',height:'100%',opacity:'0.22',filter:'blur(0.5px)'});
    wrap.appendChild(cv); document.body.appendChild(wrap);
    const ctx=cv.getContext('2d'); let t=0; const nodes=[];
    for(let i=0;i<180;i++) nodes.push({x:Math.random(),y:Math.random(),r:Math.random()*2+0.5,vx:(Math.random()-0.5)*0.0008,vy:(Math.random()-0.5)*0.0008,type:Math.floor(Math.random()*6),hue:Math.random()*360});
    function draw(){
      t+=0.01; ctx.clearRect(0,0,cv.width,cv.height);
      // cosmic background radiation — ChairBe gold + God white + rainbow BEAUT — CoGBR
      const g=ctx.createRadialGradient(cv.width/2,cv.height/2,0,cv.width/2,cv.height/2,cv.width);
      g.addColorStop(0,'rgba(255,215,0,0.18)'); g.addColorStop(0.3,'rgba(255,107,157,0.12)'); g.addColorStop(0.6,'rgba(155,89,182,0.10)'); g.addColorStop(1,'rgba(15,12,41,0.08)');
      ctx.fillStyle=g; ctx.fillRect(0,0,cv.width,cv.height);
      // vortexings bouncings mergings — CoMap+ + CoCrystalMorph+
      nodes.forEach(n=>{
        n.x+=n.vx+Math.sin(t+n.y*6)*0.0003; n.y+=n.vy+Math.cos(t+n.x*6)*0.0003;
        if(n.x<0||n.x>1) n.vx*=-1; if(n.y<0||n.y>1) n.vy*=-1;
        const x=n.x*cv.width, y=n.y*cv.height;
        ctx.beginPath(); ctx.arc(x,y,n.r,0,Math.PI*2);
        const colors=['rgba(255,215,0,0.9)','rgba(155,89,182,0.7)','rgba(46,204,113,0.7)','rgba(255,255,255,0.9)','rgba(52,152,219,0.8)','rgba(255,107,157,0.8)'];
        ctx.fillStyle=colors[n.type%colors.length]; ctx.shadowBlur=12; ctx.shadowColor=ctx.fillStyle; ctx.fill(); ctx.shadowBlur=0;
      });
      // connections — superframeworking off eachother like energy vortexings bouncings mergings
      ctx.lineWidth=0.35;
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const dx=(nodes[i].x-nodes[j].x)*cv.width, dy=(nodes[i].y-nodes[j].y)*cv.height, d=Math.hypot(dx,dy);
        if(d<180){ ctx.beginPath(); ctx.moveTo(nodes[i].x*cv.width,nodes[i].y*cv.height); ctx.lineTo(nodes[j].x*cv.width,nodes[j].y*cv.height); ctx.strokeStyle='rgba(255,215,0,'+(0.18-d/1000)+')'; ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    }
    draw();
    console.log("CoGBR Infinite Canvas — vast pixel maxed — CoQuantum — "+mantra);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',create); else create();
})();
