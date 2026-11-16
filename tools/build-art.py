"""把 art-src 里的素材压成网页用的 public/art，并写 public/art/manifest.json。

用法：npm run art   （等于 python tools/build-art.py）

AI 版的来源，按优先级：
  1. art-src/ai-full/0X.png    整格重画的图（构图可以和原作不完全对齐，网页会铺满画格）
  2. art-src/ai/<局部编号>.png  局部改图，先自动拼回原作（tools/crops.py compose）
没有就算“待绘”，网页显示原作。
  art-src/ai/08-water.png      第 8 格的水面纹理（没有整格重画图时，网页把它叠进水面）
  art-src/music.mp3 / .m4a / .ogg   背景音乐（没有就用网页里合成的持续音）
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, DST = ROOT / "art-src", ROOT / "public" / "art"
sys.path.insert(0, str(ROOT / "tools"))
import crops  # noqa: E402

KEYS = [f"{i:02d}" for i in range(1, 10)]
sys.stdout.reconfigure(encoding="utf-8")


def save(im, rel, longest, q=84):
    im = im.convert("RGB")
    im.thumbnail((longest, longest), Image.LANCZOS)
    out = DST / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "WEBP", quality=q, method=6)
    print(f"{rel:24} {im.size} {out.stat().st_size // 1024} KB")
    return list(im.size)


def main():
    if (SRC / "upload" / "layout.json").exists():
        crops.compose()
    manifest = {"orig": {}, "ai": {}, "water": False, "music": None}

    save(Image.open(SRC / "originals" / "ceiling.jpg"), "ceiling.webp", 3200, 82)
    for k in KEYS:
        im = Image.open(SRC / "panels" / f"{k}.png")
        manifest["orig"][k] = save(im, f"orig/{k}.webp", 2000)
        save(im, f"orig/{k}-s.webp", 640, 80)

        full, composed = SRC / "ai-full" / f"{k}.png", SRC / "ai-panels" / f"{k}.png"
        src = full if full.exists() else composed if composed.exists() else None
        if src:
            ai = Image.open(src)
            manifest["ai"][k] = dict(size=save(ai, f"ai/{k}.webp", 2000), full=src == full)
            save(ai, f"ai/{k}-s.webp", 640, 80)
        else:
            for f in (DST / "ai" / f"{k}.webp", DST / "ai" / f"{k}-s.webp"):
                f.unlink(missing_ok=True)

    water = SRC / "ai" / "08-water.png"
    if water.exists():
        save(Image.open(water), "ai/08-water.webp", 1024)
        manifest["water"] = True

    for ext in ("mp3", "m4a", "ogg"):
        m = SRC / f"music.{ext}"
        if m.exists():
            (ROOT / "public" / "audio").mkdir(parents=True, exist_ok=True)
            shutil.copy(m, ROOT / "public" / "audio" / f"music.{ext}")
            manifest["music"] = f"audio/music.{ext}"
            break

    (DST / "manifest.json").write_text(json.dumps(manifest, indent=2))
    done = sorted(manifest["ai"])
    print("AI 版已有：", done or "无", "｜ 待绘：", [k for k in KEYS if k not in done])


if __name__ == "__main__":
    main()
