import { useState } from "react";
import P5Img from "./P5Img";
import { img as p5img } from "../../data/p5rHomeData";
import "./P5CharacterArchive.css";

const CHARA_BASE = "/resources/img/chara";
const BG_SLIDER = p5img(`${CHARA_BASE}/bg_slider_text1.png`);

const characterData = [
  {
    id: "div1",
    charaName: `${CHARA_BASE}/chara1_name.png`,
    kaitouImg: `${CHARA_BASE}/Joker.png`,
    personaImg: `${CHARA_BASE}/Arsene.png`,
    isNavi: false,
    desc:
      "少年主人公因为某个理由转学到「东京」的高中，同时他也开始做起奇怪的梦。──你正是命运的「囚徒」。不远的将来，你将面临毁灭。",
  },
  {
    id: "div2",
    charaName: `${CHARA_BASE}/chara2_name.png`,
    kaitouImg: `${CHARA_BASE}/Skull.png`,
    personaImg: `${CHARA_BASE}/Kidd.png`,
    isNavi: false,
    desc:
      "私立秀尽学园的二年级学生，父母已离婚，心之怪盗团的冲锋队长。粗暴的言语行动非常引人注目，学校内的「问题儿」，平时就经常被学园的教员与指导员「关照」，似乎品行很有问题。",
  },
  {
    id: "div3",
    charaName: `${CHARA_BASE}/chara3_name.png`,
    kaitouImg: `${CHARA_BASE}/Carmen.png`,
    personaImg: `${CHARA_BASE}/Panther.png`,
    isNavi: false,
    desc:
      "私立秀尽学园的二年级学生，主人公的同班同学，心之怪盗团的女演员。美国混血的日本归国子女，能说出一口流利的英语。性格天真率直，由于拥有模特儿的身材及亮丽的样貎，使同学们对她产生距离感而被孤立。",
  },
  {
    id: "div4",
    charaName: `${CHARA_BASE}/chara4_name.png`,
    kaitouImg: `${CHARA_BASE}/Queen.png`,
    personaImg: `${CHARA_BASE}/Johanna.png`,
    isNavi: true,
    desc:
      "私立秀尽学园的三年级生，和奥村春同年级，是主人公、坂本龙司、高卷杏的学姐，学校的学生会长。品行端正、文武双全，有着一本正经绝不妥协的优等生气质，但也因此，站在学生会长的立场上有些飘忽不定。某些时候意外的容易受惊。",
  },
  {
    id: "div5",
    charaName: `${CHARA_BASE}/chara5_name.png`,
    kaitouImg: `${CHARA_BASE}/Noir.png`,
    personaImg: `${CHARA_BASE}/Milady.png`,
    isNavi: false,
    desc:
      "私立秀尽学园的三年级生，和新岛真同年级，是主人公、坂本龙司、高卷杏的学姐。奥村集团的社长奥村邦和的女儿，出身于上流社会，拥有良好的教育和修养。",
  },
  {
    id: "div6",
    charaName: `${CHARA_BASE}/chara6_name.png`,
    kaitouImg: `${CHARA_BASE}/Cendrillon.png`,
    personaImg: `${CHARA_BASE}/Violet.png`,
    isNavi: false,
    desc:
      "私立秀尽学园的一年级转校生，怪盗团新成员。体育特长生，是一位成绩优异的艺术体操选手，秀尽学园对其表现有着很高的期待。",
  },
  {
    id: "div7",
    charaName: `${CHARA_BASE}/chara7_name.png`,
    kaitouImg: `${CHARA_BASE}/Mona.png`,
    personaImg: `${CHARA_BASE}/Zorro.png`,
    isNavi: false,
    desc:
      "心之怪盗团的精神支柱。拥有变身能力，在现实世界以一只普通的黑猫姿态示人，还会利用黑猫的姿态为怪盗团进行刺探的工作。",
  },
  {
    id: "div8",
    charaName: `${CHARA_BASE}/chara8_name.png`,
    kaitouImg: `${CHARA_BASE}/Goemon.png`,
    personaImg: `${CHARA_BASE}/Fox.png`,
    isNavi: false,
    desc:
      "公立洸星高校的二年级生，擅长绘画和节能派料理，兴趣是以节省车费为目的的散步和人类观察。",
  },
  {
    id: "div9",
    charaName: `${CHARA_BASE}/chara9_name.png`,
    kaitouImg: `${CHARA_BASE}/Navi.png`,
    personaImg: `${CHARA_BASE}/Necronomicon.png`,
    isNavi: true,
    desc:
      "勒布朗咖啡店老板佐仓惣治郎的隐瞒了存在感的养女。天才少女，精通心理学，情报学，程序设计，尤其是黑客技术。爱好是点心、电子游戏和动画——以及朋友。",
  },
  {
    id: "div10",
    charaName: `${CHARA_BASE}/chara10_name.png`,
    kaitouImg: `${CHARA_BASE}/RobinHood.png`,
    personaImg: `${CHARA_BASE}/Crow.png`,
    isNavi: false,
    desc:
      "高中生侦探，「侦探王子」，协助警方调查「废人化」和「怪盗团」事件。经常参加电视访谈节目，拥有很高的人气，被认为是正义的化身。自称侦探工作和电视节目给他的学校出勤造成了不小的麻烦，所谓「优秀的人也有自己的烦恼」。",
  },
];

export default function P5CharacterArchive() {
  const [activeIdx, setActiveIdx] = useState(0);

  const switchTo = (idx) => {
    setActiveIdx(idx);
  };

  return (
    <div className="p5-chara-archive">
      <div className="p5-chara-archive__main">
        <P5Img
          path={`${CHARA_BASE}/chara_title.png`}
          alt="角色档案"
          className="p5-chara-archive__title"
        />

        <div className="p5-chara-archive__panels">
          {characterData.map((chara, idx) => (
            <div
              key={chara.id}
              id={chara.id}
              className={`p5-chara-archive__panel ${
                idx === activeIdx ? "in" : "out"
              }`}
            >
              <div
                className="p5-chara-archive__imgs"
                style={{ backgroundImage: `url(${BG_SLIDER})` }}
              >
                <P5Img
                  path={`${CHARA_BASE}/chara_star.png`}
                  alt=""
                  className="charastar"
                />
                <P5Img
                  path={chara.kaitouImg}
                  alt=""
                  className={
                    chara.isNavi ? "Naviimg" : "kaitouimg"
                  }
                />
                <P5Img
                  path={chara.personaImg}
                  alt=""
                  className={
                    chara.isNavi ? "Necronomiconimg" : "personaimg"
                  }
                />
                <P5Img
                  path={chara.charaName}
                  alt=""
                  className="charaname"
                />
                <h2 style={{marginTop: "20px"}} >{chara.desc}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p5-chara-archive__changebar">
        <div>
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => switchTo(idx)}
              aria-label={`切换至角色 ${idx + 1}`}
              className="p5-chara-archive__btn"
            >
              <P5Img
                path={`${CHARA_BASE}/changebtn${idx + 1}.png`}
                alt=""
              />
            </button>
          ))}
        </div>
        <div>
          {[5, 6, 7, 8, 9].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => switchTo(idx)}
              aria-label={`切换至角色 ${idx + 1}`}
              className="p5-chara-archive__btn"
            >
              <P5Img
                path={`${CHARA_BASE}/changebtn${idx + 1}.png`}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
