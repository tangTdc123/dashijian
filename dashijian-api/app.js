const express =require('express')
const app = express()
app.use('/uploads', express.static('./uploads'))
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})
const db = require('./db/userdb')

const cors =require('cors')



const joi = require('joi')
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))



const userRouter = require('./router/user')
const userinfoRouter=require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const res = require('express/lib/response')
// 导入并使用文章路由模块
const articleRouter = require('./router/article')


app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api',userRouter)
app.use('/my',userinfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', articleRouter)

app.post('/post',(req,res)=>{
    
    res.cc('post成功',0)
})
app.use((err,req,res,next)=>{
    
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    if(err.name==='UnauthorizedError'){
        return res.cc(err)
    }
    res.cc(err)
})

app.listen(3007,()=>{
    console.log('服务器启动成功')
})