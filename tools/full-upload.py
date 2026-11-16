"""整格重绘用的上传图。

输出（都在 art-src/upload-full/）：
  0X.png       原作放进 1536x1024，上下（或左右）用灰边补齐，ChatGPT 按它的构图重画
  0X-blur.png  同一张图大幅模糊，只剩构图和色块。原图因裸体被拒时改传这张
  layout.json  每张图里原作所在的矩形；npm run art 用它把 AI 图裁回画格比例

用法：python tools/full-upload.py
"""
import json
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent / "art-src"
PANELS, OUT = ROOT / "panels", ROOT / "upload-full"
W, H, GREY = 1536, 1024, (127, 127, 127)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    layout = {}
    for f in sorted(PANELS.glob("0?.png")):
        im = Image.open(f).convert("RGB")
        s = min(W / im.width, H / im.height)
        w, h = round(im.width * s), round(im.height * s)
        x, y = (W - w) // 2, (H - h) // 2
        canvas = Image.new("RGB", (W, H), GREY)
        canvas.paste(im.resize((w, h), Image.LANCZOS), (x, y))
        canvas.save(OUT / f.name)
        canvas.filter(ImageFilter.GaussianBlur(28)).save(OUT / f"{f.stem}-blur.png")
        layout[f.stem] = dict(canvas=[W, H], rect=[x, y, w, h])
        print(f.stem, "画面", (w, h), "位置", (x, y))
    (OUT / "layout.json").write_text(json.dumps(layout, indent=2))


if __name__ == "__main__":
    main()
