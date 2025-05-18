import { useState, useEffect } from "react";

const emojis = [
  { emoji: "🍎", name: "사과" },
  { emoji: "🚗", name: "자동차" },
  { emoji: "🏠", name: "집" },
  { emoji: "⭐", name: "별" },
  { emoji: "🐶", name: "강아지" },
  { emoji: "🐱", name: "고양이" }
];

function shuffle(arr) {
  return arr
    .map((v) => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map((v) => v[1]);
}

function GameMemory({ level = "easy" }) {
  const [sequence, setSequence] = useState([]);
  const [showSequence, setShowSequence] = useState(true);
  const [userSequence, setUserSequence] = useState([]);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState([]);

  // 난이도별 이모지 개수
  const levelCount = {
    easy: 4,
    normal: 5,
    hard: 6
  };

  useEffect(() => {
    const seq = shuffle(emojis).slice(0, levelCount[level]);
    setSequence(seq);
    setShowSequence(true);
    setUserSequence([]);
    setMessage("");
    setOptions(shuffle(seq));

    const showTime = { easy: 2000, normal: 3000, hard: 4000 }[level];
    const timer = setTimeout(() => setShowSequence(false), showTime);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [level]);

  const handleSelect = (emojiObj) => {
    if (showSequence || message) return;
    const next = [...userSequence, emojiObj];
    setUserSequence(next);

    if (next.length === sequence.length) {
      const correct = next.every((item, idx) => item.name === sequence[idx].name);
      if (correct) {
        setMessage("정답입니다! 👏");
      } else {
        setMessage("틀렸어요! 다시 도전해보세요.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🖼️ 그림 순서 기억하기</h2>
      <p>잠시 보여지는 이모지 순서를 기억한 뒤, 같은 순서로 클릭하세요!</p>
      <div style={{ margin: "20px 0" }}>
        {showSequence ? (
          <div>
            {sequence.map((item, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "3rem",
                  margin: "0 10px"
                }}
              >
                {item.emoji}
              </span>
            ))}
            <div style={{ marginTop: 10, color: "#888" }}>순서를 기억하세요...</div>
          </div>
        ) : (
          <div>
            {options.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item)}
                disabled={userSequence.includes(item) || message}
                style={{
                  fontSize: "2.5rem",
                  margin: "0 8px",
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  background: userSequence.includes(item) ? "#eee" : "#fff",
                  cursor: userSequence.includes(item) ? "not-allowed" : "pointer"
                }}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ minHeight: 40 }}>
        {userSequence.length > 0 && (
          <div>
            <b>내가 선택한 순서:</b>
            {userSequence.map((item, idx) => (
              <span key={idx} style={{ fontSize: "2rem", margin: "0 4px" }}>
                {item.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      {message && (
        <div style={{ marginTop: 20, fontWeight: "bold", color: message.includes("정답") ? "#4caf50" : "#f44336" }}>
          {message}
        </div>
      )}
      {message && (
        <button
          style={{ marginTop: 20 }}
          onClick={() => window.location.reload()}
        >
          다시하기
        </button>
      )}
    </div>
  );
}

export default GameMemory;