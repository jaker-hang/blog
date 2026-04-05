/**
 * 动能文字带：类似 JIEJOE 站上的重复大字流 + 本博客 P5 红黑配色
 */
const SEGMENTS = [
  "TAKE YOUR HEART",
  "·",
  "心之怪盗团",
  "·",
  "PHANTOM THIEVES",
  "·",
  "PERSONA",
  "·",
  "觉醒",
  "·",
  "DESIRE",
  "·",
  "SHOWTIME",
  "·",
];

function Half() {
  return (
    <div className="p5-kinetic-marquee-half flex shrink-0 items-center gap-3 sm:gap-5">
      {SEGMENTS.map((text, i) => (
        <span key={`${text}-${i}`} className="p5-kinetic-marquee-chunk">
          {text}
        </span>
      ))}
    </div>
  );
}

function Track({ reverse = false, className = "" }) {
  return (
    <div
      className={`p5-kinetic-marquee-row ${reverse ? "p5-kinetic-marquee-row--reverse" : ""} ${className}`.trim()}
    >
      <div className="p5-kinetic-marquee-clip">
        <div className="p5-kinetic-marquee-track">
          <Half />
          <Half />
        </div>
      </div>
    </div>
  );
}

export default function P5KineticMarquee() {
  return (
    <div
      className="p5-kinetic-marquee relative z-[11] border-y border-red-600/50 bg-black/80 backdrop-blur-[2px]"
      aria-hidden
    >
      <Track />
      <Track reverse className="opacity-[0.92]" />
      <p className="p5-kinetic-marquee-hint text-center">
        Scroll · 慢慢滑 — 感受视差与动线
      </p>
    </div>
  );
}
