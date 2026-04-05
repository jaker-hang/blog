import { useEffect, useState, useRef } from "react";

const LINE1 = "夺取吧，";
const LINE2_LEFT = "以那份";
const LINE2_RIGHT = "意志。";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * 首行打字机；第二行拆成左右两半飞入（尊重 prefers-reduced-motion）
 */
export default function P5HeroAnimatedTitle() {
  const [typed, setTyped] = useState(() => (getReducedMotion() ? LINE1 : ""));
  const [line2Ready, setLine2Ready] = useState(() => getReducedMotion());
  const reducedMotion = getReducedMotion();
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (getReducedMotion()) {
      setTyped(LINE1);
      setLine2Ready(true);
      return undefined;
    }

    let i = 0;
    const step = () => {
      i += 1;
      setTyped(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        setLine2Ready(true);
        return;
      }
      timerRef.current = window.setTimeout(step, 95 + Math.random() * 45);
    };
    timerRef.current = window.setTimeout(step, 280);
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <h1 className="p5-hero__h1">
      <span
        className="p5-hero__h1-line p5-hero-typewriter-line"
        aria-label={LINE1}
      >
        <span className="p5-hero-typewriter-text">{typed}</span>
        {!reducedMotion && typed.length < LINE1.length ? (
          <span className="p5-hero-typewriter-caret" aria-hidden />
        ) : null}
      </span>
      <span
        className={`p5-hero__h1-line p5-hero__h1-line--accent p5-hero__line2-wrap ${
          line2Ready ? "p5-hero__line2-wrap--ready" : ""
        }`}
      >
        <span className="p5-hero__line2-part p5-hero__line2-part--left">
          {LINE2_LEFT}
        </span>
        <span className="p5-hero__line2-part p5-hero__line2-part--right">
          {LINE2_RIGHT}
        </span>
      </span>
    </h1>
  );
}
