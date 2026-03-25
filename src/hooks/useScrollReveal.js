import { useEffect, useRef, useState } from "react";

/**
 * 当元素进入视口时触发，用于滚动入场动画
 * @param {Object} options - { rootMargin, threshold }
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export default function useScrollReveal(options = {}) {
  const {
    rootMargin = "0px 0px -80px 0px",
    threshold = 0.1,
    triggerOnce = true,
  } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return [ref, isVisible];
}
