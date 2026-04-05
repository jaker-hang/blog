import { useRef, useEffect, useCallback } from "react";

/**
 * 内页卡片/面板：鼠标微 3D 倾角（类似作品集站的「可触摸景深」，幅度小、不抢内容）
 */
export default function TiltSurface({
  children,
  className = "",
  maxTilt = 4.5,
  scale = 1.006,
  disabled = false,
}) {
  const ref = useRef(null);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  useEffect(() => {
    if (disabled) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    el.style.transformStyle = "preserve-3d";
    el.style.transition =
      "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = -py * 2 * maxTilt;
      const ry = px * 2 * maxTilt;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, 1)`;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [disabled, maxTilt, scale, reset]);

  return (
    <div ref={ref} className={className.trim()}>
      {children}
    </div>
  );
}
