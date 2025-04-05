import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
    return (
        <div className="main-container">
            <h2>게임 카테고리</h2>
            <div className="categories">
                <Link to="/games/memory" className="category">
                    기억력 게임
                </Link>
                <Link to="/games/puzzle" className="category">
                    퍼즐 게임
                </Link>
                <Link to="/games/reaction" className="category">
                    반응 속도 게임
                </Link>
                <Link to="/games/word" className="category">
                    단어 게임
                </Link>
            </div>
        </div>
    );
};

export default Main;