# 新创世纪 · Genesis, Retold

西斯廷天顶《创世纪》九格的 AI 时代重绘。从入口走向祭坛，一格一格往下滚动。

```bash
npm install
npm run dev      # http://127.0.0.1:5413
npm run art      # 把 art-src/ 里的素材处理进 public/art/
npm run build    # 打包到 dist/
```

## 交素材：放哪儿、叫什么

ChatGPT 出的图放进 `art-src/` 下对应的位置，然后运行 `npm run art`，网站会自动换上。还没交的格子会显示「待绘」，照样能看。

| 放在哪里 | 是什么 |
| --- | --- |
| `art-src/ai-full/0X.png` | **整格重绘（现在的方案）**，例如 `04.png`。提示词和步骤见 PROMPTS.md，上传底图在 `art-src/upload-full/`（`python tools/full-upload.py` 生成）。程序会自动裁掉灰边，对齐到画格 |
| `art-src/ai/<编号>.png` | 旧的局部改图方案（见 PROMPTS-local.md），已不用。同一格有整格图时会被忽略 |
| `art-src/music.mp3` | 背景音乐，也可以是 `.m4a` 或 `.ogg`。没有这个文件时，网站用合成的持续和声代替 |

- 直接用 ChatGPT 返回的整张图（3:2），不要自己裁切。

## 结构

- `src/data.js`：九格的文字（中英）和界面文案。结尾那句也在这里（`ending`）
- `src/main.js`：时间轴、相机和交互
- `src/gl.js`：WebGL 渲染与转场
- `tools/`：原图处理、局部裁切与合成、天顶对位
- `art-src/` 不进仓库（在 .gitignore 里），`public/art/` 是处理后的成品
