// 导入express
const express = require('express');
// 创建服务器
const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());



// 配置解析表单数据的中间件,配置解析 `application/x-www-form-urlencoded`
app.use(express.urlencoded({ ecxtended: false }));

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 当前项目，推荐使用 multer 来解析 `multipart/form-data` 格式的表单数据。https://www.npmjs.com/package/multer
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

// 一定要在路由配置之前解析token中间件
// 导入配置文件
const config = require('./config');

// 解析token的中间件
const {expressjwt:jwt} = require('express-jwt');
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证 
app.use(jwt({
  secret: config.jwtSecretKey, algorithms: ["HS256"],
 }).unless({path:[/^\/api\//]}))

// 导入并注册用户路由模块
const userRouter = require('./router/user');
// 现在用不了了
// const joi = require('@hapi/joi')
// 安装npm i joi 
const joi = require('joi')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userInfoRouter = require('./router/userInfo');
// 以 / my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userInfoRouter)

// 文章分类路由模块
const artCateRouter = require('./router/artCate');
app.use('/my/article', artCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  console.log(err);
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')

  // 未知的错误
  res.cc(err)
})

// 启动服务器
app.listen(3000, () => {
  console.log('服务器启动成功，端口号为3000');
})