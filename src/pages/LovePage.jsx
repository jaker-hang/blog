import React, { useEffect, useState } from 'react';

const LovePage = () => {
  const [messages, setMessages] = useState([]);
  const [animationDone, setAnimationDone] = useState(false);
  
  const loveMessages = [
    "你是我梦里的海", "为你心动不止", "心有桃花一片", "风都是甜的",
    "想靠近你一点", "想和你看海", "遇见你是浪漫的开始", "你是我的心动",
    "月亮为你亮", "宇宙都在偏爱你", "有你世界亮一点", "晚风也温柔了",
    "今夜的梦给你", "有你真好", "心跳为你加速", "此刻的风想你",
    "所有浪漫都与你有关", "想成为你的例外", "你是独一无二的光", "心软是因为你",
    "你是人间的奇迹", "你的名字是我心事", "世界因你柔软", "温柔落在人间",
    "想你成习惯了", "你眼里有星星", "星光都为你闪", "每次想你星星都亮了",
    "梦里有你真好", "你的笑融化星海", "想念在风里飘", "喜欢你很久了",
    "拥抱要紧一点", "甜在风里也在心里", "一瞬也是永恒", "想陪你看星星",
    "遇见你后时间变慢", "你的温柔让我沦陷", "想牵你的手看日落", "心跳藏不住"
  ];

  // 原网站卡片颜色 - 精确匹配
  const cardColors = [
    '#FFD9E6', // 浅粉
    '#FFE5D9', // 蜜桃
    '#E0F0E8', // 浅绿
    '#F0E0FF', // 浅紫
    '#FFE0F0', // 粉红
    '#D9E8FF', // 浅蓝
    '#FFD9C0', // 杏色
    '#E8FFD9', // 嫩绿
    '#FFD9F0', // 樱花粉
    '#D9FFF0'  // 薄荷
  ];

  useEffect(() => {
    // 计算每个卡片的最终位置（爱心形状）
    const cardsWithPositions = loveMessages.map((text, index) => {
      // 爱心参数方程，调整到和原网站一样松散自然的爱心
      const t = (index / loveMessages.length) * Math.PI * 2;
      const scale = 21;
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
      
      // 随机偏移，让爱心看起来更自然
      const offsetX = (Math.random() - 0.5) * 6;
      const offsetY = (Math.random() - 0.5) * 6;
      
      return {
        text,
        color: cardColors[Math.floor(Math.random() * cardColors.length)],
        targetLeft: `calc(50% + ${x + offsetX}px)`,
        targetTop: `calc(50% - ${y - offsetY}px)`,
        rotate: (Math.random() - 0.5) * 3,
        delay: Math.random() * 0.3, // 随机延迟，让弹开更有层次
        floatSpeed: 10 + Math.random() * 8
      };
    });
    
    setMessages(cardsWithPositions);
    
    // 1.2秒后动画完成（匹配原网站的弹开动画时长）
    setTimeout(() => {
      setAnimationDone(true);
    }, 1200);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(145deg, #FFF0F5 0%, #FFE4ED 50%, #FFF0F5 100%)',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, "Microsoft YaHei", "PingFang SC", "Helvetica Neue", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const headerStyle = {
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 20
  };

  const titleStyle = {
    fontSize: '48px',
    color: '#B05A7A',
    textShadow: '2px 2px 10px rgba(255, 255, 255, 0.8)',
    marginBottom: '5px',
    fontWeight: '400',
    letterSpacing: '2px',
    position: 'relative',
    zIndex: 20
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#B08A9C',
    letterSpacing: '2px',
    fontWeight: '300',
    marginTop: '-5px'
  };

  const heartContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  // 卡片基础样式
  const getCardStyle = (msg, index) => ({
    position: 'absolute',
    left: animationDone ? msg.targetLeft : '50%',
    top: animationDone ? msg.targetTop : '50%',
    transform: animationDone 
      ? `translate(-50%, -50%) rotate(${msg.rotate}deg)` 
      : 'translate(-50%, -50%) scale(0)',
    padding: '6px 18px',
    borderRadius: '30px',
    backgroundColor: msg.color,
    fontSize: '15px',
    fontWeight: '400',
    color: '#5D4A5D',
    whiteSpace: 'nowrap',
    lineHeight: '1.6',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(255, 255, 255, 0.8) inset',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    transition: animationDone 
      ? 'transform 0.2s ease-out, box-shadow 0.2s ease-out, left 0s, top 0s' 
      : 'all 0.8s cubic-bezier(0.34, 1.3, 0.4, 1)',
    transitionDelay: animationDone ? '0s' : `${msg.delay}s`,
    zIndex: animationDone ? 5 : 10,
    cursor: 'default',
    pointerEvents: 'auto',
    textShadow: '0 1px 2px rgba(255,255,255,0.5)',
    letterSpacing: '0.3px',
    opacity: animationDone ? 1 : 0
  });

  // 背景心形样式
  const bgHeartStyle = {
    position: 'absolute',
    fontSize: '24px',
    color: 'rgba(176, 90, 122, 0.08)',
    pointerEvents: 'none',
    zIndex: 1
  };

  // 生成背景心形
  const bgHearts = Array.from({ length: 30 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 20 + Math.random() * 40,
    delay: Math.random() * 20,
    duration: 20 + Math.random() * 30,
    rotate: Math.random() * 360
  }));

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slowFloat {
            0% {
              transform: translate(-50%, -50%) translate(0px, 0px) rotate(var(--rotate, 0deg));
            }
            25% {
              transform: translate(-50%, -50%) translate(3px, -4px) rotate(var(--rotate, 0deg));
            }
            50% {
              transform: translate(-50%, -50%) translate(-2px, 3px) rotate(var(--rotate, 0deg));
            }
            75% {
              transform: translate(-50%, -50%) translate(-3px, -2px) rotate(var(--rotate, 0deg));
            }
            100% {
              transform: translate(-50%, -50%) translate(0px, 0px) rotate(var(--rotate, 0deg));
            }
          }
          
          @keyframes bgFloat {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(10px, -15px) rotate(5deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }
          
          .floating-card {
            animation: slowFloat var(--speed) ease-in-out infinite;
            animation-delay: var(--delay);
          }
          
          .floating-card:hover {
            transform: translate(-50%, -50%) scale(1.08) !important;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 5px rgba(255,255,255,0.9) inset !important;
            z-index: 100 !important;
            transition: transform 0.2s ease-out !important;
          }
          
          .bg-heart {
            animation: bgFloat var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
          }
        `}
      </style>

      {/* 背景漂浮心形 */}
      {bgHearts.map((heart, i) => (
        <div
          key={`bg-${i}`}
          className="bg-heart"
          style={{
            ...bgHeartStyle,
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            '--delay': `-${heart.delay}s`,
            transform: `rotate(${heart.rotate}deg)`
          }}
        >
          ♥
        </div>
      ))}

      {/* 标题区域 */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>for you ♥</h1>
        <p style={subtitleStyle}>你是我心底最温柔的诗</p>
      </div>

      {/* 卡片容器 */}
      <div style={heartContainerStyle}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={animationDone ? 'floating-card' : ''}
            style={{
              ...getCardStyle(msg, index),
              '--rotate': `${msg.rotate}deg`,
              '--speed': `${msg.floatSpeed}s`,
              '--delay': `-${Math.random() * 5}s`
            }}
          >
            {msg.text}
          </div>
        ))}

        {/* 中心大心形 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '200px',
          color: 'rgba(176, 90, 122, 0.04)',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          ♥
        </div>
      </div>

      {/* 底部装饰 */}
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        color: '#B08A9C',
        fontSize: '13px',
        opacity: 0.6,
        letterSpacing: '1px'
      }}>
        <p>♥ 所有的温柔都想给你 ♥</p>
      </div>
    </div>
  );
};

export default LovePage;