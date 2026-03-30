import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

const LOVE_PATH = "/lovePage";

/**
 * 全局 P5 风：鼠标落点 CRIT、路由「路人走过」转场（不含 love）
 * 路由切换不再使用全屏 WEAK 爆发
 */
const P5GlobalEffects = () => {
  const location = useLocation();
  const [clickBursts, setClickBursts] = useState([]);
  const [showCrowd, setShowCrowd] = useState(false);
  const clickIdRef = useRef(0);
  const lastPointerBurstRef = useRef(0);
  const isFirstPaint = useRef(true);
  const prevPathRef = useRef(location.pathname);
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  /** 同页再点导航等：屏幕中央小爆发 */
  const triggerCenterBurst = useCallback(() => {
    if (pathRef.current === LOVE_PATH) return;
    if (typeof window === "undefined") return;
    const id = ++clickIdRef.current;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    setClickBursts((prev) => [...prev.slice(-10), { id, x, y }]);
    window.setTimeout(() => {
      setClickBursts((prev) => prev.filter((c) => c.id !== id));
    }, 480);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onWeakHit = () => triggerCenterBurst();
    window.addEventListener("p5-weak-hit", onWeakHit);
    return () => window.removeEventListener("p5-weak-hit", onWeakHit);
  }, [triggerCenterBurst]);

  /** 路由切换：女神异闻录式「路人剪影走过」转场（非首次进入、非 love） */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        prevPathRef.current = location.pathname;
        return;
      }
    }

    if (isFirstPaint.current) {
      isFirstPaint.current = false;
      prevPathRef.current = location.pathname;
      return;
    }

    if (location.pathname === LOVE_PATH) {
      prevPathRef.current = location.pathname;
      setShowCrowd(false);
      return;
    }

    if (prevPathRef.current === location.pathname) return;

    prevPathRef.current = location.pathname;
    setShowCrowd(true);
    const t = window.setTimeout(() => setShowCrowd(false), 980);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === LOVE_PATH) {
      setClickBursts([]);
    }
  }, [location.pathname]);

  /** 鼠标点击落点 CRIT */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.pathname === LOVE_PATH) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onPointerDown = (e) => {
      if (pathRef.current === LOVE_PATH) return;
      if (e.button != null && e.button !== 0) return;

      const el = e.target;
      if (
        el &&
        typeof el.closest === "function" &&
        el.closest(
          'input, textarea, select, option, [contenteditable="true"], [data-p5-no-click-fx="true"]',
        )
      ) {
        return;
      }

      const now = Date.now();
      if (now - lastPointerBurstRef.current < 85) return;
      lastPointerBurstRef.current = now;

      const id = ++clickIdRef.current;
      const x = e.clientX;
      const y = e.clientY;

      setClickBursts((prev) => [...prev.slice(-10), { id, x, y }]);
      window.setTimeout(() => {
        setClickBursts((prev) => prev.filter((c) => c.id !== id));
      }, 480);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
    };
  }, [location.pathname]);

  if (location.pathname === LOVE_PATH) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {showCrowd && (
        <div className="p5-crowd-overlay absolute inset-0 z-[9997]">
          <div className="p5-crowd-vignette" />
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="p5-crowd-row"
              style={{
                top: `${8 + row * 15}%`,
                animationDuration: `${2.8 + row * 0.35}s`,
                animationDelay: `${row * 0.08}s`,
              }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="p5-crowd-silhouette" />
              ))}
            </div>
          ))}
        </div>
      )}
      {clickBursts.map((c) => (
        <div
          key={c.id}
          className="p5-click-hit"
          style={{ left: c.x, top: c.y }}
        >
          <div className="p5-click-ring" />
          <div className="p5-click-slash-mini" />
          <span className="p5-click-crit">WEAK!</span>
        </div>
      ))}
    </div>
  );
};

export default P5GlobalEffects;
