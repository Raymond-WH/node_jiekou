// 导入数据库
const db = require('../db');
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
  })
  // res.send('注册成功') 
}

// 登录的处理函数
exports.login = (req, res) => { 
  res.send('登录成功')
}