/* BEMA footer enhancement: reuse native logo and preserve Shoptet attribution. */
(() => {
  function initFooter() {
    const footer = document.querySelector('#footer');
    if (!footer) return;
    const brand = footer.querySelector('.bema-footer-brand');
    if (brand && !brand.querySelector('.site-name.bema-footer-logo')) {
      const nativeLogo = footer.querySelector('.site-name');
      if (nativeLogo && !brand.contains(nativeLogo)) {
        const grid = nativeLogo.closest('.custom-footer');
        let wrapper = nativeLogo;
        if (grid) {
          while (wrapper.parentElement && wrapper.parentElement !== grid) wrapper = wrapper.parentElement;
        }
        const placeholder = brand.querySelector('.bema-footer-logo');
        if (placeholder) placeholder.remove();
        nativeLogo.classList.add('bema-footer-logo');
        const image = nativeLogo.querySelector('img');
        if (image) image.alt = 'BEMA';
        brand.prepend(nativeLogo);
        if (wrapper !== nativeLogo && !wrapper.textContent.trim() && !wrapper.querySelector('img, a, button, input, form, .bema-footer-column')) {
          wrapper.classList.add('bema-footer-logo-source');
        }
      }
    }
    if (footer.querySelector('.bema-footer-credit')) return;
    const signature = footer.querySelector('#signature, .signature');
    const shoptet = signature?.matches('a') ? signature : (signature?.querySelector('a[href*="shoptet"]') || footer.querySelector('.footer-bottom a[href*="shoptet"], a[href*="shoptet"][title*="Shoptet"]'));
    if (!shoptet && !signature) return;
    const credit = document.createElement('span');
    credit.className = 'bema-footer-credit';
    credit.append(' a ');
    const link = document.createElement('a');
    link.href = 'https://www.adatelier.sk/';
    link.textContent = 'Adatelier';
    credit.append(link);
    (shoptet || signature).after(credit);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFooter, { once:true });
  else initFooter();
})();
