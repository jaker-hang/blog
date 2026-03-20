import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Share2, List, X, Repeat, Shuffle } from 'react-feather';

const MusicPlayer = () => {
  // 状态管理
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [playMode, setPlayMode] = useState('loop');

  // 引用
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const needleRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // 音乐列表数据
  const songs = useMemo(() => [
    {
      id: 1,
      title: "爱错",
      artist: "王力宏",
      album: "恋爱占星音乐全精选",
      duration: "3:58",
      cover: "/audio/爱错.png",
      url: "/audio/爱错.mp3",
      color: "#d53f8c",
      lyrics: [
        { time: 13, text: "北风毫不留情" },
        { time: 17, text: "把叶子吹落" },
        { time: 20, text: "脆弱的她选择了逃脱" },
        { time: 26, text: "叶子失去消息" },
        { time: 29, text: "风才感觉寂寞" },
        { time: 35, text: "整个冬天" },
        { time: 38, text: "北风的痛没人能说" },
        { time: 45, text: "我从来没想过" },
        { time: 48, text: "我会这样做" },
        { time: 52, text: "从来没爱过" },
        { time: 55, text: "所以爱错" },
        { time: 58, text: "我从哪里起飞" },
        { time: 61, text: "从哪里降落" },
        { time: 65, text: "多少不能原谅的错 却不能重来过" },
        { time: 119, text: "翻开回忆角落" },
        { time: 123, text: "完美的生活" },
        { time: 126, text: "以为幸福都可以掌握" },
        { time: 132, text: "仔细回味当初那个故事背后" },
        { time: 141, text: "Oh 原来是我" },
        { time: 144, text: "原来是我" },
        { time: 145, text: "犯下从没承认的错" },
        { time: 151, text: "我从来没想过" },
        { time: 154, text: "我会这样做" },
        { time: 158, text: "从来没爱过 所以爱错" },
        { time: 164, text: "我从哪里起飞" },
        { time: 167, text: "从哪里降落" },
        { time: 171, text: "多少不能原谅的错 却不能重来过" },
        { time: 182, text: "在这少了你的世界" },
        { time: 187, text: "Oh 找不回那些感觉" },
        { time: 193, text: "其实我不想 道别" },
        { time: 200, text: "那些过去" },
        { time: 204, text: "我从来没想过" },
        { time: 207, text: "我会这样做" },
        { time: 210, text: "从来没爱过" },
        { time: 215, text: "从来没有爱过那么认真" },
        { time: 218, text: "我从哪里起飞" },
        { time: 220, text: "从哪里降落" },
        { time: 224, text: "多少不能原谅的错 却不能重" },
        { time: 230, text: "我从来没想过" },
        { time: 233, text: "我会这样做" },
        { time: 237, text: "从来没爱过 所以爱错" },
        { time: 244, text: "我从哪里起飞" },
        { time: 247, text: "从哪里降落" },
        { time: 250, text: "多少不能原谅的错" },
        { time: 254, text: "请你原谅我的爱错" }
      ]
    },
    {
      id: 2,
      title: "离开我的依赖",
      artist: "王艳薇",
      album: "离开我的依赖",
      duration: "3:53",
      cover: "/audio/离开我的依赖.png",
      url: "/audio/离开我的依赖.mp3",
      color: "#3182ce",
      lyrics: [
        { time: 10, text: "说不出你的轮廓" },
        { time: 17, text: "看着你的模样" },
        { time: 25, text: "眼前的美风雨冲淡了它" },
        { time: 32, text: "看天色渐暗了" },
        { time: 40, text: "好陌生的一句话" },
        { time: 47, text: "你看着我说话" },
        { time: 55, text: "我蒙上了眼" },
        { time: 59, text: "仿佛你在身旁" },
        { time: 62, text: "当你不再应答" },
        { time: 69, text: "我来不及道声不安" },
        { time: 72, text: "有点混乱有点缓慢" },
        { time: 76, text: "才发现承诺是谎话" },
        { time: 80, text: "你倒下了我只能旁观" },
        { time: 84, text: "我越来越爱" },
        { time: 86, text: "爱不爱" },
        { time: 88, text: "都成为我们的负担" },
        { time: 92, text: "我想要痛快的离开我的依赖" },
        { time: 109, text: "一句句你的责骂" },
        { time: 115, text: "是存在的代价" },
        { time: 123, text: "不想让我慌乱认痛责备的话" },
        { time: 131, text: "看天再一次暗了" },
        { time: 138, text: "我来不及道声不安" },
        { time: 141, text: "有点混乱有点缓慢" },
        { time: 145, text: "才发现承诺是谎话" },
        { time: 149, text: "你倒下了我只能旁观" },
        { time: 153, text: "我越来越爱" },
        { time: 155, text: "爱不爱" },
        { time: 157, text: "都成为我们的负担" },
        { time: 160, text: "我想要痛快的离开我的依赖" },
        { time: 168, text: "多少个忍受痛的夜晚你叫我别回来" },
        { time: 176, text: "我挣扎看你的脸憔悴的心怎放得开" },
        { time: 187, text: "我来不及道声不安" },
        { time: 191, text: "有点混乱有点缓慢" },
        { time: 194, text: "才发现承诺是谎话" },
        { time: 198, text: "你倒下了我只能旁观" },
        { time: 202, text: "我越来越爱" },
        { time: 204, text: "爱不爱" },
        { time: 206, text: "都成为我们的负担" },
        { time: 210, text: "我想要痛快的离开我的依赖" },
        { time: 217, text: "我想要痛快的离开我的依赖" }
      ]
    },
    {
      id: 3,
      title: "零距离的思念",
      artist: "TINY7",
      album: "Chose one me",
      duration: "3:06",
      cover: "/audio/零距离的思念.png",
      url: "/audio/零距离的思念.mp3",
      color: "#9f7aea",
      lyrics: [
        { time: 0, text: "感情说不清她越道越不明白" },
        { time: 6, text: "让盲目的爱变习惯延续浪漫" },
        { time: 10, text: "除非让时间终结whole world" },
        { time: 14, text: "不停下零距离的想念" },
        { time: 18, text: "我们的过程遥远但并不艰难" },
        { time: 22, text: "让情歌在零点转" },
        { time: 25, text: "这世界因为你变温暖" },
        { time: 28, text: "不停停下零距离的思念" },
        { time: 33, text: "桌上的相片 属于我们got memory in my hand" },
        { time: 36, text: "So how to name us 像无法形容孤独的修炼" },
        { time: 40, text: "怎么会呆在彼此身边也时刻在思念" },
        { time: 44, text: "原来我们的爱从不因距离而改变" },
        { time: 48, text: "没改变我们一样还是会害怕失去" },
        { time: 51, text: "没改变偶尔争吵直到世界都睡去" },
        { time: 55, text: "没改变的是思念每天还持续在加剧" },
        { time: 59, text: "让时间慢下来让思念定格住回忆" },
        { time: 63, text: "从前让暧昧的话" },
        { time: 65, text: "变成了文字你才看清" },
        { time: 68, text: "相遇是解药 却没治好那份恐慌" },
        { time: 73, text: "把过去都完全遗忘" },
        { time: 77, text: "我" },
        { time: 78, text: "后来把暧昧的话" },
        { time: 80, text: "送到你耳边你才安心" },
        { time: 83, text: "相遇是解药 但没治愈思念" },
        { time: 88, text: "不停下零距离的思念" },
        { time: 89, text: "也许是我们间的热恋没完结" },
        { time: 93, text: "感情说不清她越道越不明白" },
        { time: 96, text: "让盲目的爱变习惯延续浪漫" },
        { time: 100, text: "除非让时间终结whole world" },
        { time: 104, text: "不停下零距离的想念" },
        { time: 108, text: "我们的过程遥远但并不艰难" },
        { time: 112, text: "让情歌在零点转" },
        { time: 115, text: "这世界因为你变温暖" },
        { time: 118, text: "不停下零距离的思念" },
        { time: 123, text: "她的爱是一种选择" },
        { time: 124, text: "我看倒不见得" },
        { time: 125, text: "但要抓到你" },
        { time: 126, text: "她是Cinderella高调到卡到me" },
        { time: 128, text: "Like a pistol yeah she shot at me" },
        { time: 130, text: "I hate that when you make me guess" },
        { time: 132, text: "我搞不懂这是什么comment" },
        { time: 134, text: "Yeah this" },
        { time: 135, text: "This is f**king missing" },
        { time: 137, text: "最稳定的天平有思念挂中间" },
        { time: 139, text: "我们走的远了好像一步到了" },
        { time: 141, text: "距离都要半个签证" },
        { time: 142, text: "When we wanna kiss 那眼里里没有别人" },
        { time: 144, text: "But why we wanna kiss now 我说那是眼神" },
        { time: 146, text: "那是思念越深爱越重" },
        { time: 148, text: "我们互相重伤也互相确认" },
        { time: 150, text: "她说想到我就对我说" },
        { time: 152, text: "想要像单元剧就要天天播" },
        { time: 155, text: "感情说不清不清楚她越道越不明白" },
        { time: 158, text: "让盲目的爱变习惯延续浪漫" },
        { time: 162, text: "除非让时间终结whole world" },
        { time: 166, text: "不停下零距离的想念" },
        { time: 170, text: "我们的过程遥远但并不艰难" },
        { time: 174, text: "让情歌在零点转" },
        { time: 177, text: "这世界因为你变温暖" },
        { time: 180, text: "不停下零距离的思念" }
      ]
    },
  ], []);

  // 格式化时间
  const formatTime = (time) => {
    if (isNaN(time) || time === undefined || time === null) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // 处理进度条拖拽
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // 音频时间更新
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  // 音频加载元数据
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // 播放指定歌曲
  const playSong = useCallback(async (index) => {
    setCurrentSong(index);
    setIsLiked(false);
    setCurrentLyricIndex(-1);
    
    const audio = audioRef.current;
    if (!audio) return;
    
    try {
      // 重置播放状态
      audio.src = songs[index].url;
      await audio.load();
      
      // 如果之前是播放状态，则继续播放
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("播放失败:", error);
            setIsPlaying(false);
          });
        }
      }
      
      if (!sourceRef.current && isPlaying) {
        setTimeout(() => setupVisualizer(), 100);
      }
    } catch (error) {
      console.log("播放歌曲失败:", error);
    }
  }, [songs, isPlaying]);

  // 上一首/下一首
  const playPrevious = () => {
    const newIndex = currentSong === 0 ? songs.length - 1 : currentSong - 1;
    playSong(newIndex);
  };

  const playNext = useCallback(() => {
    let newIndex;
    if (playMode === 'random') {
      do {
        newIndex = Math.floor(Math.random() * songs.length);
      } while (newIndex === currentSong && songs.length > 1);
    } else {
      newIndex = currentSong === songs.length - 1 ? 0 : currentSong + 1;
    }
    playSong(newIndex);
  }, [currentSong, songs.length, playMode, playSong]);

  // 音频播放结束
  const handleEnded = useCallback(() => {
    if (playMode === 'single') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      playNext();
    }
  }, [playMode, playNext]);

  // 播放/暂停切换
  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        if (needleRef.current) {
          needleRef.current.style.transform = 'rotate(-15deg)';
        }
      } else {
        if (!audioRef.current.src) {
          audioRef.current.src = songs[currentSong].url;
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          if (needleRef.current) {
            needleRef.current.style.transform = 'rotate(0deg)';
          }
          if (!sourceRef.current) {
            setTimeout(() => setupVisualizer(), 100);
          }
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("播放/暂停失败:", error);
    }
  };

  // 音量控制
  const updateVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    audioRef.current.volume = isMuted ? volume : 0;
  };

  // 清理音频上下文
  const cleanupAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (e) {}
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current = null;
    }
  }, []);

  // 音频可视化
  const setupVisualizer = useCallback(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas || !isPlaying) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }
    
    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const renderFrame = () => {
      if (!isPlaying || !audioContextRef.current) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current?.getByteFrequencyData(dataArray);
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / bufferLength * 2;
      let x = 0;
      
      const color = songs[currentSong].color;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(1, color);
        
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 1, barHeight, 4);
        ctx.fill();
        
        x += barWidth + 2;
      }
    };
    
    renderFrame();
  }, [isPlaying, currentSong, songs]);

  // 处理用户开始滚动
  const handleScrollStart = () => {
    isUserScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  // 处理用户结束滚动
  const handleScrollEnd = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1500);
  };

  // 歌词滚动 - 修复版
  useEffect(() => {
    const currentLyrics = songs[currentSong]?.lyrics;
    if (!currentLyrics?.length) return;
    
    // 找到当前时间对应的歌词索引
    let newIndex = -1;
    for (let i = 0; i < currentLyrics.length; i++) {
      const currentLyricTime = currentLyrics[i].time;
      const nextLyricTime = i < currentLyrics.length - 1 ? currentLyrics[i + 1].time : Infinity;
      
      if (currentTime >= currentLyricTime && currentTime < nextLyricTime) {
        newIndex = i;
        break;
      }
    }
    
    // 如果当前时间小于第一句歌词的时间
    if (currentTime < currentLyrics[0]?.time) {
      newIndex = -1;
    }
    
    // 如果当前时间大于最后一句歌词的时间
    if (currentTime > currentLyrics[currentLyrics.length - 1]?.time) {
      newIndex = currentLyrics.length - 1;
    }
    
    // 更新索引
    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
    }
    
    // 自动滚动歌词（仅在用户没有手动滚动时）
    const container = lyricsContainerRef.current;
    if (!container || newIndex === -1 || isUserScrollingRef.current) return;
    
    // 获取当前歌词元素
    const activeLyric = container.children[newIndex];
    
    if (activeLyric) {
      const containerHeight = container.clientHeight;
      const lyricTop = activeLyric.offsetTop;
      const lyricHeight = activeLyric.offsetHeight;
      
      // 计算理想滚动位置（让当前歌词居中）
      const targetScroll = lyricTop - containerHeight / 2 + lyricHeight / 2;
      
      // 限制滚动范围
      const maxScroll = container.scrollHeight - containerHeight;
      const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      
      // 使用 requestAnimationFrame 避免频繁滚动
      requestAnimationFrame(() => {
        if (!isUserScrollingRef.current) {
          container.scrollTo({
            top: finalScroll,
            behavior: 'smooth'
          });
        }
      });
    }
  }, [currentTime, currentSong, songs, currentLyricIndex]);

  // 监听滚动容器的事件
  useEffect(() => {
    const container = lyricsContainerRef.current;
    if (!container) return;
    
    const handleWheel = () => handleScrollStart();
    const handleTouchStart = () => handleScrollStart();
    const handleTouchEnd = () => handleScrollEnd();
    
    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('scroll', handleScrollStart);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('scroll', handleScrollStart);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 切换歌曲时重置滚动
  useEffect(() => {
    setCurrentLyricIndex(-1);
    
    if (lyricsContainerRef.current) {
      lyricsContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentSong]);

  // 调整canvas大小
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = 80;
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanupAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [cleanupAudio]);

  // 监听播放状态更新可视化
  useEffect(() => {
    if (isPlaying) {
      setupVisualizer();
    }
  }, [isPlaying, currentSong, setupVisualizer]);

  // 初始化唱针位置
  useEffect(() => {
    if (needleRef.current) {
      needleRef.current.style.transform = isPlaying ? 'rotate(0deg)' : 'rotate(-15deg)';
      needleRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 主容器 - 网易云风格 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* 左侧 - 黑胶唱片区域 */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-8 relative overflow-hidden">
              {/* 唱片机背景纹理 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              {/* 唱针 - 暂停时抬起更明显 */}
              <div 
                ref={needleRef}
                className="absolute top-20 right-20 w-40 h-40 z-20 origin-top-left transition-transform duration-500"
                style={{ 
                  transform: isPlaying ? 'rotate(0deg)' : 'rotate(-15deg)',
                  filter: isPlaying ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'none'
                }}
              >
                <div className="relative">
                  {/* 唱针杆 */}
                  <div className="w-3 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full absolute top-0 left-0 transform -rotate-45 origin-top-left shadow-lg"></div>
                  {/* 唱针头 */}
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full absolute top-16 left-1 shadow-xl border border-gray-300"></div>
                  {/* 唱针座 */}
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full absolute -top-2 -left-2 shadow-2xl"></div>
                </div>
              </div>
              
              {/* 黑胶唱片 - 暂停时停止旋转并变暗 */}
              <div className="relative flex justify-center items-center min-h-[400px]">
                <div 
                  className={`relative w-72 h-72 rounded-full transition-all duration-500 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{
                    filter: isPlaying ? 'brightness(1)' : 'brightness(0.7)',
                    opacity: isPlaying ? 1 : 0.8
                  }}
                >
                  {/* 唱片盘 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-2xl"></div>
                  
                  {/* 唱片纹路 - 暂停时淡化 */}
                  <div className={`absolute inset-2 rounded-full border-2 transition-opacity duration-500 ${
                    isPlaying ? 'border-gray-700' : 'border-gray-600 opacity-50'
                  }`}></div>
                  <div className={`absolute inset-6 rounded-full border-2 transition-opacity duration-500 ${
                    isPlaying ? 'border-gray-700' : 'border-gray-600 opacity-50'
                  }`}></div>
                  <div className={`absolute inset-10 rounded-full border-2 transition-opacity duration-500 ${
                    isPlaying ? 'border-gray-700' : 'border-gray-600 opacity-50'
                  }`}></div>
                  <div className={`absolute inset-14 rounded-full border-2 transition-opacity duration-500 ${
                    isPlaying ? 'border-gray-700' : 'border-gray-600 opacity-50'
                  }`}></div>
                  <div className={`absolute inset-18 rounded-full border-2 transition-opacity duration-500 ${
                    isPlaying ? 'border-gray-700' : 'border-gray-600 opacity-50'
                  }`}></div>
                  
                  {/* 中心标签 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-inner flex items-center justify-center">
                      <img 
                        src={songs[currentSong].cover}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* 唱片反光 - 暂停时减弱 */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent transition-opacity duration-500 ${
                    isPlaying ? 'opacity-100' : 'opacity-30'
                  }`}></div>
                </div>
              </div>
              
              {/* 歌曲信息 - 暂停时稍暗 */}
              <div className={`text-center mt-6 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-80'}`}>
                <h2 className="text-2xl font-bold mb-1 text-white">{songs[currentSong].title}</h2>
                <p className="text-gray-300 mb-1">{songs[currentSong].artist}</p>
                <p className="text-gray-400 text-sm">专辑：{songs[currentSong].album}</p>
              </div>
              
              {/* 播放状态指示器 */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Pause className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            {/* 右侧 - 歌词和音浪 */}
            <div className="lg:w-3/5 bg-white p-8">
              
              {/* 音浪可视化 */}
              <div className="mb-8 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">音浪浮动</span>
                  <span className="text-xs text-gray-400">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="h-20">
                  <canvas ref={canvasRef} className="w-full h-full"></canvas>
                </div>
              </div>
              
              {/* 歌词区域 - 修复横向滚动条问题 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">歌词</h3>
                  <span className="text-xs text-gray-400">共 {songs[currentSong].lyrics.length} 句</span>
                </div>
                <div 
                  ref={lyricsContainerRef}
                  className="h-64 overflow-y-auto overflow-x-hidden scroll-smooth bg-gray-50/50 rounded-lg p-4"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${songs[currentSong].color} #e5e7eb`
                  }}
                >
                  <div className="flex flex-col items-center space-y-2 w-full">
                    {songs[currentSong].lyrics.length > 0 ? (
                      songs[currentSong].lyrics.map((lyric, index) => {
                        // 判断歌词状态
                        const isPast = index < currentLyricIndex; // 已唱过的
                        const isCurrent = index === currentLyricIndex; // 当前
                        const isFuture = index > currentLyricIndex; // 未唱的
                        
                        return (
                          <div
                            key={index}
                            className={`w-full text-center py-2 px-3 rounded-lg transition-all duration-300 ${
                              isCurrent
                                ? 'bg-opacity-15 font-bold transform scale-105'
                                : isPast
                                ? 'opacity-60'
                                : 'opacity-40'
                            }`}
                            style={{
                              backgroundColor: isCurrent ? `${songs[currentSong].color}15` : 'transparent',
                              color: isCurrent 
                                ? songs[currentSong].color 
                                : isPast
                                ? '#374151'
                                : '#9CA3AF',
                              borderLeft: isCurrent ? `3px solid ${songs[currentSong].color}` : '3px solid transparent',
                              paddingLeft: isCurrent ? '12px' : '15px',
                              paddingRight: isCurrent ? '12px' : '15px',
                              textShadow: isCurrent ? `0 0 8px ${songs[currentSong].color}40` : 'none',
                              wordWrap: 'break-word',
                              whiteSpace: 'normal'
                            }}
                          >
                            {lyric.text}
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500 italic">
                        暂无歌词
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 播放控制条 */}
              <div className="space-y-4">
                {/* 进度条 */}
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="w-10 text-right">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${songs[currentSong].color} 0%, ${songs[currentSong].color} ${(currentTime/duration)*100}%, #e5e7eb ${(currentTime/duration)*100}%, #e5e7eb 100%)`
                    }}
                  />
                  <span className="w-10">{formatTime(duration)}</span>
                </div>
                
                {/* 控制按钮 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setPlayMode(prev => {
                        if (prev === 'loop') return 'random';
                        if (prev === 'random') return 'single';
                        return 'loop';
                      })}
                      className={`p-2 rounded-full transition-all ${
                        playMode !== 'loop' ? `text-[${songs[currentSong].color}]` : 'text-gray-400'
                      } hover:bg-gray-100`}
                    >
                      <Shuffle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-all">
                      <Repeat className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={playPrevious}
                      className="p-3 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <SkipBack className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${songs[currentSong].color}, ${songs[currentSong].color}dd)`,
                        boxShadow: isPlaying ? `0 4px 15px ${songs[currentSong].color}80` : '0 4px 10px rgba(0,0,0,0.1)'
                      }}
                    >
                      {isPlaying ? 
                        <Pause className="w-6 h-6 text-white" /> : 
                        <Play className="w-6 h-6 text-white ml-1" />
                      }
                    </button>
                    
                    <button 
                      onClick={playNext}
                      className="p-3 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <SkipForward className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                    <button 
                      onClick={() => setShowPlaylist(!showPlaylist)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <List className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {/* 音量控制 */}
                <div className="flex items-center space-x-2 pt-2">
                  <button onClick={toggleMute} className="p-1">
                    {isMuted ? 
                      <VolumeX className="w-4 h-4 text-gray-400" /> : 
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    }
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume * 100}
                    onChange={updateVolume}
                    className="w-24 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 播放列表 - 浮层 */}
        {showPlaylist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPlaylist(false)}>
            <div className="bg-white rounded-xl max-w-md w-full max-h-[600px] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">播放列表</h3>
                <button onClick={() => setShowPlaylist(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      index === currentSong ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => {
                      playSong(index);
                      setShowPlaylist(false);
                    }}
                  >
                    <img src={song.cover} alt="" className="w-12 h-12 rounded object-cover mr-3" />
                    <div className="flex-1">
                      <h4 className={`font-medium ${index === currentSong ? `text-[${song.color}]` : ''}`}>
                        {song.title}
                      </h4>
                      <p className="text-sm text-gray-500">{song.artist}</p>
                    </div>
                    <span className="text-sm text-gray-400">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 隐藏的audio元素 */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* 全局样式 */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        input[type="range"] {
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid ${songs[currentSong]?.color || '#d53f8c'};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          margin-top: -6px;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 12px ${songs[currentSong]?.color}80;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        /* 自定义滚动条样式 */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${songs[currentSong]?.color || '#d53f8c'}80;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${songs[currentSong]?.color || '#d53f8c'};
        }
      `}</style>
    </div>
  );
};

// 添加 roundRect 方法
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.moveTo(x + r, y);
  this.lineTo(x + w - r, y);
  this.quadraticCurveTo(x + w, y, x + w, y + r);
  this.lineTo(x + w, y + h - r);
  this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  this.lineTo(x + r, y + h);
  this.quadraticCurveTo(x, y + h, x, y + h - r);
  this.lineTo(x, y + r);
  this.quadraticCurveTo(x, y, x + r, y);
  return this;
};

export default MusicPlayer;