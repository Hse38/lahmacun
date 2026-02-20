# SEO Optimization Checklist — Gaziantep Kuzu Lahmacun

## 1. Technical SEO
- [x] **Title:** "Gaziantep Kuzu Lahmacun | Odun Fırını Lezzeti | Üsküdar" (keyword-optimized)
- [x] **Meta description:** 150–160 chars, location + product + USP
- [x] **Canonical URL:** https://gaziantepkuzulahmacun.com
- [x] **Open Graph:** type, url, title, description, image, image dimensions, locale, site_name
- [x] **Twitter Card:** summary_large_image, title, description, image
- [x] **Viewport:** width=device-width, initial-scale=1
- [x] **Robots:** index, follow
- [x] **Favicon:** link rel="icon" + apple-touch-icon
- [x] **theme-color:** #141414
- [x] **Preconnect:** fonts.googleapis.com, fonts.gstatic.com, images.unsplash.com

## 2. Local SEO (Structured Data)
- [x] **Restaurant schema:** name, address, geo, telephone, openingHoursSpecification, priceRange, aggregateRating, sameAs, menu URL, hasMenu with MenuSections
- [x] **LocalBusiness schema:** name, address, geo, telephone, openingHours, sameAs, menu
- [x] **Review schema:** 3× Review with itemReviewed → #restaurant, author, reviewRating, reviewBody
- [x] **Menu URL:** https://gaziantepkuzulahmacun.com/menu
- [x] **Geo:** latitude 41.0007435, longitude 29.0677371

## 3. On-Page SEO
- [x] **One H1 per page:** Home = "Gaziantep Kuzu Lahmacun"; Menu = "Gaziantep Lahmacun ve Pide Menüsü"
- [x] **H2 hierarchy:** "Gaziantep Lahmacun ve Pide Menüsü", "Üsküdar Gaziantep Lahmacun Lezzetleri", "İletişim & Konum", "MİSAFİRLERİMİZ", etc.
- [x] **Keyword-rich headings:** Odun fırını, Üsküdar, Gaziantep lahmacun
- [x] **Image alt tags:** Gallery and about image alts include "Üsküdar", "Gaziantep lahmacun", "odun fırını", "taş fırın pide"
- [x] **Internal linking:** Link to /menu with descriptive aria-label; #menu, #reviews, #contact anchors
- [x] **Menu page title (document):** "Gaziantep Lahmacun ve Pide Menüsü | Üsküdar | Odun Fırını" (set in MenuPage.js)

## 4. Performance SEO
- [x] **Lazy loading:** Gallery images loading="lazy"; iframe loading="lazy"
- [x] **Preconnect:** Fonts and images preconnect in head
- [x] **theme-color:** Set for mobile browser chrome
- [x] **No blocking CSS:** Font loaded with display=swap

## 5. Mobile SEO
- [x] Responsive layout (existing)
- [x] Tap targets: buttons and links min 44px (existing)
- [x] Readable font sizes (existing)
- [x] No horizontal scroll (existing)

## 6. Conversion SEO
- [x] **CTA text:** "WhatsApp ile Sipariş", "Hemen Ara", "Menüyü İncele", "Sipariş Verin"
- [x] **Click-to-call:** tel:05323016334 in nav, contact, footer, FAB, Order CTA
- [x] **WhatsApp:** wa.me/905323016334 in hero, contact, footer, Order CTA, menu footer
- [x] **Google Maps:** Embed + FAB link; map iframe title for accessibility
- [x] **Structured review schema:** AggregateRating + 3× Review in JSON-LD

## 7. Files Delivered
- [x] **index.html:** Updated head, skip link, all meta, 3× JSON-LD (Restaurant, LocalBusiness, 3× Review)
- [x] **robots.txt:** User-agent: *; Allow: /; Sitemap URL
- [x] **sitemap.xml:** Homepage + /menu with lastmod, changefreq, priority
- [x] **App.js:** id="main-content", role="main", aria-labels on hero/CTAs/contact/order, keyword H2s, gallery alts, internal link aria-label
- [x] **MenuPage.js:** document.title on mount/cleanup, H1 "Gaziantep Lahmacun ve Pide Menüsü", subtitle with "Üsküdar odun fırını"
- [x] **App.css:** .skip-link (visually hidden, focus visible)

## Target Keywords
- Gaziantep lahmacun
- Üsküdar lahmacun
- Odun fırını lahmacun
- En iyi lahmacun Üsküdar
