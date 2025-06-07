import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { diagnosisQuestions } from "../data/diagnosisQuestions";
import styles from "./Diagnosis.module.css";

function Diagnosis() {
  const [answers, setAnswers] = useState(Array(diagnosisQuestions.length).fill(null));
  const navigate = useNavigate();

  const handleSaveDiagnosis = async (score, total) => {
    const today = new Date().toISOString().split("T")[0];
    const id = sessionStorage.getItem("loggedInUser");

    if (!id) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    // 오늘 이미 진단했는지 DB에서 확인
    const res = await fetch(`http://localhost:4000/api/diagnosis?userId=${id}`);
    const records = await res.json();
    if (records.some(record => record.date === today)) {
      alert("오늘은 이미 진단을 완료했습니다. 내일 다시 검사해주세요.");
      return;
    }

    let recommendation = "";
    if (score >= 8) {
      recommendation = "병원 정밀진단 권장";
    } else if (score >= 6) {
      recommendation = "주의";
    } else {
      recommendation = "정상";
    }

    // DB에 진단 결과 저장
    await fetch("http://localhost:4000/api/diagnosis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        score,
        total,
        date: today,
        recommendation,
      }),
    });
  };

  const handleChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value === "yes";
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("모든 질문에 답해주세요.");
      return;
    }

    const score = answers.filter(Boolean).length;
    await handleSaveDiagnosis(score, answers.length);

    alert(score >= 6 ? "치매 가능성이 있습니다. 병원에서 정밀 진단을 받아보세요." : "정상 범위입니다.");
    navigate("/mypage");
  };

  return (
    <div className={styles["diagnosis-bg"]}>
      <div className={styles["diagnosis-container"]}>
        <h2 className={styles["diagnosis-title"]}>
          📝 치매 자가진단
        </h2>
        <div>
          {diagnosisQuestions.map((q, i) => (
            <div key={i} className={styles["question-card"]}>
              <div className={styles["question-text"]}>
                {i + 1}. {q}
              </div>
              <div className={styles["radio-group"]}>
                <label className={styles.yes}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    value="yes"
                    checked={answers[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                  />
                  예
                </label>
                <label className={styles.no}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    value="no"
                    checked={answers[i] === false}
                    onChange={(e) => handleChange(i, e.target.value)}
                  />
                  아니오
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={styles["submit-btn"]}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}

export default Diagnosis;
