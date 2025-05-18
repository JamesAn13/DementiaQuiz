import { useState } from "react";

function GameRPS() {
  const choices = ["✊", "✌️", "🖐️"];
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState(null);

  const play = (playerChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayer(playerChoice);
    setComputer(computerChoice);

    if (playerChoice === computerChoice) {
      setResult("무승부!");
    } else if (
      (playerChoice === "✊" && computerChoice === "✌️") ||
      (playerChoice === "✌️" && computerChoice === "🖐️") ||
      (playerChoice === "🖐️" && computerChoice === "✊")
    ) {
      setResult("승리! 🎉");
    } else {
      setResult("패배! 😭");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>✊✌️🖐️ 가위바위보</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => play("✊")}>✊</button>
        <button onClick={() => play("✌️")} style={{ margin: "0 10px" }}>✌️</button>
        <button onClick={() => play("🖐️")}>🖐️</button>
      </div>

      {player && (
        <>
          <p>👤 나: {player}</p>
          <p>💻 컴퓨터: {computer}</p>
          <h3>{result}</h3>
        </>
      )}
    </div>
  );
}

export default GameRPS;
