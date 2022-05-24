const db = require('../db/userdb')
const bcrypt = require('bcryptjs')


const getUserInfo = (req, res) => {
    const sql=`select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sql,req.user.id,(err,results)=>{
        
        if (err){
             return res.cc(err)
        } 
        if (results.length !== 1) {
            return res.cc('获取用户信息失败！')
        }
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:results[0],
        })
    })
}

const upadateUserinfo=(req,res)=>{
    const sql1 = `update ev_users set ? where id=?`
    db.query(sql1, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        return res.cc('修改用户基本信息成功！', 0)
      })
}

const upadatePassword =(req,res)=>{
    const sql2 = `select * from ev_users where id=?`
    db.query(sql2,req.user.id,(err,results)=>{
        console.log(err)
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在！')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('原密码错误')
        const sql3 = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql3,[newPwd,req.user.id],(err,results)=>{
            // console.log(err)
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('密码更新成功',0)
        })
    })
}

const updateAvatar=(req,res)=>{
    const sql4 = 'update ev_users set user_pic=? where id=?'
    db.query(sql4, [req.body.avatar, req.user.id], (err, results) => {
        console.log(req.user.id)
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        return res.cc('更新头像成功！', 0)
      })
}

module.exports={getUserInfo,upadateUserinfo,upadatePassword,updateAvatar}