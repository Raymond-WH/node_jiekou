// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户信息处理函数
const userInfoHandler = require('../router_handler/userInfo.js')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证规则的对象
const { update_userinfo_schema, update_avatar_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userInfoHandler.getUserInfo)


// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)


// 导入密码验证规则
const {update_password_schema } = require('../schema/user.js')
// 更新密码
router.post('/updatepwd', expressJoi(update_password_schema),userInfoHandler.updatePwd)


// 导入头像上传规则
// const { update_avatar_schema } = require('../schema/user')
router.post('/update/avatar',expressJoi(update_avatar_schema),userInfoHandler.updateAvatar)

// 向外共享路由对象
module.exports = router