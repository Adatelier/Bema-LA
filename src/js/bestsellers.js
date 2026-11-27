
/* Bestseller carousel: preserve native product nodes and cart forms */
(() => {
  function init() {
    if(!document.body.classList.contains('in-index')) return;
    const track=document.getElementById('products-1'), heading=document.querySelector('.homepage-products-heading-1');
    if(!track||!heading||track.classList.contains('bema-bestseller-track')) return;
    const cards=[...track.children].filter(el=>el.classList.contains('product'));
    if(!cards.length) return;
    const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
    const svg=(path)=>{const el=document.createElementNS('http://www.w3.org/2000/svg','svg');el.setAttribute('viewBox','0 0 24 24');el.setAttribute('width','20');el.setAttribute('height','20');el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.8');el.setAttribute('stroke-linecap','round');el.setAttribute('stroke-linejoin','round');el.setAttribute('aria-hidden','true');const p=document.createElementNS(el.namespaceURI,'path');p.setAttribute('d',path);el.append(p);return el;};
    const head=make('div','bema-bestseller-head'),copy=make('div'),controls=make('div','bema-bestseller-controls');
    heading.before(head);heading.setAttribute('role','heading');heading.setAttribute('aria-level','2');heading.id=heading.id||'bema-bestseller-title';copy.append(heading);
    const lead=make('p','','Vyberte si z nejčastěji objednávaných produktů.');copy.append(lead);
    const prev=make('button'),next=make('button');for(const [b,label,path] of [[prev,'Předchozí','M15 6l-6 6 6 6'],[next,'Další','M9 6l6 6-6 6']]){b.type='button';b.setAttribute('aria-label',label);b.setAttribute('aria-controls',track.id);b.append(svg(path));}
    controls.append(prev,next);head.append(copy,controls);
    const progress=make('div','bema-bestseller-progress'),thumb=make('span');progress.setAttribute('aria-hidden','true');progress.append(thumb);track.after(progress);
    track.classList.add('bema-bestseller-track');track.tabIndex=0;track.setAttribute('role','region');track.setAttribute('aria-labelledby',heading.id);
    for(const card of cards){const code=card.querySelector('.p-code'),name=card.querySelector('.name'),button=card.querySelector('button.btn-cart');if(code&&name)name.after(code);if(button){button.append(svg('M5 8h14l1 13H4L5 8z M9 9V6a3 3 0 0 1 6 0v3'));button.classList.add('bema-bag-ready');}}
    let raf=0;function measure(){raf=0;const max=track.scrollWidth-track.clientWidth;prev.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=max-2;progress.style.visibility=max<=2?'hidden':'visible';const ratio=Math.min(1,track.clientWidth/Math.max(1,track.scrollWidth));thumb.style.width=ratio*100+'%';thumb.style.transform='translateX('+(max>0?Math.max(0,Math.min(1,track.scrollLeft/max))*(1-ratio)/ratio*100:0)+'%)';}
    function schedule(){if(!raf)raf=requestAnimationFrame(measure);}
    function step(dir){const gap=parseFloat(getComputedStyle(track).columnGap)||0;track.scrollBy({left:dir*(cards[0].getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
    prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));track.addEventListener('scroll',schedule,{passive:true});if('ResizeObserver' in window)new ResizeObserver(schedule).observe(track);else window.addEventListener('resize',schedule);
    let drag=null,suppress=false;
    track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,input,select,textarea,form'))return;drag={id:e.pointerId,x:e.clientX,left:track.scrollLeft,active:false};});
    track.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x;if(!drag.active&&Math.abs(dx)<5)return;if(!drag.active){drag.active=true;track.classList.add('bema-dragging');try{track.setPointerCapture(e.pointerId);}catch{}}track.scrollLeft=drag.left-dx;});
    const end=()=>{if(!drag)return;if(drag.active){suppress=true;track.classList.remove('bema-dragging');setTimeout(()=>{suppress=false;},0);}drag=null;};
    track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);track.addEventListener('lostpointercapture',end);track.addEventListener('pointerleave',()=>{if(drag&&!drag.active)drag=null;});
    track.addEventListener('dragstart',e=>e.preventDefault());track.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();}},true);schedule();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
