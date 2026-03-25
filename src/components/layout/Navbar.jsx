import { useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const mainFrames = [
  { ja: "首页", en: "TOP", path: "/" },
  { ja: "Me", en: "ABOUT", path: "/about" },
  { ja: "音乐", en: "MUSIC", path: "/music" },
  { ja: "成长", en: "JOURNEY", path: "/travel" },
  { ja: "特别", en: "EXTRA", path: "/lovePage" },
];

const Navbar = ({
  isScrolled,
  transparent = false,
  isHomePage = false,
  isLovePage = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (path) => {
    if (path === "/lovePage") return;
    if (path.includes("#")) return;
    if (location.pathname === path) {
      window.dispatchEvent(new CustomEvent("p5-weak-hit"));
    }
  };

  const shellClass = (() => {
    if (isLovePage) {
      return isScrolled
        ? "bg-black/80 backdrop-blur-md border-b border-white/10"
        : "bg-transparent border-b border-transparent";
    }
    if (transparent && isHomePage) {
      return isScrolled
        ? "bg-black/75 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        : "bg-transparent border-b border-transparent";
    }
    return "bg-black/88 backdrop-blur-sm border-b border-red-900/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)]";
  })();

  return (
    <nav
      className={`p5-nav-shell fixed top-0 left-0 right-0 z-[10070] transition-all duration-300 ${shellClass}`}
    >
      {!transparent && (
        <div className="h-0.5 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-900 opacity-90" />
      )}

      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 pt-3 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 lg:gap-4">
          {/* 左：Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick("/")}
            className="group flex items-center shrink-0 p5-nav-logo-mark select-none"
          >
            <img
              src="/p5r-logo.png"
              alt="PERSONA 5 THE ROYAL"
              className="h-10 w-auto sm:h-11 md:h-12 max-h-[52px] object-contain object-left drop-shadow-[2px_3px_0_rgba(0,0,0,0.85)] transition-[filter,transform] duration-200 group-hover:brightness-110 group-hover:scale-[1.03]"
              draggable={false}
            />
          </Link>

          {/* 中：五格白框 + 星（仅桌面） */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0 min-w-0 px-2">
            {mainFrames.map((item, i) => (
              <Fragment key={item.path + item.ja}>
                {i > 0 && (
                  <span className="p5-nav-sep px-1" aria-hidden>
                    ✦
                  </span>
                )}
                <Link
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="p5-nav-frame shrink-0"
                >
                  <span className="p5-nav-frame-inner">
                    <span className="p5-nav-frame-ja block whitespace-nowrap">
                      {item.ja}
                    </span>
                    <span className="p5-nav-frame-en block">{item.en}</span>
                  </span>
                </Link>
              </Fragment>
            ))}
          </div>

          {/* 右：今すぐ購入 */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0 shrink-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden px-3 py-2 border-2 border-white/80 bg-black/60 text-[10px] font-black text-white skew-x-[-8deg] shadow-[3px_3px_0_#000]"
              aria-expanded={isMenuOpen}
              aria-label="打开菜单"
            >
              {isMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端：全站链接 */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-red-900/50 bg-black/95 px-4 py-4 max-h-[min(78vh,560px)] overflow-y-auto shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <p className="text-[10px] font-black text-red-500 tracking-[0.4em] mb-3">
            MAIN
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {mainFrames.map((item) => (
              <Link
                key={item.path + item.ja + "m"}
                to={item.path}
                onClick={() => {
                  handleNavClick(item.path);
                  setIsMenuOpen(false);
                }}
                className="p5-nav-frame w-full"
              >
                <span className="p5-nav-frame-inner">
                  <span className="p5-nav-frame-ja">{item.ja}</span>
                  <span className="p5-nav-frame-en">{item.en}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="text-[10px] font-black text-red-500 tracking-[0.4em] mb-2">
            SITE
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
