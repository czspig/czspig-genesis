// 九格的文案和参数。按故事顺序排（1 → 9），参观顺序相反（9 → 1）。
// origin：转场从哪里开始，用拉正后原作上的比例坐标 (0–1)；mode 'rise' 表示从底部往上涨。
// 经文：中文和合本（1919），英文 KJV，均为公有领域。

export const PANELS = [
  {
    key: '01', origin: [0.86, 0.5],
    ref: { zh: '创 1:4', en: 'Genesis 1:4' },
    title: { zh: '神分开光与暗', en: 'The Separation of Light from Darkness' },
    verse: {
      zh: '神说：“要有光”，就有了光。神看光是好的，就把光暗分开了。',
      en: 'And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.',
    },
    about: {
      zh: '故事的第一天。神在混沌里拧转身体，双手把光和暗推向两边。这是米开朗基罗最后画到的一格，从正下方仰视，据说一天就画完了。在原作里，这是一切秩序的开端：有了分别，世界才开始。',
      en: 'The first day. God twists in the chaos and pushes light and darkness apart with both hands. It was the last bay Michelangelo reached, seen from directly below, and is said to have been painted in a single day. In the original this is where all order begins: the world starts with a division.',
    },
    meaning: {
      zh: '神没有动，变的只有被推开的光：它成了屏幕那样的冰青色冷光。光与暗就是 1 与 0，一切计算都从这样一次分开开始。走到天顶尽头，人造的东西越来越少，只剩起点上的这一道光。',
      en: 'God is untouched; only the light he pushes away has changed. It is now the icy, cold glow of a screen. Light and darkness are one and zero, and all computation begins with a division like this. At the far end of the ceiling, the made things fall away and only this first light remains.',
    },
  },
  {
    key: '02', origin: [0.44, 0.15],
    ref: { zh: '创 1:16', en: 'Genesis 1:16' },
    title: { zh: '造日月草木', en: 'The Creation of the Sun, Moon and Plants' },
    verse: {
      zh: '于是神造了两个大光，大的管昼，小的管夜，又造众星。',
      en: 'And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.',
    },
    about: {
      zh: '神在同一格里出现两次：迎面飞来，一手指日、一手指月；背过身飞走，指向左下的一株绿芽。原作里，日月是为了“作记号，定节令、日子、年岁”：天上有了光，时间才有了刻度。',
      en: 'God appears twice in one bay: flying towards us, pointing at the sun and the moon; and seen from behind, flying away towards a green shoot in the corner. In the original the lights are set in the sky “for signs, and for seasons, and for days, and years”: with light, time gets its measure.',
    },
    meaning: {
      zh: '太阳成了一片发光的硅晶圆，月亮成了一张硬盘盘片，草芽成了一束光纤。新时代的大光是算力，小光是存储：一个照亮，一个记住。时间的刻度，也从昼夜换成了时钟周期。',
      en: 'The sun is now a glowing silicon wafer, the moon a hard-disk platter, the shoot a bundle of optical fibre. The greater light of this age is compute and the lesser is storage: one illuminates, the other remembers. Time is no longer measured in days and nights but in clock cycles.',
    },
  },
  {
    key: '03', origin: [0.91, 0.5],
    ref: { zh: '创 1:9', en: 'Genesis 1:9' },
    title: { zh: '神分开水陆', en: 'The Separation of Land and Water' },
    verse: {
      zh: '神说：“天下的水要聚在一处，使旱地露出来。”事就这样成了。',
      en: 'And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.',
    },
    about: {
      zh: '神张开双臂，从水面上迎面飞来，像要把整片水按住。一般认为画的是“使旱地露出来”，也有人认为是神在创造水中的活物。原作里，这是对混沌的第一次整理：水聚到一处，大地才有地方安放。',
      en: 'God flies towards us over the water with open arms, as if to hold the whole sea down. It is usually read as the gathering of the waters so that dry land appears; some read it as the creation of the creatures of the sea. In the original this is the first ordering of chaos: the waters are gathered so the earth has a place.',
    },
    meaning: {
      zh: '神不改，海里多了发光的光缆。神的手掌下面，光缆排成整齐的平行线；远一点的地方，它们仍乱成一团。在一片杂乱的数据里理出纹路，正是训练在做的事。秩序只出现在手到过的地方。',
      en: 'God is unchanged; the sea is now threaded with glowing cables. Under his hands they run in calm parallels; further off they are still a tangle. Drawing patterns out of a disordered sea of data is exactly what training does. Order appears only where the hand has passed.',
    },
  },
  {
    key: '04', origin: [0.384, 0.44],
    finger: { from: [0.368, 0.4385], to: [0.4, 0.4385] },
    // 在 AI 图（1536×1024）上量的坐标：机器人的指尖 → 马斯克的指尖
    ai: { origin: [0.376, 0.467], finger: { from: [0.3717, 0.4707], to: [0.3809, 0.4634] } },
    ref: { zh: '创 2:7', en: 'Genesis 2:7' },
    title: { zh: '创造亚当', en: 'The Creation of Adam' },
    verse: {
      zh: '耶和华神用地上的尘土造人，将生气吹在他鼻孔里，他就成了有灵的活人。',
      en: 'And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.',
    },
    about: {
      zh: '天顶上最有名的一格。亚当已经有了身体，却还没有力气，手指垂着；神被天使簇拥着裹在红斗篷里，伸指要把生命传过去。有人说那斗篷的轮廓像一个人脑。原作的意思是：人照着神的形像被造，生命和灵魂从神那里来。',
      en: 'The most famous bay of the ceiling. Adam has a body but no strength yet, his finger hanging; God, borne by angels inside a red mantle some have read as the outline of a brain, reaches out to pass on life. Its meaning: man is made in the image of God, and life and soul come from him.',
    },
    meaning: {
      zh: '神的位置换成了马斯克，簇拥他的天使换成了年轻工程师；斜躺在山坡上的，是一台还没开机的瓷白人形机器。造物的不再是神，是一个人和他身后的一整个团队。两根手指之间仍差一点：生命或意识到底有没有传过去，这一格不回答。',
      en: 'Elon Musk takes the place of God, and the angels around him become young engineers; on the hillside lies a porcelain-white humanoid machine, not yet switched on. The maker is no longer God but a man and the team behind him. The fingers still do not meet: whether life, or mind, passes across is a question this bay leaves open.',
    },
  },
  {
    key: '05', origin: [0.17, 0.57], glow: [0.17, 0.57, 70, 0.9],
    ai: { origin: [0.208, 0.674], glow: [0.208, 0.674, 70, 0.9] }, // AI 图上沉睡机器人侧腹打开的那块面板
    ref: { zh: '创 2:21', en: 'Genesis 2:21' },
    title: { zh: '创造夏娃', en: 'The Creation of Eve' },
    verse: {
      zh: '耶和华神使他沉睡，他就睡了。于是取下他的一条肋骨，又把肉合起来。',
      en: 'And the LORD God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof.',
    },
    about: {
      zh: '亚当靠着枯树桩沉睡，夏娃从他身边起身，合掌望向神，神抬手召唤她。这一格在九格的正中。原作里，夏娃取自亚当的肋骨，是“骨中的骨”；神学上也常把她看作从基督肋旁诞生的教会的预表。',
      en: 'Adam sleeps against a dead stump while Eve rises from his side, hands joined towards God, who raises a hand to call her. It is the central bay of the nine. In the original Eve is taken from Adam’s rib, “bone of my bones”; theologians also read her as a figure of the Church, born from the side of Christ.',
    },
    meaning: {
      zh: '召唤的人换成了奥特曼。沉睡的是上一格那台机器，侧腹的面板被打开，一根线缆连到新的那一台；起身的更新，也更亮。新模型从上一代里取出：用旧模型的输出训练新模型，数据喂养数据。被取走的那一台，没有醒。',
      en: 'Sam Altman now does the calling. The sleeper is the machine from the bay before, a panel open in its side and a cable running to the new one, which rises sleeker and brighter. New models are drawn from old ones, trained on what the previous generation produced: data fed on data. The one it was taken from does not wake.',
    },
  },
  {
    key: '06', origin: [0.35, 0.26],
    ref: { zh: '创 3:22', en: 'Genesis 3:22' },
    title: { zh: '原罪与逐出乐园', en: 'The Fall and Expulsion from Paradise' },
    verse: {
      zh: '耶和华神说：“那人已经与我们相似，能知道善恶。”',
      en: 'And the LORD God said, Behold, the man is become as one of us, to know good and evil.',
    },
    about: {
      zh: '一棵树把画面劈成两半。左边，长着女人上身的蛇把果子递下来，亚当不等，自己伸手去摘；右边，天使举剑把两人赶出乐园，他们一下子老了。原作讲的是人想“如神能知道善恶”，代价是失去乐园，从此要劳作、会死去。',
      en: 'A tree splits the scene. On the left the serpent, with a woman’s body, hands down the fruit, and Adam reaches into the branches himself; on the right an angel with a sword drives the pair out, suddenly aged. The original is about wanting to “be as gods, knowing good and evil”, and the price: paradise lost, labour and death.',
    },
    meaning: {
      zh: '蛇成了缠着线缆的机器，递出一颗光做的果子，男人照样自己伸手去够。举剑守在门口的是达里奥·阿莫迪，他的公司把 AI 安全当作主张，手里握的是一把冷光剑：知识可以拿，边界得有人守。只是被逐出的两个人，一个抬手挡着剑光，手机却没放下，一个低头盯着屏幕，好像并不觉得失去了什么。',
      en: 'The serpent is a machine wound in cables, offering an apple made of light, and the man still reaches for it himself. Guarding the gate with a sword of cold light is Dario Amodei, whose company makes AI safety its cause: the knowledge may be taken, but someone must hold the line. Yet of the two driven out, one raises a hand against the light without letting go of his phone, and the other stares at her screen, as if nothing had been lost.',
    },
  },
  {
    key: '07', origin: [0.57, 0.34],
    ref: { zh: '创 8:20', en: 'Genesis 8:20' },
    title: { zh: '挪亚献祭', en: 'The Sacrifice of Noah' },
    verse: {
      zh: '挪亚为耶和华筑了一座坛，拿各类洁净的牲畜、飞鸟献在坛上为燔祭。',
      en: 'And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.',
    },
    about: {
      zh: '洪水退去，挪亚一家围着祭坛献燔祭：有人吹火，有人抱柴，有人按住祭羊。神闻了香气，与人立约，不再用洪水毁灭世界。这一格被画在大洪水之前，打乱了故事的顺序，一般认为是因为洪水需要更大的画格。',
      en: 'After the Flood, Noah’s family gathers at the altar: one blows on the fire, one carries wood, one holds down the ram. God smells the offering and makes a covenant never again to destroy the world by water. The bay stands before the Flood, out of order, usually explained by the Flood needing the larger field.',
    },
    meaning: {
      zh: '站在祭坛后的是黄仁勋，坛上燃着的是一块 GPU。工人在接电源、扛线缆和机柜，有人把成摞的手稿和画作推向祭坛。这一轮造物烧的是电，喂进去的是人写过、画过的一切。献祭被画在洪水之前，就像代价总在后果到来之前就已付清。',
      en: 'Behind the altar stands Jensen Huang, and on it burns a GPU. Workers plug in power, haul cables and servers, and push stacks of manuscripts and paintings towards the altar. This round of creation burns electricity and is fed with everything people have written and painted. The sacrifice comes before the Flood, as the price is so often paid before the consequence arrives.',
    },
  },
  {
    key: '08', mode: 'rise', lens: true,
    ref: { zh: '创 7:23', en: 'Genesis 7:23' },
    title: { zh: '大洪水', en: 'The Deluge' },
    verse: {
      zh: '凡地上各类的活物，连人带牲畜、昆虫，以及空中的飞鸟，都从地上除灭了，只留下挪亚和那些与他同在方舟里的。',
      en: 'And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and Noah only remained alive, and they that were with him in the ark.',
    },
    about: {
      zh: '米开朗基罗最早画的大场面之一。人们背着家当往高处逃，船上有人举棍把别人打下去，一群人挤在礁石上的帐篷下，方舟在远处，门口已经没有位置。原作讲的是审判与拣选：洪水是惩罚，方舟只救少数人。',
      en: 'One of the first great scenes Michelangelo painted. People carry their belongings to high ground, a man clubs others off an overloaded boat, a crowd huddles under a tent on a rock, and the ark waits in the distance with no room at its door. The original is about judgement and the chosen: the Flood punishes, the ark saves only a few.',
    },
    meaning: {
      zh: '人都换了现代衣服，背着电脑、显示器和服务器逃；水里漂满发光的屏幕和纸页，好像洪水本身就是图像和文字。方舟成了一座没有窗的数据中心，门口亮着一盏冷光。涌来的东西谁也挡不住；上哪条船、带走什么、把谁推下去，仍是人自己的选择。',
      en: 'Everyone now wears modern clothes and flees with laptops, monitors and servers; the water is full of glowing screens and pages, as if the flood itself were made of images and text. The ark is a windowless data centre with one cold light at its door. No one can hold back what is rising; which boat to board, what to carry, whom to push off, remain our own choices.',
    },
  },
  {
    key: '09', origin: [0.2, 0.78],
    ref: { zh: '创 9:21', en: 'Genesis 9:21' },
    title: { zh: '挪亚醉酒', en: 'The Drunkenness of Noah' },
    verse: {
      zh: '挪亚作起农夫来，栽了一个葡萄园。他喝了园中的酒便醉了，在帐棚里赤着身子。',
      en: 'And Noah began to be an husbandman, and he planted a vineyard: And he drank of the wine, and was drunken; and he was uncovered within his tent.',
    },
    about: {
      zh: '离入口最近的一格，米开朗基罗从这里画起。挪亚第一个种葡萄、酿酒，醉倒在酒桶旁；一个儿子指着他，另两个替他盖上衣服，背景里他还在挥锄。按新柏拉图主义的读法，这里是人离神最远的地方，观者从这里出发，一路走回创世。',
      en: 'The bay nearest the entrance, where Michelangelo began. Noah, the first to plant a vineyard and make wine, lies drunk by the vat; one son points, the other two cover him, and in the background he is still digging. In a Neoplatonic reading this is where man is farthest from God, and the viewer sets out from here on the way back to creation.',
    },
    meaning: {
      zh: '醉倒的是一个无名的老创业者，西装皱着，睡在机柜旁，脚边一个空杯子、一只咖啡杯；年轻员工替他盖上外套，有人指着他。背景里那个埋光缆的人，是醉倒之前的他。人先被自己造出来的东西灌醉；他醒来之前，是替他遮盖还是指点，由下一代决定。',
      en: 'The drunk is an anonymous old founder in a rumpled suit, asleep by a server cabinet with an empty glass and a coffee cup at his feet; young employees cover him with a jacket while one points. The man laying cable in the background is who he was before he fell. We are intoxicated first by what we make; whether to cover him or point at him before he wakes is for the next generation to decide.',
    },
  },
];

export const UI = {
  zh: {
    title: '新创世纪',
    sub: '西斯廷礼拜堂天顶 · 1508—1512 ／ 2026',
    lead: '从入口走向祭坛，故事一路倒退回创世之初。',
    scroll: '向下滚动，抬头',
    hold: '按住画面，看原作',
    origLabel: '原作 · 米开朗基罗，1512',
    nowLabel: '今作 · 二〇二六',
    pending: '待绘',
    finger: '拖动左边那根手指',
    lens: '移到水面上，凑近看',
    toc: '目录',
    music: '音乐',
    lang: 'EN',
    credits: '图片来源',
    top: '回到入口',
    close: '关闭',
    // TODO：结尾那句话还没定，这是占位
    ending: '第八日，轮到我们。',
    creditsBody: [
      '原作：米开朗基罗，西斯廷礼拜堂天顶《创世纪》，1508—1512，公有领域。',
      '图片来自 Wikimedia Commons。天顶全景（CAPPELLA SISTINA Ceiling.jpg）与第 1、7 格照片（Vaticano 2011 (52)、(127)，摄影 Jorge Valenzuela A）采用 CC BY-SA 3.0；其余各格为公有领域。',
      'AI 版由 ChatGPT 依原作改绘。由 CC BY-SA 照片改绘的部分同样以 CC BY-SA 3.0 发布。',
      '画中的马斯克、黄仁勋、奥特曼、达里奥·阿莫迪是艺术再创作，不代表本人的观点，也与本人无关。',
      '经文：中文和合本（1919）；英文 King James Version。',
    ],
  },
  en: {
    title: 'Genesis, Retold',
    sub: 'The Sistine Chapel ceiling · 1508–1512 / 2026',
    lead: 'Walk from the entrance to the altar, and the story runs backwards to the first day.',
    scroll: 'Scroll down, and look up',
    hold: 'Press and hold to see the original',
    origLabel: 'The original · Michelangelo, 1512',
    nowLabel: 'Retold · 2026',
    pending: 'Not yet painted',
    finger: 'Drag the finger on the left',
    lens: 'Move over the water to look closer',
    toc: 'Contents',
    music: 'Music',
    lang: '中',
    credits: 'Image credits',
    top: 'Back to the entrance',
    close: 'Close',
    ending: 'On the eighth day, it is our turn.',
    creditsBody: [
      'Original: Michelangelo, Genesis, Sistine Chapel ceiling, 1508–1512. Public domain.',
      'Images from Wikimedia Commons. The ceiling panorama (CAPPELLA SISTINA Ceiling.jpg) and the photographs of bays 1 and 7 (Vaticano 2011 (52), (127), by Jorge Valenzuela A) are CC BY-SA 3.0; the other bays are public domain.',
      'The AI versions were repainted from the originals with ChatGPT. Parts derived from CC BY-SA photographs are likewise released under CC BY-SA 3.0.',
      'Elon Musk, Jensen Huang, Sam Altman and Dario Amodei appear here as an artistic reinterpretation; the images do not represent their views and are not endorsed by them.',
      'Scripture: Chinese Union Version (1919); King James Version.',
    ],
  },
};
