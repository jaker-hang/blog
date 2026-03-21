import { useState, useEffect } from "react";
import SubscribeForm from "../components/common/SubscribeForm";

// 扩展文章数据，添加React相关文章
const extendedPostsData = [
  // React 核心文章
  {
    id: 1,
    title: "React 18 并发渲染原理与实践",
    excerpt:
      "深入理解 React 18 的并发特性，通过实际案例学习如何使用 useTransition 和 useDeferredValue 优化用户体验。",
    date: "2024-02-15",
    author: "冯行",
    category: "React 进阶",
    tags: ["React 18", "并发渲染", "性能优化"],
    image: "https://picsum.photos/id/1/800/400",
    readTime: "8 min",
    likes: 234,
    comments: 56,
  },
  {
    id: 2,
    title: "TypeScript 类型体操：从入门到放弃再到精通",
    excerpt:
      "探索 TypeScript 的高级类型，实现条件类型、映射类型和递归类型，打造类型安全的 React 应用。",
    date: "2024-02-10",
    author: "冯行",
    category: "TypeScript",
    tags: ["TypeScript", "类型编程", "类型安全"],
    image: "https://picsum.photos/id/20/800/400",
    readTime: "12 min",
    likes: 189,
    comments: 42,
  },
  {
    id: 3,
    title: "Next.js 14 服务端组件深度解析",
    excerpt:
      "从架构设计到实际应用，全面解析 Next.js 14 的服务端组件模式，以及如何在项目中合理使用。",
    date: "2024-02-05",
    author: "冯行",
    category: "Next.js",
    tags: ["Next.js 14", "服务端组件", "SSR"],
    image: "https://picsum.photos/id/21/800/400",
    readTime: "10 min",
    likes: 156,
    comments: 38,
  },
  {
    id: 4,
    title: "React 性能优化：从渲染原理到实战技巧",
    excerpt:
      "深入 React 渲染机制，掌握 memo、useMemo、useCallback 的正确使用姿势，告别不必要的重渲染。",
    date: "2024-01-28",
    author: "冯行",
    category: "性能优化",
    tags: ["性能优化", "渲染", "最佳实践"],
    image: "https://picsum.photos/id/26/800/400",
    readTime: "15 min",
    likes: 312,
    comments: 67,
  },
  {
    id: 5,
    title: "React Hooks 源码实现：手写一个迷你版",
    excerpt:
      "通过手写实现 useState、useEffect 等核心 Hooks，深入理解 Fiber 架构和 Hook 的工作原理。",
    date: "2024-01-20",
    author: "冯行",
    category: "React 源码",
    tags: ["Hooks", "源码分析", "Fiber"],
    image: "https://picsum.photos/id/30/800/400",
    readTime: "7 min",
    likes: 145,
    comments: 29,
  },
  {
    id: 6,
    title: "Zustand vs Redux：现代状态管理方案对比",
    excerpt:
      "深入对比 Zustand、Redux Toolkit、Jotai 等状态管理库，帮你选择最适合项目的方案。",
    date: "2024-01-12",
    author: "冯行",
    category: "状态管理",
    tags: ["Zustand", "Redux", "状态管理"],
    image: "https://picsum.photos/id/36/800/400",
    readTime: "9 min",
    likes: 278,
    comments: 51,
  },
  {
    id: 7,
    title: "TailwindCSS 高级技巧：打造可复用的组件库",
    excerpt:
      "结合 React 和 TailwindCSS，学习如何设计原子化的组件系统，提升开发效率和一致性。",
    date: "2024-01-05",
    author: "冯行",
    category: "CSS",
    tags: ["TailwindCSS", "组件库", "设计系统"],
    image: "https://picsum.photos/id/42/800/400",
    readTime: "11 min",
    likes: 167,
    comments: 34,
  },
  {
    id: 8,
    title: "React 测试实战：从单元测试到 E2E",
    excerpt:
      "使用 Jest、React Testing Library 和 Cypress，构建完整的 React 应用测试体系。",
    date: "2023-12-28",
    author: "冯行",
    category: "测试",
    tags: ["Jest", "测试", "Cypress"],
    image: "https://picsum.photos/id/48/800/400",
    readTime: "10 min",
    likes: 123,
    comments: 27,
  },
  {
    id: 9,
    title: "Framer Motion 动画实战：让 React 应用动起来",
    excerpt:
      "掌握 Framer Motion 的核心概念，为 React 应用添加流畅自然的交互动画效果。",
    date: "2023-12-20",
    author: "冯行",
    category: "动画",
    tags: ["Framer Motion", "动画", "交互"],
    image: "https://picsum.photos/id/55/800/400",
    readTime: "8 min",
    likes: 198,
    comments: 41,
  },
  {
    id: 10,
    title: "React 设计模式：构建可维护的大型应用",
    excerpt:
      "探讨 React 项目中的架构设计模式，包括容器组件、高阶组件、Render Props 等。",
    date: "2023-12-12",
    author: "冯行",
    category: "架构设计",
    tags: ["设计模式", "架构", "最佳实践"],
    image: "https://picsum.photos/id/60/800/400",
    readTime: "13 min",
    likes: 234,
    comments: 48,
  },
];

// 动漫风格数据
const animeThemes = [
  {
    emoji: "⚛️",
    name: "React",
    color: "from-blue-400 to-cyan-400",
    bg: "bg-blue-50",
  },
  {
    emoji: "📘",
    name: "TypeScript",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    emoji: "▲",
    name: "Next.js",
    color: "from-gray-800 to-gray-600",
    bg: "bg-gray-50",
  },
  {
    emoji: "🎨",
    name: "Tailwind",
    color: "from-cyan-400 to-teal-400",
    bg: "bg-cyan-50",
  },
  {
    emoji: "📦",
    name: "Zustand",
    color: "from-amber-400 to-orange-400",
    bg: "bg-amber-50",
  },
  {
    emoji: "⚡",
    name: "Vite",
    color: "from-purple-400 to-pink-400",
    bg: "bg-purple-50",
  },
];

const Home = () => {
  const [featuredPosts] = useState(() => {
    return extendedPostsData.slice(0, 3);
  });

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // 排除特色文章
  const regularPosts = extendedPostsData.filter(
    (post) => !featuredPosts.some((fp) => fp.id === post.id),
  );

  // 自动轮播
  useEffect(() => {
    if (featuredPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentFeaturedIndex(
        (prevIndex) => (prevIndex + 1) % featuredPosts.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  const goToSlide = (index) => {
    setCurrentFeaturedIndex(index);
  };

  const nextSlide = () => {
    setCurrentFeaturedIndex((prevIndex) =>
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentFeaturedIndex((prevIndex) =>
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    // 确保页面滚动始终可用
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* 主内容 */}
      <div className="relative z-10">
        {/* Hero 区域 - 科技动漫风 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative">
            {/* 装饰圆环 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FD1C5] rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9F7AEA] rounded-full filter blur-3xl opacity-10"></div>

            <div className="relative text-center">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#4FD1C5] to-[#9F7AEA] rounded-2xl rotate-45 animate-spin-slow opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">⚛️</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#4FD1C5] via-[#9F7AEA] to-[#F687B3] bg-clip-text text-transparent">
                  冯行の技术博客
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                探索 React 的无限可能 · 分享前沿技术实践 · 记录编程思考
              </p>

              {/* 技术标签云 */}
              <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
                {animeThemes.map((theme, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.color} text-white text-sm font-medium shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                  >
                    {theme.emoji} {theme.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 特色文章轮播 - 科技卡片风格 */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative h-[500px] rounded-2xl overflow-hidden group">
            {/* 轮播内容 */}
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentFeaturedIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent"></div>

                  {/* 文章信息 */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-3xl">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-3 py-1 bg-[#4FD1C5] text-[#0B0F1C] text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-300 text-sm">
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-300 text-lg mb-4 max-w-2xl">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="px-6 py-3 bg-[#4FD1C5] text-[#0B0F1C] font-medium rounded-xl hover:bg-[#3BB5A9] transition-all transform hover:scale-105">
                          阅读全文 →
                        </button>
                        <div className="flex items-center space-x-3 text-gray-300">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 轮播控制器 */}
            {featuredPosts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#1A1F2E] border border-[#4FD1C5]/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#4FD1C5] hover:text-[#0B0F1C] z-20"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#1A1F2E] border border-[#4FD1C5]/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#4FD1C5] hover:text-[#0B0F1C] z-20"
                >
                  →
                </button>
              </>
            )}

            {/* 指示器 */}
            {featuredPosts.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentFeaturedIndex
                        ? "w-8 bg-[#4FD1C5]"
                        : "w-2 bg-gray-500 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 文章列表和侧边栏 */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 文章列表 */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">最新文章</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#4FD1C5] to-transparent ml-4"></div>
              </div>

              <div className="space-y-6">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="glass-card rounded-xl p-6 hover:border-[#4FD1C5]/30 transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-[#4FD1C5]/10 text-[#4FD1C5] text-xs rounded-full">
                            {post.category}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {post.date}
                          </span>
                          <span className="text-gray-500 text-xs">
                            📖 {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4FD1C5] transition">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>❤️ {post.likes}</span>
                            <span>💬 {post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-xs text-[#4FD1C5]">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 加载更多 */}
              <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-[#1A1F2E] border border-[#4FD1C5]/30 rounded-xl text-[#4FD1C5] hover:bg-[#4FD1C5] hover:text-[#0B0F1C] transition-all">
                  加载更多文章
                </button>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 作者卡片 */}
              <div className="glass-card rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#4FD1C5] to-[#9F7AEA] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">冯行</h3>
                  <p className="text-sm text-gray-400">React 前端开发工程师</p>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center">
                    <span className="w-16 text-gray-500">经验：</span>
                    <span>3年 React 开发</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-16 text-gray-500">专注：</span>
                    <span>React / TypeScript / Next.js</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-16 text-gray-500">文章：</span>
                    <span>{extendedPostsData.length} 篇</span>
                  </p>
                </div>
              </div>

              {/* 热门标签 */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Next.js",
                    "性能优化",
                    "源码",
                    "Hooks",
                    "状态管理",
                    "动画",
                    "测试",
                    "架构",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#2A2F3E] text-gray-300 text-sm rounded-full hover:bg-[#4FD1C5] hover:text-[#0B0F1C] cursor-pointer transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 订阅卡片 */}
              <div className="glass-card bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">订阅更新</h3>
                <p className="text-sm text-gray-400 mb-4">
                  每周精选技术文章，第一时间送达
                </p>
                <SubscribeForm
                  inputPlaceholder="your@email.com"
                  buttonText="订阅"
                  className="space-y-3"
                  inputClassName="w-full bg-[#0B0F1C] border border-[#4FD1C5]/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#4FD1C5] transition"
                  buttonClassName="w-full bg-[#4FD1C5] text-[#0B0F1C] font-medium py-2 rounded-lg hover:bg-[#3BB5A9] transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 底部 */}
        <footer className="mt-16 border-t border-[#4FD1C5]/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2024 冯行的技术博客 · 分享 React 技术实践</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="hover:text-[#4FD1C5] cursor-pointer">
                  ⚛️ React
                </span>
                <span className="hover:text-[#4FD1C5] cursor-pointer">
                  📘 TypeScript
                </span>
                <span className="hover:text-[#4FD1C5] cursor-pointer">
                  ▲ Next.js
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
