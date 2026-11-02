// Builds the service-area (location) pages from scripts/locations.mjs.
//
//   node scripts/build-locations.mjs
//
// Outputs:
//   service-areas/index.html          hub page listing every area
//   service-areas/<slug>.html         one page per city/region
//   sitemap.xml, robots.txt
// and refreshes the service-area blocks on the homepage (between the
// AREAS and FOOTER-AREAS marker comments in index.html).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCATIONS, SITE_URL } from "./locations.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = "Acadian Windows & Doors";
const WOOD_NAMES = {
  "sinker-cypress": "Sinker Cypress",
  "heart-pine": "Heart Pine",
  mahogany: "Mahogany",
  "white-oak": "White Oak",
  walnut: "Black Walnut",
  "spanish-cedar": "Spanish Cedar",
};
const bySlug = Object.fromEntries(LOCATIONS.map((l) => [l.slug, l]));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const art = (spec) => `data-${spec.type}='${JSON.stringify(spec.opts)}'`;
const url = (path) => `${SITE_URL}/${path}`;
const json = (obj) => JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");

/* ---------- shared chrome ---------- */
const LOGO_SVG = `<svg class="logo-mark" viewBox="0 0 48 56" aria-hidden="true">
            <path d="M4 54 V24 A20 20 0 0 1 44 24 V54" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <path d="M11 54 V25 A13 13 0 0 1 37 25 V54" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
            <path d="M24 12 V54 M11 34 H37" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
            <path d="M20 4 h8 l-1.5 6 h-5 z" fill="currentColor"/>
          </svg>`;

function head({ title, description, path, schema }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url(path)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(BRAND)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url(path)}">
  <meta name="geo.region" content="US-LA">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
${schema.map((s) => `  <script type="application/ld+json">\n${json(s)}\n  </script>`).join("\n")}
</head>
<body>`;
}

function header() {
  return `
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a href="../index.html" class="logo" aria-label="${esc(BRAND)} home">
        ${LOGO_SVG}
        <span class="logo-text">
          <span class="logo-name">Acadian</span>
          <span class="logo-sub">Windows &amp; Doors</span>
        </span>
      </a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" aria-label="Primary">
        <a href="../index.html#collections">Collections</a>
        <a href="../index.html#specialty">Specialty Windows</a>
        <a href="../index.html#woods">Our Woods</a>
        <a href="../index.html#design">Design Your Door</a>
        <a href="index.html" aria-current="page">Service Areas</a>
        <a href="#contact" class="btn btn-small">Request a Consultation</a>
      </nav>
    </div>
  </header>`;
}

function footerAreas(prefix) {
  return `<div>
        <h4>Service Areas</h4>
${LOCATIONS.map((l) => `        <a href="${prefix}${l.slug}.html">${esc(l.city)}</a>`).join("\n")}
      </div>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a href="../index.html" class="logo logo-light">
          ${LOGO_SVG}
          <span class="logo-text">
            <span class="logo-name">Acadian</span>
            <span class="logo-sub">Windows &amp; Doors</span>
          </span>
        </a>
        <p class="footer-tag">Custom architectural milled windows &amp; doors.<br>Elegant. Enduring. Built to your wants.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="../index.html#collections">Collections</a>
        <a href="../index.html#specialty">Specialty Windows</a>
        <a href="../index.html#woods">Our Woods</a>
        <a href="../index.html#sinker-cypress">Sinker Cypress</a>
        <a href="../index.html#process">Process</a>
      </div>
      ${footerAreas("")}
      <div>
        <h4>Contact</h4>
        <p>(000) 000-0000<br>hello@yourdomain.com<br>Showroom by appointment</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; 2026 ${esc(BRAND)}</span>
      <span>Proudly Louisiana</span>
    </div>
  </footer>

  <div class="concept-badge" id="concept-badge">
    Website concept &middot; v1
    <button aria-label="Hide concept label">&times;</button>
  </div>

  <script src="../script.js"></script>
</body>
</html>
`;
}

function contact(place) {
  return `
    <section class="section contact" id="contact">
      <div class="container contact-grid">
        <div class="contact-copy">
          <p class="eyebrow">Begin Your Project</p>
          <h2>Let's build something beautiful${place ? ` in <em>${esc(place)}.</em>` : ` <em>together.</em>`}</h2>
          <p>Tell us about your home and the openings you have in mind. We'll be in touch to schedule a consultation.</p>
          <ul class="contact-list">
            <li><span>Phone</span>(000) 000-0000</li>
            <li><span>Email</span>hello@yourdomain.com</li>
            <li><span>Showroom</span>By appointment, Louisiana</li>
          </ul>
        </div>
        <form class="contact-form" id="contact-form">
          ${place ? `<input type="hidden" name="service_area" value="${esc(place)}">` : ""}
          <div class="field-row">
            <label>Name<input type="text" name="name" required autocomplete="name"></label>
            <label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
          </div>
          <label>Email<input type="email" name="email" required autocomplete="email"></label>
          <div class="field-row">
            <label>Project
              <select name="project">
                <option>Entry door</option>
                <option>French / gallery doors</option>
                <option>Windows</option>
                <option>Specialty / round windows</option>
                <option>Whole-home package</option>
                <option>Something else</option>
              </select>
            </label>
            <label>Wood of interest
              <select name="wood" id="form-wood"></select>
            </label>
          </div>
          <label>Tell us about your project<textarea name="message" rows="4" id="form-message"></textarea></label>
          <button type="submit" class="btn btn-full">Request a Consultation</button>
          <p class="form-note" id="form-note" hidden>Thank you! This is a design mockup, so nothing was sent, but this is where your request would go.</p>
        </form>
      </div>
    </section>`;
}

function areaCard(l, prefix) {
  return `
          <a class="area-card" href="${prefix}${l.slug}.html">
            <div class="area-art" ${art(l.hero)}></div>
            <div class="area-body">
              <p class="area-region">${esc(l.region)}</p>
              <h3>${esc(l.city)}</h3>
              <p>${esc(l.tagline)}</p>
              <span class="link-arrow">View ${esc(l.city)}</span>
            </div>
          </a>`;
}

/* ---------- schema ---------- */
const provider = {
  "@type": "HomeAndConstructionBusiness",
  name: BRAND,
  url: url("index.html"),
  // TODO: add telephone, address and sameAs (Google Business Profile, social) once confirmed.
};

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(path) })),
  };
}

/* ---------- city page ---------- */
function cityPage(l) {
  const path = `service-areas/${l.slug}.html`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Custom wood windows and doors in ${l.city}`,
      serviceType: "Custom architectural millwork: wood windows and doors",
      description: l.meta,
      provider,
      areaServed: [
        { "@type": "Place", name: `${l.city}, Louisiana` },
        ...l.neighborhoods.map((n) => ({ "@type": "Place", name: `${n}, ${l.city}` })),
        ...l.nearby.map((n) => ({ "@type": "Place", name: `${n}, Louisiana` })),
      ],
    },
    breadcrumbSchema([["Home", "index.html"], ["Service Areas", "service-areas/index.html"], [l.city, path]]),
  ];

  return `${head({ title: `${l.title} | ${BRAND}`, description: l.meta, path, schema })}
${header()}

  <main>
    <nav class="breadcrumb container" aria-label="Breadcrumb">
      <a href="../index.html">Home</a><span>/</span><a href="index.html">Service Areas</a><span>/</span><span aria-current="page">${esc(l.city)}</span>
    </nav>

    <section class="hero local-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${esc(l.region)} &middot; ${esc(l.parish)}</p>
          <h1>${esc(l.h1)}</h1>
${l.intro.map((p, i) => `          <p class="${i === 0 ? "lead" : "lead lead-2"}">${esc(p)}</p>`).join("\n")}
          <div class="hero-actions">
            <a href="#contact" class="btn">Request a Consultation</a>
            <a href="../index.html#design" class="btn btn-ghost">Design Your Door</a>
          </div>
        </div>
        <div class="hero-art">
          <div class="hero-wall">
            <div class="hero-door" ${art(l.hero)}></div>
          </div>
          <p class="hero-caption">Shown: ${esc(l.heroCaption)}</p>
        </div>
      </div>
    </section>

    <section class="section local-styles">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${esc(l.city)} Architecture</p>
          <h2>Designed for <em>${esc(l.city)} homes</em></h2>
          <p>Every part of Louisiana builds a little differently. These are the styles we see most in ${esc(l.city)}, and how we design for each.</p>
        </div>
        <div class="style-grid">
${l.styles
  .map(
    (s) => `          <article class="style-card">
            <div class="style-art" ${art(s.art)}></div>
            <div class="style-body">
              <h3>${esc(s.name)}</h3>
              <p>${esc(s.desc)}</p>
            </div>
          </article>`
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <section class="local-climate">
      <div class="container climate-grid">
        <div>
          <p class="eyebrow eyebrow-light">Climate &amp; Craft</p>
          <h2>${esc(l.climate.title)}</h2>
          <p>${esc(l.climate.body)}</p>
          <ul class="climate-points">
${l.climate.points.map((p) => `            <li>${esc(p)}</li>`).join("\n")}
          </ul>
        </div>
        <aside class="wood-pick">
          <div class="wood-pick-swatch" data-swatch="${l.wood.key}"></div>
          <div class="wood-pick-body">
            <p class="wood-origin">Our pick for ${esc(l.city)}</p>
            <h3>${esc(WOOD_NAMES[l.wood.key])}</h3>
            <p>${esc(l.wood.why)}</p>
            <a href="../index.html#woods" class="link-arrow">Explore our woods</a>
          </div>
        </aside>
      </div>
    </section>
${
  l.historic
    ? `
    <section class="historic-note">
      <div class="container">
        <div class="callout">
          <p class="eyebrow">Historic Districts</p>
          <p>${esc(l.historic)}</p>
        </div>
      </div>
    </section>`
    : ""
}
    <section class="section local-areas">
      <div class="container areas-split">
        <div>
          <div class="section-head">
            <p class="eyebrow">Where We Work</p>
            <h2>Serving ${esc(l.city)} <em>&amp; nearby</em></h2>
          </div>
          <h3 class="chip-title">Neighborhoods</h3>
          <ul class="place-chips">
${l.neighborhoods.map((n) => `            <li>${esc(n)}</li>`).join("\n")}
          </ul>
          <h3 class="chip-title">Nearby communities</h3>
          <ul class="place-chips">
${l.nearby.map((n) => `            <li>${esc(n)}</li>`).join("\n")}
          </ul>
        </div>
        <div class="spotlight">
          <p class="eyebrow">Local Projects</p>
          <h3>${esc(l.city)} project gallery</h3>
          <p>Photos and stories from real ${esc(l.city)}-area installations, along with client reviews, will go here.</p>
          <p class="mockup-note">Concept note: local project photos and reviews are the strongest signals for local search. We'll add them as the owners provide them.</p>
        </div>
      </div>
    </section>

    <section class="section faq">
      <div class="container faq-grid">
        <div class="section-head">
          <p class="eyebrow">Questions</p>
          <h2>${esc(l.city)} questions, <em>answered</em></h2>
        </div>
        <div class="faq-list">
${l.faqs
  .map(
    (f, i) => `          <details${i === 0 ? " open" : ""}>
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <section class="section related-areas">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Also Serving</p>
          <h2>More of <em>Louisiana</em></h2>
        </div>
        <div class="area-grid area-grid-3">${l.related.map((r) => areaCard(bySlug[r], "")).join("")}
        </div>
        <p class="all-areas"><a href="index.html" class="link-arrow">See all service areas</a></p>
      </div>
    </section>
${contact(l.city)}
  </main>
${footer()}`;
}

/* ---------- hub page ---------- */
function hubPage() {
  const path = "service-areas/index.html";
  const description =
    "Acadian Windows & Doors crafts custom wood windows and doors for homes across Louisiana, including New Orleans, Baton Rouge, Lafayette, Lake Charles, the Northshore, Shreveport and more.";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom wood windows and doors in Louisiana",
      serviceType: "Custom architectural millwork: wood windows and doors",
      provider,
      areaServed: [{ "@type": "State", name: "Louisiana" }, ...LOCATIONS.map((l) => ({ "@type": "Place", name: `${l.city}, Louisiana` }))],
    },
    breadcrumbSchema([["Home", "index.html"], ["Service Areas", path]]),
  ];
  return `${head({ title: `Service Areas: Custom Windows & Doors Across Louisiana | ${BRAND}`, description, path, schema })}
${header()}

  <main>
    <nav class="breadcrumb container" aria-label="Breadcrumb">
      <a href="../index.html">Home</a><span>/</span><span aria-current="page">Service Areas</span>
    </nav>

    <section class="hero local-hero hub-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Service Areas</p>
          <h1>Custom windows &amp; doors <em>across Louisiana</em></h1>
          <p class="lead">From French Quarter balconies to Acadiana galleries and North Louisiana bungalows, every region has its own architecture. We design for yours.</p>
          <p class="lead lead-2">Choose your area to see the local styles we build, the woods we recommend for your climate, and the communities we serve.</p>
          <div class="hero-actions">
            <a href="#areas" class="btn">Find Your Area</a>
            <a href="#contact" class="btn btn-ghost">Request a Consultation</a>
          </div>
        </div>
        <div class="hero-art">
          <div class="hero-wall hub-wall">
            <div class="hero-door" data-special='{"shape":"circle","pattern":"rose","glass":"amber","wood":"sinker-cypress"}'></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section hub-areas" id="areas">
      <div class="container">
        <div class="area-grid">${LOCATIONS.map((l) => areaCard(l, "")).join("")}
        </div>
        <div class="callout callout-center">
          <p class="eyebrow">Don't see your town?</p>
          <p>These are just the places we hear from most. Tell us where your home is and we'll talk about your project.</p>
          <a href="#contact" class="btn">Ask About Your Area</a>
        </div>
      </div>
    </section>
${contact("")}
  </main>
${footer()}`;
}

/* ---------- homepage blocks ---------- */
function homeAreasBlock() {
  return `<!-- AREAS:START -->
    <!-- Generated by scripts/build-locations.mjs; edit scripts/locations.mjs instead. -->
    <section class="section home-areas" id="service-areas">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Service Areas</p>
          <h2>Proudly serving <em>Louisiana homes</em></h2>
          <p>Each region builds a little differently. See the styles, woods and communities we serve near you.</p>
        </div>
        <div class="area-grid">${LOCATIONS.map((l) => areaCard(l, "service-areas/")).join("")}
        </div>
        <p class="all-areas"><a href="service-areas/index.html" class="link-arrow">See all service areas</a></p>
      </div>
    </section>
    <!-- AREAS:END -->`;
}

function replaceBlock(src, name, body) {
  const re = new RegExp(`<!-- ${name}:START -->[\\s\\S]*?<!-- ${name}:END -->`);
  if (!re.test(src)) throw new Error(`Marker ${name} not found in index.html`);
  return src.replace(re, body);
}

/* ---------- write everything ---------- */
mkdirSync(join(ROOT, "service-areas"), { recursive: true });
for (const l of LOCATIONS) writeFileSync(join(ROOT, "service-areas", `${l.slug}.html`), cityPage(l));
writeFileSync(join(ROOT, "service-areas", "index.html"), hubPage());

let home = readFileSync(join(ROOT, "index.html"), "utf8");
home = replaceBlock(home, "AREAS", homeAreasBlock());
home = replaceBlock(home, "FOOTER-AREAS", `<!-- FOOTER-AREAS:START -->\n      ${footerAreas("service-areas/")}\n      <!-- FOOTER-AREAS:END -->`);
writeFileSync(join(ROOT, "index.html"), home);

const pages = ["index.html", "service-areas/index.html", ...LOCATIONS.map((l) => `service-areas/${l.slug}.html`)];
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${url(p)}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${url("sitemap.xml")}\n`);

console.log(`Built ${LOCATIONS.length} location pages + hub, sitemap.xml, robots.txt`);
