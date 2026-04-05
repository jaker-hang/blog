import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * 滚动进入视口时触发入场动画（全站通用）
 * @param {'up'|'left'|'right'|'scale'} variant
 * @param {number} delayMs — transition-delay，用于列表错开
 */
export default function ScrollReveal({
  as: Tag = "div",
  className = "",
  variant = "up",
  delayMs = 0,
  children,
  style,
  ...rest
}) {
  const [ref, visible] = useScrollReveal();
  const v = variant === "scale" ? "scale" : variant;
  const mergedStyle =
    delayMs > 0 ? { ...style, transitionDelay: `${delayMs}ms` } : style;

  return (
    <Tag
      ref={ref}
      className={`p5-scroll-in p5-scroll-in--${v} ${
        visible ? "p5-scroll-in--visible" : ""
      } ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
