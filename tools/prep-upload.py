"""把 art-src/originals 里的原图整理成九格标准原作，并做出给 ChatGPT 上传的图。

输出：
  art-src/panels/0X.png   拉正、裁好的原作（全分辨率，网页用它做原作）
  art-src/upload/0X.png   缩放进 1536x1024（竖格 1024x1536），四周用灰边补齐
  art-src/upload/layout.json  每张上传图里画面所在的矩形，用来把 AI 版裁回来
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "art-src"
SRC, PANELS, UPLOAD = ROOT / "originals", ROOT / "panels", ROOT / "upload"
GREY = (127, 127, 127)

# quad: 原图里画面的四个角（左上、右上、右下、左下），拉成 size；crop: 直接裁；rotate: 逆时针角度
JOBS = {
    "01": dict(quad=[(2116, 1400), (3560, 1410), (3610, 2370), (2150, 2370)], size=(1450, 1000), rotate=180),
    "02": dict(),
    "03": dict(crop_frac=(0, 0.115, 1, 0.86)),
    "04": dict(),
    "05": dict(),
    "06": dict(crop=(395, 615, 3870, 2195)),
    "07": dict(quad=[(1380, 1153), (3165, 1262), (3110, 2448), (1311, 2372)], size=(1800, 1200)),
    "08": dict(crop=(405, 590, 3890, 2300)),
    "09": dict(crop=(18, 14, 1266, 814)),  # 用户给的是 1280 宽预览图；换成 2286 宽原图后要按比例改坐标
}


def perspective_coeffs(dst, src):
    """PIL 的 PERSPECTIVE 变换系数：把输出坐标 dst 映射回输入坐标 src。"""
    a = []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y])
    b = np.array(src).reshape(8)
    return np.linalg.solve(np.array(a, dtype=float), b).tolist()


def load(key):
    path = next(SRC.glob(key + ".*"))
    return Image.open(path).convert("RGB")


def prepare(key, job):
    im = load(key)
    if "quad" in job:
        w, h = job["size"]
        coeffs = perspective_coeffs([(0, 0), (w, 0), (w, h), (0, h)], job["quad"])
        im = im.transform((w, h), Image.PERSPECTIVE, coeffs, Image.BICUBIC)
    if "crop" in job:
        im = im.crop(job["crop"])
    if "crop_frac" in job:
        l, t, r, b = job["crop_frac"]
        W, H = im.size
        im = im.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
    if job.get("rotate"):
        im = im.rotate(job["rotate"], expand=True)
    return im


def to_upload(im):
    W, H = (1536, 1024) if im.width >= im.height else (1024, 1536)
    s = min(W / im.width, H / im.height)
    w, h = round(im.width * s), round(im.height * s)
    canvas = Image.new("RGB", (W, H), GREY)
    x, y = (W - w) // 2, (H - h) // 2
    canvas.paste(im.resize((w, h), Image.LANCZOS), (x, y))
    return canvas, dict(canvas=[W, H], rect=[x, y, w, h])


def main():
    PANELS.mkdir(parents=True, exist_ok=True)
    UPLOAD.mkdir(parents=True, exist_ok=True)
    layout_path = UPLOAD / "layout.json"
    layout = json.loads(layout_path.read_text()) if layout_path.exists() else {}
    for key, job in JOBS.items():
        if not list(SRC.glob(key + ".*")):
            print(key, "缺原图，跳过")
            continue
        im = prepare(key, job)
        im.save(PANELS / f"{key}.png")
        up, info = to_upload(im)
        up.save(UPLOAD / f"{key}.png")
        info["panel"] = list(im.size)
        layout[key] = info
        print(key, "panel", im.size, "upload", info)
    layout_path.write_text(json.dumps(layout, indent=2))


if __name__ == "__main__":
    main()
