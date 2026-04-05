import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import P5Img from "./P5Img";
import { tarotCards, TAROT_CARD_BACK } from "../../data/tarotCardsData";
import "./P5TarotCarousel.css";

/** 与 CSS --card-w 同量级，用于计算环半径 */
const RING_CARD_WIDTH = 84;
/** 大于 1 时环半径变大，牌与牌之间空隙更大 */
const RING_RADIUS_FACTOR = 1.32;
const AUTOPLAY_INTERVAL_MS = 4200;

function TarotFlipCard({ card, backPath, revealed, index, ring }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  return (
    <article
      role="button"
      tabIndex={0}
      className={`p5-tarot-flip-card ${ring ? "p5-tarot-flip-card--ring" : ""} ${
        flipped ? "p5-tarot-flip-card--flipped" : ""
      } ${revealed ? "p5-tarot-flip-card--revealed" : ""}`}
      style={{ "--flip-delay": `${index * 35}ms` }}
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
        <div className="p5-tarot-flip-card__face p5-tarot-flip-card__face--back">
          <P5Img
            path={card.face}
            alt={card.arcana}
            loading="lazy"
            draggable={false}
            fetchPriority="low"
          />
        </div>
        <div className="p5-tarot-flip-card__face p5-tarot-flip-card__face--front">
          <P5Img
            path={backPath}
            alt="卡背"
            loading="lazy"
            draggable={false}
            fetchPriority="low"
          />
        </div>
      </div>
    </article>
  );
}

function normalizeDeg(deg) {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}

export default function P5TarotCarousel({ scrollRevealed = false }) {
  const n = tarotCards.length;
  const step = 360 / n;

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const translateZ = useMemo(() => {
    const w = RING_CARD_WIDTH;
    const base = (w / 2) / Math.sin(Math.PI / n);
    return Math.max(200, Math.round(base * RING_RADIUS_FACTOR));
  }, [n]);

  const [rotation, setRotation] = useState(0);
  const [localRevealed, setLocalRevealed] = useState(false);
  const autoplayPausedRef = useRef(false);

  useEffect(() => {
    if (!scrollRevealed) return;
    if (reduceMotion) {
      setLocalRevealed(true);
      return;
    }
    setLocalRevealed(false);
    const t = requestAnimationFrame(() => setLocalRevealed(true));
    return () => cancelAnimationFrame(t);
  }, [scrollRevealed, reduceMotion]);

  useEffect(() => {
    if (!scrollRevealed || reduceMotion) return undefined;
    const id = window.setInterval(() => {
      if (!autoplayPausedRef.current) {
        setRotation((r) => r - step);
      }
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [scrollRevealed, reduceMotion, step]);

  const goPrev = () =>
    setRotation((r) => (reduceMotion ? r : r + step));
  const goNext = () =>
    setRotation((r) => (reduceMotion ? r : r - step));

  const frontIndex =
    ((Math.round(-rotation / step) % n) + n) % n;

  const cellOpacity = useCallback(
    (i) => {
      if (reduceMotion) return 1;
      const ang = normalizeDeg(i * step + rotation);
      const t = (Math.cos((ang * Math.PI) / 180) + 1) / 2;
      return 0.32 + 0.68 * t;
    },
    [rotation, step, reduceMotion],
  );

  const cellScale = useCallback(
    (i) => {
      if (reduceMotion) return 1;
      const ang = normalizeDeg(i * step + rotation);
      const t = (Math.cos((ang * Math.PI) / 180) + 1) / 2;
      return 0.82 + 0.18 * t;
    },
    [rotation, step, reduceMotion],
  );

  if (reduceMotion) {
    const slice = tarotCards.slice(0, 6);
    return (
      <div className="p5-tarot-carousel p5-tarot-carousel--flat">
        <div className="p5-tarot-carousel__track p5-tarot-carousel__track--flat">
          {slice.map((card, idx) => (
            <TarotFlipCard
              key={card.id}
              card={card}
              backPath={TAROT_CARD_BACK}
              revealed={localRevealed}
              index={idx}
              ring={false}
            />
          ))}
        </div>
        <p className="p5-tarot-carousel__reduce-hint">
          已开启减少动态效果，塔罗环以平面网格展示。
        </p>
      </div>
    );
  }

  return (
    <div
      className="p5-tarot-carousel"
      onMouseEnter={() => {
        autoplayPausedRef.current = true;
      }}
      onMouseLeave={() => {
        autoplayPausedRef.current = false;
      }}
      onFocusCapture={() => {
        autoplayPausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          autoplayPausedRef.current = false;
        }
      }}
    >
      <div className="p5-tarot-carousel__stage-row">
        <button
          type="button"
          className="p5-tarot-carousel__arrow p5-tarot-carousel__arrow--prev"
          onClick={goPrev}
          aria-label="逆时针转动塔罗环"
        >
          <P5Img
            path="/resources/img/sp/top/z.png"
            alt=""
            className="p5-gallery__arrow-png p5-tarot-carousel__arrow-img"
            draggable={false}
            loading="eager"
          />
        </button>

        <div
          className="p5-tarot-3d-stage"
          style={{ "--tarot-tz": `${translateZ}px` }}
        >
          <div
            className="p5-tarot-3d-ring"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {tarotCards.map((card, i) => {
              const op = cellOpacity(i);
              return (
                <div
                  key={card.id}
                  className="p5-tarot-3d-cell"
                  style={{
                    transform: `rotateY(${i * step}deg) translateZ(var(--tarot-tz)) scale(${cellScale(i)})`,
                    opacity: op,
                    pointerEvents: op < 0.48 ? "none" : "auto",
                    zIndex: Math.round(op * 100),
                  }}
                >
                  <TarotFlipCard
                    card={card}
                    backPath={TAROT_CARD_BACK}
                    revealed={localRevealed}
                    index={i}
                    ring
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="p5-tarot-carousel__arrow p5-tarot-carousel__arrow--next"
          onClick={goNext}
          aria-label="顺时针转动塔罗环"
        >
          <P5Img
            path="/resources/img/sp/top/y.png"
            alt=""
            className="p5-gallery__arrow-png p5-tarot-carousel__arrow-img"
            draggable={false}
            loading="eager"
          />
        </button>
      </div>

      <div className="p5-tarot-carousel__dots" role="tablist" aria-label="塔罗牌位置">
        {tarotCards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={i === frontIndex}
            aria-label={`${c.arcana}${i === frontIndex ? "（当前在前方）" : ""}`}
            onClick={() => {
              const ideal = -i * step;
              setRotation((cur) => {
                const k = Math.round((cur - ideal) / 360);
                return ideal + k * 360;
              });
            }}
            className={`p5-tarot-carousel__dot ${
              i === frontIndex ? "p5-tarot-carousel__dot--active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
