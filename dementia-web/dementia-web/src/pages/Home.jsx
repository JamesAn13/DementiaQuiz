import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("loggedInUser");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🧠 치매 예방 게임에 오신 걸 환영합니다!</h1>
      <p>원하는 메뉴를 선택하세요</p>
      <div style={{ marginTop: "30px" }}>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/diagnosis")}
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              자가진단
            </button>
            <button
              onClick={() => navigate("/game")}
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              게임하러 가기
            </button>
            <button
              onClick={() => navigate("/mypage")}
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              마이페이지
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
