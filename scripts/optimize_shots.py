"""Optimasi screenshot untuk GitHub README — resize lebar 1400px + kompres PNG."""
from PIL import Image
from pathlib import Path

ASSETS = Path("/home/z/my-project/docs/assets")

for f in sorted(ASSETS.glob("preview-*.png")):
    img = Image.open(f)
    w, h = img.size
    target_w = 1400
    if w > target_w:
        img = img.resize((target_w, int(h * target_w / w)), Image.LANCZOS)
    img.save(f, optimize=True, compress_level=9)
    print(f"{f.name}: {w}x{h} -> {img.size[0]}x{img.size[1]}, {f.stat().st_size // 1024} KB")
