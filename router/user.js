// 导入express
const express = require('express');
const useHandler = require('../router_handler/user');
// 创建路由对象
const router = express.Router();

// 注册新用户
router.post('/register', useHandler.register)

// 登录
router.post('/login', useHandler.login)

// 将路由对象共享出去
module.exports = router;