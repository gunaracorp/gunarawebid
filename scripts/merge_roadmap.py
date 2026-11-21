# -*- coding: utf-8 -*-
"""Gabungkan cover + body roadmap menjadi satu PDF final (normalisasi A4)."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

def normalize(page):
    w, h = float(page.mediabox.width), float(page.mediabox.height)
    if abs(w - A4_W) > 0.4 or abs(h - A4_H) > 0.4:
        page.scale_to(A4_W, A4_H)
    return page

writer = PdfWriter()
writer.add_page(normalize(PdfReader("/home/z/my-project/scripts/roadmap_cover.pdf").pages[0]))
for p in PdfReader("/home/z/my-project/scripts/roadmap_body.pdf").pages:
    writer.add_page(normalize(p))

writer.add_metadata({
    "/Title": "Gunara OS — Roadmap Upgrade 99 Hari",
    "/Author": "Gugun Gunara",
    "/Creator": "Z.ai",
    "/Subject": "Roadmap upgrade gunara.web.id 99 hari: v1.0.0.0 menuju v2.0.0.0 — 10 fase, 46 perspektif dewan pakar",
    "/Keywords": "Gunara OS, roadmap, UWA-7, UMEA, G-DOS, brand, konsultan manajemen sistem",
})
out = "/home/z/my-project/download/gunara-os-roadmap-99-hari.pdf"
with open(out, "wb") as f:
    writer.write(f)
print("MERGED:", out, "| pages:", len(writer.pages))
