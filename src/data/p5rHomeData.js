/** 官网页面外链（跳转用） */
export const P5 = "https://p5r.jp";

/**
 * 静态资源 URL：将文件放到 public/resources/…（与官网路径一致）。
 * 批量下载：在项目根目录执行 npm run download-p5r
 */
export const img = (assetPath) => {
  if (!assetPath) return "";
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const base = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== "."
    ? String(process.env.PUBLIC_URL).replace(/\/$/, "")
    : "";
  const p = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const out = `${base}${p}`;
  return out.replace(/([^:]\/)\/+/g, "$1");
};

export const newsItems = [
  {
    date: "2026.01.22",
    text: "《女神异闻录5 皇家版 & P5X》×「motto cafe大阪」联动决定！2026年2月11日（周三）至3月8日（周日）举办！",
  },
  {
    date: "2025.10.06",
    text: "《女神异闻录3 Reload》《女神异闻录5 皇家版》× R Baker 联动，全国15店限期举办！",
  },
  {
    date: "2025.09.24",
    text: "《女神异闻录5 皇家版》「摩尔加纳」高级金属手办化！预约受理中！",
  },
];

/** 轮播 8 枚：仅缩略图（画廊区展示） */
export const carouselSlides = [
  { tmb: "/resources/img/top/carousel_ss1_tmb_a1c749a52fc99fc0f63c1c5cff223656.png" },
  { tmb: "/resources/img/top/carousel_ss2_tmb_6cc0a0f9f66f67f9e2d37e1baee56452.png" },
  { tmb: "/resources/img/top/carousel_ss3_tmb_585fe5d11b1e5f3b3316780a8c49a450.png" },
  { tmb: "/resources/img/top/carousel_ss4_tmb_dfb7abb6552e09f60669184347ee461f.png" },
  { tmb: "/resources/img/top/carousel_ss5_tmb_fc6b13e9f09b14cd53f81fc4be7db1fe.png" },
  { tmb: "/resources/img/top/carousel_ss6_tmb_5611192fc25779ac334d1bc5b56dbf44.png" },
  { tmb: "/resources/img/top/carousel_ss7_tmb_87be93115111064a6dce99757001e001.png" },
  { tmb: "/resources/img/top/carousel_ss8_tmb_0b565fee69ce539523e663679991aa95.png" },
];

/** 游戏截图轮播配文（与 carouselSlides 顺序一致） */
export const galleryCaptions = [
  "异世界中的潜行与交涉——殿堂探索的一瞬。",
  "怪盗团在阴影中缔结契约，以「预告信」向扭曲的大人宣战。",
  "回合制指令战斗：瞄准弱点，打出华丽总攻击。",
  "东京街头的日常与放学后：羁绊在咖啡香与对话中加深。",
  "皇家版追加要素与全新战略，战斗节奏更加凌厉。",
  "宫殿深处，欲望具现化的迷宫与强敌等待着你。",
  "第三学期前的波澜——未曾讲述的故事线逐渐浮现。",
  "夺还心灵、改写现实：这就是「怪盗」的正义。",
];

/** 作品信息（SPEC 区块，与导航锚点 #spec 对应） */
export const specLines = [
  { k: "标题", v: "女神异闻录5 皇家版（Persona 5 The Royal）" },
  { k: "类型", v: "角色扮演（RPG）" },
  { k: "平台", v: "以各发行商公布为准（本页素材来自 p5r.jp 风格参考）" },
  { k: "说明", v: "本站为个人博客主题页；购买与最新情报请以 Atlus / SEGA 官方为准。" },
];

/**
 * 塔罗主题展示卡（原创排版，呼应 P5 阿尔卡那 UI）
 * accent：主题色，用于边框高光
 */
export const tarotShowcase = [
  {
    roman: "0",
    arcana: "愚者",
    role: "主人公",
    blurb: "一切故事的起点。沉默的转学生，却被命运推上舞台中央。",
    accent: "#f43f5e",
  },
  {
    roman: "I",
    arcana: "魔术师",
    role: "向导",
    blurb: "猫？怪物？伙伴。在异世界为你引路的不可思议存在。",
    accent: "#fbbf24",
  },
  {
    roman: "X",
    arcana: "命运之轮",
    role: "怪盗团",
    blurb: "相遇、决裂、再会——齿轮转动，东京的夜晚因你们而倾斜。",
    accent: "#a78bfa",
  },
  {
    roman: "XVIII",
    arcana: "月亮",
    role: "二重生活",
    blurb: "白天是学生，入夜是怪盗。谎言与真心在月光下交错。",
    accent: "#38bdf8",
  },
];

/**
 * 角色档案轮播（本地图）
 * 摩尔加纳使用游戏截图缩略（仓库内无单独立绘切图时）
 */
export const characterSlides = [
  {
    id: "joker",
    codename: "JOKER",
    nameLine: "主人公",
    subLine: "心之怪盗团 · 团长",
    image: "/resources/img/top/intro_ss_1c95db8c16488581aee21b3368b0cc17.png",
    paragraphs: [
      "因冤罪转入「秀尽学园」的少年。表面安静寡言，内心却燃烧着对「不公」的愤怒。",
      "在异世界「殿堂」中觉醒人格面具之力，与伙伴们组成「心之怪盗团」，以盗窃扭曲欲望的方式，令堕落的成年人「改心」。",
    ],
    quote: "TAKE YOUR HEART",
  },
  {
    id: "kasumi",
    codename: "VIOLET",
    nameLine: "芳泽霞",
    subLine: "秀尽学园 · 新体操部",
    image:
      "/resources/img/sp/top/royal1_c1_img1_bbb68b12153861c852a7c540d728d19f.png",
    paragraphs: [
      "与主人公同一年春天转入秀尽学园的美少女，新体操选手。成绩优异，备受期待。",
      "皇家版故事中的关键协作者之一，阿尔卡那为「信念」。",
    ],
    quote: "ROYAL DANCER",
  },
  {
    id: "mona",
    codename: "MONA",
    nameLine: "摩尔加纳",
    subLine: "怪盗团向导",
    image: "/resources/img/top/carousel_ss2_tmb_6cc0a0f9f66f67f9e2d37e1baee56452.png",
    paragraphs: [
      "在殿堂中相遇的神秘存在，自称「实在太可爱」。负责导航、吐槽与关键时刻的觉悟。",
      "真实身份与愿望，与怪盗团的羁绊一同被层层揭开。",
    ],
    quote: "看好了人类！",
  },
  {
    id: "maruki",
    codename: "COUNSELOR",
    nameLine: "丸喜拓人",
    subLine: "秀尽学园 · 兼职心理助教",
    image:
      "/resources/img/sp/top/royal1_c2_img1_4a4dd79a6e37bd7534e4fe77cdb88127.png",
    paragraphs: [
      "因某起教师事件后以关怀学生为由赴任的兼职学校心理咨询师。善于倾听，在学生中口碑良好。",
      "阿尔卡那为「顾问官」——皇家版剧情中的重要人物。",
    ],
    quote: "顾问官",
  },
];
