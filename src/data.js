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
      zh: '这是米开朗基罗最后画到的一格，却是故事的第一格。越往祭坛画，他下笔越放得开：这里只剩神一个人，从正下方望上去，身体在混沌里拧转，把光和暗推向两边。',
      en: 'The last bay Michelangelo reached, and the first scene of the story. The closer he came to the altar, the freer his hand: here only God remains, seen from directly below, twisting in the chaos as he pushes light and darkness apart.',
    },
    meaning: {
      zh: '光与暗，就是 1 与 0。一切计算都从这样一次分开开始：是或否，有或无。走到这里，故事退回了起点。',
      en: 'Light and darkness are one and zero. All computation begins with a division like this: yes or no, something or nothing. Here the story has walked back to its beginning.',
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
      zh: '同一格里，神出现了两次：正面朝你飞来，一手指日、一手指月；背面飞向深处，指着左下角一株小小的绿芽。',
      en: 'God appears twice in the same bay: flying towards you, one hand at the sun and one at the moon; and seen from behind, flying away into depth, pointing at a small green shoot in the lower corner.',
    },
    meaning: {
      zh: '先有光，再有让光不灭的东西。日月成了电与芯片，草木成了在数据里生长的网络。同一刻在两处创造，本身就是并行。',
      en: 'First light, then whatever keeps it burning. Sun and moon become power and silicon; the plants become networks growing through data. To create in two places at the same moment is already parallel computing.',
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
      zh: '神张开双臂迎面飞来，身下是一片灰色的水。从混沌里分出水和陆，是创世里第一次“整理”。',
      en: 'God flies towards us with open arms above a grey expanse of water. Dividing sea from land out of chaos is the first act of putting the world in order.',
    },
    meaning: {
      zh: '训练做的正是这件事：在一片杂乱的海里，理出纹路。秩序只出现在被手触到的地方。',
      en: 'This is what training does: it draws patterns out of a disordered sea. Order appears only where the hand has passed.',
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
      zh: '天顶上最有名的一格。亚当斜躺在山坡上，手指无力地垂着；神裹在红色斗篷里伸出手。有人说那斗篷的轮廓像一个人脑。两根手指之间，留着一道缝。',
      en: 'The most famous bay of the ceiling. Adam reclines on the hillside, his finger limp; God reaches out from a red mantle that some have read as the outline of a human brain. Between the two fingers, a gap remains.',
    },
    meaning: {
      zh: '当年是神把气吹进人的鼻孔；如今是人伸出手指，要把生气通进一台机器。那道缝始终没有合上。它是距离，也像一个一直在转的“思考中”。',
      en: 'Once God breathed into the nostrils of man; now a man reaches out to pass that breath into a machine. The gap never closes. It is a distance, and it looks like a spinner that never stops: thinking…',
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
      zh: '亚当靠着一截枯树桩沉睡，夏娃从他身边起身，朝神合掌。',
      en: 'Adam sleeps against a dead tree stump while Eve rises from his side, her hands joined towards God.',
    },
    meaning: {
      zh: '新的存在从上一个存在身上取出：模型生出模型，数据喂养数据。被取走的那一个，没有醒。',
      en: 'A new being is taken out of the one before it: models born of models, data fed on data. The one it was taken from does not wake.',
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
      zh: '一棵树把画面劈成两半。左边，长着女人上身的蛇递出果子，亚当没有等，自己伸手去摘；右边，天使举剑，把两人赶出乐园。',
      en: 'A tree splits the scene in two. On the left the serpent, with the body of a woman, hands down the fruit while Adam reaches into the branches himself; on the right an angel with a sword drives the pair out of paradise.',
    },
    meaning: {
      zh: '“能知道善恶”，就是今天说的对齐。这一次递出果子的是机器，举剑守在门口的，是造机器的人。被逐出乐园的两个人没有回头，他们在看手里的屏幕。',
      en: 'To know good and evil is what we now call alignment. This time the fruit is offered by a machine, and the one guarding the gate with a sword is one of those who build machines. The two driven out do not look back: they are looking at the screens in their hands.',
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
      zh: '挪亚一家围着祭坛：有人低头吹火，有人抱柴，有人按住献祭的羊。这一格排在大洪水之前，打乱了故事的顺序；它画的究竟是谁的献祭，历来有争议。',
      en: 'Noah’s family gathers at the altar: one blows on the fire, one carries wood, one holds down the sacrificial ram. The bay stands before the Flood, out of the story’s order, and whose sacrifice it shows has long been debated.',
    },
    meaning: {
      zh: '为了这一切，我们往火里放进了什么？手稿、画作、手艺，还有日夜不熄的电。代价往往在事情发生之前，就已经付了。',
      en: 'What have we fed into the fire for all this? Manuscripts, paintings, crafts, and power that never sleeps. The price is often paid before the event.',
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
      zh: '米开朗基罗在天顶上最早画的大场面之一。人们背着家当往高处逃，有人举棍把别人打下船，方舟在远处。人物又小又挤，那时他还没有放开手。',
      en: 'One of the first great scenes Michelangelo painted on the ceiling. People carry their belongings to high ground, a man clubs others away from an overloaded boat, the ark waits in the distance. The figures are small and crowded; his hand had not yet loosened.',
    },
    meaning: {
      zh: '涌来的不只是水，还有一夜之间多出来的千万张图、千万段话。逃的时候带走什么，把谁推下船，方舟上装什么，都是人自己的选择。',
      en: 'What rises is not only water but the millions of images and words that appeared overnight. What we carry as we flee, whom we push from the boat, what goes into the ark: these remain our own choices.',
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
      zh: '离入口最近的一格，米开朗基罗从这一头开始画。挪亚是第一个种葡萄、酿酒的人；画里他醉倒在酒桶旁，一个儿子指着他，另外两个扭过头去，替他盖上衣服。背景里，他还在挥锄挖地。',
      en: 'The bay nearest the entrance, where Michelangelo began. Noah was the first to plant a vineyard and make wine; here he lies drunk beside the vat, one son pointing at him while the other two turn their faces away and cover him. In the background he is still digging the soil.',
    },
    meaning: {
      zh: '第一个造出酒的人，被自己的发明灌醉了。旁人有的指点，有的不忍看，默默替他遮上。背景里那个还在劳动的人，是醉倒之前的他，也是 2026 年的我们。',
      en: 'The first man to make wine is overcome by his own invention. Some point; others cannot look, and quietly cover him. The man still working in the background is who he was before he fell, and who we are in 2026.',
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
