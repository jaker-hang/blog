import { useEffect, useRef } from "react";
import p5 from "p5";

const P5MapBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    // 首次进入时避免立刻创建 full-screen canvas（React StrictMode 下会触发重复 init）。
    // 尽量把初始化推迟到浏览器空闲后，让首屏先“稳住”。
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return undefined;

    const sketch = (s) => {
      const stars = [];
      const STAR_COUNT = 24;
      let t = 0;

      const makeStar = () => ({
        x: s.random(s.width),
        y: s.random(s.height),
        r: s.random(6, 16),
        a: s.random(130, 255),
        speed: s.random(0.2, 1.1),
      });

      const drawStar = (x, y, outerR, innerR, points) => {
        s.beginShape();
        for (let i = 0; i < points * 2; i += 1) {
          const ang = (s.TWO_PI / (points * 2)) * i - s.HALF_PI;
          const rr = i % 2 === 0 ? outerR : innerR;
          s.vertex(x + s.cos(ang) * rr, y + s.sin(ang) * rr);
        }
        s.endShape(s.CLOSE);
      };

      s.setup = () => {
        const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas.parent(containerRef.current);
        canvas.style("display", "block");
        // 降低动画刷新频率，减少首屏渲染/解码阶段的 CPU 占用
        s.frameRate(30);
        for (let i = 0; i < STAR_COUNT; i += 1) stars.push(makeStar());
      };

      s.draw = () => {
        // P5 (Persona 5) style: high-contrast black/red comic composition.
        s.background(8, 8, 10, 235);

        // Dynamic diagonal speed lines.
        s.push();
        s.translate(-s.width * 0.2, 0);
        for (let i = 0; i < 38; i += 1) {
          const y = i * (s.height / 34);
          const drift = s.map(s.sin(t + i * 0.26), -1, 1, -36, 36);
          s.stroke(255, 255, 255, 28);
          s.strokeWeight(i % 4 === 0 ? 2.2 : 1.2);
          s.line(0, y + drift, s.width * 1.6, y + drift - 180);
        }
        s.pop();

        // Red slash blocks.
        s.noStroke();
        s.fill(196, 18, 34, 220);
        s.quad(0, s.height * 0.62, s.width * 0.52, s.height * 0.45, s.width * 0.62, s.height * 0.62, 0, s.height * 0.84);
        s.fill(232, 30, 45, 200);
        s.quad(s.width * 0.35, 0, s.width * 0.72, 0, s.width * 0.52, s.height * 0.28, s.width * 0.2, s.height * 0.2);

        // Black angular masks.
        s.fill(0, 0, 0, 200);
        s.quad(s.width * 0.58, s.height, s.width, s.height * 0.75, s.width, s.height, s.width * 0.65, s.height);
        s.quad(0, 0, s.width * 0.2, 0, s.width * 0.05, s.height * 0.28, 0, s.height * 0.2);

        // Animated stars.
        for (let i = 0; i < stars.length; i += 1) {
          const st = stars[i];
          st.y -= st.speed;
          if (st.y < -20) {
            st.y = s.height + s.random(10, 60);
            st.x = s.random(s.width);
          }

          const pulse = s.map(s.sin(t * 2.4 + i), -1, 1, 0.72, 1.22);
          s.fill(255, 255, 255, st.a);
          s.noStroke();
          drawStar(st.x, st.y, st.r * pulse, st.r * 0.42 * pulse, 5);
        }

        // Bold tilted label.
        s.push();
        s.translate(s.width * 0.07, s.height * 0.2);
        s.rotate(-0.14);
        s.fill(255, 255, 255, 235);
        s.textStyle(s.BOLDITALIC);
        s.textSize(s.min(s.width * 0.09, 130));
        s.text("P5 STYLE", 0, 0);
        s.pop();

        // Accent text.
        s.fill(255, 40, 55, 230);
        s.textStyle(s.BOLD);
        s.textSize(s.min(s.width * 0.028, 34));
        s.text("PHANTOM VIBE", s.width * 0.1, s.height * 0.78);

        t += 0.015;
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };
    };

    let instance = null;
    let cancelled = false;
    let idleTimer = null;
    let usedRequestIdleCallback = false;

    const start = () => {
      if (cancelled) return;
      instance = new p5(sketch);
    };

    const scheduleInit = () => {
      if (typeof window.requestIdleCallback === "function") {
        usedRequestIdleCallback = true;
        idleTimer = window.requestIdleCallback(() => start(), { timeout: 500 });
        return;
      }
      idleTimer = window.setTimeout(() => start(), 200);
    };

    const onVisibilityChange = () => {
      if (!instance) return;
      if (document.hidden) instance.noLoop();
      else instance.loop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    scheduleInit();

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (idleTimer != null) {
        if (usedRequestIdleCallback && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleTimer);
        } else {
          window.clearTimeout(idleTimer);
        }
      }
      instance?.remove();
      instance = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-95"
      aria-hidden="true"
    />
  );
};

export default P5MapBackground;
