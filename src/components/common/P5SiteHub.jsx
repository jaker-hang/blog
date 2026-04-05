import { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { siteHubCards, siteHubQuotes } from "../../data/siteHubData";
import TiltSurface from "./TiltSurface";

/**
 * 首页：站点导览（Featured 式卡片 + P5 斜切框）
 */
const P5SiteHub = forwardRef(function P5SiteHub({ visible = true }, ref) {
  const quote = useMemo(
    () => siteHubQuotes[Math.floor(Math.random() * siteHubQuotes.length)],
    [],
  );

  return (
    <section
      ref={ref}
      id="site-hub"
      className={`p5-site-hub scroll-mt-24 py-14 md:py-20 border-t border-red-900/25 ${
        visible ? "p5-section-reveal p5-section-reveal--visible" : "p5-section-reveal"
      }`}
    >
      <div className="p5r-wrapper">
        <header className="p5-section-head mb-10 md:mb-12">
          <span className="p5-section-head__tag">SITE · NAV</span>
          <h2 className="p5-section-head__title">怪盗团频道</h2>
        </header>

        <div className="p5-site-hub-quote mb-10 md:mb-12">
          <span className="p5-site-hub-quote__en">{quote.en}</span>
          <span className="p5-site-hub-quote__ja">{quote.ja}</span>
        </div>

        <ul className="p5-site-hub-grid">
          {siteHubCards.map((c) => (
            <li key={c.path}>
              <TiltSurface className="block h-full min-h-[10.5rem]" maxTilt={5}>
              <Link to={c.path} className="p5-site-hub-card group block h-full min-h-[10.5rem]">
                <span
                  className="p5-site-hub-card__accent"
                  style={{ "--hub-accent": c.accent }}
                />
                <span className="p5-site-hub-card__tag">{c.tag}</span>
                <span className="p5-site-hub-card__title">{c.title}</span>
                <span className="p5-site-hub-card__ja">{c.titleJa}</span>
                <span className="p5-site-hub-card__desc">{c.desc}</span>
                <span className="p5-site-hub-card__go" aria-hidden>
                  GO »
                </span>
              </Link>
              </TiltSurface>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default P5SiteHub;
