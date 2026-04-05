import { Link } from "react-router-dom";
import ScrollReveal from "../components/common/ScrollReveal";
import P5InnerDepthBand from "../components/common/P5InnerDepthBand";
import TiltSurface from "../components/common/TiltSurface";

const NotFound = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-x-hidden min-h-[70vh]">
      <P5InnerDepthBand label="VOID" />
      <div className="relative z-[1]">
        <TiltSurface className="block" maxTilt={4}>
          <ScrollReveal variant="scale" className="p5-notfound-panel text-center">
            <div className="p5-notfound-panel-inner">
              <div className="p5-notfound-code mb-2">404</div>
              <p className="text-[10px] font-black tracking-[0.35em] text-red-500 mb-3">
                NOT FOUND
              </p>
              <h1 className="text-xl md:text-2xl font-black text-white mb-3 tracking-wide">
                目标不存在
              </h1>
              <p className="text-sm text-white/65 leading-relaxed max-w-xs mx-auto">
                心之宫殿里没有这扇门——链接可能已失效，或路径被改写了。
              </p>
              <Link to="/" className="p5-notfound-btn">
                <span>返回首页</span>
              </Link>
            </div>
          </ScrollReveal>
        </TiltSurface>
      </div>
    </section>
  );
};

export default NotFound;
