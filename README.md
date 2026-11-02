# Acadian Windows & Doors: Website Concept

A design mockup for the new Acadian Windows & Doors website: custom architectural
milled windows and doors, featuring rare woods like Louisiana sinker cypress.

## View it

Open `index.html` in any browser. No build step and no server needed.

## What's in the concept

- **Hero:** an elegant arched sinker-cypress entry and the brand promise.
- **Values:** Truly Custom, Rare Woods, Built to Last, Highest Quality.
- **Collections:** Grand Entry Doors, Arched & Fanlight Windows, French & Gallery Doors, Casement & Transom Windows.
- **Specialty Windows:** a showcase of round, oval, gothic and sunburst windows.
- **The Statement Collection:** eight signature shapes: oculus, œil-de-bœuf, rose, quatrefoil, gothic lancet, octagon, demilune and eyebrow.
- **Design a Statement Window:** a live designer for shape, muntin pattern, glass (clear, cathedral amber, antique bayou green) and wood.
- **Sinker Cypress feature:** the story of the wood and why Louisiana loves it.
- **Our Woods:** six species. Click one to preview it on the door.
- **Design Your Door:** a live configurator for wood, top shape, single or double, glass style and hardware finish. "Request a Quote" carries the design into the contact form.
- **Process:** Consultation → Design → Milling → Finish & Install.
- **Consultation form:** for the mockup only, so it doesn't send anything.

All door and window artwork is drawn in code (`script.js`), so every illustration
updates to any wood, shape or hardware combination.

## Location pages (local SEO)

`service-areas/` has a hub page plus one page for each region served:
New Orleans, Baton Rouge, Lafayette, Lake Charles, the Northshore (Covington &
Mandeville), Shreveport–Bossier, Houma & Thibodaux, and St. Francisville.

Each page has its own content, not a template with the city name swapped in:
local house styles, climate advice, a recommended wood, neighborhoods and
nearby towns, local FAQs, and links to related areas. Each page also has a
unique title and meta description, `Service` and `BreadcrumbList` schema, and
a contact form tagged with the area. The homepage links to every area, and
`sitemap.xml` and `robots.txt` are generated alongside the pages.

**To edit or add an area**, change `scripts/locations.mjs`, then run:

    node scripts/build-locations.mjs

This rebuilds every location page, the hub, the sitemap, and the service-area
blocks on the homepage and in the footer.

**Before launch:**
- Set `SITE_URL` in `scripts/locations.mjs` to the real domain and rebuild.
  It's used for canonical URLs, the sitemap and the schema.
- Confirm which areas the business actually serves.
- Add the phone, address and Google Business Profile link to the schema
  `provider` (marked TODO in the build script).
- Fill each page's "project gallery" with real local projects and reviews.

## Screenshots for review

`concept-screens/` has a page-by-page PNG of every section, plus
`Acadian-Website-Concept.pdf`, which bundles them with captions for sharing.

## Placeholders to replace before launch

- Phone number, email, and showroom address
- Real project photography (the illustrations can stay for the configurator)
- A working form backend
- The "Website concept · v1" badge in the bottom-left corner

## Files

- `index.html`: page structure and copy
- `styles.css`: visual design and responsive layout
- `script.js`: SVG door/window drawings, configurator, and interactions
