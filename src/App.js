import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import P5MapBackground from "./components/common/P5MapBackground";
import P5SplashLoader from "./components/common/P5SplashLoader";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LovePage from "./pages/LovePage";
import MusicPlayer from "./pages/Music";
import Travel from "./pages/Travel";
import NotFound from "./pages/NotFound";
import P5GlobalEffects from "./components/common/P5GlobalEffects";

function FullScreenWrapper({ children }) {
  const location = useLocation();
  const isLovePage = location.pathname === "/lovePage";
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={isLovePage ? "" : "min-h-screen flex flex-col"}
      style={isLovePage ? {} : undefined}
    >
      {isLovePage ? (
        <div className="h-screen w-full overflow-hidden relative">
          <div className="fixed top-0 left-0 right-0 z-[10070]">
            <Navbar
              isScrolled={isScrolled}
              transparent={true}
              isHomePage={false}
              isLovePage={true}
            />
          </div>
          <div className="pt-16 h-full">{children}</div>
        </div>
      ) : (
        <div
          className={`relative flex flex-col min-h-screen p5-theme ${
            isHomePage ? "bg-black" : "app-main-bg"
          }`}
        >
          {!isHomePage && <P5MapBackground />}
          <Navbar
            isScrolled={isScrolled}
            transparent={isHomePage}
            isHomePage={isHomePage}
            isLovePage={false}
          />
          <main
            className={`relative z-10 flex-grow ${
              isHomePage
                ? /* 略小于原 6.5rem/28/32，减少首屏「黑条」；与 Home 根上 -mt/pt 同步 */
                  "pt-14 pb-0 sm:pt-16 md:pt-[4.5rem]"
                : "pt-28 pb-16 lg:pt-32"
            }`}
          >
            {children}
          </main>
          {!isHomePage && <Footer />}
          {!isHomePage && <BackToTop />}
        </div>
      )}
    </div>
  );
}

/**
 * 帽子加载：不在「首次进入站点」时播放（避免 StrictMode 双挂载像反复刷新）；
 * 仅在 pathname 真正变化后递增 key 再播放一次。
 */
function AppWithRouteSplash() {
  const location = useLocation();
  const bootRef = useRef(true);
  const prevPathRef = useRef(location.pathname);
  const [splashId, setSplashId] = useState(0);

  useEffect(() => {
    if (bootRef.current) {
      bootRef.current = false;
      prevPathRef.current = location.pathname;
      return;
    }
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setSplashId((n) => n + 1);
    }
  }, [location.pathname]);

  return (
    <>
      {splashId > 0 ? <P5SplashLoader key={splashId} /> : null}
      <P5GlobalEffects />
      <FullScreenWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lovePage" element={<LovePage />} />
          <Route path="/music" element={<MusicPlayer />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FullScreenWrapper>
    </>
  );
}

function App() {
  return <AppWithRouteSplash />;
}

export default App;
