import React, { useEffect, useRef, useCallback } from 'react';
import './LovePage.css'; // 我们会把样式放在这个文件里

const LovePage = () => {
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const replayBtnRef = useRef(null);
  const bgMusicRef = useRef(null);
  
  // 所有状态
  const darkRef = useRef(false);
  const ecoRef = useRef(false);
  const snowRunningRef = useRef(false);
  const snowFrameRef = useRef();
  const lastSnowTimeRef = useRef(0);
  const snowIntervalMsRef = useRef(700);
  const snowMaxRef = useRef(120);
  const totalCurrentRef = useRef(0);
  const lockedCountRef = useRef(0);

  // 提示语数组
  const tips = [
    '想念在风里飘','月亮为你亮','喜欢你很久了','你是我的心动','温柔落在人间',
    '星光都为你闪','梦里有你真好','世界因你柔软','心跳为你加速','有你真好',
    '你是独一无二的光','遇见你是浪漫的开始','晚风也温柔了','你的笑融化星海',
    '想陪你看星星','今夜的梦给你','宇宙都在偏爱你','你是人间的奇迹',
    '拥抱要紧一点','想你成习惯了','一瞬也是永恒','你眼里有星星','你的温柔让我沦陷',
    '风都是甜的','为你心动不止','想成为你的例外','心有桃花一片','你是我梦里的海',
    '想和你看海','此刻的风想你','遇见你后时间变慢','所有浪漫都与你有关',
    '想靠近你一点','你的名字是我心事','心软是因为你','想牵你的手看日落',
    '每次想你星星都亮了','心跳藏不住','有你世界亮一点','甜在风里也在心里'
  ];

  // 初始方向数组
  const directions = [
    {dx:'0vw',dy:'-80vh'},{dx:'0vw',dy:'80vh'},
    {dx:'-80vw',dy:'0vh'},{dx:'80vw',dy:'0vh'},
    {dx:'-70vw',dy:'-70vh'},{dx:'70vw',dy:'-70vh'},
    {dx:'-70vw',dy:'70vh'},{dx:'70vw',dy:'70vh'},
    {dx:'0vw',dy:'-60vh'},{dx:'0vw',dy:'60vh'},
    {dx:'-60vw',dy:'0vh'},{dx:'60vw',dy:'0vh'}
  ];

  // 随机颜色数组
  const colorPairs = [
    ['#ff758c','#ff7eb3'], ['#a18cd1','#fbc2eb'],
    ['#f6d365','#fda085'], ['#84fab0','#8fd3f4'],
    ['#f093fb','#f5576c'], ['#4facfe','#00f2fe'],
    ['#43e97b','#38f9d7'], ['#fa709a','#fee140'],
    ['#30cfd0','#330867'], ['#5ee7df','#b490ca']
  ];

  // 工具函数
  const rand = (min, max) => Math.random() * (max - min) + min;

  const hexToRgba = (hex, alpha = 1) => {
    const h = hex.replace('#', '');
    const short = h.length === 3;
    const r = parseInt(short ? h[0] + h[0] : h.slice(0, 2), 16);
    const g = parseInt(short ? h[1] + h[1] : h.slice(2, 4), 16);
    const b = parseInt(short ? h[2] + h[2] : h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const randomStyle = () => {
    const [c1, c2] = colorPairs[Math.floor(Math.random() * colorPairs.length)];
    return {
      bg: `linear-gradient(135deg,${c1},${c2})`,
      glow1: hexToRgba(c1, 0.55),
      glow2: hexToRgba(c2, 0.35)
    };
  };

  const heartScale = useCallback(() => {
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    let s = Math.round(minDim * 0.023);
    s = Math.max(8, Math.min(22, s));
    if (darkRef.current && ecoRef.current) s = Math.max(8, Math.floor(s * 0.92));
    return s;
  }, []);

  const centerYOffset = useCallback(() => {
    const portrait = window.innerHeight > window.innerWidth;
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    return portrait ? -minDim * 0.06 : 0;
  }, []);

  const heartXY = useCallback((t) => {
    const s = heartScale();
    const x = s * (16 * Math.sin(t) ** 3);
    const y = -s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x + 'px', y: y + centerYOffset() + 'px' };
  }, [heartScale, centerYOffset]);

  const decideEco = useCallback(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    const area = window.innerWidth * window.innerHeight;
    return (cores <= 4) || (mem <= 4) || (area >= 2400 * 1440);
  }, []);

  const applyMode = useCallback(() => {
    const body = document.body;
    if (darkRef.current) {
      body.classList.add('dark');
      ecoRef.current = decideEco();
      if (ecoRef.current) body.classList.add('eco');
      snowIntervalMsRef.current = ecoRef.current ? 800 : 500;
      snowMaxRef.current = ecoRef.current ? 100 : 180;
      startSnow();
    } else {
      body.classList.remove('dark');
      body.classList.remove('eco');
      stopSnow();
    }
  }, [decideEco]);

  const createSnow = useCallback(() => {
    const snow = document.createElement('div');
    snow.className = 'snow';
    snow.textContent = '❄';
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.fontSize = Math.random() * 12 + 8 + 'px';
    snow.style.opacity = Math.random() * 0.8 + 0.2;
    const duration = Math.random() * 5 + 6;
    snow.style.animationDuration = duration + 's';
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), duration * 1000);
  }, []);

  const loopSnow = useCallback((ts) => {
    if (!lastSnowTimeRef.current) lastSnowTimeRef.current = ts;
    const delta = ts - lastSnowTimeRef.current;
    if (delta > snowIntervalMsRef.current) {
      if (snowRunningRef.current) {
        const count = document.querySelectorAll('.snow').length;
        if (count < snowMaxRef.current) createSnow();
      }
      lastSnowTimeRef.current = ts;
    }
    snowFrameRef.current = requestAnimationFrame(loopSnow);
  }, [createSnow]);

  const startSnow = useCallback(() => {
    snowRunningRef.current = true;
    lastSnowTimeRef.current = 0;
    snowFrameRef.current = requestAnimationFrame(loopSnow);
  }, [loopSnow]);

  const stopSnow = useCallback(() => {
    snowRunningRef.current = false;
    if (snowFrameRef.current) {
      cancelAnimationFrame(snowFrameRef.current);
    }
    document.querySelectorAll('.snow').forEach(s => s.remove());
  }, []);

  const playMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(error => {
        console.log('音乐播放需要用户交互:', error);
      });
    }
  }, []);

  const onAllLocked = useCallback(() => {
    if (darkRef.current) {
      snowIntervalMsRef.current = ecoRef.current ? 700 : 400;
      snowMaxRef.current = ecoRef.current ? 140 : 240;
    }
    
    // 延迟2秒后破碎
    setTimeout(() => {
      finalBurst();
    }, 2000);
  }, []);

  const finalBurst = useCallback(() => {
    document.querySelectorAll('.msg.locked').forEach(el => {
      el.classList.remove('pulse');
      const jitter = rand(0, 200);
      setTimeout(() => el.classList.add('burst'), jitter);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    });
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
    }
  }, []);

  const createMsg = useCallback((i, total) => {
    if (!stageRef.current) return;
    
    const el = document.createElement('div');
    el.className = 'msg';

    const d = directions[Math.floor(Math.random() * directions.length)];
    el.style.setProperty('--dx', d.dx);
    el.style.setProperty('--dy', d.dy);
    el.style.setProperty('--rot', rand(-55, 55) + 'deg');

    const baseDur = darkRef.current && ecoRef.current ? rand(6.2, 7.6) : rand(6.8, 8.6);
    el.style.setProperty('--dur', baseDur + 's');
    el.style.setProperty('--delay', (i * 0.11 + rand(0, 0.35)) + 's');

    const sty = randomStyle();
    el.style.setProperty('--bg', sty.bg);
    el.style.setProperty('--glow1', sty.glow1);
    el.style.setProperty('--glow2', sty.glow2);

    const t = (i / total) * Math.PI * 2;
    const { x, y } = heartXY(t);
    el.style.setProperty('--heart-x', x);
    el.style.setProperty('--heart-y', y);
    el.style.setProperty('--heart-rot', rand(-18, 18) + 'deg');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = tips[Math.floor(Math.random() * tips.length)];
    el.appendChild(span);

    const delay = parseFloat(el.style.getPropertyValue('--delay'));
    const dur = parseFloat(el.style.getPropertyValue('--dur'));
    const switchAt = delay + dur * 0.86;
    const switchTimer = setTimeout(() => {
      el.classList.add('heart-mode');
    }, switchAt * 1000);

    el.addEventListener('animationend', () => {
      clearTimeout(switchTimer);
      el.classList.add('heart-mode', 'locked', 'pulse');
      el.style.willChange = 'auto';

      const spread = rand(140, 260);
      const ang = rand(0, Math.PI * 2);
      const bx = Math.cos(ang) * spread;
      const by = Math.sin(ang) * spread;
      el.style.setProperty('--bx', bx + 'px');
      el.style.setProperty('--by', by + 'px');

      lockedCountRef.current++;
      if (lockedCountRef.current === totalCurrentRef.current) onAllLocked();
    }, { once: true });

    stageRef.current.appendChild(el);
  }, [heartXY, tips, directions, onAllLocked]);

  const play = useCallback(() => {
    if (!stageRef.current) return;
    
    // 移除所有现有消息
    stageRef.current.querySelectorAll('.msg').forEach(n => n.remove());
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
    }

    // 根据屏幕尺寸调整元素数量
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    
    let TOTAL;
    if (aspectRatio > 1) { // 横屏
      if (width <= 768) {
        TOTAL = darkRef.current ? (ecoRef.current ? 60 : 80) : 100;
      } else if (width <= 1024) {
        TOTAL = darkRef.current ? (ecoRef.current ? 70 : 100) : 120;
      } else {
        TOTAL = darkRef.current ? (ecoRef.current ? 96 : 140) : 200;
      }
    } else { // 竖屏
      if (width <= 480) {
        TOTAL = darkRef.current ? (ecoRef.current ? 40 : 60) : 80;
      } else if (width <= 768) {
        TOTAL = darkRef.current ? (ecoRef.current ? 50 : 70) : 100;
      } else {
        TOTAL = darkRef.current ? (ecoRef.current ? 70 : 100) : 140;
      }
    }
    
    totalCurrentRef.current = TOTAL;
    lockedCountRef.current = 0;
    
    for (let i = 0; i < TOTAL; i++) {
      createMsg(i, TOTAL);
    }

    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
      }
    }, 1400);
    
    playMusic();
  }, [createMsg, playMusic]);

  // 处理重放按钮点击
  const handleReplay = useCallback(() => {
    darkRef.current = !darkRef.current;
    applyMode();
    play();
  }, [applyMode, play]);

  // 处理窗口大小变化
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => play(), 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [play]);

  // 首次点击触发音乐
  useEffect(() => {
    const handleFirstClick = () => {
      if (bgMusicRef.current && bgMusicRef.current.paused) {
        playMusic();
      }
    };
    
    document.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [playMusic]);

  // 初始播放
  useEffect(() => {
    play();
    
    return () => {
      stopSnow();
    };
  }, [play, stopSnow]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="stage" id="stage" ref={stageRef}>
        <div className="center-title" id="title" ref={titleRef}>
          for you ♥
        </div>
      </div>
      {/* 修复按钮定位问题，确保按钮在右下角可见 */}
      <div className="fixed right-6 bottom-6 z-50 md:right-6 md:bottom-6 z-[1000]">
        <button 
          className="btn z-[1001]" 
          id="replay" 
          ref={replayBtnRef} 
          onClick={handleReplay}
          style={{ zIndex: 1001 }}
        >
          重放 / 切换背景
        </button>
      </div>
      
      <audio id="bgMusic" loop ref={bgMusicRef}>
        <source src="https://lf26-music-east.douyinstatic.com/obj/ies-music-hj/7495920705440140091.mp3" type="audio/mpeg" />
        <source src="https://lf26-music-east.douyinstatic.com/obj/ies-music-hj/7495920705440140091.mp3" type="audio/ogg" />
      </audio>
    </div>
  );
};

export default LovePage;