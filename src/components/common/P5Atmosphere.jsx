import { useLocation } from "react-router-dom";

const LOVE_PATH = "/lovePage";

/**
 * 全站轻量氛围：扫描线、胶片颗粒、四角色块框（pointer-events: none）
 * 叠在内容之上、全局转场层之下，尊重 prefers-reduced-motion。
 */
const P5Atmosphere = () => {
  const location = useLocation();
  if (location.pathname === LOVE_PATH) return null;

  return (
    <div
      className="p5-atmosphere-root fixed inset-0 z-[9996] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="p5-atmosphere-scan" />
      <div className="p5-atmosphere-grain" />
      <div className="p5-atmosphere-vignette" />
      <div className="p5-atmosphere-corners" />
      <div className="p5-atmosphere-slants" />
    </div>
  );
};

export default P5Atmosphere;
