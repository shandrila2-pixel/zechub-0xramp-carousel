import fs from 'node:fs'
import path from 'node:path'

const OUT = 'C:/Users/shand/bounty-hunter/zechub-carousel'
const dirs = ['source', 'svg', 'png', 'render']
for (const d of dirs) fs.mkdirSync(path.join(OUT, d), { recursive: true })

const W = 1080, H = 1350
const C = {
  bg: '#0A0A0E', card: '#13131A', line: 'rgba(255,255,255,0.10)',
  gold: '#E9B949', gold2: '#F7D989', white: '#FFFFFF', mute: '#9CA3AF', dim: '#6B7280',
}
const F = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif"
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- icons (24x24 box, stroked gold) ----------
function icon(type, x, y, size) {
  const s = size / 24
  const g = (inner) => `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="${C.gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`
  switch (type) {
    case 'pay': // QR
      return g(`
        <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14.5" y="14.5" width="2.6" height="2.6" rx="0.5" fill="${C.gold}" stroke="none"/>
        <rect x="18.6" y="14.5" width="2.4" height="2.4" rx="0.5" fill="${C.gold}" stroke="none"/>
        <rect x="14.5" y="18.6" width="2.4" height="2.4" rx="0.5" fill="${C.gold}" stroke="none"/>
        <rect x="18.6" y="18.6" width="2.4" height="2.4" rx="0.5" fill="${C.gold}" stroke="none"/>`)
    case 'buysell': // downward arrow into tray + upward
      return g(`<path d="M12 3v11"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M4 20h16"/>`)
    case 'swap': // two cyclic arrows
      return g(`<path d="M4 9h13"/><path d="M13.5 5.5 17 9l-3.5 3.5"/><path d="M20 15H7"/><path d="M10.5 11.5 7 15l3.5 3.5"/>`)
    case 'activity': // pulse
      return g(`<path d="M3 12h4l2.5-6 4 12 2.5-6h5"/>`)
    case 'more': // grid dots
      return g(`<circle cx="6" cy="7" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="12" cy="7" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="18" cy="7" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="6" cy="12" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="18" cy="12" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="6" cy="17" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="12" cy="17" r="1.7" fill="${C.gold}" stroke="none"/><circle cx="18" cy="17" r="1.7" fill="${C.gold}" stroke="none"/>`)
    case 'coin': // hex coin
      return g(`<circle cx="12" cy="12" r="8.5"/><path d="M9 9.5h6M9 14.5h6M12 8.5v7"/>`)
    default: return ''
  }
}

function wordmark(x, y, size = 40, anchor = 'start') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${F}" font-size="${size}" font-weight="800" letter-spacing="-0.5">
    <tspan fill="${C.gold}">0x</tspan><tspan fill="${C.white}">ramp</tspan></text>`
}

function dots(active) {
  const y = 1246
  let x = 96
  let out = ''
  for (let i = 1; i <= 6; i++) {
    if (i === active) { out += `<rect x="${x}" y="${y}" width="46" height="10" rx="5" fill="${C.gold}"/>`; x += 46 + 12 }
    else { out += `<circle cx="${x + 5}" cy="${y + 5}" r="5" fill="rgba(255,255,255,0.18)"/>`; x += 10 + 12 }
  }
  return out
}

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="8%" r="60%">
      <stop offset="0%" stop-color="${C.gold}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.gold2}"/><stop offset="100%" stop-color="${C.gold}"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1A22"/><stop offset="100%" stop-color="#101016"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${inner}
</svg>`
}

// ---------- slides ----------
const slides = []

// 1. Cover
slides.push({
  name: 'cover',
  svg: frame(`
    <circle cx="540" cy="392" r="86" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.55"/>
    <circle cx="540" cy="392" r="70" fill="url(#cardGrad)" stroke="rgba(233,185,73,0.35)" stroke-width="1.5"/>
    ${icon('coin', 540 - 44, 392 - 44, 88)}
    <text x="540" y="578" text-anchor="middle" font-family="${F}" font-size="26" font-weight="700" letter-spacing="7" fill="${C.gold}">GUÍA RÁPIDA</text>
    <text x="540" y="700" text-anchor="middle" font-family="${F}" font-size="74" font-weight="800" fill="${C.white}" letter-spacing="-1.5">Conoce las funciones</text>
    <text x="540" y="786" text-anchor="middle" font-family="${F}" font-size="74" font-weight="800" fill="${C.white}" letter-spacing="-1.5">principales de <tspan fill="url(#goldGrad)">0xramp</tspan></text>
    <text x="540" y="892" text-anchor="middle" font-family="${F}" font-size="32" fill="${C.mute}">Compra, vende, paga e intercambia cripto</text>
    <text x="540" y="940" text-anchor="middle" font-family="${F}" font-size="32" fill="${C.mute}">con tu moneda local. Sin custodia.</text>
    <line x1="96" y1="1150" x2="984" y2="1150" stroke="${C.line}" stroke-width="1"/>
    ${wordmark(96, 1220, 40)}
    <text x="984" y="1218" text-anchor="end" font-family="${F}" font-size="26" fill="${C.dim}">Desliza para explorar →</text>
  `),
})

const items = [
  {
    n: 2, icon: 'pay', eyebrow: '02 — PAY', title: ['Paga con ZEC', 'en segundos'],
    bullets: [['Escanea un QR y paga al instante.'], ['Usa ZEC, NEAR o el USDC de tu', 'cuenta de P2P.me.'], ['Pagos locales, sin intermediarios.']],
  },
  {
    n: 3, icon: 'buysell', eyebrow: '03 — COMPRAR / VENDER', title: ['Compra y vende con', 'tu moneda local'],
    bullets: [['Entra y sal de cripto con métodos', 'de pago locales (PIX, SPEI y más).'], ['Recibe el dinero directo en tu', 'banco o billetera.'], ['Sin custodia: tus llaves, tus fondos.']],
  },
  {
    n: 4, icon: 'swap', eyebrow: '04 — SWAP', title: ['Intercambia', 'entre activos'],
    bullets: [['Cambia ZEC, NEAR y USDC desde', 'una sola pantalla.'], ['Cotización clara antes de confirmar.'], ['Tú controlas cada movimiento.']],
  },
  {
    n: 5, icon: 'activity', eyebrow: '05 — ACTIVIDAD', title: ['Todo tu historial,', 'en un lugar'],
    bullets: [['Revisa cada compra, venta, pago', 'e intercambio.'], ['Estados en tiempo real: pendiente,', 'enviado, completado.'], ['Transparencia total de tus operaciones.']],
  },
  {
    n: 6, icon: 'more', eyebrow: '06 — MÁS', title: ['Mucho más que', 'comprar y vender'],
    bullets: [['Tarjetas de regalo, recargas y eSIM.'], ['Paga con ZEC o NEAR.'], ['Soporte y ajustes de cuenta.']],
  },
]

for (const it of items) {
  const titleSvg = it.title.map((ln, i) =>
    `<text x="96" y="${660 + i * 86}" font-family="${F}" font-size="74" font-weight="800" fill="${C.white}" letter-spacing="-1.5">${esc(ln)}</text>`).join('')
  let by = 900
  let bSvg = ''
  for (const lines of it.bullets) {
    bSvg += `<circle cx="104" cy="${by - 11}" r="6" fill="${C.gold}"/>`
    lines.forEach((ln, i) =>
      bSvg += `<text x="132" y="${by + i * 44}" font-family="${F}" font-size="32" fill="#D4D4D8">${esc(ln)}</text>`)
    by += 44 * (lines.length - 1) + 76
  }
  slides.push({
    name: `slide-${it.n}`,
    svg: frame(`
      ${wordmark(96, 108, 38)}
      <text x="984" y="106" text-anchor="end" font-family="${F}" font-size="22" font-weight="600" letter-spacing="4" fill="${C.dim}">0XRAMP · FUNCIONES</text>
      <rect x="96" y="300" width="136" height="136" rx="36" fill="url(#cardGrad)" stroke="rgba(233,185,73,0.30)" stroke-width="1.5"/>
      ${icon(it.icon, 96 + 36, 300 + 36, 64)}
      <text x="96" y="540" font-family="${F}" font-size="24" font-weight="700" letter-spacing="5" fill="${C.gold}">${esc(it.eyebrow)}</text>
      ${titleSvg}
      ${bSvg}
      <line x1="96" y1="1180" x2="984" y2="1180" stroke="${C.line}" stroke-width="1"/>
      ${dots(it.n)}
      <text x="984" y="1256" text-anchor="end" font-family="${F}" font-size="26" font-weight="700" fill="${C.dim}">0xramp.app</text>
    `),
  })
}

// 6. CTA
slides[5] = {
  name: 'slide-6',
  svg: frame(`
    ${wordmark(96, 108, 38)}
    <text x="984" y="106" text-anchor="end" font-family="${F}" font-size="22" font-weight="600" letter-spacing="4" fill="${C.dim}">0XRAMP · FUNCIONES</text>
    <rect x="96" y="300" width="136" height="136" rx="36" fill="url(#cardGrad)" stroke="rgba(233,185,73,0.30)" stroke-width="1.5"/>
    ${icon('more', 96 + 36, 300 + 36, 64)}
    <text x="96" y="540" font-family="${F}" font-size="24" font-weight="700" letter-spacing="5" fill="${C.gold}">06 — MÁS</text>
    <text x="96" y="660" font-family="${F}" font-size="74" font-weight="800" fill="${C.white}" letter-spacing="-1.5">Mucho más que</text>
    <text x="96" y="746" font-family="${F}" font-size="74" font-weight="800" fill="${C.white}" letter-spacing="-1.5">comprar y vender</text>
    <circle cx="104" cy="${849}" r="6" fill="${C.gold}"/><text x="132" y="860" font-family="${F}" font-size="32" fill="#D4D4D8">Tarjetas de regalo, recargas y eSIM.</text>
    <circle cx="104" cy="${925}" r="6" fill="${C.gold}"/><text x="132" y="936" font-family="${F}" font-size="32" fill="#D4D4D8">Paga con ZEC o NEAR.</text>
    <circle cx="104" cy="${1001}" r="6" fill="${C.gold}"/><text x="132" y="1012" font-family="${F}" font-size="32" fill="#D4D4D8">Soporte y ajustes de cuenta.</text>
    <rect x="96" y="1084" width="888" height="112" rx="28" fill="url(#goldGrad)"/>
    <text x="540" y="1156" text-anchor="middle" font-family="${F}" font-size="40" font-weight="800" fill="#0A0A0E">Empieza en 0xramp.app</text>
    <line x1="96" y1="1180" x2="984" y2="1180" stroke="none"/>
    ${dots(6)}
  `),
}

// ---------- write ----------
for (const s of slides) {
  fs.writeFileSync(path.join(OUT, 'svg', `${s.name}.svg`), s.svg)
  fs.writeFileSync(path.join(OUT, 'render', `${s.name}.html`),
    `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#0A0A0E;overflow:hidden}svg{display:block}</style></head><body>${s.svg}</body></html>`)
}
fs.copyFileSync(new URL(import.meta.url).pathname.replace(/^\//, ''), path.join(OUT, 'source', 'carousel.mjs'))
console.log('wrote', slides.length, 'slides to', OUT)
console.log(slides.map((s) => s.name).join(', '))