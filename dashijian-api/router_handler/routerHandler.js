const db = require('../db/userdb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')



const regUser =(req,res)=>{
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不能为空！')
    // }
    const sql = `select * from ev_users where username=?`
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc('用户名已经被占用，请更换其他用户名')
        }
        userinfo.password=bcrypt.hashSync(userinfo.password, 10)
        const sql1 = 'insert into ev_users set ?'
        db.query(sql1,{username:userinfo.username,password:userinfo.password,nickname:userinfo.nickname,email:userinfo.email,id:userinfo.id},(err,results)=>{
            if(err) 
                return res.cc(err)
            if(results.affectedRows !==1){
                return res.cc('注册用户失败，请稍后再试！')
            }
            res.cc('注册成功',0)
            shuaxin()
        })
    })
    
}
const shuaxin=(req,res)=>{
    const sql1='alter table ev_users drop id'
    db.query(sql1,(err,results)=>{
        if (err){
            return res.cc(err)
       } 
    })
    
    const sql2='alter table ev_users add id int not null primary key auto_increment first;'
    db.query(sql2,(err,results)=>{
        if (err){
            return res.cc(err)
       }
    })
}

const login =(req,res)=>{
    const userinfo = req.body
    const sql2 = `select *from ev_users where username=?`
    db.query(sql2,userinfo.username,(err,results)=>{
        
        if(err){
            return   res.cc(err)
        }
        if(results.length ===0){
            return res.cc('登录失败')  
        }
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        
        if(!compareResult){
            return res.cc('登录失败')
        }
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr =jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer '+tokenStr
        })

    })
}



module.exports={regUser,login}