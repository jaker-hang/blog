/**
 * 删除 public/resources 下未被首页引用的图片（白名单外一律删）
 * 用法：node scripts/prune-p5r-resources.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const RES = path.join(PUBLIC, "resources");

/** 相对 public/ 的路径 */
const KEEP = new Set([
  "resources/img/top/bg_top_5349e1a376a081228afb8211dbfff169.png",
  "resources/img/top/bg_red_line_fe82daa77927be565a03f46a0c7cbf04.png",
  "resources/img/top/fv_copy1_569d70b8e47b1f691605a7104ba6783a.png",
  "resources/img/top/fv_copy2_809c34d071e7bf47e8dd8f505a3446de.png",
  "resources/img/top/spec_logo_0588e36582e0b170942092a8220a95e6.png",
  "resources/img/top/fv_release_date_4af2066228eaf3e4b21d3b678a4a7974.png",
  "resources/img/top/carousel_ss1_tmb_a1c749a52fc99fc0f63c1c5cff223656.png",
  "resources/img/top/carousel_ss2_tmb_6cc0a0f9f66f67f9e2d37e1baee56452.png",
  "resources/img/top/carousel_ss3_tmb_585fe5d11b1e5f3b3316780a8c49a450.png",
  "resources/img/top/carousel_ss4_tmb_dfb7abb6552e09f60669184347ee461f.png",
  "resources/img/top/carousel_ss5_tmb_fc6b13e9f09b14cd53f81fc4be7db1fe.png",
  "resources/img/top/carousel_ss6_tmb_5611192fc25779ac334d1bc5b56dbf44.png",
  "resources/img/top/carousel_ss7_tmb_87be93115111064a6dce99757001e001.png",
  "resources/img/top/carousel_ss8_tmb_0b565fee69ce539523e663679991aa95.png",
  "resources/img/top/intro_ss_1c95db8c16488581aee21b3368b0cc17.png",
  "resources/img/top/news_title_778961cf3e65f0731da400eefa38c6cd.png",
  "resources/img/top/news_bg_744932739a7f331e232f336d8acd1883.png",
  "resources/img/top/tmb/royal2_ss1_5672c6da5d4cceac8377bfb42ebd681e.png",
  "resources/img/top/tmb/royal2_ss2_637713189f6245a0f6fe92670aaaebfc.png",
  "resources/img/top/ss/royal2_ss1_eaa581d6b9821bf165d3982350e1a5c4.jpg",
  "resources/img/top/ss/royal2_ss2_aa3972f69ff547d38e60f0b4787a038e.jpg",
  "resources/img/top/pre_order_btn_43fef4bac3c5deda73971b19e703bcd5.png",
  "resources/img/sp/top/z.png",
  "resources/img/sp/top/y.png",
  "resources/img/sp/top/royal1_c1_img1_bbb68b12153861c852a7c540d728d19f.png",
  "resources/img/sp/top/royal1_c2_img1_4a4dd79a6e37bd7534e4fe77cdb88127.png",
  "resources/img/sp/top/spec_info_bg_5da0f9bef2c5cdbc8c4c8c045a1503e2.png",
]);

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walkFiles(p, out);
    else out.push(p);
  }
  return out;
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) removeEmptyDirs(p);
  }
  try {
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
      console.log("rmdir", path.relative(PUBLIC, dir).replace(/\\/g, "/"));
    }
  } catch {
    /* ignore */
  }
}

let removed = 0;
for (const abs of walkFiles(RES)) {
  const rel = path.relative(PUBLIC, abs).replace(/\\/g, "/");
  if (!KEEP.has(rel)) {
    fs.unlinkSync(abs);
    console.log("删除", rel);
    removed++;
  }
}

removeEmptyDirs(RES);

const heroRef = path.join(PUBLIC, "p5r-hero-ref.png");
if (fs.existsSync(heroRef)) {
  fs.unlinkSync(heroRef);
  console.log("删除 public/p5r-hero-ref.png");
  removed++;
}

console.log(`\n完成：共删除 ${removed} 个文件（含可选参考图）`);
