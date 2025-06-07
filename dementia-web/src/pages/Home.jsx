import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("loggedInUser");

  const buttonStyle = {
    margin: "10px",
    padding: "28px 60px",
    fontSize: "1.7rem",
    borderRadius: "16px",
    cursor: "pointer",
    minWidth: "220px",
    background: "#ffffffcc",
    border: "2px solid #b2dfdb",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    fontWeight: "bold"
  };

  // 텍스트 가독성을 위한 반투명 배경 스타일
  const textBgStyle = {
    background: "rgba(255,255,255,0.85)",
    borderRadius: "24px",
    display: "inline-block",
    padding: "40px 32px 32px 32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    marginTop: "100px"
  };

  return (
    <div className="home-bg">
      <div style={{ textAlign: "center", ...textBgStyle }}>
        <h1 style={{ color: "#2d3a2e", textShadow: "1px 1px 8px #fff", fontWeight: "bold" }}>
          🧠 치매 예방 게임에 오신 걸 환영합니다!
        </h1>
        <p style={{ fontSize: "2.2rem", color: "#3e4a3f", fontWeight: "bold", marginBottom: "40px", marginTop: "20px" }}>
          원하는 메뉴를 선택하세요
        </p>
        <div style={{ marginTop: "30px" }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/diagnosis")}
                style={buttonStyle}
              >
                자가진단 📝
              </button>
              <button
                onClick={() => navigate("/information")}
                style={buttonStyle}
              >
                치매 예방 정보 📚
              </button>
              <button
                onClick={() => navigate("/game")}
                style={buttonStyle}
              >
                게임하러 가기 🎮
              </button>
              <button
                onClick={() => navigate("/mypage")}
                style={buttonStyle}
              >
                마이페이지 👤
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={buttonStyle}
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={buttonStyle}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
