// 导入express
const express = require('express');
// 创建服务器
const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());
// 配置解析表单数据的中间件,配置解析 `application/x-www-form-urlencoded`
app.use(express.urlencoded({ ecxtended: false }));

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 导入并注册用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)
// 启动服务器
app.listen(3000, () => {
  console.log('服务器启动成功，端口号为3000');
 })