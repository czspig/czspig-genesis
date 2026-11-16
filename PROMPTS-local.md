# 《新创世纪》ChatGPT 改图提示词（局部版）

整格画上传会因为壁画里的裸体被拦，所以现在**只上传要改的那一小块**：手、脸、太阳、果子、火、酒器……都已经避开了裸体。ChatGPT 改完这一小块，我用脚本把它拼回原作（`tools/crops.py compose`），自动对齐、调色、羽化边缘。没改的地方就是原作本身，一个像素都不动。

一共 16 张：15 个局部 + 1 张水面纹理。

| 编号 | 格 | 内容 | 上传 |
|---|---|---|---|
| 01-light | 1 分开光暗 | 双手和头顶的天 | `art-src/upload/01-light.png` |
| 02-sun | 2 造日月草木 | 太阳 | `art-src/upload/02-sun.png` |
| 02-plant | 2 | 左下的草芽 | `art-src/upload/02-plant.png` |
| 03-water | 3 分开水陆 | 神的右手和手下的水 | `art-src/upload/03-water.png` |
| 04-face | 4 创造亚当 | 亚当的脸 | `art-src/upload/04-face.png` |
| 04-hands | 4 | 两只手和指缝 | `art-src/upload/04-hands.png` |
| 05-eve | 5 创造夏娃 | 夏娃的脸 | `art-src/upload/05-eve.png` |
| 05-adam | 5 | 睡着的亚当的脸 | `art-src/upload/05-adam.png` |
| 06-fruit | 6 原罪与逐出 | 递果子的手和果子 | `art-src/upload/06-fruit.png` |
| 06-horizon | 6 | 乐园外的地平线 | `art-src/upload/06-horizon.png` |
| 07-fire | 7 挪亚献祭 | 祭坛的火 | `art-src/upload/07-fire.png` |
| 07-wood | 7 | 那捆柴 | `art-src/upload/07-wood.png` |
| 08-water | 8 大洪水 | 水面纹理（**不上传**，直接生成） | — |
| 09-jug | 9 挪亚醉酒 | 陶壶 | `art-src/upload/09-jug.png` |
| 09-bowl | 9 | 浅碗 | `art-src/upload/09-bowl.png` |
| 09-vat | 9 | 大酒桶 | `art-src/upload/09-vat.png` |

画好后存成 `art-src/ai/<编号>.png`，例如 `art-src/ai/04-face.png`。

**建议先画 04-face、04-hands、09-jug 三张发给我**，我拼回去看效果，确认改动幅度和那道光的颜色，再画其余。

几处寓意的调整：

- 第 4、5 格的“瓷光、细接缝”从全身改成**只在脸上**。
- 第 5 格亚当肋侧那一点冷光由我在网页里用光效做，不用画。
- 第 6 格不再改亚当、夏娃：被放进世界之后，它们已经和人分不出来了。

---

## 在 ChatGPT 里怎么操作

1. **新建一个对话**，16 张都在这一个对话里画，那道光的颜色才统一。
2. 每张：先**上传**对应的局部图，再把「统一要求」和这一张的「改动」**合成一条消息**发出去。08-water 不用上传，只发它自己的那段。
3. 不合格就在同一个对话里用中文说，例如：
   - “不要放大或裁切，画面范围和我上传的完全一样”
   - “只改光，其他地方完全不要动”
   - “保留湿壁画的裂纹和颗粒，不要画得这么光滑”
   - “那道光的颜色和前几张保持一致”
4. 还是被拦的话，把那一张的编号告诉我，我把局部裁得更紧。
5. 额度用完了第二天在**同一个对话**里接着画。

## 五条检查（每张都要过）

1. 和上传的图来回切换，构图、轮廓、位置几乎不动，画面范围没有被放大、裁切或平移。
2. 只改了「改动」里写的东西。
3. 湿壁画的颗粒、裂纹、褪色还在。
4. 那道冷光的颜色和前几张一致。
5. 没有多出文字、水印、签名或边框；灰边仍是纯灰。

---

## 统一要求（每条消息开头都贴这一段）

```
Edit the uploaded image. It is a small detail cropped from Michelangelo's Sistine Chapel ceiling fresco; after editing it will be pasted back into the full fresco, so its edges must still match the surroundings.

- Keep the framing exactly as uploaded: no zoom, no crop, no shift, no rotation. Every contour, the colours, the lighting, the fresco grain, the plaster cracks and the fading stay as they are, except for the change listed below. Near the four edges of the picture change nothing at all.
- Change ONLY what is listed under "Change". Do not change God in any way.
- The only new colour allowed is "the cold light": a pale, cold cyan-white glow (core about #DDF6FF, fading to about #8FD8F0 at its edges), softly blooming as if lit from within. It must look painted into the fresco with the same grain and wear, not pasted on top.
- If the image has flat grey bands along its edges, they are padding: leave them flat plain grey.
- No text, letters, numbers, logos, watermarks, signature or border.
```

---

## 01-light · 分开光暗

```
Change: in the sky between and around God's two raised hands, the soft blur where light meets darkness becomes one crisp, sharp boundary with a slightly stepped, pixel-like contour. The light side of that boundary glows with the cold light; the darker side stays as it is. God's hands, arms and sleeves are untouched.
```

检查：手和衣袖没变；能看出一条锐利、带像素台阶的光暗边界。

## 02-sun · 太阳

```
Change: the golden sun disc becomes a round silicon wafer of exactly the same size, shape and position: a disc covered with a faint fine grid of tiny rectangular chips, glowing with the cold light. Its edge stays exactly where the sun's edge was. The sky, the hand and the small figure at the edges are untouched.
```

检查：圆的大小、位置和原来的太阳完全一样；圆以外什么都没变。

## 02-plant · 草芽

```
Change: the green plant becomes a slender branching network of fine lines and small nodes that keeps the plant's exact silhouette, colours and position, so that from a distance it still reads as the same young plant. Only the tips of its branches are faintly lit with the cold light.
```

检查：远看还是那丛草；近看是分叉的细线和节点。

## 03-water · 手下的水

```
Change: the grey surface around God's outstretched hand becomes a chaotic, grainy, static-like texture, like dense random noise, painted in the same muted fresco greys. Only directly beneath the hand does the noise settle into calm, orderly parallel ripples, faintly touched by the cold light. The hand and the sleeve are untouched.
```

检查：手和袖子没变；手下那一块明显比周围整齐。

## 04-face · 亚当的脸

```
Change: Adam's face and neck take on a smooth, pale porcelain sheen, and beneath the skin extremely fine seam lines run like delicate veins or circuitry, visible only up close. His features, expression, gaze, hair and the shape of his head stay exactly as in the original; from a distance he must still read as Michelangelo's Adam. A tiny glint of the cold light shows in his eye.
```

检查：五官、眼神和原作一样；近看有瓷光和细纹；眼里有一点冷光。

## 04-hands · 指缝

```
Change: the narrow gap between Adam's fingertip (left) and God's fingertip (right) stays exactly as wide as in the original. Inside the gap hangs a very faint thread of the cold light that touches neither finger. Both hands are untouched.
```

检查：两根手指之间的距离一点没变；光很淡、不碰手指。

## 05-eve · 夏娃的脸

```
Change: Eve's face and neck take on the same smooth, pale porcelain sheen with extremely fine seam lines under the skin as in the previous Adam face, visible only up close. Her profile, open mouth, gaze and hair stay exactly as in the original. A tiny glint of the cold light shows in her eye.
```

检查：侧脸轮廓、张开的嘴和原作一样；瓷光和 04-face 一致。

## 05-adam · 睡着的亚当的脸

```
Change: the sleeping Adam's face takes on the same smooth, pale porcelain sheen with extremely fine seam lines under the skin, visible only up close. His closed eyes, features, hair and the way his head rests stay exactly as in the original.
```

检查：眼睛仍闭着；瓷光和前两张一致。

## 06-fruit · 果子

```
Change: the fruit being passed between the two hands among the leaves glows softly with the cold light, lighting the fingers around it. The hands, the leaves and the arm above are untouched.
```

检查：发光的只有果子；手和叶子没变。

## 06-horizon · 地平线

```
Change: on the far horizon line where the green ground meets the pale sky, a faint, hazy skyline of a modern city appears: low towers and blocks, very small and far away, painted in the same muted fresco tones as the sky, barely visible. Nothing else changes.
```

检查：城市很淡、很小，要找一下才看得见；不能是清晰的照片感。

## 07-fire · 祭坛的火

```
Change: the flames on the altar burn with the cold light instead of an orange flame, with the same shape and size, softly lighting the hands and red robe just above them. Everything else is untouched.
```

检查：火的形状和大小没变，只是颜色成了冷光。

## 07-wood · 那捆柴

```
Change: the bundle of long firewood logs being carried becomes a bundle of rolled manuscripts, rolled drawings and long old craftsman's tools (a long rule, brush handles, a set square), tied the same way and occupying exactly the same outline. The young man carrying it is untouched.
```

检查：整捆的轮廓、大小、位置没变；人没变。

## 08-water · 洪水水面纹理（不用上传，直接发）

```
Create a seamless, tileable square texture of flood water painted in fresco, in the style of the water in Michelangelo's "The Deluge" on the Sistine Chapel ceiling: pale grey-blue and greenish-grey, flat and slightly choppy, with fresco grain and fine plaster cracks. From a distance it must read simply as that muted water. Up close, its surface is made of countless tiny fragments packed together like fish scales: small pictures, scraps covered in illegible marks, shards, all in the same muted water tones. No readable text, no figures, no objects, no border. Even, flat lighting. Square 1:1.
```

检查：缩小看就是一片灰蓝的水；放大看是碎片拼成的；四边能无缝拼接。

## 09-jug · 陶壶

```
Change: the wine inside the clay jug glows with the cold light, showing at its mouth and faintly through the clay, softly lighting the cloth beside it. The jug's shape is untouched.
```

## 09-bowl · 浅碗

```
Change: the wine in the shallow bowl glows with the cold light, softly lighting the bowl's rim. The bowl's shape is untouched.
```

## 09-vat · 大酒桶

```
Change: a faint glow of the cold light rises from inside the large wooden wine vat, lighting its top rim from within. The vat's shape, the hand and the cloth are untouched.
```

检查（09 三张）：发光的只有酒；器物的形状没变；三张的光颜色一致。
