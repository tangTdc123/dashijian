const joi = require('joi')

const username=joi.string().alphanum().min(3).max(10).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const id = joi.string().min(6).max(10).required()

const avatar = joi.string().dataUri().required()
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=


const reguser={
    body:  {
        username,
        password,
    },   
    
}
const login={
    body:  {
        username,
        password,
    },   
    
}
const updatepassword={
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
      },
}
const update_userinfo_schema={
    body: {
        nickname,
        email,
      },
}
const updateavatar={
    body:{
        avatar
    }
}


module.exports={login,reguser,update_userinfo_schema,updatepassword,updateavatar}