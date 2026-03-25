import { useEffect, useMemo, useState } from "react";
import "./P5TarotImprint.css";
import { tarotCards } from "../../data/tarotCardsData";

const CAROUSEL_SHOW = 3;
const LOOP_MS = 9000;

export default function P5TarotImprint({ revealed = false }) {
  const [offset, setOffset] = useState(0);

  const cards = useMemo(() => {
    const out = [];
    for (let i = 0; i < CAROUSEL_SHOW; i += 1) {
      const idx = (offset + i) % tarotCards.length;
      out.push(tarotCards[idx]);
    }
    return out;
  }, [offset]);

  useEffect(() => {
    if (!revealed) return undefined;
    const t = window.setInterval(() => {
      setOffset((n) => (n + CAROUSEL_SHOW) % tarotCards.length);
    }, LOOP_MS);
    return () => window.clearInterval(t);
  }, [revealed]);

  return (
    <div className="p5-tarot-imprint-shell">
      <div
        className={`p5-tarot-imprint-content ${
          revealed ? "p5-tarot-imprint-content--run" : ""
        }`}
      >
        {cards.map((c, i) => (
          <div
            // 与示例一致：每张卡在圆周上旋转并向外推
            key={`${c.id}-${i}`}
            className="p5-tarot-imprint-item"
            style={{
              backgroundImage: `url(${c.face})`,
              transform: `rotateY(${i * 120}deg) translateZ(35vw)`,
            }}
          />
        ))}
      </div>

      {/* 移除多余文字/图标：卡面自带编号与标题 */}
      {/* 仅保留隐藏占位，确保可访问性焦点 */}
      <div className="sr-only">
        {revealed ? "塔罗印记开始旋转" : "塔罗印记待显示"}
      </div>
    </div>
  );
}

