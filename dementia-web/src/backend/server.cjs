const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 본인 MySQL 계정
  password: 'james', // 본인 MySQL 비밀번호
  database: 'dementia_quiz', // 본인 DB명
});

// 회원 정보 조회
app.get('/api/user/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// 회원 정보 수정
app.put('/api/user/:id', async (req, res) => {
  const { name, birth, phone } = req.body;
  await pool.query('UPDATE users SET name=?, birth=?, phone=? WHERE id=?', [name, birth, phone, req.params.id]);
  res.json({ success: true });
});

// 출석 정보 조회
app.get('/api/attendance', async (req, res) => {
  const { userId } = req.query;
  const [rows] = await pool.query('SELECT date FROM attendance WHERE user_id=?', [userId]);
  res.json(rows);
});

// 오늘 출석 체크
app.post('/api/attendance', async (req, res) => {
  const { userId, date } = req.body;
  try {
    await pool.query('INSERT IGNORE INTO attendance (user_id, date) VALUES (?, ?)', [userId, date]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 진단 기록 저장
app.post('/api/diagnosis', async (req, res) => {
  const { userId, score, total, date, recommendation } = req.body;
  await pool.query(
    'INSERT INTO diagnosis_records (user_id, score, total, date, recommendation) VALUES (?, ?, ?, ?, ?)',
    [userId, score, total, date, recommendation]
  );
  res.json({ success: true });
});

// 진단 기록 조회
app.get('/api/diagnosis', async (req, res) => {
  const { userId } = req.query;
  const [rows] = await pool.query(
    'SELECT * FROM diagnosis_records WHERE user_id = ? ORDER BY date DESC',
    [userId]
  );
  res.json(rows);
});

// 게임 이력 조회
app.get('/api/games', async (req, res) => {
  const { userId, level } = req.query;
  const [rows] = await pool.query(
    'SELECT * FROM game_records WHERE user_id=? AND level=? ORDER BY date DESC',
    [userId, level]
  );
  res.json(rows);
});

// 게임 기록 저장
app.post('/api/games', async (req, res) => {
  const { userId, game_name, level, score, date } = req.body;
  await pool.query(
    'INSERT INTO game_records (user_id, game_name, level, score, date) VALUES (?, ?, ?, ?, ?)',
    [userId, game_name, level, score, date]
  );
  res.json({ success: true });
});

// 회원 가입
app.post('/api/signup', async (req, res) => {
  const { name, birth, phone, id, pw } = req.body;
  try {
    // 아이디 중복 체크
    const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [id]);
    if (rows.length > 0) {
      return res.json({ success: false, message: "이미 존재하는 아이디입니다." });
    }
    // 회원 정보 저장
    const [result] = await pool.query(
      'INSERT INTO users (username, password, name, birth, phone) VALUES (?, ?, ?, ?, ?)',
      [id, pw, name, birth, phone]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 로그인
app.post('/api/login', async (req, res) => {
  const { id, pw } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [id]);
  if (rows.length === 0) {
    return res.json({ success: false, message: "존재하지 않는 계정입니다. 회원가입이 필요합니다." });
  }
  const user = rows[0];
  if (user.password !== pw) {
    return res.json({ success: false, message: "비밀번호가 틀렸습니다." });
  }
  res.json({ success: true, userId: user.id, name: user.name });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});