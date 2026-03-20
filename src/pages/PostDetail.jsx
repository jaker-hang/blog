import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { Calendar, User, Clock, Heart, Share2, MessageCircle, Tag, ArrowLeft, BookOpen, ChevronRight } from 'react-feather';

const PostDetail = ({ getPostById }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = () => {
      try {
        const postData = getPostById(id);
        if (postData) {
          setPost(postData);
          setIsLoading(false);
        } else {
          throw new Error('文章不存在');
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, getPostById]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // 这里可以添加实际的点赞逻辑
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // 这里添加实际的评论提交逻辑
    setCommentText('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#4FD1C5]/20 border-t-[#4FD1C5] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse">⚛️</span>
            </div>
          </div>
          <p className="text-[#4FD1C5] mt-4 animate-pulse">加载文章中...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6 opacity-20">404</div>
          <h2 className="text-2xl font-bold text-white mb-4">文章未找到</h2>
          <p className="text-gray-400 mb-8">{error || '很抱歉，请求的文章不存在或已被删除。'}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#4FD1C5] text-[#0B0F1C] font-medium rounded-xl hover:bg-[#3BB5A9] transition-all transform hover:scale-105 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1C] text-white relative overflow-x-hidden">
      {/* 科技网格背景 */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#4FD1C5 1px, transparent 1px),
            linear-gradient(90deg, #4FD1C5 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* 浮动图标背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {["⚛️", "📘", "▲", "🎨", "📦", "⚡"].map((icon, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* 顶部导航 */}
        <div className="bg-[#1A1F2E]/80 backdrop-blur-sm border-b border-[#4FD1C5]/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-[#4FD1C5] rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform">
                  <span className="text-[#0B0F1C] font-bold">⚛️</span>
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-[#4FD1C5] to-[#9F7AEA] bg-clip-text text-transparent">
                  React Dev Blog
                </span>
              </Link>
              
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-4 py-2 bg-[#2A2F3E] rounded-xl text-gray-300 hover:text-[#4FD1C5] transition-all hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回列表</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 文章头部图片区域 */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-[#0B0F1C]/50 to-transparent"></div>
          
          {/* 文章标题信息 */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-[#4FD1C5] text-[#0B0F1C] text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#9F7AEA] p-0.5">
                      <img 
                        src={post.author.avatar || 'https://picsum.photos/id/64/100/100'} 
                        alt={post.author.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-white">{post.author.name}</p>
                      <p className="text-sm text-gray-400">{post.date}</p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-600"></div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleLike}
                      className="flex items-center space-x-1 text-gray-300 hover:text-[#F687B3] transition"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#F687B3] text-[#F687B3]' : ''}`} />
                      <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-[#4FD1C5] transition">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-[#9F7AEA] transition">
                      <Share2 className="w-5 h-5" />
                      <span>分享</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 文章正文 */}
            <div className="lg:col-span-2">
              <article className="bg-[#1A1F2E] rounded-2xl border border-[#4FD1C5]/10 p-8">
                {/* 标签 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-[#4FD1C5]/10">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-[#2A2F3E] text-[#4FD1C5] text-sm rounded-full flex items-center hover:bg-[#4FD1C5] hover:text-[#0B0F1C] transition cursor-pointer"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* 文章正文内容 */}
                <div className="article-content prose prose-invert max-w-none">
                  {post.content && post.content.length > 0 ? (
                    post.content.map((item, index) => {
                      switch (item.type) {
                        case 'heading':
                          return (
                            <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-white flex items-center">
                              <span className="w-1 h-6 bg-[#4FD1C5] rounded-full mr-3"></span>
                              {item.content}
                            </h2>
                          );
                        case 'subheading':
                          return (
                            <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-[#4FD1C5]">
                              {item.content}
                            </h3>
                          );
                        case 'paragraph':
                          return (
                            <p key={index} className="mb-4 leading-relaxed text-gray-300">
                              {item.content}
                            </p>
                          );
                        case 'list':
                          return (
                            <ul key={index} className="mb-4 space-y-2 text-gray-300">
                              {item.items.map((listItem, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-[#4FD1C5] mr-2">⚡</span>
                                  {listItem}
                                </li>
                              ))}
                            </ul>
                          );
                        case 'code':
                          return (
                            <div key={index} className="bg-[#0B0F1C] rounded-xl p-4 mb-4 overflow-x-auto">
                              <pre className="text-sm text-[#4FD1C5]">
                                <code>{item.content}</code>
                              </pre>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-[#4FD1C5]/30 mx-auto mb-4" />
                      <p className="text-gray-400">这篇文章的内容正在准备中，敬请期待...</p>
                    </div>
                  )}
                </div>

                {/* 文章底部导航 */}
                <div className="mt-12 pt-8 border-t border-[#4FD1C5]/10">
                  <div className="flex justify-between items-center">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-[#4FD1C5] transition group">
                      <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                      <span>上一篇</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-[#4FD1C5] transition group">
                      <span>下一篇</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              </article>

              {/* 评论区域 */}
              <div className="bg-[#1A1F2E] rounded-2xl border border-[#4FD1C5]/10 p-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <MessageCircle className="w-5 h-5 text-[#4FD1C5] mr-2" />
                  评论 ({post.comments ? post.comments.length : 0})
                </h3>
                
                {post.comments && post.comments.length > 0 ? (
                  <div className="space-y-6">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#9F7AEA] p-0.5 flex-shrink-0">
                          <img 
                            src={comment.authorAvatar || 'https://picsum.photos/id/64/100/100'} 
                            alt={comment.authorName} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1 ml-3">
                          <div className="bg-[#2A2F3E] rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-white">{comment.authorName}</span>
                              <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center mt-2 space-x-4">
                            <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-[#F687B3] transition">
                              <Heart className="w-3 h-3" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="text-xs text-gray-500 hover:text-[#4FD1C5] transition">
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-[#4FD1C5]/30 mx-auto mb-3" />
                    <p className="text-gray-400">暂无评论，快来抢沙发吧！</p>
                  </div>
                )}
                
                {/* 发表评论表单 */}
                <form onSubmit={handleCommentSubmit} className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">发表评论</h4>
                  <div className="space-y-4">
                    <textarea 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="分享你的想法..." 
                      className="w-full bg-[#2A2F3E] border border-[#4FD1C5]/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#4FD1C5] transition resize-none"
                      rows="4"
                      required
                    ></textarea>
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-[#4FD1C5] text-[#0B0F1C] font-medium rounded-xl hover:bg-[#3BB5A9] transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>发表评论</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* 底部 */}
        <footer className="border-t border-[#4FD1C5]/10 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2024 晓峰的技术博客 · 分享 React 技术实践</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="hover:text-[#4FD1C5] cursor-pointer transition">⚛️ React</span>
                <span className="hover:text-[#4FD1C5] cursor-pointer transition">📘 TypeScript</span>
                <span className="hover:text-[#4FD1C5] cursor-pointer transition">▲ Next.js</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        
        /* 文章内容样式 */
        .article-content h2 {
          scroll-margin-top: 80px;
        }
        
        .article-content p {
          line-height: 1.8;
        }
        
        .article-content code {
          background: #2A2F3E;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #4FD1C5;
        }
        
        .article-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        
        .article-content blockquote {
          border-left: 3px solid #4FD1C5;
          background: #2A2F3E;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .article-content a {
          color: #4FD1C5;
          text-decoration: underline;
          text-decoration-color: #4FD1C5/30;
          transition: all 0.2s;
        }
        
        .article-content a:hover {
          color: #9F7AEA;
          text-decoration-color: #9F7AEA;
        }
      `}</style>
    </div>
  );
};

export default PostDetail;