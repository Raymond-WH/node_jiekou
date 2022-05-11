// 导入mysql模块
const mysql = require('mysql');
// 创建数据库连接对象
const db = mysql.createPool({
  host: '118.193.39.103',
  user: 'wh',
  password: 'wh',
  database: 'wh'
});

// 向外共享db数据连接对象
module.exports = db;