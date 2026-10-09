/* CoGBR 3D+ Animated London Center Reputation Cartogram + CoTime+ CoT+ rels — V8.19 — ' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc */
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
(function(){
  const mantra="' CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc";
  function init(){
    if(document.getElementById('cogbr-3d')) return;
    const wrap=document.createElement('div'); wrap.id='cogbr-3d';
    Object.assign(wrap.style,{position:'fixed',inset:'0',zIndex:'9997',pointerEvents:'none'});
    const canvas=document.createElement('canvas'); wrap.appendChild(canvas); document.body.appendChild(wrap);
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true}); renderer.setSize(innerWidth,innerHeight); renderer.setPixelRatio(devicePixelRatio);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,0.1,1000); camera.position.z=2.8;
    // CoGBR cosmic background — starfield + ChairBe gold + God white + rainbow BEAUT
    const starGeo=new THREE.BufferGeometry(); const starPos=[]; for(let i=0;i<5000;i++){ starPos.push((Math.random()-0.5)*20,(Math.random()-0.5)*20,(Math.random()-0.5)*20); } starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3));
    const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xFFD700,size:0.02,transparent:true,opacity:0.7})); scene.add(stars);
    // Globe — London center — Greenwich 0° — texture CoGBR
    const globeGeo=new THREE.SphereGeometry(1,64,64);
    const loader=new THREE.TextureLoader();
    const mat=new THREE.MeshBasicMaterial({color:0x0F0C29,transparent:true,opacity:0.85,wireframe:false});
    // add glow layers — reputation cartogram nodes — gold — CoMap+ CoCrystalMorph+ GodView
    const globe=new THREE.Mesh(globeGeo,mat); scene.add(globe);
    // reputation nodes — UK large at center — US shrunken — gold lines — CoTime+ CoT+ rels
    const nodesGroup=new THREE.Group(); scene.add(nodesGroup);
    const repData=[
      {lat:51.5,lon:0.12,name:"London Greenwich 0°",size:0.18,color:0xFFD700}, // London center
      {lat:51.5,lon:-0.12,name:"United Kingdom",size:0.14,color:0xFFD700},
      {lat:60,lon:10,name:"Norway",size:0.06,color:0xFF6B9D},
      {lat:59,lon:18,name:"Sweden",size:0.05,color:0xFF6B9D},
      {lat:40,lon:-100,name:"U.S. shrunken",size:0.03,color:0x3498DB}, // shrunken
      {lat:56,lon:-106,name:"Canada",size:0.04,color:0x2ECC71},
      {lat:35,lon:105,name:"China",size:0.08,color:0x9B59B6},
      {lat:55,lon:37,name:"Russia",size:0.07,color:0x9B59B6},
    ];
    repData.forEach(d=>{
      const phi=(90-d.lat)*Math.PI/180, theta=(d.lon+180)*Math.PI/180;
      const x=-Math.sin(phi)*Math.cos(theta), y=Math.cos(phi), z=Math.sin(phi)*Math.sin(theta);
      const dot=new THREE.Mesh(new THREE.SphereGeometry(d.size,16,16),new THREE.MeshBasicMaterial({color:d.color}));
      dot.position.set(x*1.01,y*1.01,z*1.01); nodesGroup.add(dot);
      // CoT+ rels — lines from London to others — CoTime+ animation
      if(d.name!=="London Greenwich 0°"){
        const londonPhi=(90-51.5)*Math.PI/180, londonTheta=(0.12+180)*Math.PI/180;
        const lx=-Math.sin(londonPhi)*Math.cos(londonTheta), ly=Math.cos(londonPhi), lz=Math.sin(londonPhi)*Math.sin(londonTheta);
        const curve=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(lx*1.01,ly*1.01,lz*1.01),new THREE.Vector3(x*1.01,y*1.01,z*1.01)]);
        const line=new THREE.Line(curve,new THREE.LineBasicMaterial({color:0xFFD700,transparent:true,opacity:0.4}));
        nodesGroup.add(line);
      }
    });

    let t=0;
    function animate(){
      t+=0.005;
      // CoTime+ + CoT+ rels — time animation — rotation — London stays front — CoTime+ wave=future wave=evermore
      globe.rotation.y = -0.12 + Math.sin(t*0.3)*0.08; // keep London center
      nodesGroup.rotation.y = globe.rotation.y;
      nodesGroup.rotation.x = Math.sin(t*0.2)*0.05;
      // vortexings bouncings mergings — CoMap+ CoCrystalMorph+ — pulsate nodes — CoTime+ CoT+ rels
      nodesGroup.children.forEach((c,i)=>{ if(c.isMesh){ c.scale.setScalar(1+Math.sin(t*2+i)*0.2); } });
      stars.rotation.y+=0.0003;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
    addEventListener('resize',()=>{ renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); });
    console.log("CoGBR 3D+ London center reputation cartogram animated CoTime+ CoT+ — "+mantra);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
