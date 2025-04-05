import React from "react";

const Result = ({ score, total }) => {
    return (
        <div className="result-container">
        <h2>Quiz Result</h2>
        <p>Your Score: {score} out of {total}</p>
        <p>{(score / total) * 100}%</p>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
    );
};

export default Result;

