// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户信息处理函数
const userInfoHandler = require('../router_handler/userInfo')

// 获取用户的基本信息
router.get('/userinfo', userInfoHandler.getUserInfo)

// 向外共享路由对象
module.exports = router