/* BEMA footer v0.5 */
(() => {
  function initFooter() {
    const footer = document.querySelector('#footer');
    if (!footer) return;
    const brand = footer.querySelector('.bema-footer-brand');
    const host = brand?.closest('.custom-footer');
    if (brand && host && !host.querySelector('.bema-footer-grid')) {
      const columns = [...host.querySelectorAll('.bema-footer-column')];
      if (columns.length === 5) {
        const native = footer.querySelector('.site-name');
        const originalParent = native?.parentElement;
        if (native && !brand.contains(native)) {
          const link = native.querySelector('a');
          if (link) {
            brand.querySelector('.bema-footer-logo')?.remove();
            link.classList.add('bema-footer-logo');
            const image = link.querySelector('img');
            if (image) image.alt = 'BEMA';
            brand.prepend(link);
            native.remove();
            if (originalParent && originalParent !== host && originalParent !== footer &&
                !originalParent.textContent.trim() && !originalParent.querySelector('img,a,button,input,form,.bema-footer-column')) {
              originalParent.classList.add('bema-footer-logo-source');
            }
          }
        }
        const grid = document.createElement('div');
        grid.className = 'bema-footer-grid';
        host.prepend(grid);
        grid.append(...columns);
        host.classList.add('bema-footer-ready');
      }
    }
    const signature = document.getElementById('signature');
    if (!signature || signature.querySelector('.bema-footer-credit, .AdatelierSignature')) return;
    const link = document.createElement('a');
    link.href = 'https://adatelier.sk/';
    link.className = 'bema-footer-credit';
    link.append('a ');
    const image = document.createElement('img');
    image.src = 'https://adatelier.sk/wp-content/uploads/2025/06/Adatelier-white-logo.png';
    image.width = 25;
    image.height = 25;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    link.append(image, ' Adatelier');
    signature.appendChild(link);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFooter, { once: true });
  else initFooter();
})();

/* BEMA newsletter — preserve the original Shoptet form and all consent controls. */
(() => {
  function initNewsletter() {
    const footer=document.querySelector('#footer');
    const grid=footer?.querySelector('.bema-footer-grid');
    if(!grid||footer.querySelector('.bema-newsletter'))return;
    const forms=[...footer.querySelectorAll('form')];
    const form=forms.find(el=>/newsletter|subscribe/i.test([el.id,el.className,el.getAttribute('action')].join(' '))&&el.querySelector('input[type=email],input[name=email],input[name=newsletterEmail]'))
      ||forms.find(el=>el.closest('.newsletter,.newsletter-wrapper,.footer-newsletter,[class*="newsletter"]')&&el.querySelector('input[type=email],input[name=email],input[name=newsletterEmail]'));
    if(!form)return;
    const host=grid.parentElement;
    let source=form.closest('.custom-footer > *')||form.closest('.footer-newsletter,.newsletter-wrapper,.newsletter')||form.parentElement;
    if(!source||source===host||source.contains(grid)||source.querySelector('.bema-footer-column,.bema-footer-grid'))source=form;
    const band=document.createElement('section');band.className='bema-newsletter';band.setAttribute('aria-labelledby','bema-newsletter-title');
    const title=document.createElement('h2');title.id='bema-newsletter-title';title.textContent='Novinky a akce jednou za měsíc. K první objednávce −5 %.';
    const body=document.createElement('div');body.className='bema-newsletter-body';
    source.classList.add('bema-newsletter-native');form.classList.add('bema-newsletter-form');
    const email=form.querySelector('input[type=email],input[name=email],input[name=newsletterEmail]');email.classList.add('bema-newsletter-email');email.placeholder='vas@email.cz';email.autocomplete='email';if(!email.hasAttribute('aria-label')&&!email.labels?.length)email.setAttribute('aria-label','E-mail pro odběr novinek');
    const submit=form.querySelector('button[type=submit],input[type=submit],button:not([type])');
    if(submit){submit.classList.add('bema-newsletter-submit');if(submit.tagName==='INPUT')submit.value='Odebírat';else{submit.textContent='Odebírat';} }
    // Hide only the duplicated decorative heading; preserve validation and consent markup.
    const oldTitle=source.querySelector('h1,h2,h3,h4,.newsletter-title');
    if(oldTitle&&!oldTitle.contains(form))oldTitle.classList.add('bema-newsletter-old-title');
    body.append(source);band.append(title,body);grid.before(band);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initNewsletter,{once:true});else initNewsletter();
})();
