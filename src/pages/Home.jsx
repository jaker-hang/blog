import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import P5Img from "../components/common/P5Img";
import {
  P5,
  newsItems,
  carouselSlides,
  galleryCaptions,
  tarotShowcase,
  characterSlides,
  specLines,
  img,
} from "../data/p5rHomeData";
import "./Home.css";

function TarotCard({ roman, arcana, role, blurb, accent }) {
  const [spinning, setSpinning] = useState(false);

  const triggerSpin = useCallback(() => {
    if (spinning) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), 920);
  }, [spinning]);

  return (
    <article
      role="button"
      tabIndex={0}
      className={`p5-tarot-card ${spinning ? "p5-tarot-card--spin" : ""}`}
      style={{ "--p5-tarot-accent": accent }}
      onClick={triggerSpin}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerSpin();
        }
      }}
      aria-label={`${arcana}：点击旋转`}
    >
      <div className="p5-tarot-card__frame" aria-hidden />
      <div className="p5-tarot-card__spin-inner">
        <div className="p5-tarot-card__inner">
          <span className="p5-tarot-card__roman">{roman}</span>
          <h3 className="p5-tarot-card__arcana">{arcana}</h3>
          <p className="p5-tarot-card__role">{role}</p>
          <p className="p5-tarot-card__blurb">{blurb}</p>
          <span className="p5-tarot-card__hint">点击旋转</span>
        </div>
      </div>
    </article>
  );
}

/**
 * 主页：女神异闻录5 风格重设计 — 塔罗 / 主人公 / 游戏截图轮播（资源均来自 public/resources）
 */
const Home = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    document.documentElement.lang = "zh-CN";
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const t = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % carouselSlides.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const cap =
    galleryCaptions[carouselIdx] ?? galleryCaptions[0] ?? "";

  const currentChar = characterSlides[charIdx] ?? characterSlides[0];

  const galleryN = carouselSlides.length;
  const galleryPrevI = (carouselIdx - 1 + galleryN) % galleryN;
  const galleryNextI = (carouselIdx + 1) % galleryN;

  return (
    <div
      id="top"
      className="p5r-official-root p5-home-redesign p5r-page p5r-home-content bg-black text-white overflow-x-hidden -mt-14 pt-14 sm:-mt-16 sm:pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]"
    >
      <div className="p5r-main">
        {/* —— 头图 —— */}
        <section className="p5-hero p5r-first-view relative pb-10 md:pb-14 overflow-hidden">
          {/* 装饰背景：绝对定位，不参与文档流占位 */}
          <div className="p5-hero-bg" aria-hidden>
            <div className="p5r-kv-bg absolute inset-0 overflow-hidden">
              <div className="p5r-bg-stars pointer-events-none absolute inset-0" />
              <div className="p5r-kv-p5fx pointer-events-none absolute inset-0" />
              <div className="p5r-bg-top pointer-events-none absolute left-0 right-0 top-0 z-[2]" />
              <div className="p5-hero-redline pointer-events-none absolute left-1/2 bottom-0 z-[3] w-full max-w-[1218px] -translate-x-1/2 flex justify-center items-end">
                <P5Img
                  path="/resources/img/top/bg_red_line_fe82daa77927be565a03f46a0c7cbf04.png"
                  alt=""
                  className="w-full h-auto max-h-[min(22vh,200px)] object-contain object-bottom opacity-90 select-none"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="p5r-wrapper relative z-10">
            <div className="p5-hero__titleblock">
              <p className="p5-hero__eyebrow">PERSONA 5 THE ROYAL</p>
              <h1 className="p5-hero__h1">
                <span className="p5-hero__h1-line">夺取吧，</span>
                <span className="p5-hero__h1-line p5-hero__h1-line--accent">
                  以那份意志。
                </span>
              </h1>
              <p className="p5-hero__sub">
                校园日常 × 怪盗非日常 · 塔罗式命运 UI · 本地素材陈列
              </p>
            </div>

            <div className="p5-hero__kvrow flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mt-8">
              <div className="flex-1 w-full max-w-lg space-y-5 text-center lg:text-left">
                <P5Img
                  path="/resources/img/top/fv_copy1_569d70b8e47b1f691605a7104ba6783a.png"
                  alt="以意志夺取。"
                  className="mx-auto lg:mx-0 max-w-full h-auto drop-shadow-lg"
                  loading="eager"
                />
                <P5Img
                  path="/resources/img/top/fv_copy2_809c34d071e7bf47e8dd8f505a3446de.png"
                  alt="女神异闻录5 皇家版"
                  className="mx-auto lg:mx-0 max-w-full h-auto"
                  loading="eager"
                />
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                  <a
                    href="https://www.youtube.com/watch?v=A0_BMZivKRc&autoplay=1&rel=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p5-btn-skew p5-btn-skew--ghost"
                  >
                    <span className="p5-btn-skew__text">宣传 PV</span>
                  </a>
                  <a
                    href={`${P5}/shopguide/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p5-btn-skew p5-btn-skew--solid"
                  >
                    <span className="p5-btn-skew__text">官网购买指引</span>
                  </a>
                </div>
              </div>
              <div className="shrink-0 w-full max-w-sm flex flex-col items-center gap-4">
                <P5Img
                  path="/resources/img/top/spec_logo_0588e36582e0b170942092a8220a95e6.png"
                  alt="P5 THE ROYAL"
                  className="w-48 md:w-56 opacity-95"
                  loading="eager"
                />
                <P5Img
                  path="/resources/img/top/fv_release_date_4af2066228eaf3e4b21d3b678a4a7974.png"
                  alt="热销中"
                  className="max-w-xs w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* —— 塔罗牌风：阿尔卡那展示（导航：怪盗） —— */}
        <section
          id="phantom"
          className="p5-tarot-section scroll-mt-24 py-14 md:py-20 border-t border-red-600/35 bg-gradient-to-b from-zinc-950 via-black to-black"
        >
          <div className="p5r-wrapper">
            <header className="p5-section-head mb-10 md:mb-14">
              <span className="p5-section-head__tag">VELVET · ARCANA</span>
              <h2 className="p5-section-head__title">塔罗印记</h2>
              <p className="p5-section-head__desc">
                以阿尔卡那为骨架，拼出《女神异闻录5》的叙事节奏——启程、契约、命运与谎言。
              </p>
            </header>
            <div className="p5-tarot-grid">
              {tarotShowcase.map((t) => (
                <TarotCard key={t.roman + t.arcana} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* —— 主人公档案（导航：角色） —— */}
        <section
          id="character"
          className="p5-protag-section scroll-mt-24 py-14 md:py-20 border-t border-amber-700/30 bg-black"
        >
          <div className="p5r-wrapper">
            <header className="p5-section-head mb-10 md:mb-12">
              <span className="p5-section-head__tag">PHANTOM · CAST</span>
              <h2 className="p5-section-head__title">角色档案</h2>
              <p className="p5-section-head__desc">
                主人公、芳泽霞、摩尔加纳与心理助教丸喜——左右滑动或点击圆点切换。
              </p>
            </header>

            <div className="p5-char-carousel">
              <button
                type="button"
                className="p5-char-carousel__arrow p5-char-carousel__arrow--prev"
                aria-label="上一位角色"
                onClick={() =>
                  setCharIdx(
                    (i) =>
                      (i - 1 + characterSlides.length) % characterSlides.length,
                  )
                }
              >
                <span className="p5-char-carousel__arrow-text" aria-hidden>
                  ‹
                </span>
              </button>
              <button
                type="button"
                className="p5-char-carousel__arrow p5-char-carousel__arrow--next"
                aria-label="下一位角色"
                onClick={() =>
                  setCharIdx((i) => (i + 1) % characterSlides.length)
                }
              >
                <span className="p5-char-carousel__arrow-text" aria-hidden>
                  ›
                </span>
              </button>

              <div className="p5-protag-layout p5-char-carousel__panel">
                <div className="p5-protag-copy">
                  <div className="p5-protag-badge">
                    <span className="p5-protag-badge__en">
                      {currentChar.codename}
                    </span>
                    <span className="p5-protag-badge__zh">
                      {currentChar.nameLine}
                    </span>
                  </div>
                  <p className="p5-protag-sub">{currentChar.subLine}</p>
                  <div className="p5-protag-lines">
                    {currentChar.paragraphs.map((p, idx) => (
                      <p key={`${currentChar.id}-${idx}`}>{p}</p>
                    ))}
                  </div>
                  <p className="p5-protag-quote">{currentChar.quote}</p>
                </div>
                <div className="p5-protag-visual">
                  <div
                    key={currentChar.id}
                    className="p5-protag-visual__skew p5-char-carousel__visual"
                  >
                    <P5Img
                      path={currentChar.image}
                      alt={currentChar.nameLine}
                      className="p5-protag-visual__img"
                      loading="lazy"
                    />
                    <div className="p5-protag-visual__scan" aria-hidden />
                  </div>
                </div>
              </div>

              <div className="p5-char-carousel__dots">
                {characterSlides.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`查看 ${c.nameLine}`}
                    aria-current={i === charIdx ? "true" : undefined}
                    onClick={() => setCharIdx(i)}
                    className={`p5-char-carousel__dot ${
                      i === charIdx ? "p5-char-carousel__dot--active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* —— 游戏截图轮播（导航：特别） —— */}
        <section
          id="special"
          className="p5-gallery-section scroll-mt-24 py-14 md:py-20 border-t border-red-500/25 bg-zinc-950/80"
        >
          <div className="p5r-wrapper max-w-[min(100%,1420px)]">
            <header className="p5-section-head mb-8 md:mb-10 text-center">
              <span className="p5-section-head__tag">GALLERY</span>
              <h2 className="p5-section-head__title">游戏瞬间</h2>
              <p className="p5-section-head__desc mx-auto">
                宽屏为三图横排（左·中·右），箭头夹在接缝处；窄屏为单图、左右切换。侧图可点选切到该张。
              </p>
            </header>

            <div className="p5-gallery">
              {/* 官网风：三图横排 + z/y 夹在左|中、中|右 接缝处（大屏）；小屏单图 + 两侧箭头 */}
              <div className="p5-gallery__stage">
                <div
                  className="p5-gallery__jagged p5-gallery__jagged--tl"
                  aria-hidden
                />
                <div
                  className="p5-gallery__jagged p5-gallery__jagged--br"
                  aria-hidden
                />

                <div className="p5-gallery__triple-wrap">
                  <div className="p5-gallery__triple">
                    <button
                      type="button"
                      className="p5-gallery__thumb p5-gallery__thumb--side"
                      onClick={() => setCarouselIdx(galleryPrevI)}
                      aria-label={`查看上一张：${galleryCaptions[galleryPrevI] ?? ""}`}
                    >
                      <P5Img
                        path={carouselSlides[galleryPrevI].tmb}
                        alt=""
                        className="p5-gallery__thumb-img"
                        loading="lazy"
                      />
                    </button>

                    <button
                      type="button"
                      className="p5-gallery__arrow-btn p5-gallery__arrow-btn--prev"
                      aria-label="上一张"
                      onClick={() =>
                        setCarouselIdx(
                          (i) =>
                            (i - 1 + carouselSlides.length) %
                            carouselSlides.length,
                        )
                      }
                    >
                      <P5Img
                        path="/resources/img/sp/top/z.png"
                        alt=""
                        className="p5-gallery__arrow-png"
                        draggable={false}
                        loading="eager"
                      />
                    </button>

                    <div className="p5-gallery__thumb p5-gallery__thumb--center">
                      <P5Img
                        path={carouselSlides[carouselIdx].tmb}
                        alt={galleryCaptions[carouselIdx] ?? `游戏截图 ${carouselIdx + 1}`}
                        className="p5-gallery__thumb-img p5-gallery__thumb-img--center"
                        loading="eager"
                      />
                    </div>

                    <button
                      type="button"
                      className="p5-gallery__arrow-btn p5-gallery__arrow-btn--next"
                      aria-label="下一张"
                      onClick={() =>
                        setCarouselIdx(
                          (i) => (i + 1) % carouselSlides.length,
                        )
                      }
                    >
                      <P5Img
                        path="/resources/img/sp/top/y.png"
                        alt=""
                        className="p5-gallery__arrow-png"
                        draggable={false}
                        loading="eager"
                      />
                    </button>

                    <button
                      type="button"
                      className="p5-gallery__thumb p5-gallery__thumb--side"
                      onClick={() => setCarouselIdx(galleryNextI)}
                      aria-label={`查看下一张：${galleryCaptions[galleryNextI] ?? ""}`}
                    >
                      <P5Img
                        path={carouselSlides[galleryNextI].tmb}
                        alt=""
                        className="p5-gallery__thumb-img"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p className="p5-gallery__caption mt-6 text-center text-sm md:text-base text-zinc-300 min-h-[3rem] px-4 leading-relaxed">
                {cap}
              </p>

              <div className="flex justify-center gap-2 mt-5 flex-wrap">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`第 ${i + 1} 张`}
                    aria-current={i === carouselIdx ? "true" : undefined}
                    onClick={() => setCarouselIdx(i)}
                    className={`h-2 rounded-sm transition-all duration-300 ${
                      i === carouselIdx
                        ? "w-10 bg-red-500 skew-x-[-8deg]"
                        : "w-2 bg-zinc-600 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* —— 简讯 —— */}
        <section
          id="news"
          className="information p5r-information py-12 md:py-14 border-t border-red-900/30"
        >
          <div className="p5r-wrapper">
            <div className="mb-6 text-center">
              <P5Img
                path="/resources/img/top/news_title_778961cf3e65f0731da400eefa38c6cd.png"
                alt="NEWS"
                className="inline-block max-w-[200px] md:max-w-none"
                loading="lazy"
              />
            </div>
            <div className="news-container">
              <P5Img
                path="/resources/img/top/news_bg_744932739a7f331e232f336d8acd1883.png"
                alt=""
                className="news-bg-img w-full h-auto opacity-95 block"
                loading="lazy"
              />
              <ul className="news-box">
                {newsItems.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} target="_blank" rel="noopener noreferrer">
                      <span className="news-date">{n.date}</span>
                      <span className="news-text">{n.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* —— 校园剪影（导航：学生） —— */}
        <section
          id="student"
          className="p5-companion scroll-mt-24 py-12 border-t border-red-900/25 bg-black"
        >
          <div className="p5r-wrapper">
            <header className="p5-section-head mb-8 text-center">
              <span className="p5-section-head__tag">ROYAL</span>
              <h2 className="p5-section-head__title">第三学期 · 剪影</h2>
            </header>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <a
                href={img(
                  "/resources/img/top/ss/royal2_ss1_eaa581d6b9821bf165d3982350e1a5c4.jpg",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="p5-companion__card group"
              >
                <P5Img
                  path="/resources/img/top/tmb/royal2_ss1_5672c6da5d4cceac8377bfb42ebd681e.png"
                  alt="陌生的青年"
                  className="w-full border-2 border-amber-700/40 group-hover:border-red-500/70 transition-colors"
                  loading="lazy"
                />
                <span className="p5-companion__label">未曾见过的展开</span>
              </a>
              <a
                href={img(
                  "/resources/img/top/ss/royal2_ss2_aa3972f69ff547d38e60f0b4787a038e.jpg",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="p5-companion__card group"
              >
                <P5Img
                  path="/resources/img/top/tmb/royal2_ss2_637713189f6245a0f6fe92670aaaebfc.png"
                  alt="初诣"
                  className="w-full border-2 border-amber-700/40 group-hover:border-red-500/70 transition-colors"
                  loading="lazy"
                />
                <span className="p5-companion__label">与伙伴的新回忆</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      <footer className="p5r-footer p5r-footer-official border-t border-red-900/40 bg-black py-10">
        <div className="p5r-wrapper max-w-[900px]">
          <nav
            className="mt-4 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-400 flex flex-wrap justify-center gap-x-4 gap-y-2"
            aria-label="站内导航"
          >
            <Link to="/about" className="p5r-site-link">
              自我介绍
            </Link>
            <Link to="/music" className="p5r-site-link">
              音乐
            </Link>
            <Link to="/travel" className="p5r-site-link">
              成长
            </Link>
            <Link to="/contact" className="p5r-site-link">
              联系
            </Link>
            <Link to="/lovePage" className="p5r-site-link">
              特别
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;
