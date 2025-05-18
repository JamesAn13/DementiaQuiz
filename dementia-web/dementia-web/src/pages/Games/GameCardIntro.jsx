import { useNavigate, useLocation } from "react-router-dom";
import CardIntroImg from "../../image/CardIntro.png";

function GameCardIntro() {
  const navigate = useNavigate();
  const location = useLocation();
  const level = new URLSearchParams(location.search).get("level") || "normal";

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🃏 카드 짝 맞추기 게임 안내</h2>
      <img
        src={CardIntroImg}
        alt="카드 짝 맞추기 설명"
        style={{ width: "300px", margin: "24px 0" }}
      />
      <p>
        화면에 뒤집힌 카드들이 나옵니다.<br />
        카드를 두 개씩 선택하여 같은 그림을 맞추세요.<br />
        모든 카드를 맞추면 게임이 완료됩니다.<br />
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
        onClick={() => navigate(`/game/card?level=${level}`)}
      >
        시작하기
      </button>
    </div>
  );
}

export default GameCardIntro;