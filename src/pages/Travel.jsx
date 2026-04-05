import React, { useState, useEffect } from "react";
import ScrollReveal from "../components/common/ScrollReveal";
import P5InnerDepthBand from "../components/common/P5InnerDepthBand";
import P5DragPhotoRail from "../components/common/P5DragPhotoRail";
import TiltSurface from "../components/common/TiltSurface";
import {
  MapPin,
  Heart,
  X,
  Calendar,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "react-feather";

const GrowthTimeline = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 轮播图当前索引
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [flashCut, setFlashCut] = useState(false);
  const [impactMomentId, setImpactMomentId] = useState(null);
  const [slashBurst, setSlashBurst] = useState(false);

  // 成长记忆数据（每张照片可以有多张图）

const growthMoments = [
    {
      id: 1,
      title: "永劫无间",
      date: "2025.12.20",
      location: "广东・深圳",
      images: [
        "/imgs/Growth/yjwj1.jpg",
        "/imgs/Growth/yjwj2.jpg",
        "/imgs/Growth/yjwj3.jpg",
      ],
      story:
        "2025年12月20日，打卡深圳永劫无间周年庆现场，沉浸式感受游戏里的热血与热闹，和同好一起呐喊互动，解锁超多现场专属惊喜，氛围感直接拉满。",
      reflection: "我身无拘，武道无穷",
      category: "achievement",
      mood: "⚔️ 热血",
    },
    {
      id: 2,
      title: "登顶梧桐山",
      date: "2025.11.22",
      location: "广东・深圳",
      images: [
        "/imgs/Growth/wutong1.jpg",
        "/imgs/Growth/wutong2.jpg",
        "/imgs/Growth/wutong3.jpg",
        "/imgs/Growth/wutong4.jpg",
        "/imgs/Growth/wutong5.jpg",
        "/imgs/Growth/wutong6.jpg",
      ],
      story:
        "成功登顶深圳梧桐山，一路攀登虽有疲惫，还意外偶遇了野生山猪，既惊险又新奇。站在山顶俯瞰全城时，所有辛苦都格外值得。",
      reflection: "每一步坚持，都能遇见不一样的惊喜",
      category: "travel",
      mood: "🌄 难忘",
    },
    {
      id: 3,
      title: "首次挑战蛋炒饭",
      date: "2025.10.07",
      location: "广东・深圳",
      images: [
        "/imgs/Growth/egg1.jpg",
        "/imgs/Growth/egg2.jpg",
        "/imgs/Growth/egg3.jpg",
        "/imgs/Growth/egg4.jpg",
      ],
      story:
        "2025年10月7日，第一次亲手做了蛋炒饭。从热锅冷油到完美出锅，看着米粒金黄颗颗分明，香气扑鼻的那一刻，成就感满满！",
      reflection: "人间烟火气，最抚凡人心，学会做饭是一种幸福",
      category: "achievement",
      mood: "🍳 开心",
    },
    {
      id: 4,
      title: "厦门方特国庆之旅",
      date: "2025.10.01",
      location: "福建・厦门",
      images: [
        "/imgs/Growth/fangte1.jpg",
        "/imgs/Growth/fangte2.jpg",
        "/imgs/Growth/fangte3.jpg",
      ],
      story:
        "国庆假期打卡厦门方特，在梦幻的乐园里尽情游玩，体验各种刺激项目和精彩演出，节日氛围拉满，度过了超欢乐的一天。",
      reflection: "在欢乐与烟火中，好好享受假期的美好",
      category: "travel",
      mood: "🎆 尽兴",
    },
    {
      id: 5,
      title: "登顶深圳阳台山",
      date: "2025.09.08",
      location: "广东・深圳",
      images: ["/imgs/Growth/mountain1.jpg"],
      story:
        "成功登顶深圳阳台山，一路向上，吹着山顶的风，俯瞰城市风景，所有疲惫都在这一刻烟消云散。",
      reflection: "坚持向上，总能看见更开阔的风景",
      category: "travel",
      mood: "⛰️ 舒畅",
    },
    {
      id: 6,
      title: "机甲合体",
      date: "2025.02.17",
      location: "广东・东莞",
      images: [
        "/imgs/Growth/machine1.jpg",
        "/imgs/Growth/machine2.jpg",
        "/imgs/Growth/machine3.jpg",
      ],
      story:
        "耗时许久，终于亲手组装完成敖丙机甲，从零散零件到完整成型，每一步都充满专注与期待，成品亮相的瞬间成就感拉满。欢迎新成员加入",
      reflection:
        "用心打磨热爱，耐心终有回响，静下心专注一件事，快乐就藏在细节里",
      category: "achievement",
      mood: "⚙️ 成就感",
    },
    {
      id: 7,
      title: "攻陷长隆欢乐世界",
      date: "2024.10.03",
      location: "广东・广州",
      images: [
        "/imgs/Growth/changlong1.jpg",
        "/imgs/Growth/changlong2.jpg",
        "/imgs/Growth/changlong3.jpg",
      ],
      story:
        "打卡了心心念念的广州长隆！从垂直跌落的刺激到超萌的动物世界，一整天的电量都被快乐充满了。看着身边一起尖叫的伙伴，突然觉得，所谓的幸福感，就是和一群有趣的人，把烦恼统统甩在身后。",
      reflection: "生活需要偶尔的放肆与快乐",
      category: "travel",
      mood: "🎢 超嗨",
    },
    {
      id: 8,
      title: "第一次出COS",
      date: "2024.10.01",
      location: "广东·深圳",
      images: [
        "/imgs/Growth/manzhan1.jpg",
        "/imgs/Growth/manzhan2.jpg",
        "/imgs/Growth/manzhan3.jpg",
      ],
      story:
        "第一次奔赴漫展现场，见到了超多超还原的 coser，和同好们一起交流、合影，沉浸式感受热爱的氛围。原来喜欢的角色真的能从屏幕里走到眼前，这种快乐真的太治愈了。",
      reflection: "成长就是学会享受独处的时光",
      category: "achievement",
      mood: "✨ 开心",
    },
    {
      id: 9,
      title: "小猫老弟",
      date: "2024.09.07",
      location: "广东・东莞",
      images: [
        "/imgs/Growth/cat1.jpg",
        "/imgs/Growth/cat2.jpg",
        "/imgs/Growth/cat3.jpg",
        "/imgs/Growth/cat4.jpg",
      ],
      story:
        "2024年9月7日，领养了一只银渐层小猫，从此家里多了一个毛茸茸的小伙伴。从小心翼翼靠近到慢慢黏人，每一天都被它的可爱治愈。",
      reflection: "被小动物信任和依赖，是温柔又珍贵的幸福",
      category: "family",
      mood: "🐱 治愈",
    },
    {
      id: 10,
      title: "二次赴漫展之约",
      date: "2024.05.01",
      location: "广东・深圳",
      images: [
        "/imgs/Growth/cos1.jpg",
        "/imgs/Growth/cos2.jpg",
        "/imgs/Growth/cos3.jpg",
        "/imgs/Growth/cos4.jpg",
        "/imgs/Growth/cos5.jpg",
      ],
      story:
        "五月再次奔赴漫展，时隔不久再逛漫展，已经轻车熟路，和志同道合的伙伴一起逛展台、拍 COS，尽情沉浸在这场属于二次元的狂欢里。",
      reflection: "热爱从不降温，再见依旧心动",
      category: "achievement",
      mood: "💫 欢喜",
    },
    {
      id: 11,
      title: "第一次去漫展",
      date: "2023.10.04",
      location: "广东・深圳",
      images: [
        "/imgs/Growth/cosPlay1.jpg",
        "/imgs/Growth/cosPlay2.jpg",
        "/imgs/Growth/cosPlay3.jpg",
        "/imgs/Growth/cosPlay4.jpg",
        "/imgs/Growth/cosPlay5.jpg",
        "/imgs/Growth/cosPlay6.jpg",
        "/imgs/Growth/cosPlay7.jpg",
        "/imgs/Growth/cosPlay8.jpg",
        "/imgs/Growth/cosPlay9.jpg",
      ],
      story:
        "第一次踏入漫展现场，见到了超多喜欢的角色和同好，和大家合影、交流，沉浸式感受二次元的热闹与热爱，整个人都被快乐包围。",
      reflection: "勇敢奔赴热爱，就会遇见同频的人",
      category: "achievement",
      mood: "🎭 满足",
    },
    {
      id: 12,
      title: "武汉欢乐谷一日游",
      date: "2022.10.03",
      location: "湖北・武汉",
      images: [
        "/imgs/Growth/wuhan1.jpg",
        "/imgs/Growth/wuhan2.jpg",
        "/imgs/Growth/wuhan3.jpg",
      ],
      story:
        "在武汉欢乐谷泡了一整天，玩遍刺激项目还泡在街机厅里，又和一群陌生人玩了狼人杀，一边紧张推理一边放声大笑，陌生的热闹也格外治愈。",
      reflection: "快乐很简单，玩得尽兴就是最好的放松",
      category: "travel",
      mood: "🎮 畅快",
    },
  ];


  // 当模态框打开时，禁止body滚动
  useEffect(() => {
    if (selectedMoment) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // 打开时重置索引
    } else {
      document.body.style.overflow = "auto"; // 修改为auto确保页面可以滚动
    }

    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = "auto"; // 修改为auto确保页面可以滚动
    };
  }, [selectedMoment]);

  // 筛选记忆
  const filteredMoments =
    activeCategory === "all"
      ? growthMoments
      : growthMoments.filter((moment) => moment.category === activeCategory);

  // 打开详情模态框
  const openMomentModal = (moment) => {
    setImpactMomentId(moment.id);
    setSlashBurst(true);
    setIsModalClosing(false);
    setIsModalAnimating(false);
    setFlashCut(true);
    setTimeout(() => {
      setSelectedMoment(moment);
      requestAnimationFrame(() => {
        setIsModalAnimating(true);
      });
    }, 85);
    setTimeout(() => setImpactMomentId(null), 220);
    setTimeout(() => setSlashBurst(false), 260);
    setTimeout(() => setFlashCut(false), 140);
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalClosing(true);
    setIsModalAnimating(false);
    setTimeout(() => {
      setSelectedMoment(null);
      setIsModalClosing(false);
    }, 180);
  };

  // 轮播图切换
  const nextImage = () => {
    if (selectedMoment) {
      setCurrentImageIndex((prev) =>
        prev === selectedMoment.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedMoment) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedMoment.images.length - 1 : prev - 1,
      );
    }
  };

  return (
    <div className="min-h-screen text-white font-sans">
      {/* 详情模态框 - 带轮播图 */}
      {selectedMoment && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
            isModalAnimating && !isModalClosing ? "bg-black/80" : "bg-black/0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-w-3xl w-full transition-all duration-200 ${
              isModalAnimating && !isModalClosing
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-95 rotate-[-1.5deg]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-150 ${
              flashCut ? "opacity-100" : "opacity-0"
            }`}>
              <div className="absolute inset-0 bg-white/90 mix-blend-screen"></div>
              <div className="absolute -left-10 top-0 h-full w-24 bg-red-500/70 skew-x-[-25deg] animate-cut-scan"></div>
            </div>
            <div className={`absolute -inset-1 bg-gradient-to-r from-red-500 to-red-800 transition-all duration-200 ${
              isModalAnimating && !isModalClosing ? "opacity-60" : "opacity-0"
            }`}></div>
            <div className={`absolute -left-10 top-10 w-24 h-2 bg-white/70 skew-x-[-30deg] pointer-events-none ${
              isModalAnimating && !isModalClosing ? "animate-cutline" : ""
            }`}></div>
            <div className={`absolute -right-12 bottom-14 w-28 h-2 bg-red-500/80 skew-x-[-30deg] pointer-events-none ${
              isModalAnimating && !isModalClosing ? "animate-cutline animation-delay-120" : ""
            }`}></div>
            <div className="bg-[#111116] border border-red-500/40 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.65)]">
              {/* 轮播图区域 */}
              <div className="relative h-80 bg-black">
                <img
                  src={selectedMoment.images[currentImageIndex]}
                  alt={`${selectedMoment.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* 关闭按钮 */}
                <button
                  className="absolute top-4 right-4 text-white bg-black/60 rounded-full p-2 hover:bg-red-600/70 transition-all backdrop-blur-sm z-10 border border-red-400/50"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6" />
                </button>

                {/* 左右切换箭头 - 只有多张图片时才显示 */}
                {selectedMoment.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-600/70 transition-all border border-red-400/40"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-red-600/70 transition-all border border-red-400/40"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* 图片计数指示器 */}
                {selectedMoment.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedMoment.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-red-500 w-4"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 文字内容区域 */}
              <div className="p-8 max-h-[calc(100vh-24rem)] overflow-y-auto">
                <div className="flex items-center text-gray-300 text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{selectedMoment.date}</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedMoment.location}</span>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-white">
                  {selectedMoment.title}
                </h2>

                <div className="bg-black/40 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-gray-200 italic leading-relaxed">
                    "{selectedMoment.story}"
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-red-400 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-red-300 font-medium tracking-wider">
                      今日感悟
                    </span>
                    <p className="text-xl font-semibold text-white mt-1">
                      {selectedMoment.reflection}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      此刻心情：{selectedMoment.mood}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 时间线主体部分 - 保持不变，但注意卡片点击传递的moment包含images数组 */}
      <section className="py-20 relative overflow-x-hidden">
        <P5InnerDepthBand label="PHOTO" />
        <div className="container mx-auto px-4 max-w-6xl relative z-[1]">
          {slashBurst && (
            <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
              <div className="absolute -left-24 top-1/2 w-64 h-3 bg-red-500/70 skew-x-[-30deg] animate-global-slash"></div>
              <div className="absolute -left-40 top-[55%] w-56 h-2 bg-white/50 skew-x-[-30deg] animate-global-slash animation-delay-80"></div>
              <div className="absolute -left-56 top-[48%] w-44 h-2 bg-red-400/60 skew-x-[-30deg] animate-global-slash animation-delay-120"></div>
            </div>
          )}
          {/* 头部 */}
          <ScrollReveal variant="up" className="text-center mb-16">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent tracking-wide">
              成长时间线
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              每一张照片都是一个故事，每一个故事都是一次成长
            </p>
          </ScrollReveal>

          <ScrollReveal variant="up" className="mb-12">
            <P5DragPhotoRail
              moments={filteredMoments}
              onPickMoment={openMomentModal}
            />
          </ScrollReveal>

          {/* 分类筛选 - 与之前相同 */}
          <ScrollReveal variant="scale" className="flex flex-wrap justify-center gap-3 mb-16">
            {/* ... 按钮代码保持不变 ... */}
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                  : "bg-[#13131a] text-gray-200 hover:bg-red-900/30 border border-red-500/30 shadow-md"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              全部记忆
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "travel"
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                  : "bg-[#13131a] text-gray-200 hover:bg-red-900/30 border border-red-500/30 shadow-md"
              }`}
              onClick={() => setActiveCategory("travel")}
            >
              旅行
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "family"
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                  : "bg-[#13131a] text-gray-200 hover:bg-red-900/30 border border-red-500/30 shadow-md"
              }`}
              onClick={() => setActiveCategory("family")}
            >
              家人
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "study"
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                  : "bg-[#13131a] text-gray-200 hover:bg-red-900/30 border border-red-500/30 shadow-md"
              }`}
              onClick={() => setActiveCategory("study")}
            >
              学习
            </button>
            {/* <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "struggle"
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                  : "bg-[#13131a] text-gray-200 hover:bg-red-900/30 border border-red-500/30 shadow-md"
              }`}
              onClick={() => setActiveCategory("struggle")}
            >
              挣扎
            </button> */}
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                activeCategory === "achievement"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
              onClick={() => setActiveCategory("achievement")}
            >
              成就
            </button>
          </ScrollReveal>

          {/* 时间线 - 卡片部分需要修改图片显示 */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-400 to-red-700 hidden md:block"></div>

            <div className="space-y-12">
              {filteredMoments.map((moment, index) => (
                <div
                  key={moment.id}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-black shadow-lg z-10 hidden md:block"></div>

                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <ScrollReveal
                      variant={index % 2 === 0 ? "left" : "right"}
                      delayMs={Math.min(index * 55, 480)}
                      className="h-full"
                    >
                    <TiltSurface className="h-full block" maxTilt={3.5}>
                    <div
                      className={`bg-[#111116]/95 border border-red-500/35 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer ${
                        impactMomentId === moment.id ? "animate-card-impact" : ""
                      }`}
                      onClick={() => openMomentModal(moment)}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 z-10 ${
                          impactMomentId === moment.id ? "animate-card-echo" : "opacity-0"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/45 to-transparent skew-x-[-28deg] translate-x-[-120%]"></div>
                      </div>
                      <div className="relative h-56 overflow-hidden">
                        {/* 卡片上显示第一张图片 */}
                        <img
                          src={moment.images[0]}
                          alt={moment.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 border border-red-400/50 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {moment.date}
                        </div>
                        {/* 如果有多张图片，显示一个数量标记 */}
                        {moment.images.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black/70 border border-red-400/40 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                            {moment.images.length} 张照片
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center text-gray-300 text-sm mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{moment.location}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 hover:text-red-400 transition-colors">
                          {moment.title}
                        </h3>

                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {moment.story}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                          <Heart className="h-4 w-4 text-red-400" />
                          <span className="text-gray-200 font-medium">
                            {moment.reflection}
                          </span>
                        </div>

                        <div className="mt-4 text-right">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-900/50 to-red-700/50 border border-red-500/40 text-red-200 rounded-full text-sm">
                            {moment.mood}
                          </span>
                        </div>
                      </div>
                    </div>
                    </TiltSurface>
                    </ScrollReveal>
                  </div>

                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes cut-scan {
          0% { transform: translateX(-40px) skewX(-25deg); opacity: 0.9; }
          100% { transform: translateX(860px) skewX(-25deg); opacity: 0; }
        }
        .animate-cut-scan {
          animation: cut-scan 180ms ease-out forwards;
        }
        @keyframes cutline {
          0% { transform: translateX(0) skewX(-30deg); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateX(18px) skewX(-30deg); opacity: 0; }
        }
        .animate-cutline {
          animation: cutline 320ms ease-out;
        }
        .animation-delay-120 {
          animation-delay: 120ms;
        }
        .animation-delay-80 {
          animation-delay: 80ms;
        }
        @keyframes card-impact {
          0% { transform: scale(1) rotate(0deg); }
          35% { transform: scale(0.97) rotate(-0.35deg); }
          70% { transform: scale(1.02) rotate(0.25deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animate-card-impact {
          animation: card-impact 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes card-echo {
          0% { opacity: 0; }
          15% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-card-echo {
          animation: card-echo 260ms ease-out;
        }
        @keyframes global-slash {
          0% { transform: translateX(0) skewX(-30deg); opacity: 0.95; }
          100% { transform: translateX(150vw) skewX(-30deg); opacity: 0; }
        }
        .animate-global-slash {
          animation: global-slash 260ms ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GrowthTimeline;
