// GameCard.jsx - 카드 짝 맞추기 (난이도별 카드 수 + 실시간 타이머 표시)
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GameCard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const navigate = useNavigate();
  const level = new URLSearchParams(useLocation().search).get("level") || "normal";

  useEffect(() => {
    const baseEmojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🥝", "🍍", "🥑", "🥕", "🍆", "🌽", "🥒", "🍔", "🍕", "🍞", "🥨", "🍗", "🍣", "🍪", "🍩", "🍰", "🍫", "🍿", "🥜", "🧀", "🍖", "🥓", "🍛", "🥗", "🍜"];
    let pairCount = 0;
    let limit = 0;

    if (level === "easy") {
      pairCount = 12; // 24장
      limit = 5 * 60; // 5분
    } else if (level === "normal") {
      pairCount = 24; // 48장
      limit = 15 * 60; // 15분
    } else if (level === "hard") {
      pairCount = 30; // 60장
      limit = 30 * 60; // 30분
    }

    const selected = baseEmojis.slice(0, pairCount);
    const fullSet = [...selected, ...selected].sort(() => Math.random() - 0.5);
    setCards(fullSet);
    setTimeLimit(limit);
    setStartTime(Date.now());
  }, [level]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        setElapsed(diff);

        if (diff >= timeLimit) {
          alert("시간 초과! 게임이 종료됩니다.");
          navigate("/mypage");
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, timeLimit]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      const endTime = Date.now();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);

      setTimeout(() => {
        saveResult("카드 짝 맞추기", level, matched.length / 2);
        alert(`게임 완료! ${elapsedSeconds}초 소요. 결과가 저장되었습니다.`);
        navigate("/mypage");
      }, 500);
    }
  }, [matched]);

  const handleClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const saveResult = (name, level, score) => {
    const id = sessionStorage.getItem("loggedInUser");
    const user = JSON.parse(localStorage.getItem("user_" + id));
    const result = {
      name,
      level,
      score,
      date: new Date().toLocaleString(),
    };
    user.games = [...(user.games || []), result];
    localStorage.setItem("user_" + id, JSON.stringify(user));
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>🃏 카드 짝 맞추기</h2>
      <p>난이도: {level} | 남은 시간: {formatTime(Math.max(0, timeLimit - elapsed))}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 80px)", gap: "10px", justifyContent: "center" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "80px",
              height: "80px",
              fontSize: "2rem",
              backgroundColor: matched.includes(i) || flipped.includes(i) ? "#fff" : "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid #999",
            }}
          >
            {matched.includes(i) || flipped.includes(i) ? card : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameCard;
