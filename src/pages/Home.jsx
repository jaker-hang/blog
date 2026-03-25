import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import P5Img from "../components/common/P5Img";
import P5CharacterArchive from "../components/common/P5CharacterArchive";
import P5TarotCarousel from "../components/common/P5TarotCarousel";
import P5MapBackground from "../components/common/P5MapBackground";
import P5CallingCard from "../components/common/P5CallingCard";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  P5,
  newsItems,
  carouselSlides,
  galleryCaptions,
  specLines,
  img,
} from "../data/p5rHomeData";
import "./Home.css";

/**
 * 主页：女神异闻录5 风格重设计 — 塔罗 / 主人公 / 游戏截图轮播（资源均来自 public/resources）
 */
const Home = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [galleryAnimKey, setGalleryAnimKey] = useState(0);
  const [tarotRef, tarotVisible] = useScrollReveal();
  const [charRef, charVisible] = useScrollReveal();
  const [galleryRef, galleryVisible] = useScrollReveal();
  const [newsRef, newsVisible] = useScrollReveal();
  const [studentRef, studentVisible] = useScrollReveal();

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

  // 切换游戏瞬间中心图时，触发一段“镜头拉近”动画
  useEffect(() => {
    setGalleryAnimKey((k) => k + 1);
  }, [carouselIdx]);

  const cap = galleryCaptions[carouselIdx] ?? galleryCaptions[0] ?? "";

  const galleryN = carouselSlides.length;
  const galleryPrevI = (carouselIdx - 1 + galleryN) % galleryN;
  const galleryNextI = (carouselIdx + 1) % galleryN;

  return (
    <div
      id="top"
      className="p5r-official-root p5-home-redesign p5r-page p5r-home-content text-white overflow-x-hidden -mt-14 pt-14 sm:-mt-16 sm:pt-16 md:-mt-[4.5rem] md:pt-[4.5rem] relative"
    >
      {/* 女神异闻录5 风格动态背景（与成长页一致） */}
      <P5MapBackground />
      <div className="p5r-main relative z-10">
        {/* —— 头图 —— */}
        <section className="p5-hero p5r-first-view relative pb-10 md:pb-14 overflow-hidden">
          {/* 装饰背景：绝对定位，不参与文档流占位 */}
          <div className="p5-hero-bg" aria-hidden>
            <div className="p5r-kv-bg absolute inset-0 overflow-hidden">
              <div className="p5r-bg-stars pointer-events-none absolute inset-0" />
              <div className="p5r-kv-p5fx pointer-events-none absolute inset-0" />
              <div className="p5r-bg-top pointer-events-none absolute left-0 right-0 top-0 z-[2]" />
            </div>
          </div>
          <div className="p5r-wrapper relative z-10">
            <div className="p5-hero__titleblock">
              <h1 className="p5-hero__h1">
                <span className="p5-hero__h1-line">夺取吧，</span>
                <span className="p5-hero__h1-line p5-hero__h1-line--accent">
                  以那份意志。
                </span>
              </h1>
              {/* 预告信：放在标题模块下方，更自然贴合首屏 */}
              <P5CallingCard variant="hero" ariaHidden label="" />
            </div>
          </div>
        </section>

        {/* —— 塔罗牌：阿尔卡那轮播（点击翻转） —— */}
        <section
          ref={tarotRef}
          id="phantom"
          className={`p5-tarot-section scroll-mt-24 py-14 md:py-20 border-t-0 ${tarotVisible ? "p5-section-reveal p5-section-reveal--visible" : "p5-section-reveal"}`}
        >
          <div className="p5r-wrapper">
            <header className="p5-section-head mb-10 md:mb-14">
              <span className="p5-section-head__tag">VELVET · ARCANA</span>
              <h2 className="p5-section-head__title">塔罗印记</h2>
            </header>
            <P5TarotCarousel scrollRevealed={tarotVisible} />
          </div>
        </section>

        {/* —— 角色档案（P5R 心之怪盗团全员） —— */}
        <section
          ref={charRef}
          id="character"
          className={`p5-protag-section scroll-mt-24 py-14 md:py-20 border-t-0 ${charVisible ? "p5-section-reveal p5-section-reveal--visible" : "p5-section-reveal"}`}
        >
          <div className="p5r-wrapper">
            <header className="p5-section-head mb-10 md:mb-12">
              <span className="p5-section-head__tag">PHANTOM · CAST</span>
              <h2 className="p5-section-head__title">角色档案</h2>
              <p className="p5-section-head__desc">
                心之怪盗团全员——点击下方角色按钮切换。
              </p>
            </header>

            <P5CharacterArchive />
          </div>
        </section>

        {/* —— 游戏截图轮播（导航：特别） —— */}
        <section
          ref={galleryRef}
          id="special"
          className={`p5-gallery-section scroll-mt-24 py-14 md:py-20 border-t-0 ${galleryVisible ? "p5-section-reveal p5-section-reveal--visible" : "p5-section-reveal"}`}
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
                        key={galleryAnimKey}
                        path={carouselSlides[carouselIdx].tmb}
                        alt={
                          galleryCaptions[carouselIdx] ??
                          `游戏截图 ${carouselIdx + 1}`
                        }
                        className="p5-gallery__thumb-img p5-gallery__thumb-img--center p5-gallery__thumb-img--center-anim"
                        loading="eager"
                      />
                    </div>

                    <button
                      type="button"
                      className="p5-gallery__arrow-btn p5-gallery__arrow-btn--next"
                      aria-label="下一张"
                      onClick={() =>
                        setCarouselIdx((i) => (i + 1) % carouselSlides.length)
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
          ref={newsRef}
          id="news"
          className={`information p5r-information py-12 md:py-14 border-t-0 ${newsVisible ? "p5-section-reveal p5-section-reveal--visible" : "p5-section-reveal"}`}
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
      </div>

      <footer className="p5r-footer p5r-footer-official border-t-0 py-10">
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
