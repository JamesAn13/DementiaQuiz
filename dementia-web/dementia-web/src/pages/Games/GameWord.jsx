import { useState } from "react";

function GameWord() {
  const words = ["바나나", "사과", "고양이", "자동차"];
  const [answer] = useState(words[Math.floor(Math.random() * words.length)]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const check = () => {
    setResult(input === answer);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>🔤 단어 찾기</h2>
      <p>힌트: {answer[0]} _ _</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={check}>제출</button>
      {result !== null && (
        <p style={{ color: result ? "green" : "red" }}>
          {result ? "정답입니다!" : "틀렸어요! 정답은 " + answer}
        </p>
      )}
    </div>
  );
}

export default GameWord;
