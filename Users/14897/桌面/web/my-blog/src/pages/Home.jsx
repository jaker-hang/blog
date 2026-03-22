import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {

    return (
        <div className="first-view">
            <div className="content">
                <div className="text">
                    <h1>《女神异闻录 5》决定版！</h1>
                    <p>以新价格登陆最新平台！！</p>
                    <div className="buttons">
                        <button className="button">PV</button>
                        <button className="button">立刻购买</button>
                    </div>
                </div>
                <div className="video-play" onClick={() => console.log("Play Video")}>
                    <img src="https://placehold.co/50x50" alt="Play Video" />
                </div>
            </div>
            <div className="now-on-sale">NOW ON SALE</div>
        </div>

        {/* News Section */}
        <section className="news-section">
            <div className="news-title">NEWS</div>
            <div className="news-item">
                2022.06.13 《女神异闻录 5 皇家版》重制版将于2022年10月21日发售！
            </div>
        </section>
    );
};

export default Home;