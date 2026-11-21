#!/usr/bin/env python3
"""Kalkulator kontras WCAG 2.1 untuk sistem warna Gunara.
Menghasilkan rasio kontras nyata untuk dipublikasikan di website & PDF."""
import json

def hex_to_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def srgb_channel(c: float) -> float:
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def relative_luminance(h: str) -> float:
    r, g, b = hex_to_rgb(h)
    return 0.2126 * srgb_channel(r) + 0.7152 * srgb_channel(g) + 0.0722 * srgb_channel(b)

def contrast(fg: str, bg: str) -> float:
    l1, l2 = relative_luminance(fg), relative_luminance(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

PAIRS = [
    # (foreground, background, konteks)
    ("#F59E0B", "#060D1F", "Amber 500 di atas Midnight Abyss (dark bg)"),
    ("#FBBF24", "#060D1F", "Amber 400 di atas Midnight Abyss"),
    ("#FCD34D", "#060D1F", "Amber 300 di atas Midnight Abyss"),
    ("#0A1628", "#F59E0B", "Midnight Navy 900 di atas Amber 500 (tombol dark-mode)"),
    ("#060D1F", "#FBBF24", "Abyss di atas Amber 400 (tombol dark-mode)"),
    ("#FFFFFF", "#0A1628", "Putih di atas Midnight Navy 900 (tombol light-mode)"),
    ("#0A1628", "#F8FAFC", "Midnight Navy 900 di atas Snow Mist"),
    ("#475569", "#F8FAFC", "Slate Muted di atas Snow Mist (teks sekunder light)"),
    ("#92400E", "#FFF7E6", "Amber 800 di atas Amber Tint (chip light)"),
    ("#E6EEF8", "#060D1F", "Mist Foreground di atas Midnight Abyss"),
    ("#A9BCD6", "#060D1F", "Navy 300 Muted di atas Midnight Abyss (teks sekunder dark)"),
    ("#B45309", "#F8FAFC", "Amber 700 di atas Snow Mist (aksen teks light)"),
    ("#F59E0B", "#0A1628", "Amber 500 di atas Midnight Navy 900"),
    ("#5C87B8", "#060D1F", "Navy 400 di atas Midnight Abyss"),
    ("#12233D", "#F8FAFC", "Navy 800 di atas Snow Mist"),
]

results = []
for fg, bg, ctx in PAIRS:
    r = contrast(fg, bg)
    level = "AAA" if r >= 7 else ("AA" if r >= 4.5 else ("AA-Large/UI" if r >= 3 else "Gagal"))
    results.append({"fg": fg, "bg": bg, "context": ctx, "ratio": round(r, 2), "level": level})

for r in results:
    print(f"{r['fg']} di atas {r['bg']}: {r['ratio']}:1  [{r['level']}]  — {r['context']}")

with open("/home/z/my-project/scripts/contrast-results.json", "w") as f:
    json.dump(results, f, indent=2)
print("\nTersimpan ke scripts/contrast-results.json")
