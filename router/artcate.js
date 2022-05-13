const expressJoi = require('@escook/express-joi')
const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const { delete_cate_schema, add_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')
// 文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema),artcate_handler.addArticleCates)


// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema),artcate_handler.deleteCateById)

// 根据id获取文章分类路由
router.get('/cates/:id', expressJoi(get_cate_schema),artcate_handler.getArticleById)

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema),artcate_handler.updateCateById)

module.exports = router