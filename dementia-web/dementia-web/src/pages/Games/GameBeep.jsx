import { useState, useEffect } from "react";

// 소리 재생 함수 (Web Audio API)
function playBeep(pan = 0) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();

  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  gain.gain.value = 0.2;
  panner.pan.value = pan;

  oscillator.connect(gain).connect(panner).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.5);

  oscillator.onended = () => ctx.close();
}

// 위치를 시각적으로 명확하게! (스피커 아이콘과 큰 버튼)
const positionsByLevel = {
  easy: [
    { label: "왼쪽", pan: -1, icon: "🔈" },
    { label: "오른쪽", pan: 1, icon: "🔈" }
  ],
  normal: [
    { label: "왼쪽", pan: -1, icon: "🔈" },
    { label: "가운데", pan: 0, icon: "🔈" },
    { label: "오른쪽", pan: 1, icon: "🔈" }
  ],
  hard: [
    { label: "왼쪽", pan: -1, icon: "🔈" },
    { label: "왼쪽중앙", pan: -0.5, icon: "🔈" },
    { label: "가운데", pan: 0, icon: "🔈" },
    { label: "오른쪽중앙", pan: 0.5, icon: "🔈" },
    { label: "오른쪽", pan: 1, icon: "🔈" }
  ]
};

function GameBeep({ level = "easy" }) {
  const [answerIdx, setAnswerIdx] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [score, setScore] = useState(0);

  // level prop이 없으면 쿼리스트링에서 가져오기
  const search = window.location.search;
  const urlLevel = new URLSearchParams(search).get("level");
  const gameLevel = urlLevel || level;

  const positions = positionsByLevel[gameLevel];

  // 문제 출제
  const playSound = () => {
    const idx = Math.floor(Math.random() * positions.length);
    setAnswerIdx(idx);
    setShowResult(false);
    setResultMsg("");
    playBeep(positions[idx].pan);
  };

  useEffect(() => {
    playSound();
    // eslint-disable-next-line
  }, [gameLevel]);

  const handleSelect = (idx) => {
    if (showResult) return;
    if (idx === answerIdx) {
      setResultMsg("정답입니다! 👏");
      setScore(s => s + 1);
    } else {
      setResultMsg("틀렸어요! 다시 들어보세요.");
    }
    setShowResult(true);
  };

  // 시각적으로 명확한 위치 배치
  const getFlexJustify = () => {
    if (positions.length === 2) return "space-between";
    if (positions.length === 3) return "space-around";
    return "space-evenly";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🔊 소리 위치 맞추기</h2>
      <p>소리가 난 위치의 스피커를 눌러보세요!</p>
      <div
        style={{
          display: "flex",
          justifyContent: getFlexJustify(),
          alignItems: "center",
          margin: "40px 0",
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {positions.map((pos, idx) => (
          <button
            key={pos.label}
            onClick={() => handleSelect(idx)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "2.5rem",
              margin: "0 10px",
              padding: "32px 24px",
              borderRadius: "50%",
              border: "3px solid #1976d2",
              background: showResult && idx === answerIdx ? "#e3fcec" : "#fff",
              color: "#1976d2",
              minWidth: 100,
              minHeight: 100,
              cursor: showResult ? "not-allowed" : "pointer",
              boxShadow: showResult && idx === answerIdx ? "0 0 16px #4caf50" : "none",
              transition: "background 0.2s"
            }}
            disabled={showResult}
            aria-label={pos.label}
          >
            <span>{pos.icon}</span>
            <span style={{ fontSize: "1.1rem", marginTop: 8 }}>{pos.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={playSound}
        style={{
          marginTop: "10px",
          padding: "12px 32px",
          fontSize: "1.1rem",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        disabled={!showResult && answerIdx !== null}
      >
        {answerIdx === null || showResult ? "다음 문제" : "다시 듣기"}
      </button>
      <div style={{ marginTop: "24px", fontWeight: "bold", color: resultMsg.includes("정답") ? "#4caf50" : "#f44336", fontSize: "1.2rem" }}>
        {resultMsg}
      </div>
      <div style={{ marginTop: "30px", fontSize: "1.1rem" }}>
        점수: {score}
      </div>
    </div>
  );
}

export default GameBeep;