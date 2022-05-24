const express=require('express')
const router=express.Router()
const userHandler = require('../router_handler/routerHandler')
const expressJoi = require('@escook/express-joi')
const { login,reguser }=require('../schema/user')

router.post('/reguser/',expressJoi(reguser),userHandler.regUser)

router.post('/login/',expressJoi(login),userHandler.login)

module.exports = router
