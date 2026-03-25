import { useEffect, useMemo, useRef, useState } from "react";
import P5Img from "./P5Img";
import { tarotCards, TAROT_CARD_BACK } from "../../data/tarotCardsData";
import "./P5TarotSwiper.css";

const SWIPE_STACK_SIZE = 5;
const DISMISS_RATIO = 0.6; // 超出卡宽比例就判定滑出

function TarotSwipeCard({ card, stackIndex, onDismiss }) {
  const outerRef = useRef(null);
  const dragRef = useRef(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const dismissTimerRef = useRef(null);

  const [interaction, setInteraction] = useState("idle"); // idle | dragging | dismissing
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);
    };
  }, []);

  const resetDrag = () => {
    setInteraction("idle");
    offsetRef.current = { x: 0, y: 0 };
    movedRef.current = false;
    if (dragRef.current) {
      dragRef.current.style.transition = "transform 0.5s";
      dragRef.current.style.transform = "translate3d(0,0,0) rotate(0deg)";
    }
  };

  const handleDismiss = (direction) => {
    setInteraction("dismissing");
    const offsetY = offsetRef.current.y;
    const rotateDeg = 90 * direction;
    const x = direction * window.innerWidth;

    if (dragRef.current) {
      dragRef.current.style.transition = "transform 1s";
      dragRef.current.style.transform = `translate3d(${x}px, ${offsetY}px, 0) rotate(${rotateDeg}deg)`;
    }

    dismissTimerRef.current = window.setTimeout(() => {
      onDismiss(direction);
    }, 1000);
  };

  const setDragTransform = (dx, dy) => {
    const rotate = dx * 0.1;
    if (!dragRef.current) return;
    dragRef.current.style.transition = "transform 0s";
    dragRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rotate}deg)`;
  };

  return (
    <div
      ref={outerRef}
      className="p5-tarot-swipe__card"
      style={{ "--i": stackIndex }}
      onPointerDown={(e) => {
        if (interaction !== "idle") return;
        movedRef.current = false;
        startPoint.current = { x: e.clientX, y: e.clientY };
        offsetRef.current = { x: 0, y: 0 };
        setInteraction("dragging");
        if (dragRef.current) {
          dragRef.current.style.transition = "transform 0s";
        }
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }}
      onPointerMove={(e) => {
        if (interaction !== "dragging") return;
        const dx = e.clientX - startPoint.current.x;
        const dy = e.clientY - startPoint.current.y;
        offsetRef.current = { x: dx, y: dy };
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) movedRef.current = true;
        setDragTransform(dx, dy);
      }}
      onPointerUp={() => {
        if (interaction !== "dragging") return;
        const dx = offsetRef.current.x;
        const el = outerRef.current;
        if (el && Math.abs(dx) > el.clientWidth * DISMISS_RATIO) {
          handleDismiss(dx > 0 ? 1 : -1);
        } else {
          resetDrag();
        }
      }}
      onPointerCancel={() => {
        if (interaction !== "dragging") return;
        resetDrag();
      }}
      onClick={() => {
        if (interaction !== "idle") return;
        if (movedRef.current) return;
        setFlipped((f) => !f);
      }}
      role="button"
      tabIndex={0}
      aria-label="点击翻转，拖拽滑出"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div
        ref={dragRef}
        className="p5-tarot-swipe__drag"
        style={{ transform: "translate3d(0,0,0) rotate(0deg)" }}
      >
        <div
          className={`p5-tarot-swipe__flip ${
            flipped ? "p5-tarot-swipe__flip--flipped" : ""
          }`}
        >
          <div
            className="p5-tarot-swipe__face p5-tarot-swipe__face--front"
            aria-hidden
          >
            <P5Img
              path={card.face}
              alt={card.arcana}
              className="p5-tarot-swipe__img"
            />
          </div>
          <div
            className="p5-tarot-swipe__face p5-tarot-swipe__face--back"
            aria-hidden
          >
            <P5Img
              path={TAROT_CARD_BACK}
              alt="卡背"
              className="p5-tarot-swipe__img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function P5TarotSwiper({ revealed = false }) {
  const [stack, setStack] = useState(() => tarotCards.slice(0, SWIPE_STACK_SIZE));
  const cursorRef = useRef(SWIPE_STACK_SIZE);
  const [pulse, setPulse] = useState(null); // 'like' | 'dislike' | null
  const pulseTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) window.clearTimeout(pulseTimerRef.current);
    };
  }, []);

  const triggerPulse = (dir) => {
    if (pulseTimerRef.current) window.clearTimeout(pulseTimerRef.current);
    setPulse(dir === 1 ? "like" : "dislike");
    pulseTimerRef.current = window.setTimeout(() => setPulse(null), 900);
  };

  const onDismiss = (direction) => {
    triggerPulse(direction);
    setStack((prev) => {
      const nextIdx = cursorRef.current % tarotCards.length;
      cursorRef.current += 1;
      const nextCard = tarotCards[nextIdx];
      return [...prev.slice(1), nextCard];
    });
  };

  const safeRevealed = useMemo(() => Boolean(revealed), [revealed]);

  return (
    <div className="p5-tarot-swipe">
      <div
        className={`p5-tarot-swipe__icon p5-tarot-swipe__icon--dislike ${
          pulse === "dislike" ? "p5-tarot-swipe__icon--trigger" : ""
        }`}
        id="dislike"
        aria-hidden
      />
      <div
        className={`p5-tarot-swipe__icon p5-tarot-swipe__icon--like ${
          pulse === "like" ? "p5-tarot-swipe__icon--trigger" : ""
        }`}
        id="like"
        aria-hidden
      />

      <div
        className={`p5-tarot-swipe__stage ${
          safeRevealed ? "p5-tarot-swipe__stage--revealed" : ""
        }`}
        id="swiper"
      >
        {stack.map((c, i) => (
          <TarotSwipeCard
            key={`${c.id}-${i}`}
            card={c}
            stackIndex={i}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
}

