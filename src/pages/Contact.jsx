import { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  GitHub,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  AlertCircle,
  Juejin
} from "react-feather";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // 确保页面滚动始终可用
    document.body.style.overflow = "auto";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // 简单验证
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("请填写所有必填字段");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setSubmitError("请输入有效的邮箱地址");
      setIsSubmitting(false);
      return;
    }

    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // 3秒后隐藏成功消息
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 py-16 overflow-x-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* 装饰性元素 - 小清新点缀 */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* 头部区域 */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide">
            联系<span className="text-green-400">·</span>我
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
            有任何问题、建议或合作意向？我都很乐意听到你的声音
          </p>
          <div className="w-16 h-px bg-green-200 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* 联系信息 - 小清新卡片 */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-green-100 transform hover:shadow-md transition-all duration-300 overflow-visible">
            <h2 className="text-2xl font-light text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-500 text-sm">✨</span>
              </span>
              联系信息
            </h2>

            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="bg-green-50 p-3 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                  <Mail className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    邮箱
                  </h3>
                  <p className="text-gray-700 text-base">1489751526@qq.com</p>
                  <p className="text-xs text-gray-400 mt-1">24小时内回复</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-green-50 p-3 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    坐标
                  </h3>
                  <p className="text-gray-700 text-base">广东 · 深圳</p>
                  <p className="text-xs text-gray-400 mt-1">南山科技园</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-green-50 p-3 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    回复时间
                  </h3>
                  <p className="text-gray-700 text-base">24-48小时内回复</p>
                  <p className="text-xs text-gray-400 mt-1">工作日优先处理</p>
                </div>
              </div>
            </div>

            {/* 社交媒体链接 - 小清新风格 */}
            <div className="mt-10 pt-6 border-t border-green-100">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                社交账号
              </h3>
              <div className="flex space-x-3">
                <a
                  href="https://gitee.com/feng--hang"
                  className="bg-green-50 hover:bg-green-100 text-green-400 p-3 rounded-xl transition-all transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHub className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 小清新装饰文字 */}
            <div className="mt-6 text-xs text-gray-300 text-center">
              ✦ 期待与你相遇 ✦
            </div>
          </div>

          {/* 联系表单 - 小清新卡片 */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-green-100 transform hover:shadow-md transition-all duration-300 overflow-visible">
            <h2 className="text-2xl font-light text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Send className="w-4 h-4 text-green-500" />
              </span>
              发送消息
            </h2>

            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-5 py-4 rounded-xl mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p className="text-sm">感谢您的留言！我会尽快回复您 ✨</p>
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-500 px-5 py-4 rounded-xl mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p className="text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-600 text-sm mb-2"
                >
                  姓名 <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all"
                  placeholder="你的名字"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-sm mb-2"
                >
                  邮箱 <span className="text-green-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-600 text-sm mb-2"
                >
                  主题
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all"
                  placeholder="你想聊什么？"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-600 text-sm mb-2"
                >
                  消息 <span className="text-green-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all resize-none"
                  placeholder="写下你想说的话..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-400 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    发送中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    发送消息
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
              </button>
            </form>

            {/* 小清新提示 */}
            <p className="text-xs text-gray-300 text-center mt-4">
              我会认真阅读每一封来信 🌱
            </p>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="text-center mt-16 text-gray-300 text-sm">
          <span className="inline-block w-8 h-px bg-green-200 mx-auto mb-3"></span>
          <p className="font-light">期待与你相遇</p>
          <p className="text-xs mt-1">© 2025 · 保持联系</p>
        </div>
      </div>

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;
