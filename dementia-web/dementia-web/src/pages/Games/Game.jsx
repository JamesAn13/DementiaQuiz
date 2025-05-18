import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Game() {
  const [level, setLevel] = useState("easy");
  const navigate = useNavigate();

  // const handleGameSelect = (gameName) => {
  //   navigate(`/game/${gameName}?level=${level}`);
  // };
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
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>게임 선택</h2>

      <div>
        <label>난이도 선택: </label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">쉬움</option>
          <option value="normal">보통</option>
          <option value="hard">어려움</option>
        </select>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => handleGameSelect("card")}>🃏 카드 짝 맞추기</button><br/><br/>
        <button onClick={() => handleGameSelect("memory")}>🧩 기억력 테스트</button><br/><br/>
        <button onClick={() => handleGameSelect("beep")}>🔊 소리 위치 맞추기</button><br/><br/>
        <button onClick={() => handleGameSelect("color")}>🎨 색깔 위치 맞추기</button><br/><br/>        
        <button onClick={() => handleGameSelect("finddiff")}>🔍 다른 곳을 찾아라!</button><br/><br/>
        <button onClick={() => handleGameSelect("word")}>🔤 단어 찾기</button><br/><br/>
        <button onClick={() => handleGameSelect("ox")}>⭕❌ OX 퀴즈</button><br/><br/>
        <button onClick={() => handleGameSelect("sequence")}>🧠 단어 이어 말하기</button><br/><br/>
        <button onClick={() => handleGameSelect("rps")}>✊ 가위바위보</button><br/><br/>

      </div>
    </div>
  );
}

export default Game;
