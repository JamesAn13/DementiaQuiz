import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!id || !pw) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    // DB에서 로그인 정보 확인
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pw }),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("loggedInUser", data.userId); // userId(PK) 저장
      alert(`${data.name}님 환영합니다!`);
      navigate("/mypage");
    } else {
      setError(data.message || "로그인에 실패했습니다.");
    }
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
