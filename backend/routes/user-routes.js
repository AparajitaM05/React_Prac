const express = require('express')
const userControllers = require('../controller/user-controller')

const router = express.Router()

//User Routes

router.get('/',userControllers.getAllUser)
router.post('/signup',userControllers.userSignUp)
router.post('/login',userControllers.userLogin)
router.get('/:uid',userControllers.getUserById)

module.exports = router