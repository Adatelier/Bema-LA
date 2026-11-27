/* EcoFilm + Ticker: original behavior, lazy video */
(() => {
  function init(root) {
    if (root.dataset.bemaEcoReady) return;
    const film=root.querySelector('.bema-eco-film'),v=film?.querySelector('video'),btn=film?.querySelector('button');
    if(!v||!btn)return;
    root.dataset.bemaEcoReady='true';
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const auto=()=>!motion.matches&&!navigator.connection?.saveData;
    let visible=false,userPaused=false,manual=false,failed=false;
    const sync=()=>{btn.setAttribute('aria-pressed',String(!v.paused));btn.setAttribute('aria-label',v.paused?'Přehrát video':'Pozastavit video');};
    const play=()=>{if(failed)return;if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(()=>sync());};
    const update=()=>{if(document.hidden||!visible||userPaused||(!auto()&&!manual))v.pause();else play();};
    v.muted=true;btn.hidden=false;
    v.addEventListener('play',sync);v.addEventListener('pause',sync);
    v.addEventListener('playing',()=>film.classList.add('bema-film-shown'));
    v.addEventListener('error',()=>{failed=true;btn.hidden=true;film.classList.remove('bema-film-shown');});
    btn.addEventListener('click',()=>{if(v.paused){userPaused=false;manual=true;play();}else{userPaused=true;manual=false;v.pause();}});
    if('IntersectionObserver' in window){new IntersectionObserver(([e])=>{visible=e.isIntersecting&&e.intersectionRatio>=.5;update();},{threshold:[0,.5]}).observe(film);}
    document.addEventListener('visibilitychange',update);
    motion.addEventListener?.('change',()=>{manual=false;update();});
    navigator.connection?.addEventListener?.('change',()=>{manual=false;update();});
    if(!('IntersectionObserver' in window)||motion.matches)return;
    const format={rpet:p=>'až −'+Math.round(70*p)+'\u00a0%',light:p=>Math.round(20*p)+'–'+Math.round(30*p)+'\u00a0%',pallet:p=>(96.9*p).toFixed(1).replace('.',',')+'\u00a0%'};
    const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting||e.intersectionRatio<.5)continue;observer.unobserve(e.target);const el=e.target,final=el.textContent,render=format[el.dataset.bemaTicker];if(!render||motion.matches)continue;const start=performance.now();function tick(now){const t=Math.min(1,(now-start)/1100);el.textContent=t===1||motion.matches?final:render(1-Math.pow(1-t,4));if(t<1&&!motion.matches)requestAnimationFrame(tick);}requestAnimationFrame(tick);}},{threshold:.5});
    root.querySelectorAll('[data-bema-ticker]').forEach(el=>observer.observe(el));
  }
  const start=()=>document.querySelectorAll('.in-index .bema-eco').forEach(init);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
