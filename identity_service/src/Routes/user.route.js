const express = require('express')
const {addUser,loginUser,refreshToken} = require('../controller/user.controller')

const router = express.Router();


router.post('/register',addUser)
router.post('/login',loginUser)
router.post('/refresh-token',refreshToken)

module.exports = router