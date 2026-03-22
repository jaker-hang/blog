/**
 * 从 p5r.jp 批量下载 public/resources/ 下用到的静态图
 * 用法：node scripts/download-p5r-assets.mjs
 * 或：npm run download-p5r
 */
import fs from "fs/promises";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const BASE = "https://p5r.jp";

const FILES_TO_SCAN = [
  "src/pages/Home.jsx",
  "src/data/p5rHomeData.js",
  "public/p5r-official-home.css",
];

/**
 * 只匹配真实资源路径（含扩展名），避免误匹配注释里的 url(/resources/...) 省略号
 */
function collectPaths() {
  const set = new Set();
  // /resources/img/.../file.ext
  const rePath =
    /\/resources\/img\/[a-zA-Z0-9][a-zA-Z0-9_/\-]*\.(?:png|jpe?g|gif|webp|svg|ico)/gi;
  const reCssUrl = /url\(["']?https:\/\/p5r\.jp(\/resources\/img\/[a-zA-Z0-9][a-zA-Z0-9_/\-]*\.(?:png|jpe?g|gif|webp|svg|ico))["']?\)/gi;

  for (const rel of FILES_TO_SCAN) {
    const full = path.join(ROOT, rel);
    let content;
    try {
      content = readFileSync(full, "utf8");
    } catch {
      console.warn("跳过（不存在）:", rel);
      continue;
    }
    let m;
    while ((m = rePath.exec(content))) set.add(m[0].replace(/\/+/g, "/"));
    while ((m = reCssUrl.exec(content))) set.add(m[1].replace(/\/+/g, "/"));
  }
  return [...set].sort();
}

async function downloadFile(relPath) {
  const url = `${BASE}${relPath}`;
  const dest = path.join(PUBLIC, relPath.replace(/^\//, ""));
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; p5r-asset-mirror/1.0; +local-dev)",
      Accept: "*/*",
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return dest;
}

async function main() {
  const paths = collectPaths();
  console.log(`共 ${paths.length} 个资源路径，开始下载到 public/ …\n`);

  let ok = 0;
  const failed = [];

  for (const p of paths) {
    try {
      const dest = await downloadFile(p);
      ok++;
      console.log("✓", p, "→", path.relative(ROOT, dest));
    } catch (e) {
      failed.push({ p, err: String(e.message || e) });
      console.error("✗", p, e.message || e);
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  console.log(`\n完成：成功 ${ok}，失败 ${failed.length}`);
  if (failed.length) {
    console.log("失败列表可稍后重试：");
    failed.forEach((f) => console.log(" ", f.p, f.err));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
