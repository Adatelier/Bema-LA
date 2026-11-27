/* PrintSlab: local text preview, no external dependencies */
(() => {
  const palette={white:['#fff','#0d1014'],black:['#0d1014','#fff'],red:['#dc0612','#fff']};
  function init(root) {
    if(root.dataset.bemaPrintReady)return;
    const input=root.querySelector('.bema-print-input input'),box=root.querySelector('.bema-print-label'),label=root.querySelector('.bema-print-label-text'),probe=root.querySelector('.bema-print-probe'),zone=root.querySelector('.bema-print-label-zone');
    if(!input||!box||!label||!probe||!zone)return;
    root.dataset.bemaPrintReady='true';
    function fit(){
      const value=input.value.trim()||'Vaše značka';
      label.textContent=value;label.classList.toggle('bema-print-ghost',!input.value.trim());
      const width=box.clientWidth;if(!width)return;
      probe.textContent=value;const whole=probe.getBoundingClientRect().width;
      if(!whole)return;
      const size=100*width*.78/whole;
      if(size>=14){label.style.fontSize=Math.min(40,size)+'px';label.style.whiteSpace='nowrap';label.style.overflowWrap='normal';}
      else {probe.textContent=value.split(/\s+/).reduce((a,b)=>a.length>b.length?a:b,'');const word=probe.getBoundingClientRect().width;label.style.fontSize=Math.max(10,Math.min(14,100*width*.9/Math.max(1,word)))+'px';label.style.whiteSpace='normal';label.style.overflowWrap='anywhere';}
    }
    input.addEventListener('input',fit);
    const buttons=[...root.querySelectorAll('.bema-print-swatches button')];
    for(const b of buttons)b.addEventListener('click',()=>{const color=b.dataset.color;if(!palette[color])return;const [bg,fg]=palette[color];zone.setAttribute('fill',bg);zone.setAttribute('stroke',color==='black'?'rgb(255 255 255 / 32%)':'none');box.style.color=fg;buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
    if('ResizeObserver'in window)new ResizeObserver(fit).observe(box);
    document.fonts?.ready.then(fit);fit();
  }
  const start=()=>document.querySelectorAll('.in-index .bema-print').forEach(init);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
