# 《新创世纪》ChatGPT 整格重绘提示词

九格每格重画一整张，**一共 9 张图**。构图照原作，人物换成 AI 机器和这个时代的人；所有人都穿衣服，不画裸体。

（旧的局部改图方案留在 `PROMPTS-local.md`，已不再使用。）

## 选角

| 格 | 原作 | 新画面 | 真人 |
|---|---|---|---|
| 1 分开光暗 | 神在混沌里分开光与暗 | 神不改，光变成屏幕的冷光 | — |
| 2 造日月草木 | 神造日月、指向草木 | 神不改，太阳变成发光的硅晶圆，月亮变成硬盘盘片，草木变成光纤芽 | — |
| 3 分开水陆 | 神在水面上 | 神不改，水里穿过发光的海底光缆 | — |
| 4 创造亚当 | 神伸指，亚当将醒 | 马斯克在神的位置伸出手指，被造的亚当是一台瓷白人形机器，两指仍差一点 | **马斯克** |
| 5 创造夏娃 | 神召唤夏娃从亚当身边起身 | 奥特曼在神的位置召唤；沉睡的是第 4 格那台机器，起身的是更新的一台 | **奥特曼** |
| 6 原罪与逐出 | 蛇递果子；天使举剑逐出 | 蛇变成缠着线缆的 AI，递出一颗光做的果子；举剑的天使是达里奥，手里是一把冷光剑；被逐出的普通人低头看手机 | **达里奥·阿莫迪** |
| 7 挪亚献祭 | 挪亚在祭坛前，家人生火、抱柴、按住羊 | 黄仁勋站在祭坛后，坛上燃着的是一块 GPU；工人接电源、扛机柜、把手稿往火里送 | **黄仁勋** |
| 8 大洪水 | 众人逃水，方舟在远处 | 普通人扛着电脑和服务器逃，水里漂满发光的屏幕和纸页，方舟是一座数据中心 | — |
| 9 挪亚醉酒 | 挪亚醉倒，儿子们为他遮盖 | 一个无名的老创业者西装皱着睡倒在墙边，年轻员工为他披上外套；酒桶变成机柜 | — |

真人只放在体面的位置：创造、召唤、守门、献祭。醉倒、逃难、被逐出的都是无名的人。

## 出图步骤（每张都一样）

上传图在 `art-src/upload-full/`：`0X.png` 是原作（上下补了灰边），`0X-blur.png` 是同一张图的大幅模糊版，只剩构图和色块。

1. **每格开一个新对话**，免得上一格的画风串进来。
2. 上传 `art-src/upload-full/0X.png`。
3. 把下面的「**统一前缀**」和「**这一格的提示词**」连在一起，作为一条消息发出去。
4. 出图后按「**五项检查**」看一遍。哪里不对，就在同一个对话里直接说，比如“马斯克的手指再往右一点，但不要碰到”“把背景里的文字去掉”。
5. **如果因为裸体被拒**：开新对话，改传 `0X-blur.png`，提示词不变，最前面加一句：
   `The attached image is a deliberately blurred composition guide: follow only its layout and colour masses.`
6. 满意了就下载，**改名为 `0X.png`**（例如 `04.png`），放进 `art-src/ai-full/`。
7. 告诉我，或者自己运行 `npm run art`，再用 `npm run dev` 打开网页看效果。程序会自动把灰边裁掉，并对齐到画格。

建议先出 **04**（最有名，也最考验构图），满意后出 07、05、06，最后出 1、2、3、8、9。

## 五项检查

1. **构图对得上**：把新图和原作并排缩小看，人物的位置、姿势、大小基本一致。第 4 格两根手指的位置尤其要对，网页的拖手指交互是按原作的位置做的。
2. **真人认得出**：长相和穿着对（马斯克黑 T 恤，黄仁勋黑皮衣，奥特曼灰毛衣，达里奥卷发眼镜）。
3. **没有裸体，也没有文字**：没有任何裸露，也没有字、logo、品牌名或水印。
4. **冷光只用一种颜色**：只有淡冰青色一种，而且只出现在数字或电的东西上，不泛滥。
5. **像湿壁画**：粉质、哑光，有细裂纹，不能像照片或 3D 渲染。

## 统一前缀（每次都贴在最前面）

```
Repaint the attached image as a new fresco panel for the Sistine Chapel ceiling, as if painted by Michelangelo himself in 1512.

Keep the exact composition: every figure, gesture and main shape stays in the same place, at the same scale, in the same pose. Only the content described below changes.

Style: true buon fresco on lime plaster. Matte, chalky pigments; Michelangelo's sculptural anatomy and heavy drapery; the palette of the restored ceiling (lilac, ochre, pale green, rose, slate blue); fine craquelure; soft even light. Everything, including modern people, machines and objects, is painted in this fresco style, never photographic and never 3D-rendered.

All people are fully clothed. No nudity anywhere.

The grey bands at the edges are not part of the picture: extend the scene naturally into them.

The only new colour is a single cold light, pale icy cyan (#DDF6FF fading to #8FD8F0). Use it sparingly, only for things that are digital or electric.

Wherever a machine appears, it is the same design: a humanoid with a smooth porcelain-white shell, slender human proportions, faint seams glowing pale icy cyan, and a calm, featureless oval face.

No text, letters, logos, brand names, watermarks or frame. Landscape 3:2.
```

## 九格提示词

### 01 · 神分开光与暗

```
God, exactly as Michelangelo painted him, twisting upward in the chaos and pushing light and darkness apart: keep God completely unchanged. Change only the light. The bright side he pushes away becomes cold digital light, the pale icy cyan glow of a screen, with a faint fine grid of pixels dissolving into the plaster at its edges. The dark side stays deep brown-grey chaos.
```

### 02 · 造日月草木

```
Keep both figures of God unchanged: the one flying towards us and pointing at the sun and moon, and the one seen from behind flying away. Clothe the small cherubs beside God in simple pale tunics. The sun becomes a large round silicon wafer, its surface a fine grid of tiny chips, glowing gold-white with an icy cyan rim. The moon becomes a smaller pale grey disc like a hard-drive platter. The small green plant at the lower left becomes a sprouting bundle of green fibre-optic strands with softly glowing tips.
```

### 03 · 神分开水陆

```
Keep God and the small figures around him unchanged; clothe any of the small figures in simple pale tunics. The grey water beneath him becomes a dark sea threaded with undersea cables and fibre-optic lines glowing faint icy cyan. Directly under his hands the lines run in calm, orderly parallels towards the horizon; further away they stay tangled and chaotic.
```

### 04 · 创造亚当（马斯克）

```
Right side: the figure of God flying inside the billowing red mantle and reaching out with one index finger becomes Elon Musk, a clearly recognisable likeness, in a plain black T-shirt and dark trousers. Same flying pose, same outstretched arm and finger. The figures carried with him inside the red mantle become young engineers in plain clothes and hoodies, holding him up. Keep the red mantle's shape.

Left side: the reclining figure on the green slope, in Adam's exact pose with his limp hand stretched out, becomes the porcelain-white humanoid machine, lying still, its seams only barely lit, as if not yet switched on.

The two index fingers must NOT touch. Keep exactly the same small gap between them, with the faintest cold cyan glow inside the gap. Keep the green slope and the pale sky.
```

### 05 · 创造夏娃（奥特曼）

```
Right: the standing robed figure of God, raising one hand to summon, becomes Sam Altman, a clearly recognisable likeness, in a plain grey crewneck sweater and dark trousers. Same position, same raised hand.

Left: the sleeping figure slumped against the dead tree stump (Adam) becomes the porcelain-white humanoid machine, powered down, head fallen to one side. A small panel in its side, at the ribs, stands open, with a thin cable leading out of it.

Centre: the figure rising from his side with hands raised in prayer (Eve) becomes a newer, sleeker porcelain-white humanoid machine in the same pose, its seams glowing icy cyan, looking up at the man.

Keep the tree stump, the rock, the sea and the sky.
```

### 06 · 原罪与逐出乐园（达里奥）

```
A tree in the centre divides the scene in two.

Left half: the serpent coiled around the trunk, with a woman's upper body, handing down the fruit, becomes a coil of black data cables wound around the trunk, ending in the upper body of the porcelain-white humanoid machine. It hands down a glowing apple made of icy cyan light. The man and woman below, reaching for it, become an ordinary modern couple in casual clothes (hoodie, jeans, trainers); the man reaches into the branches himself.

Right half: the angel hovering above with a sword, driving the couple out of the garden, becomes Dario Amodei, a clearly recognisable likeness, with dark curly hair and glasses, in a plain navy sweater under a red draped cloak like the angel's. Same floating position, same gesture. Instead of a metal blade he holds a sword of cold cyan light. Below him, the same couple walks away bent and ashamed, now staring down at the glowing phones in their hands.

Keep the garden on the left and the barren land on the right.
```

### 07 · 挪亚献祭（黄仁勋）

```
Centre back: the old bearded man behind the altar, raising his hand (Noah), becomes Jensen Huang, a clearly recognisable likeness, with silver-grey hair, in his black leather jacket. Same position, same gesture.

On the altar, instead of fire, a large graphics processor card glows from within with icy cyan light, with heat haze rising above it.

The family around the altar become workers in plain modern work clothes, in the same poses. The one kneeling and blowing on the fire now kneels to plug a thick power cable into the altar. The one carrying firewood on his shoulder now carries a bundle of cables and a server blade. The one holding down the ram now holds down a stack of old manuscripts and paintings being pushed towards the altar. The women at the side watch.

The sacrificial animals become boxes of hardware and piles of paper manuscripts.
```

### 08 · 大洪水

```
All figures become ordinary modern people in modern clothes, in the same poses and places. On the higher ground at the left they carry laptops, monitors, server boxes, children and bundles of paper. On the rock at the right they huddle under the makeshift tent. The overloaded boat in the middle stays a small boat full of people in modern clothes, one raising a stick to keep others off.

The rising flood water is dark and full of floating screens, phones and loose pages that glow faintly icy cyan, as if the water itself were made of images and text.

The ark in the distance becomes a windowless grey data-centre building floating on a barge, with a single cold cyan light at its door.

Keep the dead tree, the rocks and the stormy sky.
```

### 09 · 挪亚醉酒

```
Left background: the man digging the earth becomes a worker in shirt sleeves laying a cable into a trench.

Centre: the old man lying drunk on the floor (Noah) becomes an anonymous elderly founder, not resembling any real person, asleep and slumped against the wall after a long night. He wears a rumpled grey suit and a loosened tie and is fully clothed; an empty glass lies beside him.

Right: the three young men (his sons) become three young employees in hoodies and T-shirts, in the same poses. One looks away while draping a jacket over the old man, one points, one hesitates.

The great wine vat behind them becomes a tall server cabinet with small icy cyan indicator lights. The jug and bowl in the foreground become a glass carafe and an empty coffee cup.
```
