// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户信息处理函数
const userInfoHandler = require('../router_handler/userInfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证规则的对象
const { update_userinfo_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userInfoHandler.getUserInfo)


// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)

// 向外共享路由对象
module.exports = router