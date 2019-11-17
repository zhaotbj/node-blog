const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require("./database/init.js")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")


// 处理post的参数
app.use(bodyParser());
// 配置跨域
app.use(cors())
    // 引入user模块
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let article = require('./appApi/article.js')
    // 装载所有子路由
let router = new Router()
router.use("/user", user.routes())
router.use("/home", home.routes())
router.use("/article", article.routes())
    // 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())



;
(async() => {
    await connect()
    initSchemas()
        // // 手动写入数据
        // const User = mongoose.model("User")
        // let oneUser=new User({userName:"zhaottian1",password:"123456"})
        // oneUser.save().then(()=>{
        //   console.log('插入成功')
        // })
        // let users=await User.findOne({}).exec()
        // console.log(users)
})()


// app.use(async(ctx)=>{
//   ctx.body="hello world"
// })

app.listen(3000, () => {
    console.log('starting in 3000!')
})