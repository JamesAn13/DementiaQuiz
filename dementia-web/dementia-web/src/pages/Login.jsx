import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const stored = localStorage.getItem("user_" + id);
    if (!stored) {
      setError("존재하지 않는 계정입니다. 회원가입이 필요합니다.");
      return;
    }

    const user = JSON.parse(stored);
    if (user.pw !== pw) {
      setError("비밀번호가 틀렸습니다.");
      return;
    }

    sessionStorage.setItem("loggedInUser", id);
    alert(`${user.name}님 환영합니다!`);
    navigate("/mypage");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>로그인</h2>
      <div>
        <input
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={handleLogin} style={{ marginTop: "20px" }}>로그인</button>

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p>{error}</p>
          {error.includes("회원가입") && (
            <button onClick={() => navigate("/signup")} style={{ marginTop: "10px" }}>
              회원가입하러 가기
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
