/* Category cards — preserve native cart form and refresh after listing updates */
(() => {
  function init() {
    if(!document.body.classList.contains('type-category'))return;
    const enhance=()=>{
      document.querySelectorAll('#products .product .p').forEach(card=>{
        const code=card.querySelector('.p-code'),name=card.querySelector('.p-in-in > .name');
        if(code&&name&&name.nextElementSibling!==code)name.after(code);
        const button=card.querySelector('button.btn-cart');
        if(!button||button.classList.contains('bema-category-bag'))return;
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.8');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
        const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d','M5 8h14l1 13H4L5 8z M9 9V6a3 3 0 0 1 6 0v3');svg.append(path);button.append(svg);button.classList.add('bema-category-bag');
      });
    };
    enhance();
    document.addEventListener('ShoptetDOMPageContentLoaded',enhance);
    document.addEventListener('ShoptetDOMPageMoreProductsLoaded',enhance);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
