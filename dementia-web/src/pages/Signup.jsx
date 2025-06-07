import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    phone: "",
    id: "",
    pw: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!form.id || !form.pw) {
      alert("아이디와 비밀번호는 필수입니다!");
      return;
    }

    // 백엔드로 회원가입 요청
    const res = await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("loggedInUser", data.userId); // userId는 백엔드에서 반환
      alert(`${form.name}님 회원가입 및 로그인 완료!`);
      navigate("/mypage");
    } else {
      alert(data.message || "회원가입 실패");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>회원가입</h2>
      {["name", "birth", "phone", "id", "pw"].map((key) => (
        <div key={key} style={{ margin: "5px" }}>
          <input
            name={key}
            placeholder={key === "pw" ? "비밀번호" : key}
            type={key === "pw" ? "password" : "text"}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      ))}
      <button onClick={handleSignup} style={{ marginTop: "20px" }}>
        회원가입
      </button>
    </div>
  );
}

export default Signup;
