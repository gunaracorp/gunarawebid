# -*- coding: utf-8 -*-
"""Generate ROADMAP.md + WORKLOG.md dari data roadmap yang sama (satu sumber kebenaran)."""
import os
import sys
from datetime import date, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from roadmap_data_a import FASE_1, FASE_2, FASE_3, FASE_4, FASE_5
from roadmap_data_b import FASE_6, FASE_7, FASE_8, FASE_9, FASE_10, EXPERTS

PHASES = [FASE_1, FASE_2, FASE_3, FASE_4, FASE_5, FASE_6, FASE_7, FASE_8, FASE_9, FASE_10]
D1 = date(2026, 11, 21)
HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

def fmt(d):
    dt = D1 + timedelta(days=d - 1)
    return f"{dt.day} {BULAN[dt.month-1]} {dt.year}"

def versi(day, phase_no):
    if day == 99:
        return "v2.0.0.99"
    minor = phase_no - 1
    if any(p["hari_akhir"] == day for p in PHASES):
        minor = phase_no
    return f"v1.{minor}.0.{day}"

lines = []
lines.append("# ROADMAP — GUNARA OS · UPGRADE 99 HARI")
lines.append("")
lines.append("> **v1.0.0.0 → v2.0.0.0** · Mulai Sabtu, 21 November 2026 · Selesai Sabtu, 27 Februari 2027")
lines.append("> Satu hari = satu roadmap = satu commit = satu entri worklog. Kode lanjutan: `LANJUTKAN GUNARA-OS DAY-XX`.")
lines.append("")
lines.append("Dokumen desain lengkap: `download/gunara-os-roadmap-99-hari.pdf` (35 halaman).")
lines.append("")
lines.append("## Peta 10 Fase")
lines.append("")
lines.append("| Fase | Hari | Periode | Fokus | Lapisan UWA-7 | Target |")
lines.append("|---|---|---|---|---|---|")
for ph in PHASES:
    lines.append(f"| F{ph['no']} | {ph['hari_mulai']}–{ph['hari_akhir']} | {fmt(ph['hari_mulai'])} – {fmt(ph['hari_akhir'])} | {ph['nama']} | {ph['layer'].replace('UWA-7 Lapisan ', 'L')} | `{ph['versi']}` |")
lines.append("")
for ph in PHASES:
    lines.append(f"## Fase {ph['no']} — {ph['nama']} (Hari {ph['hari_mulai']}–{ph['hari_akhir']})")
    lines.append("")
    lines.append(f"**Lapisan:** {ph['layer']} · **Target versi:** `{ph['versi']}`")
    lines.append("")
    lines.append(ph["narasi"])
    lines.append("")
    for (d, judul, tujuan, tugas, pakar, hasil) in ph["days"]:
        done = " ✅" if d == 1 else ""
        lines.append(f"### Day {d} · {fmt(d)} — {judul}{done}")
        lines.append(f"- **Tujuan:** {tujuan}")
        for t in tugas:
            lines.append(f"- **Tugas:** {t}")
        tag = " · ".join(f"`{c}`" for c in pakar)
        lines.append(f"- **Pakar:** {tag} · **Hasil:** {hasil} · **Target:** `{versi(d, ph['no'])}`")
        lines.append("")
    lines.append("---")
lines.append("")
lines.append("## Dewan Pakar — 46 Perspektif")
lines.append("")
for kode, (kat, daftar) in EXPERTS.items():
    lines.append(f"**Kategori {kode} — {kat}**")
    lines.append("")
    for c, n in daftar:
        lines.append(f"- `{c}` {n}")
    lines.append("")

with open("/home/z/my-project/ROADMAP.md", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

# WORKLOG.md
wl = []
wl.append("# WORKLOG — GUNARA OS")
wl.append("")
wl.append("> Log eksekusi harian roadmap 99 hari. Satu entri per hari kerja, tiga jejak wajib:")
wl.append("> commit + worklog + versi. Format entri: `#NNN · Day XX · tanggal · vX.Y.Z.N`.")
wl.append("")
wl.append("## Status")
wl.append("")
wl.append("- **Versi saat ini:** `v1.0.0.1` (Day 1 selesai)")
wl.append("- **Fase aktif:** Fase 1 — Fondasi & Tata Kelola (Day 1–9)")
wl.append("- **Progres:** 1/99 hari")
wl.append("- **Protokol lanjutan:** buka sesi baru dengan `LANJUTKAN GUNARA-OS DAY-XX`")
wl.append("")
wl.append("## Entri")
wl.append("")
wl.append("### #001 · Day 01 · Sab 21 Nov 2026 · `v1.0.0.0 → v1.0.0.1`")
wl.append("")
wl.append("**Judul:** Aktivasi Sistem Versi & Worklog Gunara OS")
wl.append("")
wl.append("**Hasil:**")
wl.append("- `VERSIONING.md` — skema MAJOR.MINOR.PATCH.BUILD + contoh evolusi")
wl.append("- `WORKLOG.md` — log harian (file ini)")
wl.append("- `ROADMAP.md` — checklist 99 hari (digenerate dari data roadmap)")
wl.append("- Tag git `v1.0.0.0` sebagai baseline resmi")
wl.append("- Dokumen desain 35 halaman: `gunara-os-roadmap-99-hari.pdf` (10 fase, 46 perspektif)")
wl.append("")
wl.append("**Pakar:** `E46` Design QA & Governance Lead · `A2` Brand Architect")
wl.append("")
wl.append("**Verifikasi:** tag v1.0.0.0 ada di remote; ketiga dokumen tata kelola ter-commit.")
wl.append("")
with open("/home/z/my-project/WORKLOG.md", "w", encoding="utf-8") as f:
    f.write("\n".join(wl))

print("ROADMAP.md:", len("\n".join(lines).splitlines()), "baris | WORKLOG.md: OK")
