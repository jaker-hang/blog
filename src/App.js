import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LovePage from "./pages/LovePage";
import MusicPlayer from "./pages/Music";
import Travel from "./pages/Travel";
import NotFound from "./pages/NotFound";
import { postsData } from "./utils/data";

// 创建一个包装组件来处理LovePage的全屏显示
function FullScreenWrapper({ children }) {
  const location = useLocation();
  const isLovePage = location.pathname === '/lovePage';

  return (
    <div
      className={isLovePage ? "" : "min-h-screen flex flex-col"}
      style={isLovePage ? {} : {
        background:
          "linear-gradient(rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.9)), url('/imgs/background.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {isLovePage ? (
        <div className="h-screen w-full overflow-hidden">{children}</div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar isScrolled={false} />
          <main className="flex-grow pt-24 pb-16">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 获取单篇文章数据
  const getPostById = (id) => {
    return postsData.find((post) => post.id === parseInt(id));
  };

  return (
    <FullScreenWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lovePage" element={<LovePage />} />
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/post/:id"
          element={<PostDetail getPostById={getPostById} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FullScreenWrapper>
  );
}

export default App;