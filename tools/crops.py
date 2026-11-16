"""局部改图：只把要改的那一小块交给 ChatGPT，改完再拼回原作。

  python tools/crops.py make      从 art-src/panels 裁出局部，做成上传图 art-src/upload/<id>.png
  python tools/crops.py compose   把 art-src/ai/<id>.png 拼回原作，输出 art-src/ai-panels/0X.png

坐标都是 art-src/panels/0X.png 上的像素 (左, 上, 右, 下)。
第 08 格的水不是局部，而是一张无缝纹理（08-water），由网页按颜色把它叠进水面。
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent / "art-src"
PANELS, UPLOAD, AI, OUT = ROOT / "panels", ROOT / "upload", ROOT / "ai", ROOT / "ai-panels"
GREY = (127, 127, 127)

REGIONS = {
    "01-light":   ("01", (1120, 0, 1450, 1000)),
    "02-sun":     ("02", (1080, 40, 2060, 600)),
    "02-plant":   ("02", (0, 980, 420, 1630)),
    "03-water":   ("03", (1700, 380, 2304, 980)),
    "04-face":    ("04", (260, 420, 600, 730)),
    "04-hands":   ("04", (1000, 560, 1600, 830)),
    "05-eve":     ("05", (1020, 190, 1320, 470)),
    "05-adam":    ("05", (150, 600, 440, 880)),
    "06-fruit":   ("06", (1040, 270, 1390, 550)),
    "06-horizon": ("06", (2020, 740, 2460, 1040)),
    "07-fire":    ("07", (820, 300, 1260, 520)),
    "07-wood":    ("07", (1330, 280, 1800, 620)),
    "09-jug":     ("09", (180, 520, 320, 720)),
    "09-bowl":    ("09", (420, 680, 567, 755)),
    "09-vat":     ("09", (220, 130, 560, 360)),
}
CANVASES = [(1536, 1024), (1024, 1024), (1024, 1536)]


def pick_canvas(w, h):
    r = w / h
    return min(CANVASES, key=lambda c: abs(np.log(r / (c[0] / c[1]))))


def make():
    UPLOAD.mkdir(parents=True, exist_ok=True)
    for old in UPLOAD.glob("0?.png"):  # 旧的整格上传图作废
        old.unlink()
    layout = {}
    for rid, (panel, box) in REGIONS.items():
        crop = Image.open(PANELS / f"{panel}.png").convert("RGB").crop(box)
        W, H = pick_canvas(*crop.size)
        s = min(W / crop.width, H / crop.height)
        w, h = round(crop.width * s), round(crop.height * s)
        canvas = Image.new("RGB", (W, H), GREY)
        x, y = (W - w) // 2, (H - h) // 2
        canvas.paste(crop.resize((w, h), Image.LANCZOS), (x, y))
        canvas.save(UPLOAD / f"{rid}.png")
        layout[rid] = dict(panel=panel, box=list(box), canvas=[W, H], rect=[x, y, w, h])
        print(rid, crop.size, "->", (W, H), f"x{s:.1f}")
    (UPLOAD / "layout.json").write_text(json.dumps(layout, indent=2))


def feather_mask(w, h, frac=0.12):
    """边缘渐隐的遮罩：中间 1，四边在 frac 宽度内过渡到 0。"""
    m = Image.new("L", (w, h), 0)
    b = max(2, int(min(w, h) * frac))
    m.paste(255, (b, b, w - b, h - b))
    return m.filter(ImageFilter.GaussianBlur(b / 2))


def match_color(src, ref, frac=0.12):
    """把 AI 局部的色调拉到和原作一致（逐通道均值/方差）。
    只用边缘一圈来统计：那里按要求不改，中间新加的光不会把整块压暗。"""
    a, r = np.asarray(src, float), np.asarray(ref, float)
    h, w = a.shape[:2]
    b = max(2, int(min(w, h) * frac))
    ring = np.ones((h, w), bool)
    ring[b:h - b, b:w - b] = False
    ma, sa = a[ring].mean(0), a[ring].std(0) + 1e-6
    mr, sr = r[ring].mean(0), r[ring].std(0)
    out = (a - ma) / sa * sr + mr
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def compose():
    layout = json.loads((UPLOAD / "layout.json").read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    panels = {}
    for rid, L in layout.items():
        f = AI / f"{rid}.png"
        if not f.exists():
            continue
        p = L["panel"]
        if p not in panels:
            panels[p] = Image.open(PANELS / f"{p}.png").convert("RGB")
        ai = Image.open(f).convert("RGB").resize(L["canvas"], Image.LANCZOS)
        x, y, w, h = L["rect"]
        l, t, r, b = L["box"]
        piece = ai.crop((x, y, x + w, y + h)).resize((r - l, b - t), Image.LANCZOS)
        piece = match_color(piece, panels[p].crop(L["box"]))
        panels[p].paste(piece, (l, t), feather_mask(r - l, b - t))
        print("composed", rid)
    for p, im in panels.items():
        im.save(OUT / f"{p}.png")
    print("panels:", sorted(panels))


if __name__ == "__main__":
    {"make": make, "compose": compose}[sys.argv[1]]()
