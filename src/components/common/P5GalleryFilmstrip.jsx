import { useRef, useCallback, useEffect, useMemo } from "react";
import P5Img from "./P5Img";

/**
 * 首页画廊：横向拖拽胶片 + 点击切图（与 JIEJOE 式拖拽浏览一致，复用成长页交互语言）
 */
export default function P5GalleryFilmstrip({
  slides = [],
  activeIndex = 0,
  onSelect,
  captions = [],
}) {
  const trackRef = useRef(null);
  const suppressClickRef = useRef(false);
  const dragListenersRef = useRef(null);

  const endDragSession = useCallback((el, startScroll) => {
    el.classList.remove("p5-gallery-strip__track--grabbing");
    if (Math.abs(el.scrollLeft - startScroll) > 10) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 100);
    }
  }, []);

  useEffect(() => {
    return () => {
      const d = dragListenersRef.current;
      if (!d) return;
      window.removeEventListener("pointermove", d.move);
      window.removeEventListener("pointerup", d.up);
      window.removeEventListener("pointercancel", d.up);
      dragListenersRef.current = null;
    };
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      const el = trackRef.current;
      if (!el || !el.contains(e.target)) return;
      const startX = e.clientX;
      const startScroll = el.scrollLeft;
      el.classList.add("p5-gallery-strip__track--grabbing");

      const move = (ev) => {
        el.scrollLeft = startScroll - (ev.clientX - startX);
      };

      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        dragListenersRef.current = null;
        endDragSession(el, startScroll);
      };

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
      dragListenersRef.current = { move, up };
    },
    [endDragSession],
  );

  const onThumbClick = useCallback(
    (i) => {
      if (suppressClickRef.current) return;
      onSelect?.(i);
    },
    [onSelect],
  );

  const hintWords = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="p5-gallery-strip__hint-word">
          JOURNEY
        </span>
      )),
    [],
  );

  if (!slides.length) return null;

  return (
    <div className="p5-gallery-strip mb-8 md:mb-10">
      <div className="p5-gallery-strip__hint" aria-hidden>
        <div className="p5-gallery-strip__hint-inner">
          <div className="p5-gallery-strip__hint-chunk">{hintWords}</div>
          <div className="p5-gallery-strip__hint-chunk">{hintWords}</div>
        </div>
      </div>
      <p className="p5-gallery-strip__caption">
        横向拖拽浏览截图 · 点击缩略对齐主图
      </p>
      <div
        ref={trackRef}
        className="p5-gallery-strip__track"
        onPointerDown={onPointerDown}
        role="list"
        data-p5-no-click-fx="true"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            className={`p5-gallery-strip__thumb ${
              i === activeIndex ? "p5-gallery-strip__thumb--active" : ""
            }`}
            onClick={() => onThumbClick(i)}
            role="listitem"
            title={captions[i] ?? `第 ${i + 1} 张`}
          >
            <span className="p5-gallery-strip__frame">
              <P5Img
                path={s.tmb}
                alt=""
                className="p5-gallery-strip__img"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </span>
            <span className="p5-gallery-strip__idx">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
