import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-red-900/40 bg-black/80 backdrop-blur-sm py-10 px-4 font-p5jp">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold text-zinc-500">
          <Link to="/" className="hover:text-red-400 transition-colors">
            トップ
          </Link>
          <Link to="/#character" className="hover:text-red-400 transition-colors">
            キャラクター
          </Link>
          <Link to="/#news" className="hover:text-red-400 transition-colors">
            NEWS
          </Link>
        </div>
        <p className="text-[10px] text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          非公式ファン向けレイアウト再現。商標・原作は各権利者に帰属します。
        </p>
        <p className="text-[10px] text-zinc-700">
          ©ATLUS ©SEGA — tribute layout
        </p>
      </div>
    </footer>
  );
};

export default Footer;
