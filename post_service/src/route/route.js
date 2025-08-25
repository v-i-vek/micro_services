const express = require('express')
const router = express.Router()
const{addBlog} = require('../controller/blog.controller')
const{authenticateReq} = require('../middleware/auth.middleware')


router.use(authenticateReq)
router.post('/add-blog',addBlog)

module.exports = router