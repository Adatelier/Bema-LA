# BEMA development rules
- Shoptet Classic; prefix custom CSS classes, IDs and variables with bema-.
- CSS first, vanilla JS only; preserve native navigation, search, cart, checkout and AJAX.
- Mobile-first, keyboard accessibility, WCAG 2.2 AA target, reduced motion.
- Lighthouse target 95+ on mobile and desktop; measure rather than guarantee. LCP <= 2.5s, CLS <= 0.1, INP <= 200ms.
- Additional gzip budget: CSS 30 kB, JS 40 kB.
- Preserve server-rendered content, canonical URLs, structured data; llms.txt and Markdown supplement SEO, not replace it.
- Keep src and dist synchronized. Development via jsDelivr; final export to Shoptet CDN.
- Public repository: no credentials, customer data or unapproved client source/assets.
