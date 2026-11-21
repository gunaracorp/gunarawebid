#!/usr/bin/env python3
"""Cap nomor halaman Brand Guideline Gunara.
Skema (pagination.md): cover = halaman 1 internal tanpa nomor;
body = angka Arab mulai 1; halaman penutup (back cover) tanpa nomor."""
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import io

SRC = "/home/z/my-project/download/gunara-brand-guideline.pdf"
DST = "/home/z/my-project/download/gunara-brand-guideline.pdf"

reader = PdfReader(SRC)
writer = PdfWriter()
n = len(reader.pages)

body_count = 0
for i, page in enumerate(reader.pages):
    w = float(page.mediabox.width)
    h = float(page.mediabox.height)
    is_cover = (i == 0)
    is_ending = (i == n - 1)
    if not is_cover and not is_ending:
        body_count += 1
        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=(w, h))
        c.setFont("Helvetica", 7.5)
        c.setFillColor(HexColor("#64748B"))
        c.drawCentredString(w / 2, 14, str(body_count))
        c.save()
        buf.seek(0)
        overlay = PdfReader(buf).pages[0]
        page.merge_page(overlay)
    writer.add_page(page)

writer.add_metadata({
    "/Title": "GUNARA — Brand Guideline: Identitas Visual & Sistem Warna (Edisi Midnight Blueprint)",
    "/Author": "Gugun Gunara",
    "/Subject": "Brand guideline gunara.web.id: strategi merek, arsitektur ekosistem, sistem warna Midnight Navy & Amber, tipografi, aksesibilitas WCAG 2.1, dan tata kelola identitas.",
    "/Creator": "Gunara Brand System · gunara.web.id",
    "/Keywords": "Gunara, brand guideline, Midnight Blueprint, UWA-7, UMEA, design token",
})

with open(DST, "wb") as f:
    writer.write(f)

print(f"OK — {n} halaman, nomor body 1..{body_count} dicap, metadata diset.")
