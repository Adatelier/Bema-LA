/* B2B import demonstration: no uploads or cart mutations */
(() => {
  function init(root) {
    if(root.dataset.bemaB2bReady)return;
    const demo=root.querySelector('.bema-b2b-demo'), replay=root.querySelector('.bema-b2b-replay');
    if(!demo||!replay)return;
    root.dataset.bemaB2bReady='true';
    const rows=[...demo.querySelectorAll('[data-on]')],steps=[...root.querySelectorAll('.bema-b2b-steps li')],motion=matchMedia('(prefers-reduced-motion: reduce)');
    let timers=[];
    function stage(s){demo.dataset.stage=s;const n=s==='idle'?0:s==='drop'?1:2;steps.forEach((e,i)=>i===n?e.setAttribute('aria-current','step'):e.removeAttribute('aria-current'));demo.querySelector('.bema-b2b-table').setAttribute('aria-hidden',String(s==='idle'||s==='drop'));}
    function stop(){timers.forEach(clearTimeout);timers=[];stage('done');rows.forEach(e=>e.dataset.on='true');}
    function run(){stop();if(motion.matches)return;stage('idle');rows.forEach(e=>e.dataset.on='false');const later=(fn,ms)=>timers.push(setTimeout(fn,ms));later(()=>stage('drop'),300);later(()=>stage('table'),1100);rows.forEach((e,i)=>later(()=>e.dataset.on='true',1250+i*120));later(()=>stage('done'),2350);}
    replay.hidden=motion.matches;replay.addEventListener('click',run);
    root.querySelectorAll('.bema-b2b-days button').forEach(b=>b.addEventListener('click',()=>root.querySelectorAll('.bema-b2b-days button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))));
    if(!motion.matches&&'IntersectionObserver'in window){const o=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting&&e.intersectionRatio>=.5)){o.disconnect();run();}},{threshold:.5});o.observe(demo);}
    motion.addEventListener?.('change',()=>{stop();replay.hidden=motion.matches;});
  }
  const start=()=>document.querySelectorAll('.in-index .bema-b2b').forEach(init);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
