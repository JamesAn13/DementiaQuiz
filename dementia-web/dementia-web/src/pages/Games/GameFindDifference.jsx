import { useState, useEffect } from "react";

// 사용할 이모지 목록
const EMOJIS = ["🍎", "🍌", "🍇", "🍓", "🍉", "🥝", "🍍", "🥑", "🍒", "🍊", "🍋", "🥕", "🍆", "🌽", "🥒"];

function getRandomEmoji(exclude) {
  let filtered = EMOJIS.filter(e => e !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function makeGrid(size, baseEmoji, diffIdx, diffEmoji) {
  return Array.from({ length: size * size }, (_, i) =>
    i === diffIdx ? diffEmoji : baseEmoji
  );
}

function GameFindDifference({ level = "easy" }) {
  // 난이도별 그리드 크기
  const gridSizeByLevel = { easy: 3, normal: 4, hard: 5 };
  const [grid, setGrid] = useState([]);
  const [diffIdx, setDiffIdx] = useState(0);
  const [baseEmoji, setBaseEmoji] = useState("🍎");
  const [diffEmoji, setDiffEmoji] = useState("🍌");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  // 쿼리스트링에서 level 가져오기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLevel = params.get("level");
    level = urlLevel || level;

    // 새 문제 출제
    const size = gridSizeByLevel[level];
    const base = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const diff = getRandomEmoji(base);
    const idx = Math.floor(Math.random() * (size * size));
    setBaseEmoji(base);
    setDiffEmoji(diff);
    setDiffIdx(idx);
    setGrid(makeGrid(size, base, idx, diff));
    setMessage("");
    // eslint-disable-next-line
  }, [score, level]);

  const handleClick = (idx) => {
    if (message) return;
    if (idx === diffIdx) {
      setMessage("정답입니다! 👏");
      setScore(s => s + 1);
    } else {
      setMessage("틀렸어요! 다시 시도해보세요.");
    }
  };

  // 현재 난이도에 맞는 그리드 크기
  const size = gridSizeByLevel[level];

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🔍 다른 곳을 찾아라!</h2>
      <p>한 칸만 다른 이모지가 있습니다. 찾아서 클릭해보세요!</p>
      <div
        style={{
          display: "inline-block",
          background: "#f8f9fa",
          borderRadius: "24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: "32px 24px",
          margin: "32px 0"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 60px)`,
            gap: "10px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {grid.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              style={{
                fontSize: "2.5rem",
                width: 60,
                height: 60,
                border: "none",
                background: "transparent",
                cursor: message ? "not-allowed" : "pointer",
                outline: "none",
                filter: message && idx === diffIdx ? "drop-shadow(0 0 8px #4caf50)" : "none",
                transition: "filter 0.2s"
              }}
              disabled={!!message}
              aria-label={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      {message && (
        <div style={{ marginTop: 20, fontWeight: "bold", color: message.includes("정답") ? "#4caf50" : "#f44336", fontSize: "1.2rem" }}>
          {message}
        </div>
      )}
      {message && (
        <button
          style={{
            marginTop: 20,
            padding: "10px 32px",
            fontSize: "1.1rem",
            borderRadius: "8px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setScore(s => s)}
        >
          다음 문제
        </button>
      )}
      <div style={{ marginTop: "30px", fontSize: "1.1rem" }}>
        점수: {score}
      </div>
    </div>
  );
}

export default GameFindDifference;