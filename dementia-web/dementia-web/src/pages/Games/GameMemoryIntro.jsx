import { useNavigate, useLocation } from "react-router-dom";
import MemoryIntro from "../../image/MemoryIntro.png";

function GameMemoryIntro() {
  const navigate = useNavigate();
  const location = useLocation();
  const level = new URLSearchParams(location.search).get("level") || "normal";

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🧩 기억력 테스트 안내</h2>
        <img
        src={MemoryIntro}
        alt="기억력 테스트 설명"
        style={{ width: "420px", maxWidth: "90vw", margin: "32px 0" }}
        />
      <p>
        여러 개의 카드가 잠깐 공개됩니다.<br />
        카드를 외운 뒤, 같은 그림을 맞추는 게임입니다.<br />
        난이도에 따라 카드 수와 제한 시간이 달라집니다.<br />
        <br />
        <b>난이도: {level}</b>
      </p>
      <button
        style={{
          marginTop: "30px",
          padding: "12px 32px",
          fontSize: "1.2rem",
          borderRadius: "8px",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
        onClick={() => navigate(`/game/memory?level=${level}`)}
      >
        시작하기
      </button>
    </div>
  );
}

export default GameMemoryIntro;