import { img as p5img } from "../../data/p5rHomeData";

/**
 * 使用 public/resources/ 本地图（npm run download-p5r）
 */
export default function P5Img({
  path,
  alt = "",
  className = "",
  width,
  height,
  loading = "lazy",
  ...rest
}) {
  return (
    <img
      src={p5img(path)}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={(e) => {
        const src = e.currentTarget.src;
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn("[P5Img] 加载失败:", src);
        }
        e.currentTarget.alt = alt || "（图片加载失败）";
      }}
      {...rest}
    />
  );
}
