/* Production capacity ticker — animate once, static final value without JS */
(() => {
  function init() {
    if(!('IntersectionObserver' in window))return;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    if(motion.matches)return;
    const format=new Intl.NumberFormat('cs-CZ',{maximumFractionDigits:0});
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting||entry.intersectionRatio<.5)continue;
        const el=entry.target;observer.unobserve(el);
        const target=Number(el.dataset.bemaProductionCount),final=el.textContent;
        if(!Number.isFinite(target)||target<=0||motion.matches)continue;
        const start=performance.now();
        function tick(now){
          const p=Math.min(1,(now-start)/1100);
          if(p>=1||motion.matches){el.textContent=final;return;}
          el.textContent='≈\u00a0'+format.format(Math.round(target*(1-Math.pow(1-p,4))));
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    },{threshold:.5});
    document.querySelectorAll('.in-index .bema-production [data-bema-production-count]').forEach(el=>observer.observe(el));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
