/**
 * 裁剪塔罗牌精灵图为单独卡牌
 * 以卡背尺寸为基准：卡背位于左上角第一格，以其宽高统一裁剪所有卡牌
 * 布局：10列 x 3行
 * Row1: 卡背 + 0~8 (9张)
 * Row2: 9~18 (10张)
 * Row3: 19~24 (6张)
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, "../public/resources/img/tarot/tarot_sprite.png");
const outDir = path.join(__dirname, "../public/resources/img/tarot/cards");

const CARD_NAMES = [
  "back", "00_fool", "01_magician", "02_priestess", "03_empress",
  "04_emperor", "05_hierophant", "06_lovers", "07_chariot", "08_justice",
  "09_hermit", "10_fortune", "11_strength", "12_hanged", "13_death",
  "14_temperance", "15_devil", "16_tower", "17_star", "18_moon",
  "19_sun", "20_judgement", "21_world", "faith", "councillor", "faith_alt",
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const meta = await sharp(srcPath).metadata();
  const { width, height } = meta;
  const cols = 10;
  const rows = 3;
  // 以卡背所在第一格尺寸为基准（卡背无白边，与卡面统一裁切）
  const cardW = Math.floor(width / cols);
  const cardH = Math.floor(height / rows);

  let idx = 0;
  for (let row = 0; row < rows && idx < CARD_NAMES.length; row++) {
    const maxCol = row < 2 ? cols : 6;
    for (let col = 0; col < maxCol && idx < CARD_NAMES.length; col++) {
      const left = col * cardW;
      const top = row * cardH;
      const name = CARD_NAMES[idx];
      const outPath = path.join(outDir, `${name}.png`);
      await sharp(srcPath)
        .extract({ left, top, width: cardW, height: cardH })
        .resize(cardW, cardH) // 统一输出为卡背尺寸
        .png()
        .toFile(outPath);
      console.log(`Cropped ${name}.png (${cardW}x${cardH})`);
      idx++;
    }
  }
  console.log("Done!");
}

main().catch(console.error);
