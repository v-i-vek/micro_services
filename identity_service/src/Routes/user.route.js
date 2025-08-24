const express = require('express')
const {addUser,loginUser} = require('../controller/user.controller')

const router = express.Router();


router.post('/register',addUser)
router.post('/login',loginUser)

module.exports = router