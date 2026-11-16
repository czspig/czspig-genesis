"""在天顶全景 ceiling.jpg 上找出九格各自的位置和朝向，写进 src/ceiling-layout.json。

做法：给每格一个目测的大致矩形，把拉正后的原作（art-src/panels）按 0/90/180/270 度旋转、
缩放到不同大小、平移到不同位置，和全景上那一块逐个比较，取最相像的一组。
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CEIL = Image.open(ROOT / "art-src/originals/ceiling.jpg").convert("L")

# 目测矩形（全景像素）：左、上、右、下
GUESS = {
    "09": (426, 464, 566, 676),
    "08": (648, 343, 856, 783),
    "07": (933, 464, 1073, 676),
    "06": (1151, 343, 1354, 787),
    "05": (1441, 464, 1586, 671),
    "04": (1673, 339, 1877, 793),
    "03": (1965, 467, 2104, 674),
    "02": (2182, 339, 2390, 793),
    "01": (2478, 467, 2621, 684),
}


def norm(a):
    a = a - a.mean()
    return a / (np.linalg.norm(a) + 1e-9)


def best_fit(key):
    l, t, r, b = GUESS[key]
    cx, cy, w0, h0 = (l + r) / 2, (t + b) / 2, r - l, b - t
    panel = Image.open(ROOT / f"art-src/panels/{key}.png").convert("L")
    best = (-2, None)
    for rot in (0, 90, 180, 270):
        p = panel.rotate(rot, expand=True)
        # 旋转后宽高比要和目测矩形大体一致，否则跳过
        if abs(np.log((p.width / p.height) / (w0 / h0))) > 0.35:
            continue
        for s in np.linspace(0.85, 1.15, 13):
            w, h = int(w0 * s), int(w0 * s * p.height / p.width)
            small = norm(np.asarray(p.resize((w, h), Image.BILINEAR), float))
            for dx in range(-14, 15, 2):
                for dy in range(-14, 15, 2):
                    x, y = int(cx - w / 2 + dx), int(cy - h / 2 + dy)
                    patch = np.asarray(CEIL.crop((x, y, x + w, y + h)), float)
                    score = float((norm(patch) * small).sum())
                    if score > best[0]:
                        best = (score, dict(rot=rot, rect=[x, y, w, h]))
    return best


def main():
    out = {"ceiling": list(CEIL.size), "panels": {}}
    for key in GUESS:
        score, fit = best_fit(key)
        out["panels"][key] = fit
        print(key, round(score, 3), fit)
    (ROOT / "src").mkdir(exist_ok=True)
    (ROOT / "src/ceiling-layout.json").write_text(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
