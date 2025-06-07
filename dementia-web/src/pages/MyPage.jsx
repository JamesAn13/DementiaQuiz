import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

function MyPage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: "", birth: "", phone: "" });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [difficulty, setDifficulty] = useState("easy");
  const [attendance, setAttendance] = useState([]);
  const [diagnosisRecords, setDiagnosisRecords] = useState([]);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // 사용자 정보, 출석, 진단, 게임 이력 모두 API로 불러오기
  useEffect(() => {
    const id = sessionStorage.getItem("loggedInUser");
    if (!id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    // 사용자 정보
    fetch(`http://localhost:4000/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUser(data);
          setEditData({ name: data.name || "", birth: data.birth || "", phone: data.phone || "" });
        } else {
          alert("사용자 정보를 찾을 수 없습니다.");
          navigate("/login");
        }
      })
      .catch(() => {
        alert("사용자 정보를 찾을 수 없습니다.");
        navigate("/login");
      });

    // 출석 정보
    fetch(`http://localhost:4000/api/attendance?userId=${id}`)
      .then(res => res.json())
      .then(data => setAttendance(data.map(row => row.date)));

    // 진단 기록
    fetch(`http://localhost:4000/api/diagnosis?userId=${id}`)
      .then(res => res.json())
      .then(data => setDiagnosisRecords(data));

    // 게임 이력
    fetch(`http://localhost:4000/api/games?userId=${id}`)
      .then(res => res.json())
      .then(data => setGames(data));
  }, [navigate]);

  // 회원정보 수정
  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    const id = sessionStorage.getItem("loggedInUser");
    await fetch(`http://localhost:4000/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setUser({ ...user, ...editData });
    setEditMode(false);
  };

  // 출석 체크
  const handleCheckAttendance = async () => {
    const id = sessionStorage.getItem("loggedInUser");
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch("http://localhost:4000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, date: today }),
    });
    const data = await res.json();
    if (data.success) {
      setAttendance([...attendance, today]);
    } else {
      alert(data.message || "이미 출석하셨습니다.");
    }
  };

  // 로그아웃
  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    const id = sessionStorage.getItem("loggedInUser");
    await fetch(`http://localhost:4000/api/user/${id}`, { method: "DELETE" });
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // 달력 관련 함수
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={"empty-" + i}></div>);
    }

    for (let date = 1; date <= lastDate; date++) {
      const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
      const isAttended = attendance.includes(formattedDate);
      const diagnosis = diagnosisRecords.find(record => record.date === formattedDate);
      const today = new Date();
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === date;

      let diagnosisDot = null;
      if (diagnosis) {
        let color = "";
        if (diagnosis.recommendation === "병원 정밀진단 권장") color = "red";
        else if (diagnosis.recommendation === "주의") color = "yellow";
        else if (diagnosis.recommendation === "정상") color = "green";

        diagnosisDot = <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: color, margin: "2px auto 0" }}></div>;
      }

      calendar.push(
        <div
          key={date}
          style={{
            border: isToday ? "2px solid #000" : "1px solid #ccc",
            backgroundColor: isAttended ? "lightblue" : "white",
            padding: "8px",
            textAlign: "center",
          }}
        >
          {date}
          {diagnosisDot}
        </div>
      );
    }

    return <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginTop: "20px" }}>{calendar}</div>;
  };

  // 게임 이력 및 레이더 차트 관련 함수
  const getRadarData = () => {
    const gamesList = ["카드 짝 맞추기", "단어 찾기", "OX 퀴즈", "단어 이어 말하기", "가위바위보"];
    const current = {};
    const past = {};

    games.forEach(game => {
      if (gamesList.includes(game.game_name) && game.level === difficulty) {
        const gameDate = new Date(game.date);
        if (gameDate < new Date().setMonth(new Date().getMonth() - 1)) {
          past[game.game_name] = (past[game.game_name] || 0) + game.score;
        } else {
          current[game.game_name] = (current[game.game_name] || 0) + game.score;
        }
      }
    });

    return gamesList.map(name => ({
      subject: name,
      current: current[name] || 0,
      past: past[name] || 0,
      fullMark: 100
    }));
  };

  if (!user) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>{user.name}님의 마이페이지</h2>

      {editMode ? (
        <div>
          <input type="text" name="name" value={editData.name} onChange={handleInputChange} placeholder="이름" /><br />
          <input type="date" name="birth" value={editData.birth} onChange={handleInputChange} /><br />
          <input type="text" name="phone" value={editData.phone} onChange={handleInputChange} placeholder="전화번호" /><br />
          <button onClick={handleEditSave}>저장하기</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: "10px" }}>취소</button>
          <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>메인으로</button>
        </div>
      ) : (
        <div>
          <p>
            생년월일: {user.birth ? user.birth.slice(0, 10) : ""}
          </p>
          <p>아이디: {user.username}</p>
          <p>이름: {user.name}</p>
          <p>가입일: {user.created_at ? user.created_at.slice(0, 10) : ""}</p>
          <p>전화번호: {user.phone}</p>
          <button onClick={() => setEditMode(true)} style={{ marginRight: "10px" }}>회원정보 수정</button>
          <button onClick={handleDeleteAccount} style={{ marginRight: "10px" }}>회원 탈퇴</button>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>메인으로</button>
        </div>
      )}

      <div style={{ marginTop: "50px" }}>
        <h3>출석 + 자가진단 캘린더</h3>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => changeMonth(-1)}>◀️</button>
          <span style={{ margin: "0 15px" }}>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
          <button onClick={() => changeMonth(1)}>▶️</button>
        </div>
        <button onClick={handleCheckAttendance}>오늘 출석하기</button>
        {generateCalendar()}
        <div style={{ marginTop: "10px" }}>
          <p>🟥 위험 | 🟡 주의 | 🟢 정상</p>
        </div>
      </div>
      <div style={{ marginTop: "50px", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <h3>📚 오늘의 숙제</h3>
        <p>카드 짝 맞추기 3번 플레이하기</p>
        {(() => {
          // 오늘 날짜 구하기 (YYYY-MM-DD)
          const today = new Date();
          const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
          // 오늘 카드 짝 맞추기 플레이 횟수 계산
          const cardPlayCount = games.filter(
            game => game.game_name === "카드 짝 맞추기" && game.date.startsWith(todayStr)
          ).length;
          return (
            <div>
              <p>진행 상황: {cardPlayCount} / 3</p>
              {cardPlayCount >= 3 && (
                <div style={{ color: "#4caf50", fontWeight: "bold", fontSize: "1.2rem", marginTop: "10px" }}>
                  오늘의 숙제 완료!!
                </div>
              )}
            </div>
          );
        })()}
      </div>
      <div style={{ marginTop: "50px", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <h3>🎯 게임 이력</h3>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => setDifficulty("easy")}>쉬움</button>
          <button onClick={() => setDifficulty("normal")} style={{ margin: "0 10px" }}>보통</button>
          <button onClick={() => setDifficulty("hard")}>어려움</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>날짜</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>게임명</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>난이도</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>점수</th>
              </tr>
            </thead>
            <tbody>
              {games
                .filter(game => game.level === difficulty)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((game, idx) => (
                  <tr key={idx}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{game.date}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{game.game_name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{game.level}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{game.score}</td>
                  </tr>
                ))}
              {games.filter(game => game.level === difficulty).length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "16px" }}>게임 이력이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
