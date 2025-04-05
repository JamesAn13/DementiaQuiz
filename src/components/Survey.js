import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Survey = () => {
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const questions = [
        "언제 어떤 일이 일어났는지 기억하지 못한다.",
        "최근에 들은 이야기를 기억하지 못한다.",
        "물건을 어디에 두었는지 자주 잊어버린다.",
        "익숙한 장소에서 길을 잃는다.",
    ];

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer,
        }));
        setError(false); // 선택 시 에러 메시지 제거
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length !== questions.length) {
            setError(true); // 모든 질문에 응답하지 않았을 경우 에러 표시
            return;
        }

        // 설문 완료 후 메인 화면으로 이동
        navigate("/main");
    };

    return (
        <div className="survey-container">
            <h2>자가 진단 설문</h2>
            <p>아래 질문에 답변하세요.</p>
            <form>
                {questions.map((question, index) => (
                    <div key={index} className="question">
                        <div className="question-header">
                            <strong>{index + 1}. {question}</strong>
                        </div>
                        <div className="options">
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="0"
                                    onChange={() => handleAnswerChange(index, "0")}
                                />
                                그렇지 않다
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="1"
                                    onChange={() => handleAnswerChange(index, "1")}
                                />
                                약간 그렇다
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="2"
                                    onChange={() => handleAnswerChange(index, "2")}
                                />
                                많이(자주) 그렇다
                            </label>
                        </div>
                        <hr />
                    </div>
                ))}
                {error && <p className="error-message">모든 항목을 선택해주세요.</p>}
                <button type="button" onClick={handleSubmit}>
                    결과 확인
                </button>
            </form>
        </div>
    );
};

export default Survey;