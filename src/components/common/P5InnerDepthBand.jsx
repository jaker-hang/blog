import { useEffect, useRef } from "react";

/**
 * 内页顶部景深带：随滚动轻移 + 竖排字母装饰（参考 JIEJOE 子页的版面层次，不盖内容）
 */
export default function P5InnerDepthBand({ label = "" }) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const el = bgRef.current;
    if (!el) return undefined;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.055}px, 0) scale(${1.02 + Math.min(y, 600) * 0.00004})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const letters = label.replace(/\s/g, "").split("");

  return (
    <div className="p5-inner-depth-band pointer-events-none" aria-hidden>
      <div ref={bgRef} className="p5-inner-depth-band__bg" />
      {letters.length > 0 ? (
        <div className="p5-inner-depth-band__rail">
          {letters.map((ch, i) => (
            <span key={`${ch}-${i}`} className="p5-inner-depth-band__letter">
              {ch}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
