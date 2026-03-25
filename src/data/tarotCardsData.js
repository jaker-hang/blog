/** 塔罗牌数据：P5 风格，使用裁剪后的卡牌图片 */
const TAROT_BASE = "/resources/img/tarot/cards";

export const tarotCards = [
  { id: "fool", roman: "0", arcana: "愚者", face: `${TAROT_BASE}/00_fool.png`, name: "LE MAT" },
  { id: "magician", roman: "I", arcana: "魔术师", face: `${TAROT_BASE}/01_magician.png`, name: "LE BATELEUR" },
  { id: "priestess", roman: "II", arcana: "女教皇", face: `${TAROT_BASE}/02_priestess.png`, name: "LA PAPESSE" },
  { id: "empress", roman: "III", arcana: "女帝", face: `${TAROT_BASE}/03_empress.png`, name: "L'IMPERATRICE" },
  { id: "emperor", roman: "IV", arcana: "皇帝", face: `${TAROT_BASE}/04_emperor.png`, name: "L'EMPEREUR" },
  { id: "hierophant", roman: "V", arcana: "教皇", face: `${TAROT_BASE}/05_hierophant.png`, name: "LE PAPE" },
  { id: "lovers", roman: "VI", arcana: "恋人", face: `${TAROT_BASE}/06_lovers.png`, name: "L'AMOUREUX" },
  { id: "chariot", roman: "VII", arcana: "战车", face: `${TAROT_BASE}/07_chariot.png`, name: "LE CHARIOT" },
  { id: "justice", roman: "VIII", arcana: "正义", face: `${TAROT_BASE}/08_justice.png`, name: "LA JUSTICE" },
  { id: "hermit", roman: "IX", arcana: "隐者", face: `${TAROT_BASE}/09_hermit.png`, name: "L'HERMITE" },
  { id: "fortune", roman: "X", arcana: "命运之轮", face: `${TAROT_BASE}/10_fortune.png`, name: "LA ROUE DE FORTUNE" },
  { id: "strength", roman: "XI", arcana: "力量", face: `${TAROT_BASE}/11_strength.png`, name: "LA FORCE" },
  { id: "hanged", roman: "XII", arcana: "倒吊人", face: `${TAROT_BASE}/12_hanged.png`, name: "LE PENDU" },
  { id: "death", roman: "XIII", arcana: "死神", face: `${TAROT_BASE}/13_death.png`, name: "" },
  { id: "temperance", roman: "XIV", arcana: "节制", face: `${TAROT_BASE}/14_temperance.png`, name: "TEMPERANCE" },
  { id: "devil", roman: "XV", arcana: "恶魔", face: `${TAROT_BASE}/15_devil.png`, name: "LE DIABLE" },
  { id: "tower", roman: "XVI", arcana: "塔", face: `${TAROT_BASE}/16_tower.png`, name: "LA MAISON DIEU" },
  { id: "star", roman: "XVII", arcana: "星星", face: `${TAROT_BASE}/17_star.png`, name: "L'ETOILE" },
  { id: "moon", roman: "XVIII", arcana: "月亮", face: `${TAROT_BASE}/18_moon.png`, name: "LA LUNE" },
  { id: "sun", roman: "XIX", arcana: "太阳", face: `${TAROT_BASE}/19_sun.png`, name: "LE SOLEIL" },
  { id: "judgement", roman: "XX", arcana: "审判", face: `${TAROT_BASE}/20_judgement.png`, name: "LE JUGEMENT" },
  { id: "world", roman: "XXI", arcana: "世界", face: `${TAROT_BASE}/21_world.png`, name: "LE MONDE" },
  { id: "faith", roman: "", arcana: "信念", face: `${TAROT_BASE}/faith.png`, name: "LA FOI" },
  { id: "councillor", roman: "I", arcana: "顾问官", face: `${TAROT_BASE}/councillor.png`, name: "LE CONSULTANT" },
];

export const TAROT_CARD_BACK = `${TAROT_BASE}/back.png`;
