// 导入数据库
const db = require('../db');
// 导入加密包
const crypto = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
// 注册用户的处理函数
exports.register = (req, res) => { 
  // 获取客户端提交的到服务器的用户信息
  const userInfo = req.body;
  // console.log(req);
  // console.log(userInfo);
  // 对表单中的数组进行合法性校验
  if (!userInfo.username || !userInfo.password) { 
    return res.send({
      status: 1,
      message: '用户名或密码不能为空'
    })
  }

  // 定义sql语句，查询用户名是否被占用
  const sql = `SELECT * FROM ev_users WHERE username=?`;
  // 定义插入用户的sql语句
  const sqlInsert = `INSERT INTO ev_users SET ?`;
  // 执行sql语句
  db.query(sql, [userInfo.username], (err, results) => { 
    // console.log(err);
    // console.log(results);
    // 执行语句失败
    if (err) { 
      return res.send({
        status: 1,
        message:err.message
      })
    }
    // 用户名已被占用
    if (results.length > 0) { 
      return res.send({
        status: 1,
        message: '用户名已被占用'
      })
    }
    // 调用加密函数，加密密码 bcrypt.hashSync()
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    db.query(sqlInsert, {username:userInfo.username,password:userInfo.password}, (err, results) => { 
      // 执行sql语句失败
      if (err) { 
        // return res.send({
        //   status: 1,
        //   message:err.message
        // })
        return res.cc(err)
      }
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
        return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      }
      // 注册成功
      return res.send({ status: 0, message: '注册成功！' })
    })
  })
  
}

// 登录的处理函数
exports.login = (req, res) => { 
  res.send('登录成功')
}