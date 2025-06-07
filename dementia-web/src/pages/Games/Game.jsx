import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css";

const gameList = [
  { key: "card", icon: "🃏", label: "카드 짝 맞추기" },
  { key: "memory", icon: "🧩", label: "기억력 테스트" },
  { key: "beep", icon: "🔊", label: "소리 위치 맞추기" },
  { key: "color", icon: "🎨", label: "색깔 위치 맞추기" },
  { key: "finddiff", icon: "🔍", label: "다른 곳을 찾아라!" },
  { key: "word", icon: "🔤", label: "단어 찾기" },
  { key: "ox", icon: "⭕❌", label: "OX 퀴즈" },
  { key: "sequence", icon: "🧠", label: "단어 이어 말하기" },
  { key: "rps", icon: "✊", label: "가위바위보" },
];

function Game() {
  const [level, setLevel] = useState("easy");
  const navigate = useNavigate();

  const handleGameSelect = (gameName) => {
    if (gameName === "card") {
      navigate(`/game/cardIntro?level=${level}`);
    } else if (gameName === "memory") {
      navigate(`/game/memoryIntro?level=${level}`);
    } else {
      navigate(`/game/${gameName}?level=${level}`);
    }
  };

  return (
    <div className={styles["game-bg"]}>
      <div className={styles.container}>
        <h2 className={styles.title}>게임 선택</h2>

        <div className={styles.levelSelect}>
          <label htmlFor="level-select">난이도 선택: </label>
          <select
            id="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={styles.selectBox}
          >
            <option value="easy">쉬움</option>
            <option value="normal">보통</option>
            <option value="hard">어려움</option>
          </select>
        </div>

        <div className={styles.gameGrid}>
          {gameList.map((game) => (
            <button
              key={game.key}
              className={styles.gameBtn}
              onClick={() => handleGameSelect(game.key)}
            >
              <span>{game.icon}</span>
              {game.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
