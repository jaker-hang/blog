import { useEffect } from "react";
import { author } from "../utils/data";
import SubscribeForm from "../components/common/SubscribeForm";
import {
  Code,
  Coffee,
  BookOpen,
  Star,
  Zap,
  Cpu,
  Globe,
  Feather,
  GitHub,
  Heart,
} from "react-feather";
import { FaWeixin, FaQq } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    // 确保页面滚动始终可用
    document.body.style.overflow = "auto";
  }, []);
  // 技术向的个人数据
  const personalInfo = {
    name: "冯行",
    title: "前端开发工程师 / React 爱好者",
    bio: "2022年入行，专注 React 生态。喜欢把组件写得像诗一样优雅，也喜欢在代码之外记录思考。",
    location: "广东 · 深圳",
    yearsOfExperience: 3,
    stats: [
      { label: "Gitee 星星", value: "9.9k", icon: Star },
      { label: "技术文章", value: "48", icon: BookOpen },
      { label: "咖啡摄入", value: "365/年", icon: Coffee },
      { label: "组件库", value: "6", icon: Cpu },
    ],
    techStack: [
      { name: "React", level: 95, color: "#61DAFB", years: 3 },
      { name: "TypeScript", level: 90, color: "#3178C6", years: 3 },
      { name: "Next.js", level: 85, color: "#000000", years: 1 },
      { name: "Vue (副业)", level: 70, color: "#42B883", years: 1 },
      { name: "Node.js", level: 75, color: "#339933", years: 3 },
      { name: "Tailwind", level: 88, color: "#06B6D4", years: 1 },
    ],
    currentFocus: ["写一个博客网站", "学习Next"],
    recentProjects: [
      { name: "my-blog", desc: "基于 React 的个人博客", icon: Globe },
      {
        name: "next",
        desc: "学习基础知识",
        icon: Feather,
      },
    ],

    socialLinks: [
      {
        icon: GitHub,
        url: "https://gitee.com/feng--hang",
        label: "GitHub",
        type: "link",
      },
      {
        icon: FaWeixin,
        url: "#",
        label: "微信",
        type: "copy",
        account: "fengxiansheng7777777",
      },
      {
        icon: FaQq,
        url: "#",
        label: "QQ",
        type: "copy",
        account: "1489751526",
      },
    ],
    categories: [
      { name: "React 深入", icon: "⚛️", count: 15 },
      { name: "TypeScript", icon: "📘", count: 12 },
      { name: "工程化", icon: "🛠️", count: 9 },
      { name: "日常随笔", icon: "✍️", count: 12 },
    ],
  };

  // 复制账号到剪贴板
  const copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`${label}账号已复制：${text}`);
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* 极简网格背景 */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header 区域 - 开发者名片风格 */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <img
              src={author.avatar}
              alt={personalInfo.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-xl shadow-lg">
              <Code className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {personalInfo.name}
            <span className="text-indigo-400 ml-2 font-light">· dev</span>
          </h1>

          <p className="text-lg text-slate-500 mb-3 font-mono">
            &lt;{personalInfo.title} /&gt;
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
            <span>📍 {personalInfo.location}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>⏳ {personalInfo.yearsOfExperience}年经验</span>
          </div>

          {/* 社交链接 - 带悬停提示 */}
          <div className="flex justify-center gap-3 mb-6">
            {personalInfo.socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return social.type === "copy" ? (
                // 可复制的账号（微信/QQ）
                <div key={idx} className="relative group">
                  <button
                    onClick={() =>
                      copyToClipboard(social.account, social.label)
                    }
                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:shadow-md transition-all border border-slate-200 cursor-pointer"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  {/* 悬停提示 */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                    {social.account} (点击复制)
                  </div>
                </div>
              ) : (
                // 普通链接（GitHub）
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:shadow-md transition-all border border-slate-200"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <p className="max-w-xl mx-auto text-slate-600 leading-relaxed bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-100">
            {personalInfo.bio}
          </p>
        </div>

        {/* 数据卡片 - 极简风格 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {personalInfo.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all group"
              >
                <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xl font-semibold text-slate-800 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 技术栈区域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 技能进度条 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-slate-800">技术栈</h2>
              <span className="text-xs text-slate-400 ml-auto">熟练度</span>
            </div>
            <div className="space-y-5">
              {personalInfo.techStack.map((tech, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <span className="text-sm font-medium text-slate-700">
                        {tech.name}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        {tech.years}年
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {tech.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${tech.level}%`,
                        background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 当前关注和项目 */}
          <div className="space-y-8">
            {/* 当前在做什么 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-800">
                  当前关注
                </h2>
              </div>
              <ul className="space-y-3">
                {personalInfo.currentFocus.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-indigo-300 mt-0.5">➡️</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 近期项目 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-800">
                  近期项目
                </h2>
              </div>
              <div className="space-y-3">
                {personalInfo.recentProjects.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-indigo-50/50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-400 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {project.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {project.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 底部 - 文章分类和订阅 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 文章分类 */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-slate-800">文章分类</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {personalInfo.categories.map((cat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm text-slate-700">{cat.name}</span>
                  </div>
                  <span className="text-xs bg-white px-2 py-1 rounded-full text-slate-400 border border-slate-100">
                    {cat.count}篇
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 订阅卡片 - 代码风格 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-slate-800">订阅</h2>
            </div>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed font-mono">
              {`const getUpdates = () => {
  return new Promise((resolve) => {
    // 每周一次的技术思考和日常
    resolve('newsletter')
  })
}`}
            </p>
            <SubscribeForm
              inputPlaceholder="your@email.com"
              buttonText="订阅"
            />
            <p className="text-xs text-slate-400 mt-3 text-center font-mono">
              {"// 随时可以取消，不会 spam"}
            </p>
          </div>
        </div>

        {/* 底部签名 - 代码注释风格 */}
        <div className="text-center mt-16">
          <p className="text-xs font-mono text-slate-300">
            {`/* ${new Date().getFullYear()} · 用代码和文字记录思考 */`}
          </p>
          <p className="text-xs text-slate-200 mt-2 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-pink-300" />
            <span>Built with React</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
