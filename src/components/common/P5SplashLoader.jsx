import { useState, useEffect, useCallback } from "react";

/**
 * 帽子 Logo 全屏加载（路由切换时重复展示）
 * 图片：public/p5-loading-logo.png
 * 层级低于导航栏（由 App 控制 z-index）
 */
export default function P5SplashLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  const finish = useCallback(() => {
    setExiting(true);
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setPct(100);
      const t = setTimeout(() => finish(), 200);
      return () => clearTimeout(t);
    }

    /* 略短于首版，适合每次路由切换重复播放 */
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // 缓动：前快后慢
      const eased = 1 - (1 - t) * (1 - t);
      setPct(Math.min(100, Math.round(eased * 100)));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setPct(100);
        setTimeout(() => finish(), 280);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [finish]);

  const handleTransitionEnd = () => {
    if (exiting) {
      setRemoved(true);
      onDone?.();
    }
  };

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      className={`p5-splash-loader fixed inset-0 top-0 z-[10060] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="p5-splash-logo-wrap flex flex-col items-center px-6">
        <img
          src="/p5-loading-logo.png"
          alt=""
          className="p5-splash-logo w-[min(100px,88vw)] max-w-none sm:w-[min(100px,88vw)] md:w-[min(100px,85vw)] h-auto select-none pointer-events-none"
          draggable={false}
        />
        <p className="mt-10 sm:mt-12 font-black tracking-[0.12em] text-white text-base sm:text-lg md:text-xl uppercase whitespace-nowrap">
          NOW LOADING... {pct}%
        </p>
      </div>
    </div>
  );
}
