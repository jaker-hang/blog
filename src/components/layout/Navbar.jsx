import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaHeart, FaImage, FaMusic, FaEnvelope, FaBook, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "首页", path: "/", icon: <FaHome />, color: "text-blue-400" },
    { name: "关于", path: "/about", icon: <FaUser />, color: "text-green-400" },
    { name: "love", path: "/lovePage", icon: <FaHeart />, color: "text-red-400" },
    { name: "相册", path: "/travel", icon: <FaImage />, color: "text-yellow-400" },
    { name: "音乐", path: "/music", icon: <FaMusic />, color: "text-purple-400" },
    { name: "联系", path: "/contact", icon: <FaEnvelope />, color: "text-pink-400" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/20 backdrop-blur-md py-3 shadow-lg border-b border-white/30' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <FaBook className="mr-2 text-amber-300" />
            我的博客
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-white flex items-center ${
                  location.pathname === link.path
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-white/80'
                }`}
              >
                <span className={`mr-2 ${link.color}`}>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/30">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 px-4 rounded-lg transition-colors flex items-center ${
                    location.pathname === link.path
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className={`mr-3 ${link.color}`}>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;