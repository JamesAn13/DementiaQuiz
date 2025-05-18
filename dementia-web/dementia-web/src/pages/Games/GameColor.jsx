import { useState, useEffect } from "react";

const COLORS = [
  { name: "빨간색", code: "#e74c3c" },
  { name: "파란색", code: "#3498db" },
  { name: "초록색", code: "#27ae60" },
  { name: "노란색", code: "#f1c40f" },
  { name: "보라색", code: "#9b59b6" },
  { name: "주황색", code: "#e67e22" }
];

function shuffle(arr) {
  return arr
    .map((v) => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map((v) => v[1]);
}

function GameColor({ level = "easy" }) {
  // 난이도별 블록 개수
  const levelCount = { easy: 3, normal: 4, hard: 6 };
  const [blocks, setBlocks] = useState([]);
  const [showColors, setShowColors] = useState(true);
  const [target, setTarget] = useState(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  // 쿼리스트링에서 level 가져오기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLevel = params.get("level");
    level = urlLevel || level;

    // 블록 색상 랜덤 생성
    const selected = shuffle(COLORS).slice(0, levelCount[level]);
    setBlocks(selected);
    setShowColors(true);
    setMessage("");
    setTarget(null);

    // 2초 후 색상 숨기기 & 목표 색상 지정
    setTimeout(() => {
      setShowColors(false);
      setTarget(selected[Math.floor(Math.random() * selected.length)]);
    }, 2000 + levelCount[level] * 300);
    // eslint-disable-next-line
  }, [score, level]);

  const handleSelect = (block) => {
    if (!target || message) return;
    if (block.name === target.name) {
      setMessage("정답입니다! 👏");
      setScore((s) => s + 1);
    } else {
      setMessage("틀렸어요! 다시 도전해보세요.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🎨 색깔 위치 맞추기</h2>
      <p>
        잠시 보여지는 색상 블록을 기억한 뒤,<br />
        제시된 색깔의 위치를 맞혀보세요!
      </p>
      <div style={{ margin: "32px 0", display: "flex", justifyContent: "center", gap: 24 }}>
        {blocks.map((block, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(block)}
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              border: "2px solid #888",
              background: showColors ? block.code : "#eee",
              cursor: showColors || message ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
            disabled={showColors || !!message}
            aria-label={block.name}
          >
            {!showColors && message && block.name === target?.name && (
              <span style={{ fontSize: "2rem" }}>✔️</span>
            )}
          </button>
        ))}
      </div>
      {!showColors && target && (
        <div style={{ margin: "18px 0", fontSize: "1.2rem" }}>
          <b style={{ color: target.code }}>{target.name}</b>이(가) 어디 있었나요?
        </div>
      )}
      {message && (
        <div style={{ marginTop: 20, fontWeight: "bold", color: message.includes("정답") ? "#4caf50" : "#f44336" }}>
          {message}
        </div>
      )}
      {message && (
        <button
          style={{ marginTop: 20 }}
          onClick={() => setScore((s) => s)}
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

export default GameColor;