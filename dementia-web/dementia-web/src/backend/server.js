const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", // MySQL 비밀번호
  database: "dementia_web", // 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");
});

// 회원가입 API
app.post("/signup", (req, res) => {
  const { name, birth, phone, id, pw } = req.body;

  // 아이디 중복 확인
  const checkQuery = "SELECT * FROM users WHERE id = ?";
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "서버 오류" });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    // 사용자 데이터 삽입
    const insertQuery = "INSERT INTO users (name, birth, phone, id, pw) VALUES (?, ?, ?, ?, ?)";
    db.query(insertQuery, [name, birth, phone, id, pw], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "회원가입 실패" });
      }
      res.status(201).json({ message: "회원가입 성공!" });
    });
  });
});

// 서버 실행
app.listen(5000, () => {
  console.log("서버가 http://localhost:5000 에서 실행 중입니다.");
});