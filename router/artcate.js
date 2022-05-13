const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
// 文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates', artcate_handler.addArticleCates)

module.exports = router