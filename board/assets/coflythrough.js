/* CoFlyThrough+ + CoDecay+ + political social + hot buttons mess/betters — V8.21 */
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
(function(){
  const mantra="' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc";
  const decayData={
    "London":{decay:0.05,political:0.1,social:0.08,mess:["Brexit hangover","Housing crisis","Tube strikes"],betters:["ChairBe gold glow","God white light","Rainbow BEAUT","CoBeAxaKitten onramp","Thames cleanup","Youth Shorts Snuggle Share Meek"]},
    "U.S.":{decay:0.65,political:0.78,social:0.62,mess:["Polarization 78%","Gun violence","Healthcare gaps","Debt 34T","Infrastructure C-","Misinformation"],betters:["First Amendment","NASA + SpaceX","Universities","Hollywood BEAUT","National Parks","CoGBR background"]},
    "Russia":{decay:0.82,political:0.91,social:0.71,mess:["War","Sanctions","Censorship","Brain drain","Corruption"],betters:["Tolstoy + Dostoevsky","Ballet","Space legacy","Lake Baikal"]},
    "China":{decay:0.58,political:0.72,social:0.55,mess:["Censorship","Property bubble","Youth unemployment","Surveillance"],betters:["Manufacturing scale","High-speed rail","Poetry + history","Pandas + BEAUT"]},
    "Global South":{decay:0.48,political:0.52,social:0.44,mess:["Debt","Climate impacts","Colonial legacies"],betters:["Youth boom","Music + culture","Resilience + CoWeLead+","Biodiversity"]},
  };
  function init(){
    if(document.getElementById('cofly-wrap')) return;
    const wrap=document.createElement('div'); wrap.id='cofly-wrap';
    Object.assign(wrap.style,{position:'fixed',inset:'0',zIndex:'9996',background:'rgba(0,0,0,0.2)'});
    wrap.innerHTML=`
      <canvas id="cofly-canvas" style="width:100%;height:100%;display:block"></canvas>
      <div style="position:absolute;top:12px;left:12px;display:flex;gap:6px;flex-wrap:wrap;max-width:82%" id="cofly-hotbar"></div>
      <div id="cofly-info" style="position:absolute;bottom:12px;left:12px;right:12px;backdrop-filter:blur(20px);background:rgba(255,255,255,0.12);border:1px solid rgba(255,215,0,0.4);border-radius:16px;padding:14px;color:white;font-family:Space Grotesk,sans-serif;display:none"><div id="cofly-info-title" style="color:#FFD700;font-weight:700"></div><div id="cofly-info-body" style="font-size:0.85em;margin-top:6px;white-space:pre-wrap"></div></div>
      <div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,215,0,0.3);border-radius:99px;padding:6px 12px;color:#FFD700;font-size:0.75em">WASD fly + mouse look + scroll zoom — ESC to exit — CoFlyThrough+ — ${mantra}</div>
    `;
    document.body.appendChild(wrap);
    const canvas=wrap.querySelector('#cofly-canvas');
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true}); renderer.setSize(innerWidth,innerHeight);
    const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x0F0C29,3,12);
    const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,100);
    camera.position.set(0,1.5,4);
    // globe + decay — CoDecay+
    const globe=new THREE.Mesh(new THREE.SphereGeometry(2,64,64),new THREE.MeshBasicMaterial({color:0x0A0A1A,wireframe:false,transparent:true,opacity:0.9}));
    scene.add(globe);
    // political social decay nodes
    const group=new THREE.Group(); scene.add(group);
    const hotbar=wrap.querySelector('#cofly-hotbar');
    Object.keys(decayData).forEach((key,i)=>{
      const d=decayData[key];
      const phi=(90-(20+i*15))*Math.PI/180, theta=( -10 + i*45 +180)*Math.PI/180;
      const r=2.02+d.decay*0.3;
      const x=-Math.sin(phi)*Math.cos(theta)*r, y=Math.cos(phi)*r, z=Math.sin(phi)*Math.sin(theta)*r;
      const color = d.decay>0.6?0x8B0000 : d.decay>0.4?0xFF8C00 : 0x2ECC71;
      const sphere=new THREE.Mesh(new THREE.SphereGeometry(0.08+d.decay*0.18,16,16),new THREE.MeshBasicMaterial({color}));
      sphere.position.set(x,y,z); sphere.userData={key,...d}; group.add(sphere);
      // hot button
      const btn=document.createElement('button');
      btn.textContent=`${key} ${Math.round((1-d.decay)*100)}% BEAUT — ${d.decay>0.6?'MESS':'BETTERS'}`;
      Object.assign(btn.style,{padding:'6px 12px',borderRadius:'99px',border:'1px solid #FFD700',background:d.decay>0.6?'rgba(139,0,0,0.25)':'rgba(46,204,113,0.2)',color:'#FFD700',cursor:'pointer',fontSize:'0.75em'});
      btn.onclick=()=>showInfo(sphere.userData);
      hotbar.appendChild(btn);
      // gold line to London
      const londonPhi=(90-51.5)*Math.PI/180, londonTheta=(0.12+180)*Math.PI/180;
      const lx=-Math.sin(londonPhi)*Math.cos(londonTheta)*2.02, ly=Math.cos(londonPhi)*2.02, lz=Math.sin(londonPhi)*Math.sin(londonTheta)*2.02;
      const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(lx,ly,lz),new THREE.Vector3(x,y,z)]),new THREE.LineBasicMaterial({color:0xFFD700,transparent:true,opacity:0.25}));
      group.add(line);
    });

    const info=wrap.querySelector('#cofly-info'), infoTitle=wrap.querySelector('#cofly-info-title'), infoBody=wrap.querySelector('#cofly-info-body');
    function showInfo(d){
      info.style.display='block';
      infoTitle.textContent=`${d.key} — Decay ${(d.decay*100).toFixed(0)}% — Political ${(d.political*100).toFixed(0)}% — Social ${(d.social*100).toFixed(0)}% — ${mantra}`;
      infoBody.textContent=`Reasons why world is a MESS:\n- ${d.mess.join('\n- ')}\n\nReasons why world is BETTERS / MORE OR BETTERS:\n- ${d.betters.join('\n- ')}\n\nMore or betters etc eh? — YES — ${d.key} — a + +++ + what elses + and CoWeLead+ + ' + > + all etc — CoMap+ + CoCrystalMorph+ + GodView + CoGBR + ChairBe gold + God white + rainbow BEAUT + ' all etc — LATCHED —`;
    }

    // fly controls — WASD + mouse
    const keys={}; addEventListener('keydown',e=>keys[e.code]=true); addEventListener('keyup',e=>keys[e.code]=false);
    let yaw=0,pitch=0; let mouseDown=false;
    canvas.addEventListener('mousedown',()=>mouseDown=true); addEventListener('mouseup',()=>mouseDown=false);
    canvas.addEventListener('mousemove',e=>{ if(mouseDown){ yaw-=e.movementX*0.004; pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*0.004)); }});
    canvas.addEventListener('click',e=>{
      const ray=new THREE.Raycaster(); const mouse=new THREE.Vector2((e.clientX/innerWidth)*2-1,-(e.clientY/innerHeight)*2+1);
      ray.setFromCamera(mouse,camera); const hits=ray.intersectObjects(group.children.filter(c=>c.isMesh)); if(hits[0]) showInfo(hits[0].object.userData);
    });
    let t=0;
    function animate(){
      t+=0.01;
      const speed=0.06;
      if(keys['KeyW']) camera.translateZ(-speed);
      if(keys['KeyS']) camera.translateZ(speed);
      if(keys['KeyA']) camera.translateX(-speed);
      if(keys['KeyD']) camera.translateX(speed);
      if(keys['KeyQ']) camera.position.y+=speed;
      if(keys['KeyE']) camera.position.y-=speed;
      camera.rotation.order='YXZ'; camera.rotation.y=yaw; camera.rotation.x=pitch;
      group.rotation.y+=0.001; // CoTime+ CoT+ rels — time
      group.children.forEach((c,i)=>{ if(c.isMesh){ c.scale.setScalar(1+Math.sin(t*2+i)*0.15); } });
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
    addEventListener('resize',()=>{ renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); });
    // ESC to close
    addEventListener('keydown',e=>{ if(e.code==='Escape'){ wrap.remove(); }});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
