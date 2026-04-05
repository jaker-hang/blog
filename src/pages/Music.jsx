import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Share2, List, X, Repeat, Shuffle } from 'react-feather';
import ScrollReveal from '../components/common/ScrollReveal';
import P5InnerDepthBand from '../components/common/P5InnerDepthBand';
import TiltSurface from '../components/common/TiltSurface';

// 同一个 HTMLMediaElement 只能创建一次 MediaElementSourceNode（避免重复创建报错）
const mediaSourceRegistry = new WeakMap();

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
  const [lyricShiftY, setLyricShiftY] = useState(0);

  // 引用
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const needleRef = useRef(null);
  const prevLyricIndexRef = useRef(-1);

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

    let ctx = audioContextRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = ctx;
    }

    // 优先复用已经创建过的 source（避免 createMediaElementSource 重复调用）
    const existingSource = sourceRef.current || mediaSourceRegistry.get(audio);
    if (existingSource) {
      sourceRef.current = existingSource;
      if (existingSource.context && ctx !== existingSource.context) {
        ctx = existingSource.context;
        audioContextRef.current = ctx;
      }
    }

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!analyserRef.current || analyserRef.current.context !== ctx) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    if (!sourceRef.current) {
      try {
        sourceRef.current = ctx.createMediaElementSource(audio);
        mediaSourceRegistry.set(audio, sourceRef.current);
      } catch (error) {
        // 遇到重复绑定异常时尝试从注册表恢复
        const reused = mediaSourceRegistry.get(audio);
        if (!reused) {
          console.error("创建音频源失败:", error);
          return;
        }
        sourceRef.current = reused;
      }
    }

    // 每次可视化初始化时安全重连，避免重复 connect 叠加
    try {
      sourceRef.current.disconnect();
    } catch (e) {}
    try {
      analyserRef.current.disconnect();
    } catch (e) {}

    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);
    
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
  // 歌词高亮索引
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
    
    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
    }
  }, [currentTime, currentSong, songs, currentLyricIndex]);

  // 切换歌曲时重置当前歌词
  useEffect(() => {
    setCurrentLyricIndex(-1);
  }, [currentSong]);

  // 固定5行歌词窗口，当前播放句在第3行
  const lyricWindow = useMemo(() => {
    const lyrics = songs[currentSong]?.lyrics || [];
    if (!lyrics.length) return Array(5).fill(null);

    const centerIndex = Math.max(0, currentLyricIndex);
    const start = centerIndex - 2;

    return Array.from({ length: 5 }, (_, i) => {
      const actualIndex = start + i;
      if (actualIndex < 0 || actualIndex >= lyrics.length) {
        return { text: "", isCurrent: false, key: `empty-${i}` };
      }
      return {
        text: lyrics[actualIndex].text,
        isCurrent: actualIndex === currentLyricIndex,
        key: `line-${actualIndex}`,
      };
    });
  }, [songs, currentSong, currentLyricIndex]);

  // 歌词切换增加轻微缓动，减少“生硬跳变”
  useEffect(() => {
    if (currentLyricIndex < 0) return;
    const prev = prevLyricIndexRef.current;
    if (prev === -1 || prev === currentLyricIndex) {
      prevLyricIndexRef.current = currentLyricIndex;
      return;
    }

    const direction = currentLyricIndex > prev ? 1 : -1;
    setLyricShiftY(direction * 12);

    const raf = requestAnimationFrame(() => {
      setLyricShiftY(0);
    });

    prevLyricIndexRef.current = currentLyricIndex;
    return () => cancelAnimationFrame(raf);
  }, [currentLyricIndex]);

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
    const audioEl = audioRef.current;
    return () => {
      cleanupAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioEl) {
        mediaSourceRegistry.delete(audioEl);
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
    <div className="min-h-screen relative overflow-x-hidden">
      <P5InnerDepthBand label="SOUND" />
      <ScrollReveal variant="scale" className="max-w-7xl mx-auto px-4 py-8 relative z-[1]">
        <TiltSurface className="block" maxTilt={4.5}>
        <div className="relative rounded-2xl overflow-hidden border border-red-500/40 bg-[#0f0f14]/85 shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(45deg, rgba(232,30,45,0.3) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 26px 26px"
          }}></div>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-gradient-to-br from-[#121217] to-[#09090c] p-8 relative overflow-hidden">
              <div className="absolute -top-14 -left-12 w-64 h-64 bg-red-600/30 rotate-12 blur-2xl"></div>
              <div className="absolute -bottom-14 -right-12 w-64 h-64 bg-red-900/40 -rotate-12 blur-2xl"></div>
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-4 py-1 font-bold tracking-[0.2em] skew-x-[-20deg] translate-x-3">
                P5 RADIO
              </div>

              <div 
                ref={needleRef}
                className="absolute top-20 right-20 w-40 h-40 z-20 origin-top-left transition-transform duration-500"
                style={{ 
                  transform: isPlaying ? 'rotate(0deg)' : 'rotate(-15deg)',
                  filter: isPlaying ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'none'
                }}
              >
                <div className="relative">
                  <div className="w-3 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full absolute top-0 left-0 transform -rotate-45 origin-top-left shadow-lg"></div>
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full absolute top-16 left-1 shadow-xl border border-gray-300"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full absolute -top-2 -left-2 shadow-2xl"></div>
                </div>
              </div>

              <div className="relative flex justify-center items-center min-h-[400px]">
                {/* 能量脉冲环 */}
                <div className={`absolute w-[320px] h-[320px] rounded-full border border-red-500/40 ${
                  isPlaying ? 'animate-pulse-ring' : ''
                }`}></div>
                <div className={`absolute w-[360px] h-[360px] rounded-full border border-white/10 ${
                  isPlaying ? 'animate-pulse-ring animation-delay-2000' : ''
                }`}></div>

                <div 
                  className={`relative w-72 h-72 rounded-full transition-all duration-500 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{
                    filter: isPlaying ? 'brightness(1)' : 'brightness(0.7)',
                    opacity: isPlaying ? 1 : 0.8
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-2xl"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-red-500/40"></div>
                  <div className="absolute inset-1 rounded-full border border-white/10"></div>
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-inner flex items-center justify-center">
                      <img 
                        src={songs[currentSong].cover}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent transition-opacity duration-500 ${
                    isPlaying ? 'opacity-100' : 'opacity-30'
                  }`}></div>

                  {/* 扫描高光 */}
                  <div className={`absolute inset-0 rounded-full overflow-hidden ${isPlaying ? 'opacity-100' : 'opacity-40'}`}>
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-disc-scan"></div>
                  </div>
                </div>
              </div>

              <div className={`text-center mt-6 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-80'}`}>
                <h2 className="text-3xl font-extrabold mb-1 text-white tracking-wide">{songs[currentSong].title}</h2>
                <p className="text-red-300 mb-1 font-semibold">{songs[currentSong].artist}</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest">Album: {songs[currentSong].album}</p>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-black/60 border border-red-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Pause className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-3/5 bg-[#121217]/80 p-8 border-l border-red-500/35">
              <div className="mb-8 rounded-xl p-4 border border-red-500/30 bg-[#0b0b0f]/75">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold tracking-widest text-red-300">SOUND WAVE</span>
                  <span className="text-xs text-gray-300">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="h-20">
                  <canvas ref={canvasRef} className="w-full h-full"></canvas>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white tracking-wide">LYRICS</h3>
                  <span className="text-xs text-gray-300">TOTAL {songs[currentSong].lyrics.length}</span>
                </div>
                <div className="h-64 rounded-lg p-4 border border-red-500/30 bg-[#0b0b0f]/78">
                  <div
                    className="h-full flex flex-col justify-center gap-2"
                    style={{
                      transform: `translateY(${lyricShiftY}px)`,
                      transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {songs[currentSong].lyrics.length > 0 ? (
                      lyricWindow.map((line, idx) => (
                        <div
                          key={line.key}
                          className={`w-full text-center py-2 px-3 rounded-lg transition-all duration-300 ${
                            line.isCurrent ? 'font-bold scale-105' : 'opacity-55'
                          } ${idx === 2 && !line.isCurrent ? 'opacity-70' : ''}`}
                          style={{
                            minHeight: "40px",
                            backgroundColor: line.isCurrent ? "rgba(232,30,45,0.22)" : "transparent",
                            color: line.isCurrent ? "#ff4051" : "#a0a8b8",
                            borderLeft: line.isCurrent ? "3px solid #ff3d4f" : "3px solid transparent",
                            textShadow: line.isCurrent ? "0 0 10px rgba(255,61,79,0.55)" : "none",
                          }}
                        >
                          {line.text || " "}
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 italic">
                        暂无歌词
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <span className="w-10 text-right">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer p5-slider"
                    style={{
                      background: `linear-gradient(to right, #ff3d4f 0%, #ff3d4f ${(currentTime/duration)*100 || 0}%, #2f3440 ${(currentTime/duration)*100 || 0}%, #2f3440 100%)`
                    }}
                  />
                  <span className="w-10">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 bg-black/30 rounded-xl px-2 py-1 border border-red-500/25">
                    <button 
                      onClick={() => setPlayMode(prev => {
                        if (prev === 'loop') return 'random';
                        if (prev === 'random') return 'single';
                        return 'loop';
                      })}
                      className={`p-2 rounded-full transition-all ${
                        playMode !== 'loop' ? 'text-red-400' : 'text-gray-400'
                      } hover:bg-white/10`}
                    >
                      <Shuffle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-300 transition-all">
                      <Repeat className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 bg-black/30 rounded-2xl px-3 py-2 border border-red-500/25">
                    <button 
                      onClick={playPrevious}
                      className="p-3 hover:bg-white/10 rounded-full transition-all"
                    >
                      <SkipBack className="w-5 h-5 text-gray-200" />
                    </button>

                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #ff3d4f, #a50f1f)",
                        boxShadow: isPlaying ? "0 4px 18px rgba(255,61,79,0.58)" : "0 4px 10px rgba(0,0,0,0.35)"
                      }}
                    >
                      {isPlaying ? 
                        <Pause className="w-6 h-6 text-white" /> : 
                        <Play className="w-6 h-6 text-white ml-1" />
                      }
                    </button>

                    <button 
                      onClick={playNext}
                      className="p-3 hover:bg-white/10 rounded-full transition-all"
                    >
                      <SkipForward className="w-5 h-5 text-gray-200" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 bg-black/30 rounded-xl px-2 py-1 border border-red-500/25">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                      <Share2 className="w-5 h-5 text-gray-300" />
                    </button>
                    <button 
                      onClick={() => setShowPlaylist(!showPlaylist)}
                      className="p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                      <List className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 text-gray-300">
                  <button onClick={toggleMute} className="p-1 hover:text-red-300 transition-colors">
                    {isMuted ? 
                      <VolumeX className="w-4 h-4" /> : 
                      <Volume2 className="w-4 h-4" />
                    }
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume * 100}
                    onChange={updateVolume}
                    className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer p5-slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </TiltSurface>
      </ScrollReveal>

        {showPlaylist && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowPlaylist(false)}>
            <div className="bg-[#111116] border border-red-500/35 rounded-xl max-w-md w-full max-h-[600px] overflow-hidden text-white" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-red-500/25 flex justify-between items-center">
                <h3 className="font-bold tracking-wide">PHANTOM PLAYLIST</h3>
                <button onClick={() => setShowPlaylist(false)}>
                  <X className="w-5 h-5 text-gray-300 hover:text-red-400 transition-colors" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    className={`flex items-center p-3 cursor-pointer transition-colors ${
                      index === currentSong ? 'bg-red-500/15' : 'hover:bg-white/5'
                    }`}
                    onClick={() => {
                      playSong(index);
                      setShowPlaylist(false);
                    }}
                  >
                    <img src={song.cover} alt="" className="w-12 h-12 rounded object-cover mr-3" />
                    <div className="flex-1">
                      <h4 className={`font-medium ${index === currentSong ? 'text-red-400' : 'text-white'}`}>
                        {song.title}
                      </h4>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                    <span className="text-sm text-gray-500">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* 隐藏的audio元素 */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.92);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.04);
            opacity: 0.12;
          }
          100% {
            transform: scale(1.08);
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.6s ease-out infinite;
        }
        @keyframes disc-scan {
          0% {
            transform: translateX(-120%) skewX(-25deg);
          }
          100% {
            transform: translateX(280%) skewX(-25deg);
          }
        }
        .animate-disc-scan {
          animation: disc-scan 2.8s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 1.3s;
        }
        .p5-slider {
          -webkit-appearance: none;
        }
        .p5-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          border: 2px solid #ff3d4f;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(232,30,45,0.45);
          margin-top: -5px;
        }
        .p5-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 12px rgba(255,61,79,0.75);
        }
        .p5-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
        }
        .p5-slider::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          border: 2px solid #ff3d4f;
          cursor: pointer;
        }
        .p5-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background: #2f3440;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #14141c;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 61, 79, 0.6);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ff3d4f;
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