# P5R 首页静态资源（本地镜像）

官网图片需放到 **`public/resources/`** 下（与路径 `/resources/img/...` 一致），否则页面会显示破图。

## 一键下载（推荐）

在项目根目录执行：

```bash
npm run download-p5r
```

脚本会扫描上述文件中的 **`/resources/img/.../*.png|jpg|...`** 真实路径（不会误抓注释里的省略写法），从 `https://p5r.jp` 下载到 `public/resources/...`。

- 若个别文件失败，可重新运行；已成功的会被覆盖。
- **ATLUS 页脚图**：官网 `footer_logo_atlus_*.png` 已 404，首页已改为文字链接「ATLUS」；若你本地有图，可放到 `public/resources/img/sp/common/footer_logo_atlus_a08ff73fce750f318179ee0074211ed.png` 并改回 `<P5Img path="..." />`。
- 资源较多，请保持网络畅通，可能需要几分钟。

## 手动

也可在浏览器打开对应 `https://p5r.jp/resources/img/...` 另存为，按相同子目录放入 `public/resources/`。
