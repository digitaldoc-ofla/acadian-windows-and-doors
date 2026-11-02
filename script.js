/* =========================================================
   Acadian Windows & Doors: website concept
   Draws every door / window as SVG so the design can be
   previewed in any wood, shape, glass and hardware finish.
   ========================================================= */

const WOODS = {
  "sinker-cypress": {
    name: "Sinker Cypress",
    origin: "River-recovered · Louisiana",
    base: "#9a6a3e", dark: "#5c3b1f", light: "#c99760",
    desc: "Old-growth cypress recovered from Louisiana waters. Rich, mineral-toned color, legendary durability.",
    tag: "Signature",
  },
  "heart-pine": {
    name: "Heart Pine",
    origin: "Reclaimed · Longleaf",
    base: "#b4652f", dark: "#7a3c17", light: "#dc8c4e",
    desc: "Dense, resin-rich longleaf heart pine, reclaimed from historic Southern structures.",
  },
  "mahogany": {
    name: "Mahogany",
    origin: "Genuine · Honduran",
    base: "#7b3727", dark: "#4b1d13", light: "#a24f37",
    desc: "The classic choice for grand entries. Stable, fine-grained and deep red-brown.",
  },
  "white-oak": {
    name: "White Oak",
    origin: "Quarter-sawn · American",
    base: "#b79a6c", dark: "#7f6640", light: "#d8bf94",
    desc: "Strong and weather-resistant, with striking ray fleck when quarter-sawn.",
  },
  "walnut": {
    name: "Black Walnut",
    origin: "Select · American",
    base: "#5b3e2b", dark: "#36241a", light: "#80593f",
    desc: "Deep chocolate tones and flowing figure for a truly stately statement.",
  },
  "spanish-cedar": {
    name: "Spanish Cedar",
    origin: "Aromatic · Central American",
    base: "#a8623e", dark: "#733f25", light: "#cd8661",
    desc: "Lightweight, naturally insect-resistant and wonderfully aromatic.",
  },
};

const HARDWARE = {
  brass:  { name: "Unlacquered Brass", c: "#cfa94f", d: "#8a6a22", h: "#f2d98f" },
  bronze: { name: "Oil-Rubbed Bronze", c: "#5d4636", d: "#2d2119", h: "#8d6e55" },
  iron:   { name: "Forged Iron",       c: "#2e2e2e", d: "#111111", h: "#5a5a5a" },
};

const LABELS = {
  top: { arch: "Full Arch", segment: "Segment Arch", square: "Square Transom" },
  layout: { double: "Double Doors", single: "Single Door + Sidelights" },
  glass: { divided: "Divided Lite Glass", leaded: "Leaded Diamond Glass", solid: "Solid Raised Panels" },
};

let uid = 0;

/* ---------- Shared SVG defs: wood, grain, glass ---------- */
function defs(id, w) {
  const grainLines = [4, 11, 17, 26, 33, 39, 47, 54]
    .map((x, i) => {
      const a = (i % 3) * 2 + 3;
      const sw = [0.7, 1.4, 0.9, 1.8][i % 4];
      return `<path d="M${x},0 C${x + a},120 ${x - a},240 ${x},360 S${x + a},540 ${x},600" stroke="${w.dark}" stroke-width="${sw}" fill="none" opacity="${0.25 + (i % 3) * 0.12}"/>`;
    })
    .join("");
  return `
  <defs>
    <linearGradient id="${id}-wood" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${w.base}"/>
      <stop offset=".35" stop-color="${w.light}"/>
      <stop offset=".6" stop-color="${w.base}"/>
      <stop offset="1" stop-color="${w.dark}"/>
    </linearGradient>
    <linearGradient id="${id}-casing" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="${w.dark}"/>
      <stop offset="1" stop-color="${w.base}"/>
    </linearGradient>
    <pattern id="${id}-grain" width="60" height="600" patternUnits="userSpaceOnUse">${grainLines}</pattern>
    <linearGradient id="${id}-glass" x1="0" x2="0.4" y1="0" y2="1">
      <stop offset="0" stop-color="#26343b"/>
      <stop offset=".55" stop-color="#4c636c"/>
      <stop offset="1" stop-color="#7f969c"/>
    </linearGradient>
    <pattern id="${id}-lead" width="34" height="48" patternUnits="userSpaceOnUse">
      <path d="M0,24 L17,0 L34,24 L17,48 Z" fill="none" stroke="#2a2621" stroke-width="2"/>
    </pattern>
  </defs>`;
}

function woodRect(id, x, y, w, h, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}-wood)" ${extra}/>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}-grain)"/>`;
}

function raisedPanel(id, w, x, y, pw, ph) {
  const b = Math.min(12, pw * 0.15, ph * 0.15);
  const fx = x + b, fy = y + b, fw = pw - 2 * b, fh = ph - 2 * b;
  return `
    <rect x="${x - 2}" y="${y - 2}" width="${pw + 4}" height="${ph + 4}" fill="${w.dark}" opacity=".7"/>
    ${woodRect(id, x, y, pw, ph)}
    <polygon points="${x},${y} ${x + pw},${y} ${fx + fw},${fy} ${fx},${fy}" fill="#fff" opacity=".14"/>
    <polygon points="${x},${y} ${fx},${fy} ${fx},${fy + fh} ${x},${y + ph}" fill="#fff" opacity=".07"/>
    <polygon points="${x + pw},${y} ${x + pw},${y + ph} ${fx + fw},${fy + fh} ${fx + fw},${fy}" fill="#000" opacity=".14"/>
    <polygon points="${x},${y + ph} ${x + pw},${y + ph} ${fx + fw},${fy + fh} ${fx},${fy + fh}" fill="#000" opacity=".22"/>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="none" stroke="${w.dark}" stroke-opacity=".45"/>`;
}

function glassRect(id, w, x, y, gw, gh, glass, cols, rows) {
  let out = `<rect x="${x}" y="${y}" width="${gw}" height="${gh}" fill="url(#${id}-glass)"/>
    <polygon points="${x},${y + gh * 0.7} ${x + gw * 0.55},${y} ${x + gw * 0.8},${y} ${x},${y + gh}" fill="#fff" opacity=".1"/>`;
  if (glass === "leaded") {
    out += `<rect x="${x}" y="${y}" width="${gw}" height="${gh}" fill="url(#${id}-lead)"/>`;
  } else {
    for (let c = 1; c < cols; c++) {
      const mx = x + (gw * c) / cols;
      out += `<rect x="${mx - 2.5}" y="${y}" width="5" height="${gh}" fill="${w.base}"/><rect x="${mx - 2.5}" y="${y}" width="1.5" height="${gh}" fill="${w.light}" opacity=".6"/>`;
    }
    for (let r = 1; r < rows; r++) {
      const my = y + (gh * r) / rows;
      out += `<rect x="${x}" y="${my - 2.5}" width="${gw}" height="5" fill="${w.base}"/><rect x="${x}" y="${my - 2.5}" width="${gw}" height="1.5" fill="${w.light}" opacity=".6"/>`;
    }
  }
  out += `<rect x="${x}" y="${y}" width="${gw}" height="${gh}" fill="none" stroke="${w.dark}" stroke-width="2"/>`;
  return out;
}

function handle(hw, x, y, side) {
  const px = side === "right" ? x - 12 : x + 4;
  const kx = side === "right" ? px - 4 : px + 12;
  return `
    <rect x="${px}" y="${y - 30}" width="8" height="60" rx="4" fill="${hw.d}"/>
    <rect x="${px + 1}" y="${y - 29}" width="6" height="58" rx="3" fill="${hw.c}"/>
    <rect x="${px + 2}" y="${y - 27}" width="2" height="54" rx="1" fill="${hw.h}" opacity=".7"/>
    <circle cx="${kx}" cy="${y - 6}" r="5.5" fill="${hw.d}"/>
    <circle cx="${kx}" cy="${y - 6}" r="4.2" fill="${hw.c}"/>
    <circle cx="${kx - 1.3}" cy="${y - 7.3}" r="1.4" fill="${hw.h}"/>
    <circle cx="${px + 4}" cy="${y + 18}" r="2" fill="${hw.d}"/>`;
}

/* A single door leaf with stiles, rails, glass and/or panels */
function leaf(id, w, hw, o, x, y, lw, lh, handleSide) {
  const stile = Math.max(16, lw * 0.15);
  const top = 18, bottom = lh * 0.17;
  const innerX = x + stile, innerW = lw - stile * 2;
  let out = `<rect x="${x - 1}" y="${y - 1}" width="${lw + 2}" height="${lh + 2}" fill="${w.dark}"/>`;
  out += woodRect(id, x, y, lw, lh);
  out += `<rect x="${x + 2}" y="${y + 2}" width="${lw - 4}" height="${lh - 4}" fill="none" stroke="${w.light}" stroke-opacity=".35"/>`;

  if (o.glass === "solid") {
    const gap = 14;
    const avail = lh - top - bottom;
    const upperH = avail * 0.58;
    const cols = innerW > 120 ? 2 : 1;
    const pw = (innerW - (cols - 1) * gap) / cols;
    for (let c = 0; c < cols; c++) {
      const px = innerX + c * (pw + gap);
      out += raisedPanel(id, w, px, y + top, pw, upperH);
      out += raisedPanel(id, w, px, y + top + upperH + gap, pw, avail - upperH - gap);
    }
  } else {
    const full = o.lite === "full";
    const gh = full ? lh - top - bottom : (lh - top - bottom) * 0.62;
    const cols = innerW > 120 ? 3 : 2;
    const rows = full ? 5 : 3;
    out += glassRect(id, w, innerX, y + top, innerW, gh, o.glass, cols, rows);
    if (!full) {
      const py = y + top + gh + 14;
      out += raisedPanel(id, w, innerX, py, innerW, y + lh - bottom - py);
    }
  }
  // bottom rail detail
  out += `<rect x="${x}" y="${y + lh - 4}" width="${lw}" height="4" fill="${w.dark}" opacity=".5"/>`;
  if (handleSide) {
    const hx = handleSide === "right" ? x + lw - 2 : x + 2;
    out += handle(hw, hx, y + lh * 0.55, handleSide);
  }
  return out;
}

/* ---------- Door ---------- */
function doorSVG(opts) {
  const o = Object.assign(
    { wood: "sinker-cypress", top: "arch", glass: "divided", layout: "double", hardware: "brass", lite: "upper" },
    opts
  );
  const w = WOODS[o.wood];
  const hw = HARDWARE[o.hardware];
  const id = "d" + ++uid;

  const L = 50, R = 350, B = 580, S = 210;
  const TB = o.top === "segment" ? S + 46 : S; // transom bottom

  function outline(i) {
    const l = L + i, r = R - i;
    if (o.top === "arch") {
      const rad = (r - l) / 2;
      return `M${l},${B} L${l},${S} A${rad},${rad} 0 0 1 ${r},${S} L${r},${B} Z`;
    }
    if (o.top === "segment") {
      const rx = (r - l) / 2, ry = 62 - i * 0.35;
      return `M${l},${B} L${l},${S} A${rx},${ry} 0 0 1 ${r},${S} L${r},${B} Z`;
    }
    const T = 112 + i;
    return `M${l},${B} L${l},${T} L${r},${T} L${r},${B} Z`;
  }

  function topRegion(i) {
    const l = L + i, r = R - i;
    if (o.top === "arch") {
      const rad = (r - l) / 2;
      return `M${l},${TB} L${l},${S} A${rad},${rad} 0 0 1 ${r},${S} L${r},${TB} Z`;
    }
    if (o.top === "segment") {
      const rx = (r - l) / 2, ry = 62 - i * 0.35;
      return `M${l},${TB} L${l},${S} A${rx},${ry} 0 0 1 ${r},${S} L${r},${TB} Z`;
    }
    const T = 112 + i;
    return `M${l},${TB} L${l},${T} L${r},${T} L${r},${TB} Z`;
  }

  let s = `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${w.name} ${LABELS.top[o.top]} door">`;
  s += defs(id, w);
  s += `<clipPath id="${id}-top"><path d="${topRegion(10)}"/></clipPath>`;

  // casing & molding
  s += `<path d="${outline(-26)}" fill="url(#${id}-casing)"/>`;
  s += `<path d="${outline(-26)}" fill="url(#${id}-grain)" opacity=".7"/>`;
  s += `<path d="${outline(-18)}" fill="none" stroke="${w.light}" stroke-opacity=".35" stroke-width="1.5"/>`;
  s += `<path d="${outline(-10)}" fill="none" stroke="${w.dark}" stroke-opacity=".6" stroke-width="2"/>`;
  // jamb
  s += `<path d="${outline(0)}" fill="${w.dark}"/>`;
  s += `<path d="${outline(2)}" fill="url(#${id}-wood)"/>`;
  s += `<path d="${outline(2)}" fill="url(#${id}-grain)"/>`;

  // transom / fanlight
  const l = L + 10, r = R - 10, cx = 200;
  if (o.glass === "solid") {
    s += `<path d="${topRegion(10)}" fill="${w.base}"/>`;
    s += `<path d="${topRegion(10)}" fill="url(#${id}-grain)"/>`;
    s += `<g clip-path="url(#${id}-top)">`;
    if (o.top === "arch") {
      for (let a = 15; a < 180; a += 15) {
        const rad = (a * Math.PI) / 180;
        s += `<line x1="${cx}" y1="${S}" x2="${cx - Math.cos(rad) * 200}" y2="${S - Math.sin(rad) * 200}" stroke="${w.dark}" stroke-width="2" opacity=".55"/>`;
      }
      s += `<path d="M${cx - 34},${S} A34,34 0 0 1 ${cx + 34},${S} Z" fill="${w.light}" stroke="${w.dark}" stroke-width="2"/>`;
    } else {
      s += raisedPanel(id, w, l + 16, (o.top === "segment" ? S - 20 : 128), r - l - 32, TB - (o.top === "segment" ? S - 20 : 128) - 12);
    }
    s += `</g>`;
  } else {
    s += `<path d="${topRegion(10)}" fill="url(#${id}-glass)"/>`;
    s += `<g clip-path="url(#${id}-top)">`;
    s += `<polygon points="${l},${TB} ${l + 120},${S - 160} ${l + 170},${S - 160} ${l + 40},${TB}" fill="#fff" opacity=".08"/>`;
    if (o.glass === "leaded") {
      s += `<rect x="0" y="0" width="400" height="${TB}" fill="url(#${id}-lead)"/>`;
    }
    if (o.top === "arch") {
      [30, 60, 90, 120, 150].forEach((a) => {
        const rad = (a * Math.PI) / 180;
        s += `<line x1="${cx}" y1="${S}" x2="${cx - Math.cos(rad) * 160}" y2="${S - Math.sin(rad) * 160}" stroke="${w.base}" stroke-width="5"/>`;
      });
      s += `<path d="M${cx - 92},${S} A92,92 0 0 1 ${cx + 92},${S}" fill="none" stroke="${w.base}" stroke-width="5"/>`;
      s += `<path d="M${cx - 30},${S} A30,30 0 0 1 ${cx + 30},${S} Z" fill="url(#${id}-wood)" stroke="${w.dark}" stroke-width="1.5"/>`;
    } else {
      [1, 2, 3, 4].forEach((k) => {
        const mx = l + ((r - l) * k) / 5;
        s += `<rect x="${mx - 2.5}" y="0" width="5" height="${TB}" fill="${w.base}"/>`;
      });
    }
    s += `</g>`;
    s += `<path d="${topRegion(10)}" fill="none" stroke="${w.dark}" stroke-width="2"/>`;
  }

  // transom bar
  s += woodRect(id, L + 2, TB, R - L - 4, 10);
  s += `<rect x="${L + 2}" y="${TB + 9}" width="${R - L - 4}" height="2" fill="${w.dark}" opacity=".6"/>`;

  // leaves
  const ly = TB + 12, lh = B - ly - 4;
  if (o.layout === "double") {
    const lw = (r - l - 4) / 2;
    s += leaf(id, w, hw, o, l, ly, lw, lh, "right");
    s += leaf(id, w, hw, o, l + lw + 4, ly, lw, lh, "left");
    s += `<rect x="${l + lw}" y="${ly}" width="4" height="${lh}" fill="${w.dark}"/>`;
  } else {
    const sideW = 58, gap = 8;
    const lw = r - l - 2 * (sideW + gap);
    [l, r - sideW].forEach((sx) => {
      s += woodRect(id, sx, ly, sideW, lh);
      s += `<rect x="${sx}" y="${ly}" width="${sideW}" height="${lh}" fill="none" stroke="${w.dark}" stroke-width="1.5"/>`;
      if (o.glass === "solid") {
        s += raisedPanel(id, w, sx + 10, ly + 16, sideW - 20, lh * 0.55);
        s += raisedPanel(id, w, sx + 10, ly + 30 + lh * 0.55, sideW - 20, lh * 0.45 - 46);
      } else {
        s += glassRect(id, w, sx + 10, ly + 16, sideW - 20, lh * 0.62, o.glass, 1, 4);
        s += raisedPanel(id, w, sx + 10, ly + 30 + lh * 0.62, sideW - 20, lh * 0.38 - 46);
      }
    });
    s += `<rect x="${l + sideW}" y="${ly}" width="${gap}" height="${lh}" fill="${w.dark}"/>`;
    s += `<rect x="${r - sideW - gap}" y="${ly}" width="${gap}" height="${lh}" fill="${w.dark}"/>`;
    s += leaf(id, w, hw, o, l + sideW + gap, ly, lw, lh, "right");
  }

  // keystone for arches
  if (o.top !== "square") {
    const ky = o.top === "arch" ? S - 150 - 26 : S - 62 - 24;
    s += `<path d="M${cx - 15},${ky - 4} L${cx + 15},${ky - 4} L${cx + 10},${ky + 34} L${cx - 10},${ky + 34} Z" fill="${w.light}" stroke="${w.dark}" stroke-width="1.5"/>`;
    s += `<path d="M${cx - 15},${ky - 4} L${cx + 15},${ky - 4} L${cx + 10},${ky + 34} L${cx - 10},${ky + 34} Z" fill="url(#${id}-grain)"/>`;
  } else {
    // cornice head
    s += woodRect(id, L - 40, 112 - 26 - 22, R - L + 80, 16);
    s += `<rect x="${L - 34}" y="${112 - 26 - 6}" width="${R - L + 68}" height="6" fill="${w.dark}" opacity=".7"/>`;
  }

  // threshold
  s += `<rect x="${L - 34}" y="${B}" width="${R - L + 68}" height="12" fill="#bdb5a6"/>`;
  s += `<rect x="${L - 34}" y="${B}" width="${R - L + 68}" height="2" fill="#fff" opacity=".4"/>`;
  s += `<rect x="${L - 44}" y="${B + 12}" width="${R - L + 88}" height="8" fill="#a59d8e"/>`;
  s += `</svg>`;
  return s;
}

/* ---------- Window ---------- */
function windowSVG(opts) {
  const o = Object.assign({ wood: "sinker-cypress", top: "arch" }, opts);
  const w = WOODS[o.wood];
  const id = "w" + ++uid;
  const L = 80, R = 320, B = 540, S = 230, cx = 200;
  const TB = o.top === "arch" ? S : 230;

  function outline(i) {
    const l = L + i, r = R - i;
    if (o.top === "arch") {
      const rad = (r - l) / 2;
      return `M${l},${B} L${l},${S} A${rad},${rad} 0 0 1 ${r},${S} L${r},${B} Z`;
    }
    const T = 120 + i;
    return `M${l},${B} L${l},${T} L${r},${T} L${r},${B} Z`;
  }

  let s = `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${w.name} window">`;
  s += defs(id, w);
  const topPath = o.top === "arch"
    ? `M${L + 12},${TB} L${L + 12},${S} A${(R - L - 24) / 2},${(R - L - 24) / 2} 0 0 1 ${R - 12},${S} L${R - 12},${TB} Z`
    : `M${L + 12},${TB} L${L + 12},${132} L${R - 12},${132} L${R - 12},${TB} Z`;
  s += `<clipPath id="${id}-top"><path d="${topPath}"/></clipPath>`;

  // shutters (louvered) for the square style
  if (o.top === "square") {
    [[2, 52], [346, 52]].forEach(([sx, sw]) => {
      s += woodRect(id, sx, 120, sw, B - 120);
      s += `<rect x="${sx}" y="120" width="${sw}" height="${B - 120}" fill="none" stroke="${w.dark}" stroke-width="2"/>`;
      for (let y = 136; y < B - 14; y += 13) {
        s += `<rect x="${sx + 9}" y="${y}" width="${sw - 18}" height="7" fill="${w.dark}" opacity=".45"/>`;
      }
      s += `<rect x="${sx + 6}" y="${(120 + B) / 2 - 4}" width="${sw - 12}" height="8" fill="${w.base}"/>`;
    });
  }

  // casing
  s += `<path d="${outline(-22)}" fill="url(#${id}-casing)"/>`;
  s += `<path d="${outline(-22)}" fill="url(#${id}-grain)" opacity=".7"/>`;
  s += `<path d="${outline(-12)}" fill="none" stroke="${w.dark}" stroke-opacity=".6" stroke-width="2"/>`;
  s += `<path d="${outline(0)}" fill="url(#${id}-wood)"/>`;
  s += `<path d="${outline(0)}" fill="url(#${id}-grain)"/>`;

  // top glass
  s += `<path d="${topPath}" fill="url(#${id}-glass)"/>`;
  s += `<g clip-path="url(#${id}-top)">`;
  if (o.top === "arch") {
    [36, 72, 108, 144].forEach((a) => {
      const rad = (a * Math.PI) / 180;
      s += `<line x1="${cx}" y1="${S}" x2="${cx - Math.cos(rad) * 130}" y2="${S - Math.sin(rad) * 130}" stroke="${w.base}" stroke-width="5"/>`;
    });
    s += `<path d="M${cx - 26},${S} A26,26 0 0 1 ${cx + 26},${S} Z" fill="url(#${id}-wood)" stroke="${w.dark}"/>`;
  } else {
    [1, 2, 3].forEach((k) => {
      const mx = L + 12 + ((R - L - 24) * k) / 4;
      s += `<rect x="${mx - 2.5}" y="0" width="5" height="${TB}" fill="${w.base}"/>`;
    });
  }
  s += `</g>`;
  s += `<path d="${topPath}" fill="none" stroke="${w.dark}" stroke-width="2"/>`;
  s += woodRect(id, L, TB, R - L, 10);

  // two casement sashes
  const sy = TB + 10, sh = B - sy - 10;
  const sw = (R - L - 24 - 6) / 2;
  [L + 12, L + 12 + sw + 6].forEach((sx) => {
    s += `<rect x="${sx - 1}" y="${sy - 1}" width="${sw + 2}" height="${sh + 2}" fill="${w.dark}"/>`;
    s += woodRect(id, sx, sy, sw, sh);
    s += glassRect(id, w, sx + 12, sy + 12, sw - 24, sh - 24, "divided", 2, 4);
  });

  // sill & apron
  s += woodRect(id, L - 36, B, R - L + 72, 14);
  s += `<rect x="${L - 36}" y="${B}" width="${R - L + 72}" height="3" fill="${w.light}" opacity=".5"/>`;
  s += `<rect x="${L - 36}" y="${B + 14}" width="${R - L + 72}" height="3" fill="${w.dark}"/>`;
  s += woodRect(id, L - 10, B + 17, R - L + 20, 24);
  s += `</svg>`;
  return s;
}

/* ---------- Wood swatch ---------- */
function swatchSVG(key) {
  const w = WOODS[key];
  const id = "s" + ++uid;
  let lines = "";
  for (let i = 0; i < 16; i++) {
    const y = 8 + i * 13 + (i % 3) * 2;
    const a = 6 + (i % 4) * 3;
    lines += `<path d="M-10,${y} C40,${y - a} 80,${y + a} 130,${y - a / 2} S200,${y + a} 240,${y}" stroke="${i % 3 ? w.dark : w.light}" stroke-width="${i % 2 ? 1 : 2.2}" fill="none" opacity="${i % 3 ? 0.45 : 0.35}"/>`;
  }
  return `<svg viewBox="0 0 130 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${w.light}"/><stop offset=".5" stop-color="${w.base}"/><stop offset="1" stop-color="${w.dark}"/>
    </linearGradient></defs>
    <rect width="130" height="200" fill="url(#${id})"/>
    <g transform="rotate(-90 65 100) translate(-35 35)">${lines}</g>
    <ellipse cx="88" cy="70" rx="7" ry="16" fill="${w.dark}" opacity=".35"/>
  </svg>`;
}

/* =========================================================
   Specialty windows: round, oval, octagon, quatrefoil,
   gothic, eyebrow, demilune. Each shape is defined as an
   outline at a given inset so the casing, frame and glass
   all follow the same curve.
   ========================================================= */
const SHAPES = {
  circle:     { name: "Oculus",          note: "The classic round window" },
  oval:       { name: "Œil-de-Bœuf",     note: "French Creole oval" },
  octagon:    { name: "Octagon",         note: "Crisp, geometric accent" },
  quatrefoil: { name: "Quatrefoil",      note: "Four-lobed Gothic Revival" },
  gothic:     { name: "Gothic Lancet",   note: "Pointed-arch elegance" },
  eyebrow:    { name: "Eyebrow",         note: "A gentle, sweeping curve" },
  demilune:   { name: "Demilune",        note: "Half-round sunburst" },
};
const PATTERNS = {
  wheel: "Wagon Wheel",
  rose: "Rose",
  cross: "Bullseye Cross",
  sunburst: "Sunburst",
  grid: "Divided Grid",
  leaded: "Leaded Diamond",
};
const GLASS = {
  clear: { name: "Clear Glass", sw: "#5f7a84" },
  amber: { name: "Cathedral Amber", sw: "#c98b3a" },
  green: { name: "Antique Bayou Green", sw: "#7f9a7c" },
};

// Flat-bottomed shapes sit on a sill; the rest are "floating" with four keystones.
const FLAT = { gothic: 385, eyebrow: 290, demilune: 300 };
const VIEWBOX = {
  circle: "0 0 400 400", octagon: "0 0 400 400", quatrefoil: "0 0 400 400",
  oval: "0 50 400 300", gothic: "0 0 400 420", eyebrow: "0 50 400 290", demilune: "0 70 400 270",
};

function shapeGeom(shape, i) {
  const cx = 200;
  if (shape === "circle") {
    const r = 150 - i, cy = 200;
    return { d: `M${cx - r},${cy} A${r},${r} 0 1 1 ${cx + r},${cy} A${r},${r} 0 1 1 ${cx - r},${cy} Z`, cx, cy, R: r, ext: [r, r], full: true };
  }
  if (shape === "oval") {
    const rx = 165 - i, ry = 112 - i, cy = 200;
    return { d: `M${cx - rx},${cy} A${rx},${ry} 0 1 1 ${cx + rx},${cy} A${rx},${ry} 0 1 1 ${cx - rx},${cy} Z`, cx, cy, R: rx, ext: [rx, ry], full: true };
  }
  if (shape === "octagon") {
    const a = 146 - i, rv = a / Math.cos(Math.PI / 8), cy = 200;
    const pts = [];
    for (let k = 0; k < 8; k++) {
      const t = Math.PI / 8 + (k * Math.PI) / 4;
      pts.push(`${(cx + rv * Math.cos(t)).toFixed(2)},${(cy + rv * Math.sin(t)).toFixed(2)}`);
    }
    return { d: `M${pts.join(" L")} Z`, cx, cy, R: rv, ext: [a, a], full: true };
  }
  if (shape === "quatrefoil") {
    const dd = 68, r = 86 - i, cy = 200;
    const h = Math.sqrt(r * r - (dd * dd) / 2);
    const pr = dd / Math.SQRT2 + h;
    const P = (deg) => {
      const t = (deg * Math.PI) / 180;
      return `${(cx + pr * Math.cos(t)).toFixed(2)},${(cy + pr * Math.sin(t)).toFixed(2)}`;
    };
    let d = `M${P(-45)}`;
    [45, 135, 225, 315].forEach((deg) => (d += ` A${r},${r} 0 0 1 ${P(deg)}`));
    return { d: d + " Z", cx, cy, R: dd + r, ext: [dd + r, dd + r], full: true };
  }
  if (shape === "gothic") {
    const S = 235, B = FLAT.gothic, l = 90 + i, r = 310 - i, rad = 220 - i;
    const top = S - Math.sqrt(rad * rad - 110 * 110);
    return { d: `M${l},${B} L${l},${S} A${rad},${rad} 0 0 1 ${cx},${top} A${rad},${rad} 0 0 1 ${r},${S} L${r},${B} Z`, cx, cy: S, R: 200, top, l, r };
  }
  if (shape === "eyebrow") {
    const B = FLAT.eyebrow, l = 30 + i, r = 370 - i, sy = 190 + i * 0.5, cy = 30 + i * 1.7;
    return { d: `M${l},${B} L${l},${sy} Q${cx},${cy} ${r},${sy} L${r},${B} Z`, cx, cy: B, R: 260, top: (sy + cy) / 2, l, r };
  }
  // demilune
  const B = FLAT.demilune, R = 172 - i;
  return { d: `M${cx - R},${B} A${R},${R} 0 0 1 ${cx + R},${B} Z`, cx, cy: B, R, top: B - R, l: cx - R, r: cx + R, half: true };
}

function keystone(id, w, cx, cy, ext, angle) {
  return `<g transform="translate(${cx} ${cy}) rotate(${angle}) translate(0 ${-ext - 6})">
    <path d="M-15,-4 L15,-4 L10,36 L-10,36 Z" fill="${w.light}" stroke="${w.dark}" stroke-width="1.5"/>
    <path d="M-15,-4 L15,-4 L10,36 L-10,36 Z" fill="url(#${id}-grain)"/>
  </g>`;
}

function muntins(w, g, pattern, shape) {
  const { cx, cy } = g;
  const bar = (x1, y1, x2, y2, sw = 6) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${w.base}" stroke-width="${sw}" stroke-linecap="round"/>` +
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${w.light}" stroke-width="${sw / 3}" opacity=".5"/>`;
  const ring = (rr, sw = 6) =>
    `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${w.base}" stroke-width="${sw}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${w.light}" stroke-width="${sw / 3}" opacity=".5"/>`;
  const hub = (rr) =>
    `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="url(#${g.id}-wood)" stroke="${w.dark}" stroke-width="1.5"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${rr * 0.45}" fill="none" stroke="${w.dark}" stroke-opacity=".5"/>`;
  const half = !g.full; // radiate upward only from a bottom center
  const R = g.R + 40;
  const rays = (n, sw) => {
    let s = "";
    const start = half ? 0 : 0, span = half ? 180 : 360, count = half ? n + 1 : n;
    for (let k = 0; k < count; k++) {
      if (half && (k === 0 || k === n)) continue;
      const t = ((start + (span * k) / n) * Math.PI) / 180;
      s += bar(cx, cy, cx + Math.cos(t) * R, cy - Math.sin(t) * R, sw);
    }
    return s;
  };
  const base = half ? Math.min(g.R, 175) : Math.min(...(g.ext || [g.R]));
  // Gothic lancets get a transom at the springline and a center mullion below it
  if (shape === "gothic" && pattern !== "grid" && pattern !== "leaded") {
    return muntins(w, g, pattern, "gothic-head") + bar(0, cy, 400, cy, 7) + bar(cx, cy, cx, 420, 7);
  }
  switch (pattern) {
    case "wheel":
      return rays(half ? 6 : 8, 6) + ring(base * 0.55) + hub(base * 0.17);
    case "rose": {
      let s = rays(half ? 8 : 12, 4) + ring(base * 0.36, 5) + ring(base * 0.7, 5);
      const n = half ? 8 : 12;
      for (let k = 0; k < n; k++) {
        const t = ((half ? (180 * (k + 0.5)) / n : (360 * (k + 0.5)) / n) * Math.PI) / 180;
        const px = cx + Math.cos(t) * base * 0.53, py = cy - Math.sin(t) * base * 0.53;
        s += `<circle cx="${px}" cy="${py}" r="${base * 0.09}" fill="none" stroke="${w.base}" stroke-width="4"/>`;
      }
      return s + hub(base * 0.14);
    }
    case "cross":
      return (half ? bar(cx, cy, cx, 0) : bar(cx, 0, cx, 400) + bar(0, cy, 400, cy)) +
        (shape === "gothic-head"
          ? `<path d="M${cx - base * 0.5},${cy} A${base * 0.5},${base * 0.5} 0 0 1 ${cx + base * 0.5},${cy}" fill="none" stroke="${w.base}" stroke-width="6"/>`
          : ring(base * 0.5));
    case "sunburst":
      return rays(half ? 12 : 24, 3) + hub(base * (half ? 0.2 : 0.12));
    case "grid": {
      let s = "";
      for (let x = cx - 280; x <= cx + 280; x += 56) s += bar(x, 0, x, 420, 5);
      for (let y = cy - 280; y <= cy + 280; y += 56) s += bar(0, y, 400, y, 5);
      return s;
    }
    case "leaded":
      return `<rect x="0" y="0" width="400" height="420" fill="url(#${g.id}-lead)"/>`;
  }
  return "";
}

function specialSVG(opts) {
  const o = Object.assign({ shape: "circle", pattern: "wheel", glass: "clear", wood: "sinker-cypress" }, opts);
  const w = WOODS[o.wood];
  const id = "x" + ++uid;
  const casing = shapeGeom(o.shape, -26);
  const glassG = Object.assign(shapeGeom(o.shape, 14), { id });
  const flatB = FLAT[o.shape];

  const glassFill = {
    clear: `<linearGradient id="${id}-gl" x1="0" x2=".5" y1="0" y2="1"><stop offset="0" stop-color="#26343b"/><stop offset=".55" stop-color="#4c636c"/><stop offset="1" stop-color="#839aa0"/></linearGradient>`,
    amber: `<radialGradient id="${id}-gl" cx=".5" cy=".45" r=".65"><stop offset="0" stop-color="#ffd98a"/><stop offset=".45" stop-color="#d9973f"/><stop offset="1" stop-color="#7a4318"/></radialGradient>`,
    green: `<radialGradient id="${id}-gl" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#c9d9b8"/><stop offset=".5" stop-color="#7f9a7c"/><stop offset="1" stop-color="#3d5444"/></radialGradient>`,
  }[o.glass];

  let s = `<svg viewBox="${VIEWBOX[o.shape]}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${SHAPES[o.shape].name} window in ${w.name}">`;
  s += defs(id, w).replace("</defs>", `${glassFill}</defs>`);
  s += `<clipPath id="${id}-clip"><path d="${glassG.d}"/></clipPath>`;

  // casing, molding and frame
  s += `<path d="${casing.d}" fill="url(#${id}-casing)"/>`;
  s += `<path d="${casing.d}" fill="url(#${id}-grain)" opacity=".7"/>`;
  s += `<path d="${shapeGeom(o.shape, -17).d}" fill="none" stroke="${w.light}" stroke-opacity=".4" stroke-width="1.5"/>`;
  s += `<path d="${shapeGeom(o.shape, -8).d}" fill="none" stroke="${w.dark}" stroke-opacity=".6" stroke-width="2"/>`;
  s += `<path d="${shapeGeom(o.shape, 0).d}" fill="${w.dark}"/>`;
  s += `<path d="${shapeGeom(o.shape, 2).d}" fill="url(#${id}-wood)"/>`;
  s += `<path d="${shapeGeom(o.shape, 2).d}" fill="url(#${id}-grain)"/>`;
  s += `<path d="${shapeGeom(o.shape, 12).d}" fill="none" stroke="${w.dark}" stroke-opacity=".45" stroke-width="3"/>`;

  // glass + muntins
  s += `<path d="${glassG.d}" fill="url(#${id}-gl)"/>`;
  s += `<g clip-path="url(#${id}-clip)">`;
  s += `<polygon points="60,420 250,0 320,0 130,420" fill="#fff" opacity="${o.glass === "clear" ? 0.08 : 0.12}"/>`;
  s += muntins(w, glassG, o.pattern, o.shape);
  s += `</g>`;
  s += `<path d="${glassG.d}" fill="none" stroke="${w.dark}" stroke-width="2.5"/>`;

  // keystones
  if (glassG.full) {
    const [ex, ey] = casing.ext;
    s += keystone(id, w, casing.cx, casing.cy, ey, 0);
    s += keystone(id, w, casing.cx, casing.cy, ey, 180);
    s += keystone(id, w, casing.cx, casing.cy, ex, 90);
    s += keystone(id, w, casing.cx, casing.cy, ex, 270);
  } else {
    s += keystone(id, w, 200, 0, -casing.top, 0);
  }

  // bottom rail + sill for flat-bottomed shapes
  if (flatB) {
    s += woodRect(id, glassG.l - 12, flatB - 14, glassG.r - glassG.l + 24, 14);
    s += `<rect x="${glassG.l - 12}" y="${flatB - 14}" width="${glassG.r - glassG.l + 24}" height="2" fill="${w.dark}" opacity=".5"/>`;
    const sl = casing.l - 14, sw = casing.r - casing.l + 28;
    s += woodRect(id, sl, flatB, sw, 14);
    s += `<rect x="${sl}" y="${flatB}" width="${sw}" height="3" fill="${w.light}" opacity=".5"/>`;
    s += `<rect x="${sl}" y="${flatB + 14}" width="${sw}" height="3" fill="${w.dark}"/>`;
    s += woodRect(id, casing.l + 10, flatB + 17, casing.r - casing.l - 20, 18);
  }
  s += `</svg>`;
  return s;
}

/* ---------- Render static art from data attributes ---------- */
document.querySelectorAll("[data-door]").forEach((el) => {
  el.innerHTML = doorSVG(JSON.parse(el.dataset.door));
});
document.querySelectorAll("[data-window]").forEach((el) => {
  el.innerHTML = windowSVG(JSON.parse(el.dataset.window));
});
document.querySelectorAll("[data-special]").forEach((el) => {
  el.innerHTML = specialSVG(JSON.parse(el.dataset.special));
});
document.querySelectorAll("[data-swatch]").forEach((el) => {
  el.innerHTML = swatchSVG(el.dataset.swatch);
});

/* ---------- Statement window designer ---------- */
const wstate = { shape: "circle", pattern: "wheel", glass: "clear", wood: "sinker-cypress" };
const wOptions = {
  shape: Object.fromEntries(Object.entries(SHAPES).map(([k, v]) => [k, v.name])),
  pattern: PATTERNS,
  glass: Object.fromEntries(Object.entries(GLASS).map(([k, v]) => [k, v.name])),
  wood: Object.fromEntries(Object.entries(WOODS).map(([k, v]) => [k, v.name])),
};
document.querySelectorAll(".chips[data-woption]").forEach((group) => {
  const key = group.dataset.woption;
  group.innerHTML = Object.entries(wOptions[key])
    .map(([k, label]) => {
      const sw = key === "wood" ? WOODS[k].base : key === "glass" ? GLASS[k].sw : null;
      return `<button data-value="${k}">${sw ? `<i style="--sw:${sw}"></i>` : ""}${label}</button>`;
    })
    .join("");
  group.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    wstate[key] = b.dataset.value;
    renderWindow();
  });
});

function renderWindow() {
  const stage = document.getElementById("config-window");
  if (!stage) return;
  stage.innerHTML = specialSVG(wstate);
  document.querySelectorAll(".chips[data-woption]").forEach((group) => {
    group.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.value === wstate[group.dataset.woption];
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
    });
  });
  document.getElementById("window-summary").textContent =
    `${SHAPES[wstate.shape].name} · ${PATTERNS[wstate.pattern]} · ${GLASS[wstate.glass].name} · ${WOODS[wstate.wood].name}`;
}
renderWindow();

const windowCta = document.getElementById("window-cta");
if (windowCta) {
  windowCta.addEventListener("click", () => {
    document.querySelector('select[name="project"]').value = "Specialty / round windows";
    document.getElementById("form-wood").value = WOODS[wstate.wood].name;
    document.getElementById("form-message").value =
      `I'd like a quote on a statement window: ${SHAPES[wstate.shape].name} shape, ${PATTERNS[wstate.pattern]} pattern, ` +
      `${GLASS[wstate.glass].name}, in ${WOODS[wstate.wood].name}.`;
  });
}

/* ---------- Configurator ---------- */
const state = { wood: "sinker-cypress", top: "arch", layout: "double", glass: "divided", hardware: "brass", lite: "upper" };

const woodChips = document.querySelector('.chips[data-option="wood"]');
if (woodChips) woodChips.innerHTML = Object.entries(WOODS)
  .map(([k, w]) => `<button data-value="${k}"><i style="--sw:${w.base}"></i>${w.name}</button>`)
  .join("");

const woodGrid = document.getElementById("wood-grid");
if (woodGrid) woodGrid.innerHTML = Object.entries(WOODS)
  .map(
    ([k, w]) => `
    <button class="wood-card" data-wood="${k}" aria-label="Preview ${w.name}">
      <div class="wood-swatch">${swatchSVG(k)}</div>
      <div class="wood-info">
        <p class="wood-origin">${w.origin}</p>
        <h3>${w.name}</h3>
        <p>${w.desc}</p>
        ${w.tag ? `<span class="wood-tag">${w.tag}</span>` : ""}
      </div>
    </button>`
  )
  .join("");

const formWood = document.getElementById("form-wood");
if (formWood) formWood.innerHTML =
  Object.values(WOODS).map((w) => `<option>${w.name}</option>`).join("") +
  `<option>Not sure yet</option>`;

function render() {
  if (!document.getElementById("config-door")) return;
  document.getElementById("config-door").innerHTML = doorSVG(state);
  document.querySelectorAll(".chips[data-option]").forEach((group) => {
    const key = group.dataset.option;
    group.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.value === state[key];
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
    });
  });
  document.querySelectorAll(".wood-card").forEach((c) =>
    c.classList.toggle("is-active", c.dataset.wood === state.wood)
  );
  document.getElementById("design-summary").textContent =
    `${WOODS[state.wood].name} · ${LABELS.top[state.top]} · ${LABELS.glass[state.glass]} · ${HARDWARE[state.hardware].name}`;
}

document.querySelectorAll(".chips[data-option]").forEach((group) => {
  group.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state[group.dataset.option] = b.dataset.value;
    render();
  });
});

woodGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".wood-card");
  if (!card) return;
  state.wood = card.dataset.wood;
  render();
  document.getElementById("design").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("[data-pick-wood]").forEach((a) =>
  a.addEventListener("click", () => {
    state.wood = a.dataset.pickWood;
    render();
  })
);

// Carry the chosen design into the consultation form
document.getElementById("design-cta")?.addEventListener("click", () => {
  formWood.value = WOODS[state.wood].name;
  document.getElementById("form-message").value =
    `I'd like a quote on this design: ${WOODS[state.wood].name}, ${LABELS.top[state.top]}, ` +
    `${LABELS.layout[state.layout]}, ${LABELS.glass[state.glass]}, ${HARDWARE[state.hardware].name} hardware.`;
});

render();

/* ---------- Mobile nav ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Form (mockup only) ---------- */
document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("form-note").hidden = false;
});

/* ---------- Concept badge ---------- */
document.querySelector("#concept-badge button")?.addEventListener("click", () => {
  document.getElementById("concept-badge").remove();
});

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  ".section-head, .collection-card, .special-card, .area-card, .style-card, .wood-card, .process-grid li, .feature-copy, .feature-art, .statement-text, .value"
);
if ("IntersectionObserver" in window) {
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
}
