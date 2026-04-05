import { useState, useEffect } from "react";
import { ChevronUp } from "react-feather";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      id="back-to-top"
      className={`p5-backtop ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={scrollToTop}
      aria-label="回到顶部"
      data-p5-no-click-fx="true"
    >
      <span className="p5-backtop__inner">
        <ChevronUp className="w-5 h-5" strokeWidth={2.5} aria-hidden />
      </span>
    </button>
  );
};

export default BackToTop;
