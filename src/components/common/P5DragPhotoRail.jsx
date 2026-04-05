import { useRef, useCallback, useMemo, useEffect } from "react";
export default function P5DragPhotoRail({
  moments = [],
  onPickMoment,
  className = "",
}) {
  const trackRef = useRef(null);
  const suppressClickRef = useRef(false);
  const dragListenersRef = useRef(null);

  const hintWords = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => (
        <span key={i} className="p5-drag-rail__hint-word">
          DRAG
        </span>
      )),
    [],
  );

  const endDragSession = useCallback((el, startScroll) => {
    el.classList.remove("p5-drag-rail__track--grabbing");
    const scrolled = Math.abs(el.scrollLeft - startScroll) > 10;
    if (scrolled) {
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
      el.classList.add("p5-drag-rail__track--grabbing");

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

  const onCardClick = useCallback(
    (m) => {
      if (suppressClickRef.current) return;
      onPickMoment?.(m);
    },
    [onPickMoment],
  );

  if (!moments.length) return null;

  return (
    <div className={`p5-drag-rail ${className}`.trim()}>
      <div className="p5-drag-rail__hint" aria-hidden>
        <div className="p5-drag-rail__hint-inner">
          <div className="p5-drag-rail__hint-chunk">{hintWords}</div>
          <div className="p5-drag-rail__hint-chunk">{hintWords}</div>
        </div>
      </div>
    </div>
  );
}
