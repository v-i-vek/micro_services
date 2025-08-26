const express = require('express')
const router = express.Router()
const{addBlog,allBlogs,singleBlog} = require('../controller/blog.controller')
const{authenticateReq} = require('../middleware/auth.middleware')


router.use(authenticateReq)
router.post('/add-blog',addBlog)
router.get('/all-blogs',allBlogs)
router.get('/:id',singleBlog)

module.exports = router