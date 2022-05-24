const express=require('express')
const  getUserInfo_handler  = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema,updatepassword,updateavatar } = require('../schema/user')
const router=express.Router()

router.get('/userinfo',getUserInfo_handler.getUserInfo)  
router.post('/userinfo',expressJoi(update_userinfo_schema),getUserInfo_handler.upadateUserinfo)
router.post('/updatepwd',expressJoi(updatepassword),getUserInfo_handler.upadatePassword)
router.post('/update/avatar', expressJoi(updateavatar),getUserInfo_handler.updateAvatar)
 

module.exports = router