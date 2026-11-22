#!/usr/bin/env python3
# =============================================================================
# build_logos.py — Generator Trilogi Identitas Gunara
# Dewan Pakar 46 · OMNIBRAND COLOR ARCHITECT · TIER MAX GOD MODE
#
# Membuat 3 sistem logo (mark, lockup, ikon, monokrom) + board presentasi:
#   1. gunara.web.id  — "Kompas Arsitek"
#   2. UMEA(tm)       — "Tangga Kematangan"
#   3. Gunara OS      — "Kernel G-DOS"
#
# Semua teks di-outline menjadi path (fontTools + HarfBuzz) sehingga file SVG
# portabel selamanya: tidak bergantung pada font apapun saat dirender.
# Palet: Midnight Blueprint (sumber: src/app/globals.css) — WCAG 2.1 AAA.
# =============================================================================
import os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "scripts", "fonts")
OUT = os.path.join(ROOT, "public", "brand")
DOCS = os.path.join(ROOT, "docs", "assets", "brand")

# ---- Palet Midnight Blueprint (sumber: src/app/globals.css) -----------------
ABYSS    = "#060D1F"
NAVY900  = "#0A1628"
NAVY800  = "#12233D"
NAVY700  = "#1B3455"
NAVY600  = "#254872"
NAVY400  = "#5C87B8"
NAVY300  = "#A9BCD6"
NAVY100  = "#E2EDF7"
SNOW     = "#F8FAFC"
AMBER300 = "#FCD34D"
AMBER400 = "#FBBF24"
AMBER500 = "#F59E0B"
AMBER600 = "#D97706"
AMBER700 = "#B45309"
AMBER_TINT = "#FFF7E6"
INK      = "#000000"

SORA800 = "sora-800.ttf"
SORA700 = "sora-700.ttf"
SORA600 = "sora-600.ttf"
MONO400 = "jetbrains-mono-400.ttf"
MONO700 = "jetbrains-mono-700.ttf"

_cache = {}

def shape(font_file, text, size, tracking=0.0):
    """Bentuk teks -> (path_d, lebar_total). Baseline lokal di y=0."""
    key = (font_file, text, size, tracking)
    if key in _cache:
        return _cache[key]
    blob = hb.Blob.from_file_path(os.path.join(FONTS, font_file))
    face = hb.Face(blob)
    font = hb.Font(face)
    upm = face.upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    scale = size / upm
    tt = TTFont(os.path.join(FONTS, font_file))
    gs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    x = 0.0
    parts = []
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        gname = order[info.codepoint]
        g = gs[gname]
        pen = SVGPathPen(gs)
        tp = TransformPen(
            pen,
            Transform(scale, 0, 0, -scale, x + pos.x_offset * scale, -pos.y_offset * scale),
        )
        g.draw(tp)
        d = pen.getCommands()
        if d:
            parts.append(d)
        x += pos.x_advance * scale + tracking
    if parts:
        x -= tracking
    res = (" ".join(parts), x)
    _cache[key] = res
    return res

def svg(w, h, body, title):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {w} {h}" role="img" aria-label="{title}">\n'
        f"<title>{title}</title>\n{body}\n</svg>\n"
    )

# =============================================================================
# MARK 1 — gunara.web.id "Kompas Arsitek" (grid 48)
# =============================================================================
def mark_web(mode="brand", tile=True):
    """mode: brand | mono-black | mono-white"""
    b = []
    if mode == "brand":
        c_tile, c_ring, c_tick, c_arc, c_dot = NAVY900, NAVY800, NAVY600, AMBER500, AMBER400
    elif mode == "mono-black":
        c_tile, c_ring, c_tick, c_arc, c_dot = INK, SNOW, SNOW, SNOW, SNOW
    else:
        c_tile, c_ring, c_tick, c_arc, c_dot = "none", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"
    if tile and mode != "mono-white":
        b.append(f'<rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="{c_tile}"/>')
    if tile and mode == "mono-white":
        b.append(f'<rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="none" stroke="{c_tile}" stroke-width="2"/>')
    b.append(f'<circle cx="24" cy="24" r="19.5" fill="none" stroke="{c_ring}" stroke-width="1.5"/>')
    if mode == "brand":
        # tiga patok kompas (N, B, S) — timur sengaja terbuka (arah bukaan G)
        for x1, y1, x2, y2 in [("24", "4.1", "24", "2.9"), ("3.9", "24", "2.9", "24"), ("24", "43.9", "24", "45.1")]:
            b.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c_tick}" stroke-width="1.5" stroke-linecap="round"/>')
    b.append(
        f'<path d="M 33 12.6 A 14 14 0 1 0 37.9 26.6 L 24.6 26.6" fill="none" '
        f'stroke="{c_arc}" stroke-width="4.6" stroke-linecap="round"/>'
    )
    b.append(f'<circle cx="34.5" cy="34.5" r="2.6" fill="{c_dot}"/>')
    return "\n".join(b)

# =============================================================================
# MARK 2 — UMEA "Tangga Kematangan" (grid 48, 6 tingkat 03-21)
# =============================================================================
UMEA_STEPS = [
    (8.8, 34.8, 4.4, 5.0, AMBER600),
    (14.0, 31.8, 4.4, 8.0, AMBER600),
    (19.2, 28.8, 4.4, 11.0, AMBER500),
    (24.4, 24.8, 4.4, 15.0, AMBER500),
    (29.6, 19.8, 4.4, 20.0, AMBER400),
    (34.8, 13.8, 4.4, 26.0, AMBER300),
]

def mark_umea(mode="brand", tile=True):
    b = []
    if mode == "brand":
        c_tile, c_dot = NAVY900, AMBER400
    elif mode == "mono-black":
        c_tile, c_dot = INK, INK
    else:
        c_tile, c_dot = "none", "#FFFFFF"
    if tile and mode != "mono-white":
        b.append(f'<rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="{c_tile}"/>')
    if tile and mode == "mono-white":
        b.append(f'<rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="none" stroke="{c_tile}" stroke-width="2"/>')
    mono = mode != "brand"
    for x, y, w, h, fill in UMEA_STEPS:
        c = INK if mode == "mono-black" else ("#FFFFFF" if mode == "mono-white" else fill)
        b.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1.4" fill="{c}"/>')
    b.append(f'<circle cx="37" cy="9.4" r="2.4" fill="{c_dot}"/>')
    return "\n".join(b)

# =============================================================================
# MARK 3 — Gunara OS "Kernel G-DOS" (grid 48, chip 6 pin)
# =============================================================================
def mark_os(mode="brand", tile=True):
    b = []
    if mode == "brand":
        c_tile, c_pin, c_ring, c_arc, c_dot = NAVY900, NAVY600, NAVY800, AMBER500, AMBER400
    elif mode == "mono-black":
        c_tile, c_pin, c_ring, c_arc, c_dot = INK, INK, SNOW, SNOW, SNOW
    else:
        c_tile, c_pin, c_ring, c_arc, c_dot = "none", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"
    if tile and mode != "mono-white":
        b.append(f'<rect x="6.5" y="6.5" width="35" height="35" rx="8" fill="{c_tile}"/>')
    if tile and mode == "mono-white":
        b.append(f'<rect x="6.5" y="6.5" width="35" height="35" rx="8" fill="none" stroke="{c_tile}" stroke-width="2"/>')
    mono = mode != "brand"
    for cx in (15.0, 24.0, 33.0):
        b.append(f'<rect x="{cx - 1.3}" y="3" width="2.6" height="3.5" rx="1.1" fill="{c_pin}"/>')
        b.append(f'<rect x="{cx - 1.3}" y="41.5" width="2.6" height="3.5" rx="1.1" fill="{c_pin}"/>')
    b.append(f'<circle cx="24" cy="24" r="14.2" fill="none" stroke="{c_ring}" stroke-width="1.4"/>')
    b.append(
        f'<path d="M 30.75 15.45 A 10.5 10.5 0 1 0 34.43 25.95 L 24.45 25.95" fill="none" '
        f'stroke="{c_arc}" stroke-width="3.6" stroke-linecap="round"/>'
    )
    b.append(f'<circle cx="31.9" cy="31.9" r="2" fill="{c_dot}"/>')
    return "\n".join(b)

# =============================================================================
# LOCKUP — teks di samping / bawah mark
# =============================================================================
def text_at(x, y, font, text, size, fill, tracking=0.0, opacity=None):
    d, w = shape(font, text, size, tracking)
    op = f' opacity="{opacity}"' if opacity else ""
    return f'<g transform="translate({round(x, 2)} {round(y, 2)})"{op}><path d="{d}" fill="{fill}"/></g>', w

def tm_mark(x, y, fill):
    """Lambang(tm) deterministik: 'TM' Sora 700 dinaikkan."""
    g, w = text_at(x, y, SORA700, "TM", 9, fill, tracking=0.4)
    return g, w

def lockup_web(on_dark=False, mono=None):
    c_main = SNOW if (on_dark or mono == "mono-white") else (INK if mono == "mono-black" else NAVY900)
    c_dot = "#FFFFFF" if mono else (AMBER400 if on_dark else AMBER700)
    mode = mono or ("brand")
    body = [f'<g transform="translate(0 8)">{mark_web(mode)}</g>']
    x0 = 64
    g, w1 = text_at(x0, 41, SORA800, "gunara", 27, c_main, tracking=-0.3)
    body.append(g)
    g, w2 = text_at(x0 + w1 + 3.5, 41, MONO700, ".web.id", 14.5, c_dot, tracking=0.6)
    body.append(g)
    W = round(x0 + w1 + 3.5 + w2 + 6)
    return svg(W, 64, "\n".join(body), "Logo gunara.web.id - kunci horizontal")

def lockup_web_stacked(on_dark=False):
    c_main = SNOW if on_dark else NAVY900
    c_sub = AMBER400 if on_dark else AMBER700
    c_tag = NAVY300 if on_dark else NAVY400
    W = 240
    body = [f'<g transform="translate({(W - 48) / 2} 6)">{mark_web("brand")}</g>']
    g, w1 = text_at(0, 0, SORA800, "gunara.web.id", 0, c_main)  # ukur lebar dulu
    # "gunara" + ".web.id" satu baris
    size = 19
    d1, w1 = shape(SORA800, "gunara", size, tracking=-0.2)
    d2, w2 = shape(MONO700, ".web.id", 11.5, tracking=0.4)
    total = w1 + 2.5 + w2
    sx = (W - total) / 2
    body.append(f'<g transform="translate({round(sx, 2)} 76)"><path d="{d1}" fill="{c_main}"/></g>')
    body.append(f'<g transform="translate({round(sx + w1 + 2.5, 2)} 76)"><path d="{d2}" fill="{c_sub}"/></g>')
    d3, w3 = shape(MONO400, "ARSITEK SISTEM PERADABAN DIGITAL", 7.2, tracking=2.05)
    body.append(f'<g transform="translate({round((W - w3) / 2, 2)} 94)"><path d="{d3}" fill="{c_tag}"/></g>')
    return svg(W, 112, "\n".join(body), "Logo gunara.web.id - susunan vertikal")

def lockup_umea(on_dark=False, mono=None):
    c_main = SNOW if (on_dark or mono == "mono-white") else (INK if mono == "mono-black" else NAVY900)
    c_sub = "#FFFFFF" if mono else (AMBER400 if on_dark else AMBER700)
    mode = mono or "brand"
    body = [f'<g transform="translate(0 8)">{mark_umea(mode)}</g>']
    x0 = 62
    g, w1 = text_at(x0, 37, SORA800, "UMEA", 30, c_main, tracking=0.8)
    body.append(g)
    g, wtm = tm_mark(x0 + w1 + 3, 22.5, c_sub)
    body.append(g)
    g, w2 = text_at(x0, 53, MONO700, "HUKUM MINIMUM USAHA", 10, c_sub, tracking=2.2)
    body.append(g)
    W = round(x0 + max(w1 + wtm + 3, w2) + 8)
    return svg(W, 64, "\n".join(body), "Logo UMEA™ - kunci horizontal")

def lockup_umea_stacked(on_dark=False):
    c_main = SNOW if on_dark else NAVY900
    c_sub = AMBER400 if on_dark else AMBER700
    c_tag = NAVY300 if on_dark else NAVY400
    W = 250
    body = [f'<g transform="translate({(W - 48) / 2} 6)">{mark_umea("brand")}</g>']
    d1, w1 = shape(SORA800, "UMEA", 23, tracking=1.2)
    d2, w2 = shape(SORA700, "TM", 8, tracking=0.3)
    sx = (W - (w1 + w2 + 2)) / 2
    body.append(f'<g transform="translate({round(sx, 2)} 74)"><path d="{d1}" fill="{c_main}"/></g>')
    body.append(f'<g transform="translate({round(sx + w1 + 2, 2)} 63)"><path d="{d2}" fill="{c_sub}"/></g>')
    d3, w3 = shape(MONO400, "HUKUM MINIMUM USAHA", 8, tracking=2.6)
    body.append(f'<g transform="translate({round((W - w3) / 2, 2)} 92)"><path d="{d3}" fill="{c_tag}"/></g>')
    return svg(W, 110, "\n".join(body), "Logo UMEA™ - susunan vertikal")

def lockup_os(on_dark=False, mono=None):
    c_main = SNOW if (on_dark or mono == "mono-white") else (INK if mono == "mono-black" else NAVY900)
    c_sub = "#FFFFFF" if mono else (AMBER400 if on_dark else AMBER700)
    c_border = NAVY700 if on_dark else NAVY100
    c_ver = "#FFFFFF" if mono else (SNOW if on_dark else AMBER700)
    c_ver_bg = "none" if True else None
    mode = mono or "brand"
    body = [f'<g transform="translate(0 6)">{mark_os(mode)}</g>']
    x0 = 62
    g, w1 = text_at(x0, 33, SORA800, "GUNARA OS", 24, c_main, tracking=0.6)
    body.append(g)
    # pil versi
    d, w2 = shape(MONO700, "G-DOS v1.0.0.1", 10.5, tracking=0.5)
    pw, ph = w2 + 18, 19
    py = 40
    if mono:
        body.append(f'<rect x="{x0}" y="{py}" width="{round(pw)}" height="{ph}" rx="9.5" fill="none" stroke="{c_main}" stroke-width="1.4"/>')
    else:
        bg = AMBER_TINT if not on_dark else "rgba(245,158,11,0.14)"
        body.append(f'<rect x="{x0}" y="{py}" width="{round(pw)}" height="{ph}" rx="9.5" fill="{bg}" stroke="{AMBER600 if not on_dark else AMBER700}" stroke-width="1"/>')
    body.append(f'<g transform="translate({round(x0 + 9, 2)} {py + 13.5})"><path d="{d}" fill="{c_ver}"/></g>')
    W = round(x0 + max(w1, pw) + 8)
    return svg(W, 64, "\n".join(body), "Logo Gunara OS - kunci horizontal")

def wordmark_web(on_dark=False):
    c_main = SNOW if on_dark else NAVY900
    c_dot = AMBER400 if on_dark else AMBER700
    d1, w1 = shape(SORA800, "gunara", 30, tracking=-0.3)
    d2, w2 = shape(MONO700, ".web.id", 16, tracking=0.6)
    W = round(w1 + 4 + w2 + 4)
    body = [
        f'<g transform="translate(2 38)"><path d="{d1}" fill="{c_main}"/></g>',
        f'<g transform="translate({round(2 + w1 + 4, 2)} 38)"><path d="{d2}" fill="{c_dot}"/></g>',
    ]
    return svg(W, 48, "\n".join(body), "Wordmark gunara.web.id")

# =============================================================================
# IKON APLIKASI 512 (gradient abyss -> navy-800)
# =============================================================================
def app_icon_web():
    s = 512 / 48
    body = [
        '<defs><linearGradient id="gw" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{NAVY800}"/><stop offset="1" stop-color="{ABYSS}"/>'
        "</linearGradient></defs>",
        '<rect width="512" height="512" rx="116" fill="url(#gw)"/>',
        f'<g transform="scale({round(s, 5)})">{mark_web("brand")}</g>',
    ]
    return svg(512, 512, "\n".join(body), "Ikon aplikasi gunara.web.id")

def app_icon_umea():
    s = 512 / 48
    body = [
        '<defs><linearGradient id="gu" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{NAVY800}"/><stop offset="1" stop-color="{ABYSS}"/>'
        "</linearGradient></defs>",
        '<rect width="512" height="512" rx="116" fill="url(#gu)"/>',
        f'<g transform="scale({round(s, 5)})">{mark_umea("brand")}</g>',
    ]
    return svg(512, 512, "\n".join(body), "Ikon aplikasi UMEA™")

def boot_icon_os():
    body = [
        '<defs><linearGradient id="go" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{NAVY800}"/><stop offset="1" stop-color="{ABYSS}"/>'
        "</linearGradient></defs>",
        '<rect width="512" height="512" rx="116" fill="url(#go)"/>',
    ]
    # chip: tile 35 -> skala 7.0 => 245 px; pin bawah berakhir di y=373,
    # aman dari teks "GUNARA OS" (puncak huruf ~389) tanpa tabrakan
    k = 7.0
    chip_w = 35 * k
    x0 = 256 - chip_w / 2
    body.append(f'<g transform="translate({round(x0, 2)} {round(58, 2)}) scale({k})">{mark_os("brand", tile=False)}</g>')
    g, w1 = text_at(0, 0, SORA800, "GUNARA OS", 0, SNOW)
    d1, w1 = shape(SORA800, "GUNARA OS", 62, tracking=1.5)
    body.append(f'<g transform="translate({round(256 - w1 / 2, 2)} 434)"><path d="{d1}" fill="{SNOW}"/></g>')
    d2, w2 = shape(MONO400, "G-DOS KERNEL v1.0.0.1", 21, tracking=2.4)
    body.append(f'<g transform="translate({round(256 - w2 / 2, 2)} 468)"><path d="{d2}" fill="{AMBER500}"/></g>')
    return svg(512, 512, "\n".join(body), "Ikon boot Gunara OS")

def g_dos_panel():
    W, H = 560, 340
    b = []
    b.append(f'<rect x="8" y="8" width="{W - 16}" height="{H - 16}" rx="16" fill="{NAVY900}"/>')
    b.append(f'<rect x="8" y="8" width="{W - 16}" height="{H - 16}" rx="16" fill="none" stroke="{NAVY800}" stroke-width="1.5"/>')
    # bilah judul
    b.append(f'<rect x="8" y="8" width="{W - 16}" height="40" rx="16" fill="{NAVY800}"/>')
    b.append(f'<rect x="8" y="30" width="{W - 16}" height="18" fill="{NAVY800}"/>')
    for i, c in enumerate([NAVY600, NAVY400, AMBER500]):
        b.append(f'<circle cx="{34 + i * 20}" cy="28" r="5.5" fill="{c}"/>')
    d, w = shape(MONO400, "G-DOS - Command Panel", 13, tracking=0.8)
    b.append(f'<g transform="translate({round(W / 2 - w / 2, 2)} 32.5)"><path d="{d}" fill="{SNOW}"/></g>')
    b.append(f'<line x1="8" y1="48.5" x2="{W - 8}" y2="48.5" stroke="{ABYSS}" stroke-width="1.5"/>')
    lines = [
        ("> boot gunara-os --profil arsitek", AMBER400, 84, MONO400),
        ("[ OK ]  kernel dimuat - G-DOS v1.0.0.1", NAVY300, 112, MONO400),
        ("[ OK ]  metodologi UMEA terpasang", NAVY300, 140, MONO400),
        ("[ OK ]  ekosistem: 5 organ aktif", NAVY300, 168, MONO400),
        ("> _", AMBER400, 208, MONO700),
    ]
    for text, c, y, fnt in lines:
        d, w = shape(fnt, text, 15, tracking=0.3)
        b.append(f'<g transform="translate(34 {y})"><path d="{d}" fill="{c}"/></g>')
    d, w = shape(MONO400, "gunara.web.id - struktur sebelum karya, sistem sebelum skala", 11.5, tracking=0.6)
    b.append(f'<g transform="translate(34 {H - 34})"><path d="{d}" fill="{NAVY400}"/></g>')
    return svg(W, H, "\n".join(b), "Panel perintah G-DOS")

# =============================================================================
# BOARD PRESENTASI
# =============================================================================
def brand_board():
    W, H = 1480, 1120
    b = [f'<rect width="{W}" height="{H}" fill="{ABYSS}"/>']
    d, w = shape(SORA800, "TRILOGI IDENTITAS GUNARA", 38, tracking=1.2)
    b.append(f'<g transform="translate(64 86)"><path d="{d}" fill="{SNOW}"/></g>')
    d, w = shape(MONO400, "satu otak, banyak organ - midnight blueprint - WCAG 2.1 AAA", 15, tracking=1.4)
    b.append(f'<g transform="translate(64 120)"><path d="{d}" fill="{AMBER500}"/></g>')

    rows = [
        (mark_web(), "gunara.web.id", "KOMPAS ARSITEK", lockup_web(), lockup_web(on_dark=True), lockup_web_stacked()),
        (mark_umea(), "UMEA™", "TANGGA KEMATANGAN", lockup_umea(), lockup_umea(on_dark=True), lockup_umea_stacked()),
        (mark_os(), "Gunara OS", "KERNEL G-DOS", lockup_os(), lockup_os(on_dark=True), None),
    ]
    y = 170
    for mark, name, role, lk_light, lk_dark, stacked in rows:
        # kartu gelap: mark besar
        b.append(f'<rect x="64" y="{y}" width="420" height="250" rx="20" fill="{NAVY900}" stroke="{NAVY800}" stroke-width="1.5"/>')
        b.append(f'<g transform="translate(112 {y + 45}) scale(2.6)">{mark}</g>')
        d, w = shape(SORA700, name, 21, tracking=0.6)
        b.append(f'<g transform="translate(112 {y + 185})"><path d="{d}" fill="{SNOW}"/></g>')
        d, w = shape(MONO400, role, 11.5, tracking=2.4)
        b.append(f'<g transform="translate(112 {y + 210})"><path d="{d}" fill="{AMBER500}"/></g>')
        # kartu terang: lockup
        b.append(f'<rect x="514" y="{y}" width="420" height="250" rx="20" fill="{SNOW}"/>')
        inner = lk_light
        # skala lockup agar muat (lebar viewBox < 420)
        scale = 1.0
        vb = inner.split('viewBox="0 0 ')[1].split('"')[0].split(" ")
        lw, lh = float(vb[0]), float(vb[1])
        scale = min(300.0 / lw, 1.15)
        off = ((420 - lw * scale) / 2, (250 - lh * scale) / 2)
        b.append(f'<g transform="translate({round(514 + off[0], 2)} {round(y + off[1], 2)}) scale({round(scale, 4)})">{inner.split(">", 1)[1].rsplit("</svg>", 1)[0]}</g>')
        # kartu gelap kanan: lockup on-dark
        b.append(f'<rect x="964" y="{y}" width="420" height="250" rx="20" fill="{NAVY800}" stroke="{NAVY700}" stroke-width="1.5"/>')
        vb2 = lk_dark.split('viewBox="0 0 ')[1].split('"')[0].split(" ")
        lw2, lh2 = float(vb2[0]), float(vb2[1])
        scale2 = min(300.0 / lw2, 1.15)
        off2 = ((420 - lw2 * scale2) / 2, (250 - lh2 * scale2) / 2)
        b.append(f'<g transform="translate({round(964 + off2[0], 2)} {round(y + off2[1], 2)}) scale({round(scale2, 4)})">{lk_dark.split(">", 1)[1].rsplit("</svg>", 1)[0]}</g>')
        y += 285
    d, w = shape(MONO400, "public/brand/ - dokumentasi lengkap: docs/brand/IDENTITAS-LOGO.md", 13, tracking=1.0)
    b.append(f'<g transform="translate(64 {H - 46})"><path d="{d}" fill="{NAVY400}"/></g>')
    return svg(W, H, "\n".join(b), "Papan sistem identitas Gunara")

# =============================================================================
# TULIS SEMUA FILE
# =============================================================================
def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print("ok  ", os.path.relpath(path, ROOT))

def main():
    dirs = {
        "web": os.path.join(OUT, "gunara-web-id"),
        "umea": os.path.join(OUT, "umea"),
        "os": os.path.join(OUT, "gunara-os"),
    }
    # --- SVG ---
    write(os.path.join(dirs["web"], "mark.svg"), svg(48, 48, mark_web(), "Mark gunara.web.id - Kompas Arsitek"))
    write(os.path.join(dirs["web"], "lockup-horizontal.svg"), lockup_web())
    write(os.path.join(dirs["web"], "lockup-horizontal-on-dark.svg"), lockup_web(on_dark=True))
    write(os.path.join(dirs["web"], "lockup-stacked.svg"), lockup_web_stacked())
    write(os.path.join(dirs["web"], "lockup-stacked-on-dark.svg"), lockup_web_stacked(on_dark=True))
    write(os.path.join(dirs["web"], "wordmark.svg"), wordmark_web())
    write(os.path.join(dirs["web"], "app-icon.svg"), app_icon_web())
    write(os.path.join(dirs["web"], "mono-black.svg"), svg(48, 48, mark_web("mono-black"), "Mark gunara.web.id - monokrom hitam"))
    write(os.path.join(dirs["web"], "mono-white.svg"), svg(48, 48, mark_web("mono-white"), "Mark gunara.web.id - monokrom putih"))

    write(os.path.join(dirs["umea"], "mark.svg"), svg(48, 48, mark_umea(), "Mark UMEA™ - Tangga Kematangan"))
    write(os.path.join(dirs["umea"], "lockup-horizontal.svg"), lockup_umea())
    write(os.path.join(dirs["umea"], "lockup-horizontal-on-dark.svg"), lockup_umea(on_dark=True))
    write(os.path.join(dirs["umea"], "lockup-stacked.svg"), lockup_umea_stacked())
    write(os.path.join(dirs["umea"], "lockup-stacked-on-dark.svg"), lockup_umea_stacked(on_dark=True))
    write(os.path.join(dirs["umea"], "app-icon.svg"), app_icon_umea())
    write(os.path.join(dirs["umea"], "mono-black.svg"), svg(48, 48, mark_umea("mono-black"), "Mark UMEA™ - monokrom hitam"))
    write(os.path.join(dirs["umea"], "mono-white.svg"), svg(48, 48, mark_umea("mono-white"), "Mark UMEA™ - monokrom putih"))

    write(os.path.join(dirs["os"], "mark.svg"), svg(48, 48, mark_os(), "Mark Gunara OS - Kernel G-DOS"))
    write(os.path.join(dirs["os"], "boot-icon.svg"), boot_icon_os())
    write(os.path.join(dirs["os"], "lockup-horizontal.svg"), lockup_os())
    write(os.path.join(dirs["os"], "lockup-horizontal-on-dark.svg"), lockup_os(on_dark=True))
    write(os.path.join(dirs["os"], "g-dos-panel.svg"), g_dos_panel())
    write(os.path.join(dirs["os"], "mono-black.svg"), svg(48, 48, mark_os("mono-black"), "Mark Gunara OS - monokrom hitam"))
    write(os.path.join(dirs["os"], "mono-white.svg"), svg(48, 48, mark_os("mono-white"), "Mark Gunara OS - monokrom putih"))

    board = brand_board()
    write(os.path.join(DOCS, "identity-board.svg"), board)

    # --- PNG (cairosvg, semua path outline => tak butuh font) ---
    import cairosvg
    png_jobs = []
    for size in (512, 256, 128, 64, 48):
        png_jobs.append((os.path.join(dirs["web"], "mark.svg"), os.path.join(OUT, "png", "gunara-web-id", f"mark-{size}.png"), size))
    for size in (512, 256, 180, 152, 120, 64, 48, 32, 16):
        png_jobs.append((os.path.join(dirs["web"], "app-icon.svg"), os.path.join(OUT, "png", "gunara-web-id", f"app-icon-{size}.png"), size))
    for size in (512, 256, 128, 64, 48):
        png_jobs.append((os.path.join(dirs["umea"], "mark.svg"), os.path.join(OUT, "png", "umea", f"mark-{size}.png"), size))
    png_jobs.append((os.path.join(dirs["umea"], "app-icon.svg"), os.path.join(OUT, "png", "umea", "app-icon-512.png"), 512))
    for size in (512, 256, 128, 64, 48):
        png_jobs.append((os.path.join(dirs["os"], "mark.svg"), os.path.join(OUT, "png", "gunara-os", f"mark-{size}.png"), size))
    png_jobs.append((os.path.join(dirs["os"], "boot-icon.svg"), os.path.join(OUT, "png", "gunara-os", "boot-icon-512.png"), 512))
    png_jobs.append((os.path.join(DOCS, "identity-board.svg"), os.path.join(DOCS, "identity-board.png"), 1480))
    for src, dst, size in png_jobs:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        cairosvg.svg2png(url=src, write_to=dst, output_width=size, output_height=size if "app-icon" in dst or "mark" in dst or "boot-icon" in dst else None)
        print("ok  ", os.path.relpath(dst, ROOT))

    # --- favicon & logo lama ---
    # favicon utama (dipakai layout.tsx sebagai /gunara-mark.svg)
    write(os.path.join(ROOT, "public", "gunara-mark.svg"), svg(48, 48, mark_web(), "Monogram Gunara"))
    print("\nSELESAI. Total artefak ditulis.")

if __name__ == "__main__":
    main()
