import { useState } from "react";

function GameOX() {
  const questions = [
    { q: "사과는 빨갛다.", a: true },
    { q: "하늘은 노랗다.", a: false },
    { q: "물은 불보다 뜨겁다.", a: false },
    { q: "고양이는 동물이다.", a: true },
  ];

  const [question] = useState(questions[Math.floor(Math.random() * questions.length)]);
  const [result, setResult] = useState(null);

  const check = (value) => {
    setResult(value === question.a);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>⭕❌ OX 퀴즈</h2>
      <p>{question.q}</p>
      <button onClick={() => check(true)}>⭕</button>
      <button onClick={() => check(false)} style={{ marginLeft: "10px" }}>❌</button>
      {result !== null && (
        <p style={{ color: result ? "green" : "red" }}>
          {result ? "정답입니다!" : "틀렸어요!"}
        </p>
      )}
    </div>
  );
}

export default GameOX;
