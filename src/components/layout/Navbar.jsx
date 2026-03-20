import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isScrolled, transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // 动漫风格导航链接
  const navLinks = [
    { 
      name: "首页", 
      path: "/", 
      icon: "🏠", 
      color: "from-cyan-400 to-blue-400",
      glow: "cyan",
      emoji: "✨"
    },
    { 
      name: "关于", 
      path: "/about", 
      icon: "👤", 
      color: "from-green-400 to-emerald-400",
      glow: "green",
      emoji: "🌟"
    },
    { 
      name: "love", 
      path: "/lovePage", 
      icon: "💖", 
      color: "from-pink-400 to-red-400",
      glow: "pink",
      emoji: "🌸"
    },
    { 
      name: "成长", 
      path: "/travel", 
      icon: "🌱", 
      color: "from-yellow-400 to-amber-400",
      glow: "yellow",
      emoji: "🍃"
    },
    { 
      name: "音乐", 
      path: "/music", 
      icon: "🎵", 
      color: "from-purple-400 to-indigo-400",
      glow: "purple",
      emoji: "🎶"
    },
    { 
      name: "联系", 
      path: "/contact", 
      icon: "✉️", 
      color: "from-pink-400 to-rose-400",
      glow: "pink",
      emoji: "💫"
    },
  ];

  // 动漫角色装饰
  const characters = [
    { emoji: "🐱", name: "猫娘", position: "left-10" },
    { emoji: "🐶", name: "柴犬", position: "right-10" },
    { emoji: "🐼", name: "熊猫", position: "left-20" },
    { emoji: "🦊", name: "狐狸", position: "right-20" },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          transparent
            ? isScrolled 
              ? 'bg-[#1A1F2E]/90 backdrop-blur-lg py-2 shadow-[0_4px_20px_rgba(79,209,197,0.15)]' 
              : 'bg-transparent py-6'
            : isScrolled 
              ? 'bg-[#1A1F2E]/95 backdrop-blur-lg py-3 shadow-[0_4px_20px_rgba(79,209,197,0.2)] border-b border-[#4FD1C5]/30' 
              : 'bg-transparent py-8'
        }`}
      >
        {/* 动态光效背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4FD1C5] rounded-full filter blur-[100px] opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#9F7AEA] rounded-full filter blur-[100px] opacity-20 animate-pulse-slow animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center">
            {/* Logo - 二次元风格 */}
            <Link to="/" className="relative group">
              <div className="flex items-center space-x-3">
                {/* 浮动图标 */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4FD1C5] to-[#9F7AEA] rounded-2xl rotate-3 group-hover:rotate-6 transition-all duration-300 shadow-lg flex items-center justify-center">
                    <span className="text-2xl transform -rotate-3 group-hover:rotate-0 transition-transform">
                      ⚛️
                    </span>
                  </div>
                  {/* 装饰小星星 */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-twinkle">
                    ⭐
                  </div>
                </div>
                
                <div className="relative">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#4FD1C5] via-[#9F7AEA] to-[#F687B3] bg-clip-text text-transparent">
                    冯行の小窝
                  </span>
                  {/* 底部装饰线 */}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#4FD1C5] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
              
              {/* 鼠标悬停时的角色对话 */}
              <div className="absolute -top-8 left-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2A2F3E] text-white text-xs py-1 px-3 rounded-full whitespace-nowrap border border-[#4FD1C5]/30">
                欢迎回家！(◕‿◕)
              </div>
            </Link>

            {/* 桌面端导航 - 二次元风格 */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredItem === index;
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative group"
                  >
                    {/* 导航项容器 */}
                    <div className={`relative px-5 py-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r ' + link.color + ' shadow-lg' 
                        : 'hover:bg-white/10'
                    }`}>
                      {/* 图标和文字 */}
                      <div className="flex items-center space-x-2">
                        <span className={`text-xl transform group-hover:scale-110 transition-transform duration-300 ${
                          isActive ? 'animate-bounce-subtle' : ''
                        }`}>
                          {link.icon}
                        </span>
                        <span className={`font-medium ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {link.name}
                        </span>
                      </div>

                      {/* 活动指示器 */}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                      )}

                      {/* 悬停时的光效 */}
                      {isHovered && !isActive && (
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.color} opacity-20 animate-pulse`}></div>
                      )}

                      {/* 顶部装饰小图标 */}
                      <div className={`absolute -top-2 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : ''
                      }`}>
                        {link.emoji}
                      </div>
                    </div>

                    {/* 悬停时的工具提示 */}
                    {!isActive && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2A2F3E] text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-[#4FD1C5]/30">
                        {link.name} {link.emoji}
                      </div>
                    )}
                  </Link>
                );
              })}

              {/* 二次元装饰角色 */}
              <div className="relative ml-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-float">
                  <span className="text-xl">🐱</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2A2F3E] text-white text-xs py-1 px-2 rounded-full opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  喵喵助手
                </div>
              </div>
            </div>

            {/* 移动端菜单按钮 - 二次元风格 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-12 h-12 bg-gradient-to-br from-[#4FD1C5] to-[#9F7AEA] rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="text-2xl text-white transform rotate-90 transition-transform duration-300">✕</span>
              ) : (
                <div className="relative">
                  <span className="text-2xl text-white">☰</span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
                </div>
              )}
              
              {/* 按钮光效 */}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>

          {/* 移动端导航菜单 - 二次元风格 */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 relative">
              {/* 菜单背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2E] to-[#2A2F3E] rounded-3xl border border-[#4FD1C5]/30 shadow-2xl"></div>
              
              {/* 顶部装饰 */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-[#4FD1C5] rounded-full"></div>
              
              <div className="relative p-4">
                {/* 移动端角色装饰 */}
                <div className="flex justify-center space-x-2 mb-6">
                  {characters.slice(0, 2).map((char, i) => (
                    <div key={i} className="relative group">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                        <span className="text-xl">{char.emoji}</span>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {char.name}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="relative group"
                      >
                        <div className={`relative p-4 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? `bg-gradient-to-r ${link.color} shadow-lg transform scale-105` 
                            : 'bg-[#2A2F3E]/50 hover:bg-[#2A2F3E]'
                        }`}>
                          <div className="flex items-center space-x-4">
                            {/* 图标 */}
                            <div className={`w-10 h-10 rounded-xl bg-[#1A1F2E] flex items-center justify-center ${
                              isActive ? 'animate-bounce-subtle' : ''
                            }`}>
                              <span className="text-2xl">{link.icon}</span>
                            </div>
                            
                            {/* 文字 */}
                            <div className="flex-1">
                              <span className={`font-medium text-lg ${
                                isActive ? 'text-white' : 'text-gray-300'
                              }`}>
                                {link.name}
                              </span>
                            </div>
                            
                            {/* 右箭头 */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-white/20' : ''
                            }`}>
                              <span className={`transform transition-transform group-hover:translate-x-1 ${
                                isActive ? 'text-white' : 'text-gray-400'
                              }`}>
                                →
                              </span>
                            </div>
                          </div>

                          {/* 悬停光效 */}
                          {!isActive && (
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* 底部角色装饰 */}
                <div className="flex justify-center space-x-4 mt-6">
                  {characters.slice(2, 4).map((char, i) => (
                    <div key={i} className="text-center">
                      <span className="text-2xl animate-float inline-block" style={{ animationDelay: `${i * 0.7}s` }}>
                        {char.emoji}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">{char.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 全局样式 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;