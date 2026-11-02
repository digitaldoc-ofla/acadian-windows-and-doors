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

/* ---------- Render static art from data attributes ---------- */
document.querySelectorAll("[data-door]").forEach((el) => {
  el.innerHTML = doorSVG(JSON.parse(el.dataset.door));
});
document.querySelectorAll("[data-window]").forEach((el) => {
  el.innerHTML = windowSVG(JSON.parse(el.dataset.window));
});

/* ---------- Configurator ---------- */
const state = { wood: "sinker-cypress", top: "arch", layout: "double", glass: "divided", hardware: "brass", lite: "upper" };

const woodChips = document.querySelector('.chips[data-option="wood"]');
woodChips.innerHTML = Object.entries(WOODS)
  .map(([k, w]) => `<button data-value="${k}"><i style="--sw:${w.base}"></i>${w.name}</button>`)
  .join("");

const woodGrid = document.getElementById("wood-grid");
woodGrid.innerHTML = Object.entries(WOODS)
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
formWood.innerHTML =
  Object.values(WOODS).map((w) => `<option>${w.name}</option>`).join("") +
  `<option>Not sure yet</option>`;

function render() {
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

woodGrid.addEventListener("click", (e) => {
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
document.getElementById("design-cta").addEventListener("click", () => {
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
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("form-note").hidden = false;
});

/* ---------- Concept badge ---------- */
document.querySelector("#concept-badge button").addEventListener("click", () => {
  document.getElementById("concept-badge").remove();
});

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  ".section-head, .collection-card, .wood-card, .process-grid li, .feature-copy, .feature-art, .statement-text, .value"
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
