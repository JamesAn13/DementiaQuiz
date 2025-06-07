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

  const handleSignup = () => {
    if (!form.id || !form.pw) {
      alert("아이디와 비밀번호는 필수입니다!");
      return;
    }

    if (localStorage.getItem("user_" + form.id)) {
      alert("이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.");
      return;
    }
    
    localStorage.setItem("user_" + form.id, JSON.stringify(form));

    // ✅ 회원가입 완료하면 바로 로그인 처리
    sessionStorage.setItem("loggedInUser", form.id);
    alert(`${form.name}님 회원가입 및 로그인 완료!`);
    navigate("/mypage"); // 마이페이지로 이동
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
            onKeyDown={handleKeyDown} // ✅ Enter 키 핸들링 추가
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
