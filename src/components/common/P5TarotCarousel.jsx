import { useEffect, useMemo, useState, useCallback } from "react";
import P5Img from "./P5Img";
import { img as p5img } from "../../data/p5rHomeData";
import { tarotCards, TAROT_CARD_BACK } from "../../data/tarotCardsData";
import "./P5TarotCarousel.css";

const CARDS_PER_PAGE = 6;

function TarotFlipCard({ card, backPath, revealed, index }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  return (
    <article
      role="button"
      tabIndex={0}
      className={`p5-tarot-flip-card ${
        flipped ? "p5-tarot-flip-card--flipped" : ""
      } ${revealed ? "p5-tarot-flip-card--revealed" : ""}`}
      style={{ "--flip-delay": `${index * 40}ms` }}
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlip();
        }
      }}
      aria-label={`${card.arcana}：点击翻转`}
    >
      <div className="p5-tarot-flip-card__inner">
        {/* 初始：展示卡面；翻转后：展示卡背（反个面） */}
        <div className="p5-tarot-flip-card__face p5-tarot-flip-card__face--back">
          <img src={p5img(card.face)} alt={card.arcana} />
        </div>
        <div className="p5-tarot-flip-card__face p5-tarot-flip-card__face--front">
          <img src={p5img(backPath)} alt="卡背" />
        </div>
      </div>
    </article>
  );
}

export default function P5TarotCarousel({ scrollRevealed = false }) {
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(tarotCards.length / CARDS_PER_PAGE),
    [],
  );

  const [page, setPage] = useState(0);
  const [localRevealed, setLocalRevealed] = useState(false);

  useEffect(() => {
    if (!scrollRevealed) return;
    if (reduceMotion) {
      setLocalRevealed(true);
      return;
    }
    setLocalRevealed(false);
    const t = requestAnimationFrame(() => setLocalRevealed(true));
    return () => cancelAnimationFrame(t);
  }, [scrollRevealed, page, reduceMotion]);

  const startIdx = page * CARDS_PER_PAGE;
  const visibleCards = tarotCards.slice(
    startIdx,
    startIdx + CARDS_PER_PAGE,
  );

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <div className="p5-tarot-carousel">
      <button
        type="button"
        className="p5-tarot-carousel__arrow p5-tarot-carousel__arrow--prev"
        onClick={goPrev}
        aria-label="上一页"
      >
        <P5Img
          path="/resources/img/sp/top/z.png"
          alt=""
          className="p5-gallery__arrow-png"
          draggable={false}
          loading="eager"
        />
      </button>

      <div className="p5-tarot-carousel__track">
        {visibleCards.map((card, idx) => (
          <TarotFlipCard
            key={card.id}
            card={card}
            backPath={TAROT_CARD_BACK}
            revealed={localRevealed}
            index={idx}
          />
        ))}
      </div>

      <button
        type="button"
        className="p5-tarot-carousel__arrow p5-tarot-carousel__arrow--next"
        onClick={goNext}
        aria-label="下一页"
      >
        <P5Img
          path="/resources/img/sp/top/y.png"
          alt=""
          className="p5-gallery__arrow-png"
          draggable={false}
          loading="eager"
        />
      </button>

      <div className="p5-tarot-carousel__dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`第 ${i + 1} 页`}
            aria-current={i === page ? "true" : undefined}
            onClick={() => setPage(i)}
            className={`p5-tarot-carousel__dot ${
              i === page ? "p5-tarot-carousel__dot--active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
