"""Generate swatch PNG untuk tabel sistem warna di README."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path("/home/z/my-project/docs/assets/swatches")
OUT.mkdir(parents=True, exist_ok=True)

F_BOLD = "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf"
try:
    from PIL import ImageFont
    f_name = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 34)
    f_hex = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 24)
except Exception:
    f_name = f_hex = None

COLORS = [
    ("midnight-abyss", "Midnight Abyss", "#060d1f", (6, 13, 31), False),
    ("midnight-navy", "Midnight Navy", "#0a1628", (10, 22, 40), False),
    ("navy-surface", "Navy Surface", "#12233d", (18, 35, 61), False),
    ("amber-500", "Amber 500", "#f59e0b", (245, 158, 11), True),
    ("amber-400", "Amber 400", "#fbbf24", (251, 191, 36), True),
    ("snow", "Snow", "#f8fafc", (248, 250, 252), True),
    ("ink", "Ink", "#e6eef8", (230, 238, 248), True),
]

W, H, R = 420, 150, 18
for slug, name, hexv, rgb, is_light in COLORS:
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    txt = (10, 22, 40) if is_light else (230, 238, 248)
    d.rounded_rectangle([4, 4, W - 4, H - 4], radius=R, fill=rgb + (255,), outline=txt + (60,), width=2)
    d.text((28, 38), name, font=f_name, fill=txt + (255,))
    d.text((28, 92), hexv.upper(), font=f_hex, fill=txt + (210,))
    img.save(OUT / f"{slug}.png", optimize=True)
    print(f"{slug}.png  {W}x{H}")
