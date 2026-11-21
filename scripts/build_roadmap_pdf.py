# -*- coding: utf-8 -*-
"""Roadmap 99 Hari Gunara OS — body PDF via ReportLab (rute Report).

Desain warna: token brand Gunara (navy-amber) yang sudah terkonfirmasi kontrasnya
lewat tools/contrast.py — bukan pemilihan warna manual. Amber = aksen XS (area <1%),
Navy = teks/struktur, Snow/Tint = latar. Satu keluarga warna + satu aksen brand.
"""
import os
import sys
import hashlib
from datetime import date, timedelta

PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts"))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, CondPageBreak,
)
from reportlab.platypus.tableofcontents import TableOfContents

from pdf import install_font_fallback, FONT_FALLBACK_CHAIN
from roadmap_data_a import FASE_1, FASE_2, FASE_3, FASE_4, FASE_5
from roadmap_data_b import FASE_6, FASE_7, FASE_8, FASE_9, FASE_10, EXPERTS

PHASES = [FASE_1, FASE_2, FASE_3, FASE_4, FASE_5, FASE_6, FASE_7, FASE_8, FASE_9, FASE_10]

# ── Font ────────────────────────────────────────────────────────────────────
FDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
SYS = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("Sora", f"{FDIR}/sora-400.ttf"))
pdfmetrics.registerFont(TTFont("Sora-Medium", f"{FDIR}/sora-600.ttf"))
pdfmetrics.registerFont(TTFont("Sora-Bold", f"{FDIR}/sora-700.ttf"))
pdfmetrics.registerFont(TTFont("Sora-XBold", f"{FDIR}/sora-800.ttf"))
pdfmetrics.registerFont(TTFont("Manrope", f"{FDIR}/manrope-400.ttf"))
pdfmetrics.registerFont(TTFont("Manrope-Medium", f"{FDIR}/manrope-500.ttf"))
pdfmetrics.registerFont(TTFont("Manrope-Bold", f"{FDIR}/manrope-700.ttf"))
pdfmetrics.registerFont(TTFont("Manrope-XBold", f"{FDIR}/manrope-800.ttf"))
pdfmetrics.registerFont(TTFont("JetBrainsMono", f"{FDIR}/jetbrains-mono-400.ttf"))
pdfmetrics.registerFont(TTFont("JetBrainsMono-Bold", f"{FDIR}/jetbrains-mono-700.ttf"))
# Fallback CJK-capable (untuk glyph seperti panah yang tak ada di subset latin)
pdfmetrics.registerFont(TTFont("Noto Sans SC", f"{SYS}/truetype/chinese/NotoSansSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Noto Sans SC Bold", f"{SYS}/truetype/chinese/NotoSansSC-Bold.ttf"))

registerFontFamily("Sora", normal="Sora", bold="Sora-Bold")
registerFontFamily("Sora-Medium", normal="Sora-Medium", bold="Sora-Bold")
registerFontFamily("Manrope", normal="Manrope", bold="Manrope-Bold")
registerFontFamily("JetBrainsMono", normal="JetBrainsMono", bold="JetBrainsMono-Bold")
registerFontFamily("Noto Sans SC", normal="Noto Sans SC", bold="Noto Sans SC Bold")

for f in ["Sora", "Sora-Medium", "Sora-Bold", "Sora-XBold",
          "Manrope", "Manrope-Medium", "Manrope-Bold", "Manrope-XBold",
          "JetBrainsMono", "JetBrainsMono-Bold"]:
    FONT_FALLBACK_CHAIN[f] = ["Noto Sans SC"]
install_font_fallback()

# ── Palet brand Gunara (token terkonfirmasi kontras) ───────────────────────
NAVY_900   = colors.HexColor("#0A1628")   # teks utama / heading
NAVY_800   = colors.HexColor("#12233D")   # heading sekunder
NAVY_400   = colors.HexColor("#5C87B8")   # label mono / chip
NAVY_MUTED = colors.HexColor("#475569")   # teks meta
SLATE      = colors.HexColor("#A9BCD6")   # teks muted terang
AMBER      = colors.HexColor("#F59E0B")   # aksen XS brand
AMBER_D    = colors.HexColor("#B45309")   # aksen gelap (teks kecil di terang)
TINT       = colors.HexColor("#EEF3F9")   # latar kartu (L tier)
TINT_2     = colors.HexColor("#F5F8FC")   # stripe tabel
BORDER     = colors.HexColor("#DBE4EF")   # garis tipis
WHITE      = colors.white

# ── Geometri ────────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
MARGIN = 54.0                       # kiri = kanan (simetris)
TOP_M, BOT_M = 74.0, 60.0
AVAIL = PAGE_W - 2 * MARGIN         # ≈ 487pt
H1_ORPHAN = (PAGE_H - TOP_M - BOT_M) * 0.25

D1 = date(2026, 11, 21)
HARI_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
BULAN_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

def day_date(d):
    dt = D1 + timedelta(days=d - 1)
    return f"{HARI_ID[dt.weekday()]}, {dt.day} {BULAN_ID[dt.month - 1]} {dt.year}"

def day_date_caps(d):
    dt = D1 + timedelta(days=d - 1)
    return f"{HARI_ID[dt.weekday()].upper()} · {dt.day:02d} {BULAN_ID[dt.month - 1].upper()} {dt.year}"

def day_version(day, phase_no):
    """MAJOR.MINOR.PATCH.BUILD — BUILD = nomor hari; MINOR = fase tuntas."""
    if day == 99:
        return "v2.0.0.99"
    minor = phase_no - 1
    is_last_day = any(p["hari_akhir"] == day for p in PHASES)
    if is_last_day:
        minor = phase_no
    return f"v1.{minor}.0.{day}"

# ── Gaya ────────────────────────────────────────────────────────────────────
S = {}
S["h1"] = ParagraphStyle("H1", fontName="Sora", fontSize=15.5, leading=20,
                         textColor=NAVY_900, spaceBefore=18, spaceAfter=4)
S["h2"] = ParagraphStyle("H2", fontName="Sora", fontSize=11.5, leading=15,
                         textColor=NAVY_800, spaceBefore=14, spaceAfter=6)
S["body"] = ParagraphStyle("Body", fontName="Manrope", fontSize=10, leading=15.5,
                           textColor=NAVY_900, alignment=TA_JUSTIFY, spaceAfter=9)
S["lead"] = ParagraphStyle("Lead", fontName="Manrope", fontSize=10.2, leading=16,
                           textColor=NAVY_MUTED, alignment=TA_JUSTIFY, spaceAfter=10)
S["bullet"] = ParagraphStyle("Bullet", fontName="Manrope", fontSize=9.4, leading=13.5,
                             textColor=NAVY_900, alignment=TA_LEFT,
                             leftIndent=14, bulletIndent=4, spaceAfter=3)
S["dayTitle"] = ParagraphStyle("DayTitle", fontName="Sora", fontSize=11, leading=14.5,
                               textColor=NAVY_900, alignment=TA_LEFT)
S["dayChip"] = ParagraphStyle("DayChip", fontName="JetBrainsMono", fontSize=7.4, leading=10,
                              textColor=NAVY_400, alignment=TA_LEFT)
S["dayBody"] = ParagraphStyle("DayBody", fontName="Manrope", fontSize=9.3, leading=13.2,
                              textColor=NAVY_900, alignment=TA_LEFT)
S["dayMeta"] = ParagraphStyle("DayMeta", fontName="JetBrainsMono", fontSize=7.1, leading=10.2,
                              textColor=NAVY_MUTED, alignment=TA_LEFT)
S["statLabel"] = ParagraphStyle("StatLabel", fontName="JetBrainsMono", fontSize=6.9, leading=9.5,
                                textColor=NAVY_MUTED, alignment=TA_CENTER)
S["statValue"] = ParagraphStyle("StatValue", fontName="Sora", fontSize=10.5, leading=13.5,
                                textColor=NAVY_900, alignment=TA_CENTER)
S["tblHead"] = ParagraphStyle("TblHead", fontName="Sora", fontSize=8.6, leading=11.5,
                              textColor=WHITE, alignment=TA_LEFT)
S["tblCell"] = ParagraphStyle("TblCell", fontName="Manrope", fontSize=8.8, leading=12.2,
                              textColor=NAVY_900, alignment=TA_LEFT)
S["tblCellMono"] = ParagraphStyle("TblCellMono", fontName="JetBrainsMono", fontSize=8.0, leading=11,
                                  textColor=NAVY_MUTED, alignment=TA_LEFT)
S["toc0"] = ParagraphStyle("TOC0", fontName="Manrope", fontSize=10.2, leading=19.5,
                           textColor=NAVY_900, leftIndent=6)
S["tocTitle"] = ParagraphStyle("TOCTitle", fontName="Sora", fontSize=17, leading=22,
                               textColor=NAVY_900, spaceAfter=14)
S["caption"] = ParagraphStyle("Caption", fontName="Manrope", fontSize=8.2, leading=11,
                              textColor=NAVY_MUTED, alignment=TA_CENTER, spaceBefore=3)

# ── Dokumen: TOC + nomor halaman roman/arab ────────────────────────────────
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, "marks_body_start") and not hasattr(self, "_body_start_page"):
            self._body_start_page = self.page
        if hasattr(flowable, "bookmark_name"):
            # Nomor TOC = nomor tampilan footer (body direset ke 1 setelah Daftar Isi)
            disp = self.page - getattr(self, "_body_start_page", 2) + 1
            self.notify("TOCEntry", (getattr(flowable, "bookmark_level", 0),
                                     getattr(flowable, "bookmark_text", ""),
                                     disp,
                                     getattr(flowable, "bookmark_key", "")))

ROMAN = {1: "i", 2: "ii", 3: "iii", 4: "iv", 5: "v", 6: "vi", 7: "vii", 8: "viii"}

def on_page(canvas, doc):
    canvas.saveState()
    # Header: judul kiri + garis amber tipis
    canvas.setFont("JetBrainsMono", 6.8)
    canvas.setFillColor(NAVY_MUTED)
    canvas.drawString(MARGIN, PAGE_H - 44, "GUNARA OS — ROADMAP UPGRADE 99 HARI")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 44, "BASELINE v1.0.0.0 · TARGET v2.0.0.0")
    canvas.setStrokeColor(AMBER)
    canvas.setLineWidth(1.4)
    canvas.line(MARGIN, PAGE_H - 52, PAGE_W - MARGIN, PAGE_H - 52)
    # Footer: penulis kiri + nomor halaman kanan + garis tipis
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN, 44, PAGE_W - MARGIN, 44)
    canvas.setFont("JetBrainsMono", 6.8)
    canvas.setFillColor(NAVY_MUTED)
    canvas.drawString(MARGIN, 33, "GUGUN GUNARA · GUNARACORP")
    body_start = getattr(doc, "_body_start_page", 2)
    if doc.page < body_start:
        num = ROMAN.get(doc.page, str(doc.page))
    else:
        num = str(doc.page - body_start + 1)
    canvas.drawRightString(PAGE_W - MARGIN, 33, num)
    canvas.restoreState()

def add_heading(text, style, level=0):
    key = "h_" + hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph(f'<a name="{key}"/><b>{text}</b>', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def h1_block(text, first_para=None):
    """H1 + garis amber + paragraf pertama, anti-yatim, tanpa page-break paksa."""
    items = [add_heading(text, S["h1"], 0),
             HRFlowable(width="100%", color=AMBER, thickness=2.0,
                        spaceBefore=1, spaceAfter=10)]
    if first_para is not None:
        items.append(first_para)
    return [CondPageBreak(H1_ORPHAN), KeepTogether(items)]

def safe_keep(elements, cap=0.40):
    total = 0
    for el in elements:
        _, h = el.wrap(AVAIL, PAGE_H)
        total += h
    if total <= PAGE_H * cap:
        return [KeepTogether(elements)]
    if len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

# ── Blok harian ─────────────────────────────────────────────────────────────
def day_block(entry, phase_no):
    day, title, tujuan, tugas, pakar, hasil = entry
    done = " · SELESAI 21 NOV 2026" if day == 1 else ""
    chip = f"HARI {day:03d} · {day_date_caps(day)}{done}"
    ver = day_version(day, phase_no)
    expert_txt = " · ".join(f"{c} {EXPERTS[c[0]][1][[x[0] for x in EXPERTS[c[0]][1]].index(c)][1]}" for c in pakar)
    tugas_txt = "<br/>".join(f"•  {t}" for t in tugas)
    meta = (f"PAKAR  {expert_txt}<br/>"
            f"HASIL  {hasil}  |  TARGET <b>{ver}</b>")
    rows = [
        [Paragraph(f"{chip}", S["dayChip"])],
        [Paragraph(f"<b>{title}</b>", S["dayTitle"])],
        [Paragraph(f"<b>Tujuan.</b> {tujuan}", S["dayBody"])],
        [Paragraph(tugas_txt, S["dayBody"])],
        [Paragraph(meta, S["dayMeta"])],
    ]
    t = Table(rows, colWidths=[AVAIL], hAlign="CENTER")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), TINT),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, AMBER),
        ("LINEBELOW", (0, -1), (0, -1), 0.5, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 13),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 2), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return safe_keep([t, Spacer(1, 9)])

def phase_strip(phase):
    n_days = phase["hari_akhir"] - phase["hari_mulai"] + 1
    cells = [
        ("HARI", f"{phase['hari_mulai']} – {phase['hari_akhir']}"),
        ("LAPISAN UWA-7", phase["layer"].replace("UWA-7 Lapisan ", "L").replace(" — ", " · ")),
        ("OUTPUT", f"{n_days} DELIVERABLE"),
        ("TARGET VERSI", phase["versi"]),
    ]
    data = [[Paragraph(f"<b>{v}</b>", S["statValue"]) for _, v in cells],
            [Paragraph(k, S["statLabel"]) for k, _ in cells]]
    t = Table(data, colWidths=[AVAIL / 4.0] * 4, hAlign="CENTER")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TINT),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, AMBER),
        ("TOPPADDING", (0, 0), (-1, 0), 9),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 9),
        ("TOPPADDING", (0, 1), (-1, 1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t

def phase_section(idx, phase):
    bag_no = idx + 4  # Bagian 4-13
    title = f"BAGIAN {bag_no} — FASE {phase['no']}: {phase['nama'].upper()} (HARI {phase['hari_mulai']}–{phase['hari_akhir']})"
    out = h1_block(title, Paragraph(phase["narasi"], S["lead"]))
    out.append(Spacer(1, 4))
    out.append(phase_strip(phase))
    out.append(Spacer(1, 12))
    for entry in phase["days"]:
        out.extend(day_block(entry, phase["no"]))
    return out

def std_table(head, rows, ratios, mono_cols=()):
    widths = [r * AVAIL for r in ratios]
    assert abs(sum(widths) - AVAIL) < 1.0
    data = [[Paragraph(f"<b>{h}</b>", S["tblHead"]) for h in head]]
    for r in rows:
        cells = []
        for ci, c in enumerate(r):
            st = S["tblCellMono"] if ci in mono_cols else S["tblCell"]
            cells.append(Paragraph(str(c), st))
        data.append(cells)
    t = Table(data, colWidths=widths, hAlign="CENTER", repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY_800),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), TINT_2 if i % 2 else WHITE))
    t.setStyle(TableStyle(style))
    return t

# ── Story ───────────────────────────────────────────────────────────────────
story = []

toc = TableOfContents()
toc.levelStyles = [S["toc0"]]
story.append(Paragraph("<b>Daftar Isi</b>", S["tocTitle"]))
story.append(HRFlowable(width="100%", color=AMBER, thickness=2, spaceAfter=12))
story.append(toc)
story.append(PageBreak())

# BAGIAN 1 — Cara memakai
p1 = Paragraph(
    "Dokumen ini adalah kontrak kerja 99 hari antara Anda dan sistem Anda sendiri. Setiap hari "
    "memuat satu roadmap: satu tujuan, tiga hingga empat tugas konkret, perspektif dewan pakar yang "
    "menjadi lensa keputusan, satu deliverable yang bisa diverifikasi, dan satu target versi. "
    "Tidak ada hari yang bersifat aspiratif — semua dirancang agar selesai dalam satu hari kerja "
    "fokus oleh satu orang dengan bantuan otomasi G-DOS. Jika sebuah hari terasa terlalu ringan, "
    "naikkan mutu deliverable-nya; jika terasa mustahil, pangkas ruang lingkupnya, jangan tunda "
    "selesai.", S["lead"])
story.extend(h1_block("BAGIAN 1 — CARA MEMAKAI ROADMAP INI", p1))
story.append(Paragraph(
    "Ritme eksekusi mengikuti doktrin UMEA: mulai dari sel terkecil yang tetap bisa bertahan, lalu "
    "naik tangga. Setiap hari yang selesai menghasilkan tiga jejak yang tidak boleh dilewati: satu "
    "commit di repositori, satu entri worklog, dan satu kenaikan versi. Ketiganya membentuk rantai "
    "bukti yang membuat kemajuan tidak pernah bisa diremehkan — dan regresi tidak pernah bisa "
    "menyusup tanpa terlihat. Hari yang terlewat tidak dikejar dengan menyusun dua hari dalam satu "
    "hari; pilih satu, kerjakan selesai, dan tandai yang terlewat sebagai utang yang dijadwalkan "
    "di akhir fase.", S["body"]))
story.append(Spacer(1, 6))
story.append(std_table(
    ["Elemen", "Ketentuan Eksekusi"],
    [
        ["Satu hari", "Satu roadmap. Dimulai Sabtu, 21 November 2026 (Hari 1), ditutup Sabtu, 27 Februari 2027 (Hari 99)."],
        ["Kode lanjutan", "Buka sesi baru dengan perintah: LANJUTKAN GUNARA-OS DAY-XX — semua hari tersisa dieksekusi berurutan."],
        ["Bukti harian", "1 commit + 1 entri WORKLOG.md (hasil, bukti, versi) + tag versi pada hari penutup fase."],
        ["Dewan pakar", "Setiap hari membawa 2 lensa keahlian dari 46 perspektif (Lampiran A) sebagai alat evaluasi keputusan."],
        ["Definition of Done", "Deliverable ada dan bisa ditunjukkan; CI hijau; worklog terisi; tidak ada regresi performa/aksesibilitas."],
        ["Hari terlewat", "Jangan dua hari sehari. Eksekusi hari terlewat di slot ekstra akhir fase, atau pindahkan ke backlog Gen-2."],
    ],
    [0.20, 0.80]))
story.append(Paragraph("Tabel 1.1 — Protokol eksekusi harian yang mengikat.", S["caption"]))

# BAGIAN 2 — Sistem versi
p2 = Paragraph(
    "Gunara OS memakai versi empat segmen: MAJOR.MINOR.PATCH.BUILD. Segmen pertama melompat hanya "
    "ketika arsitektur atau identitas berubah rupa — dalam roadmap ini hanya sekali, saat penobatan "
    "v2.0.0.0 pada Hari 99. Segmen kedua naik ketika satu fase selesai penuh; sepuluh fase berarti "
    "sepuluh langkah minor dari 1.0 ke 2.0. Segmen ketiga disediakan untuk perbaikan mendesak di "
    "luar jadwal — hotfix keamanan atau bug produksi. Segmen keempat adalah denyut harian: nomornya "
    "adalah nomor hari kerja, sehingga versi sekaligus menjadi arsip riwayat.", S["lead"])
story.extend(h1_block("BAGIAN 2 — SISTEM VERSI GUNARA OS (1.0.0.0)", p2))
story.append(Paragraph(
    "Contoh konkret membaca versi: <b>v1.2.0.18</b> dibaca sebagai \"generasi 1, fase 2 tuntas, tanpa "
    "hotfix, hari ke-18\". Versi <b>v1.5.1.57</b> berarti fase 5 sudah selesai, kemudian muncul satu "
    "hotfix pada hari ke-57. Versi <b>v2.0.0.99</b> adalah penobatan akhir seluruh roadmap. Tag git "
    "dibuat pada setiap penutup fase (anotasi pesan berisi ringkasan deliverable fase), bukan pada "
    "setiap hari — harian cukup dicatat di worklog agar tag tetap bermakna.", S["body"]))
story.append(Spacer(1, 6))
story.append(std_table(
    ["Peristiwa", "Versi", "Makna"],
    [
        ["Baseline 21 November 2026 (hari ini)", "v1.0.0.0", "Identitas navy-amber stabil, situs 7 bagian live, brand guideline v1.0 terbit."],
        ["Hari 1 selesai — tata kelola versi aktif", "v1.0.0.1", "VERSIONING, WORKLOG, ROADMAP terbit; iterasi harian dimulai."],
        ["Hari 9 — Fondasi & Tata Kelola tuntas", "v1.1.0.9", "Angka dasar terukur, CI gerbang mutu, keamanan dan observabilitas berdiri."],
        ["Hari 40 — Identitas Visual 2.0 tuntas", "v1.4.0.40", "Token, tipografi, gerak, ikon, dan diagram masuk sistem resmi."],
        ["Hari 72 — Intelijen & Otomasi tuntas", "v1.7.0.72", "G-DOS Copilot hidup; mesin waktu berjalan."],
        ["Contoh hotfix di luar jadwal", "v1.5.1.57", "PATCH naik: perbaikan mendesak di tengah fase 6."],
        ["Hari 99 — Penobatan peradaban", "v2.0.0.99", "Ekosistem, sertifikasi, dan peluncuran tuntas; generasi 2 dimulai."],
    ],
    [0.38, 0.14, 0.48], mono_cols={1}))
story.append(Paragraph("Tabel 2.1 — Contoh evolusi versi 1.0.0.0 menuju v2.0.0.0.", S["caption"]))

# BAGIAN 3 — Peta 10 fase
p3 = Paragraph(
    "Urutan sepuluh fase mengikuti logika UWA-7: otoritas dibangun sebelum konten, konten sebelum "
    "wajah, wajah sebelum kecerdasan, dan kecerdasan sebelum panggung. Tiga fase pertama memastikan "
    "rumah berdiri di tanah yang sah; dua fase berikutnya membuatnya indah dan cerdas; empat fase "
    "terakhir mengubah rumah menjadi mesin — menghasilkan konversi, menghidupkan otomasi, memperluas "
    "ekosistem, lalu membuktikan mutunya dengan sertifikasi sebelum dipanggungkan ke dunia.", S["lead"])
story.extend(h1_block("BAGIAN 3 — PETA 10 FASE (HARI 1–99)", p3))
story.append(Spacer(1, 4))
map_rows = []
for ph in PHASES:
    dm = D1 + timedelta(days=ph["hari_mulai"] - 1)
    dA = D1 + timedelta(days=ph["hari_akhir"] - 1)
    periode = f"{dm.day} {BULAN_ID[dm.month-1]} – {dA.day} {BULAN_ID[dA.month-1]} {dA.year}"
    map_rows.append([f"F{ph['no']}", f"{ph['hari_mulai']}–{ph['hari_akhir']}", periode,
                     ph["nama"], ph["layer"].replace("UWA-7 Lapisan ", ""), ph["versi"]])
story.append(std_table(
    ["Fase", "Hari", "Periode", "Fokus", "Lapisan UWA-7", "Target"],
    map_rows, [0.07, 0.095, 0.205, 0.27, 0.225, 0.135], mono_cols={1, 5}))
story.append(Paragraph("Tabel 3.1 — Peta sepuluh fase dengan periode, lapisan, dan target versi.", S["caption"]))

# Bagian 4-13: fase
for i, ph in enumerate(PHASES):
    story.append(Spacer(1, 8))
    story.extend(phase_section(i, ph))

# LAMPIRAN A — 46 dewan pakar
pA = Paragraph(
    "Setiap hari dalam roadmap membawa tag dewan pakar: dua lensa keahlian yang dipakai sebagai alat "
    "evaluasi keputusan, bukan sebagai dekorasi. Ketika sebuah tugas memicu perdebatan, buka lensa "
    "terkait dan tanyakan: apa yang akan lensa ini tolak dari rancangan saya? Dewan bersifat sintetis "
    "— ia menyatukan disiplin keahlian, bukan mengklaim orang nyata. Berikut 46 perspektif lengkap "
    "dalam lima kategori.", S["lead"])
story.extend(h1_block("LAMPIRAN A — DEWAN PAKAR: 46 PERSPEKTIF KEAHLIAN", pA))
for kode, (kat_nama, daftar) in EXPERTS.items():
    rows = [[c, n] for c, n in daftar]
    story.append(Spacer(1, 8))
    story.append(std_table(["Kode", f"KATEGORI {kode} · {kat_nama.upper()}"], rows,
                           [0.14, 0.86], mono_cols={0}))
story.append(Spacer(1, 6))

# LAMPIRAN B — hosting
pB = Paragraph(
    "Pertanyaan \"bisa jalan di Vercel atau shared hosting?\" dijawab berikut ini sebagai lampiran "
    "resmi. gunara.web.id dibangun dengan Next.js 16 (output standalone) — aplikasi Node.js penuh, "
    "bukan situs PHP. Konsekuensinya: shared hosting klasik berbasis cPanel/PHP tidak dapat menjalankan "
    "server Next.js. Vercel, sebaliknya, adalah platform yang dibuat oleh pembuat Next.js sendiri — "
    "nol konfigurasi, SSL otomatis, preview deployment per commit, dan CI dari repositori ini sudah "
    "membangun dengan sukses di lingkungan yang identik.", S["lead"])
story.extend(h1_block("LAMPIRAN B — VERCEL ATAU SHARED HOSTING?", pB))
story.append(std_table(
    ["Aspek", "Vercel (Disarankan)", "Shared Hosting cPanel", "Static Export"],
    [
        ["Runtime", "Node.js terkelola, cocok Next.js 16", "PHP saja; tanpa Node", "HTML murni di Apache/Nginx"],
        ["Deploy", "Push → build → live otomatis", "Upload FTP manual", "Upload folder out/"],
        ["Fitur hilang", "Tidak ada", "Semua fitur server Next.js", "API route + ISR + image otomatis"],
        ["Skalabilitas", "Edge global, autoscale", "Terbatas satu server", "Sesuai batas shared server"],
        ["Biaya", "Gratis untuk skala saat ini", "Sudah dibayar (untuk email/DNS)", "Gratis di hosting lama"],
        ["Cocok untuk", "gunara.web.id produksi penuh", "Email + DNS saja", "Cadangan darurat statis"],
    ],
    [0.16, 0.30, 0.28, 0.26]))
story.append(Paragraph("Tabel B.1 — Perbandingan tiga jalur deployment gunara.web.id.", S["caption"]))
story.append(Paragraph(
    "Rekomendasi final: web di Vercel, DNS dan CDN di Cloudflare, email di layanan profesional "
    "(Workspace/Zoho) yang DNS-nya dikendalikan Cloudflare, dan shared hosting yang sudah Anda miliki "
    "tetap berguna sebagai penyedia email awal atau cadangan domain — bukan sebagai mesin aplikasi. "
    "Jika suatu hari butuh di shared hosting, jalur static export sudah disiapkan pada Hari 10–16 "
    "(fase 2): buang satu endpoint API health-check, set output export, dan seluruh situs menjadi "
    "folder HTML yang bisa diunggah ke public_html mana pun.", S["body"]))

# Marker awal body (nomor arab dimulai di sini)
marker = Paragraph("", S["body"])
marker.marks_body_start = True
story.insert(4, marker)  # setelah TOC + PageBreak (indeks 4)

# ── Build ───────────────────────────────────────────────────────────────────
OUT = "/home/z/my-project/scripts/roadmap_body.pdf"
doc = TocDocTemplate(OUT, pagesize=A4,
                     leftMargin=MARGIN, rightMargin=MARGIN,
                     topMargin=TOP_M, bottomMargin=BOT_M,
                     title="Gunara OS — Roadmap Upgrade 99 Hari",
                     author="Gugun Gunara", creator="Z.ai",
                     subject="Roadmap upgrade gunara.web.id 99 hari: v1.0.0.0 menuju v2.0.0.0")
doc.multiBuild(story, onFirstPage=on_page, onLaterPages=on_page)
print("BODY OK:", OUT)
