var mysql = require('mysql2/promise');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 본인 MySQL 계정
  password: 'james', // 본인 MySQL 비밀번호     
  database: 'dementia_quiz', // 본인 DB명
  port: 3306
});         
module.exports = pool;