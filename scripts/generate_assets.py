"""
Generates placeholder emblem + flag PNGs for each Yazanaki clan.
These are dropped into /app/frontend/public/assets/{emblems,flags}/.
They follow the empire's palette (dark surface, muted gold text,
subtle crimson motif) so they don't fight the dark UI. Each clan
gets a distinct geometric sigil so they are visually differentiable.
Swap these with real artwork anytime — the Emblem container will
render whatever is put here.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

SURFACE = (21, 26, 32, 255)       # #151A20
LINE = (43, 52, 64, 255)          # slightly lighter border
GOLD = (198, 168, 91, 255)        # #C6A85B
GOLD_SOFT = (198, 168, 91, 130)
CRIMSON = (139, 0, 0, 255)        # #8B0000
TEXT = (232, 236, 241, 255)       # #E8ECF1

EMBLEM_DIR = Path("/app/frontend/public/assets/emblems")
FLAG_DIR = Path("/app/frontend/public/assets/flags")
EMBLEM_DIR.mkdir(parents=True, exist_ok=True)
FLAG_DIR.mkdir(parents=True, exist_ok=True)


def load_font(size):
    for p in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]:
        try:
            return ImageFont.truetype(p, size=size)
        except Exception:
            continue
    return ImageFont.load_default()


def draw_centered_text(draw, xy, text, font, fill, letter_spacing=4):
    # PIL doesn't have letter-spacing; simulate by drawing char by char
    cx, cy = xy
    widths = []
    for ch in text:
        bbox = draw.textbbox((0, 0), ch, font=font)
        widths.append((bbox[2] - bbox[0], bbox[3] - bbox[1]))
    total_w = sum(w for w, _ in widths) + letter_spacing * (len(text) - 1)
    start_x = cx - total_w // 2
    ascender_offset = max(h for _, h in widths) // 2
    x = start_x
    for ch, (w, _) in zip(text, widths):
        draw.text((x, cy - ascender_offset), ch, font=font, fill=fill)
        x += w + letter_spacing


def draw_sigil(draw, size, variant):
    cx = cy = size // 2
    r = int(size * 0.38)
    # base ring
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=LINE, width=3)
    # variant-specific inner motif
    if variant == 0:       # SNU — cross of bars
        bar = int(r * 0.85)
        thick = 6
        draw.rectangle([cx - thick, cy - bar, cx + thick, cy + bar], fill=GOLD)
        draw.rectangle([cx - bar, cy - thick, cx + bar, cy + thick], fill=GOLD)
    elif variant == 1:     # ANO — nested diamonds
        for k in (0.95, 0.65, 0.35):
            d = int(r * k)
            draw.polygon(
                [(cx, cy - d), (cx + d, cy), (cx, cy + d), (cx - d, cy)],
                outline=GOLD, width=3,
            )
    elif variant == 2:     # ONF — triangle stack
        d = int(r * 0.9)
        draw.polygon(
            [(cx, cy - d), (cx + d, cy + d // 2), (cx - d, cy + d // 2)],
            outline=GOLD, width=3,
        )
        draw.line([(cx - d // 2, cy), (cx + d // 2, cy)], fill=CRIMSON, width=3)
    elif variant == 3:     # ONA — three dots horizontal
        d = int(r * 0.32)
        for dx in (-1, 0, 1):
            cxd = cx + dx * int(r * 0.55)
            draw.ellipse([cxd - d, cy - d, cxd + d, cy + d], fill=GOLD)
    elif variant == 4:     # KASAII — square with inner crimson diamond
        s = int(r * 0.85)
        draw.rectangle([cx - s, cy - s, cx + s, cy + s], outline=GOLD, width=3)
        d = int(s * 0.55)
        draw.polygon(
            [(cx, cy - d), (cx + d, cy), (cx, cy + d), (cx - d, cy)],
            fill=CRIMSON,
        )
    else:                  # default — ring + center dot
        d = int(r * 0.28)
        draw.ellipse([cx - d, cy - d, cx + d, cy + d], fill=GOLD)


def make_emblem(code, variant, out_path, size=512):
    img = Image.new("RGBA", (size, size), SURFACE)
    draw = ImageDraw.Draw(img)
    # rounded outer frame
    pad = int(size * 0.06)
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=int(size * 0.14),
        outline=LINE, width=3,
    )
    # inner sigil
    draw_sigil(draw, size, variant)
    # code text at bottom
    font = load_font(int(size * 0.085))
    draw_centered_text(
        draw,
        (size // 2, int(size * 0.86)),
        code,
        font,
        fill=TEXT,
        letter_spacing=max(3, int(size * 0.012)),
    )
    img.save(out_path, "PNG")


def make_flag(code, variant, out_path, size=(960, 600)):
    w, h = size
    img = Image.new("RGBA", (w, h), SURFACE)
    draw = ImageDraw.Draw(img)
    # top and bottom thin hairlines
    draw.rectangle([0, 0, w, 4], fill=LINE)
    draw.rectangle([0, h - 4, w, h], fill=LINE)
    # left hoist band
    band_w = int(w * 0.22)
    draw.rectangle([0, 0, band_w, h], fill=(28, 34, 42, 255))
    draw.line([(band_w, 0), (band_w, h)], fill=LINE, width=2)
    # sigil on the left band
    sigil_img = Image.new("RGBA", (band_w, h), (0, 0, 0, 0))
    sigil_draw = ImageDraw.Draw(sigil_img)
    # reuse sigil with a square-ish region
    reg_size = min(band_w, h)
    ox = (band_w - reg_size) // 2
    oy = (h - reg_size) // 2
    sub = Image.new("RGBA", (reg_size, reg_size), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sub)
    draw_sigil(sd, reg_size, variant)
    sigil_img.alpha_composite(sub, (ox, oy))
    img.alpha_composite(sigil_img)
    # big clan code on the fly
    font = load_font(int(h * 0.3))
    draw_centered_text(
        draw,
        (band_w + (w - band_w) // 2, h // 2),
        code,
        font,
        fill=TEXT,
        letter_spacing=max(4, int(h * 0.02)),
    )
    # subtitle line
    sub_font = load_font(int(h * 0.065))
    draw_centered_text(
        draw,
        (band_w + (w - band_w) // 2, int(h * 0.78)),
        "YAZANAKI",
        sub_font,
        fill=GOLD,
        letter_spacing=6,
    )
    img.save(out_path, "PNG")


CLANS = [
    ("snu", "SNU", 0),
    ("ano", "ANO", 1),
    ("onf", "ONF", 2),
    ("ona", "ONA", 3),
    ("kasaii", "KASAII", 4),
]
ALLIES = [
    ("excalibur", "EXCALIBUR", 5),
]

for fname, code, variant in CLANS + ALLIES:
    make_emblem(code, variant, EMBLEM_DIR / f"{fname}.png")
    make_flag(code, variant, FLAG_DIR / f"{fname}.png")

print("emblems:", sorted(p.name for p in EMBLEM_DIR.iterdir()))
print("flags:  ", sorted(p.name for p in FLAG_DIR.iterdir()))
