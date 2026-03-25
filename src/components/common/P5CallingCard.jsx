import P5Img from "./P5Img";

export default function P5CallingCard({
  imgPath = "/resources/img/top/callingCard_365572.png",
  label = "CALLING CARD",
  variant = "hero",
  ariaHidden = true,
}) {
  const wrapClass =
    variant === "hero"
      ? "p5-calling-card-wrap p5-calling-card-wrap--hero"
      : "p5-calling-card-wrap";

  return (
    <div className={wrapClass} aria-hidden={ariaHidden ? "true" : undefined}>
      <div className="p5-calling-card">
        <P5Img
          path={imgPath}
          alt="预告信"
          className="p5-calling-card__img"
          loading="lazy"
          draggable={false}
        />
        {label ? (
          <div className="p5-calling-card__label" aria-hidden>
            {label}
          </div>
        ) : null}
        <div className="p5-calling-card__scan" aria-hidden />
      </div>
    </div>
  );
}

