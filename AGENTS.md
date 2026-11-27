# BEMA development rules
- Shoptet Classic; prefix custom CSS classes, IDs and variables with bema-.
- CSS first, vanilla JS only; preserve native navigation, search, cart, checkout and AJAX.
- Mobile-first, keyboard accessibility, WCAG 2.2 AA target, reduced motion.
- Lighthouse target 95+ on mobile and desktop; measure rather than guarantee. LCP <= 2.5s, CLS <= 0.1, INP <= 200ms.
- Additional gzip budget: CSS 30 kB, JS 40 kB.
- Preserve server-rendered content, canonical URLs, structured data; llms.txt and Markdown supplement SEO, not replace it.
- Keep src and dist synchronized. Development via jsDelivr; final export to Shoptet CDN.
- Public repository: no credentials, customer data or unapproved client source/assets.

## Production launch checklist — QuickFinder
- Replace sandbox product supplier XML feed with production feed in HTML data-feed. Never commit the hash or private supplier XML to public GitHub. Confirm public/customer-facing data only; browser-visible feed URL must be safe to disclose, otherwise serve a sanitized public JSON feed through backend. Verify exact XML schema, category/parameter mapping, price visibility, volume units, variant deduplication, filtered Shoptet category links and performance before launch.

- BundleBand: before launch verify compatible neck/closure pairs, actual quantity-tier prices and real automatic 5% cart discount; draft HTML is visual only. Verify bottom banner placement and ordering independently of footer columns.

- EcoSection: verify evidence and scope for rPET carbon-footprint reduction up to 70%, lightweighting 20–30%, MONIKA 1 l pallet utilization 96.9%, and EKO-KOM savings before publication. Verify actual rPET category link and bottom-banner placement; host original film and poster on Shoptet CDN.

- PrintSlab: verify production links to print inquiry and printing information, minimum order 1,000 units and service technologies. Homepage teaser is local preview only; full printing configurator remains separate.

- B2BBento: homepage CSV animation and invoice toggle are demonstration only. Verify real ERP CSV import, reorder, invoice eligibility, contract price lists, order templates, registration/login URLs before production; do not advertise unsupported B2B features. Demo quantities and order identifiers are illustrative.

- Newsletter: preserve native Shoptet subscription/consent/validation, verify exact form markup and successful subscription; the mockup's first-order −5% offer requires confirmed coupon automation before launch.

- ProductionSpec: verify monthly manufacturing capacity, machine counts, volume ranges, certification dates, UCHEM description and destination URLs before launch; use original production photo on Shoptet CDN.
