import React, { useState } from "react";
import { InfoData } from "../data/InfoData.jsx";

function Info() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "32px" }}>치매 예방 정보</h2>
      <div style={{ display: "flex", gap: "32px" }}>
        <div style={{ minWidth: "200px" }}>
          <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "8px" }}>카테고리</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {InfoData.map((item) => (
              <li key={item.id}>
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    margin: "8px 0",
                    background: selected === item.id ? "#1976d2" : "#f5f5f5",
                    color: selected === item.id ? "#fff" : "#222",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => setSelected(item.id)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, minHeight: "400px", padding: "16px" }}>
          {selected ? (
            InfoData.find((item) => item.id === selected)?.content
          ) : (
            <div
              style={{
                color: "#888",
                textAlign: "center",
                marginTop: "120px",
              }}
            >
              카테고리를 선택하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;