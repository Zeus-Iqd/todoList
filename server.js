const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
var cors = require('koa2-cors');
app.use(cors())
app.use(bodyParser())
// // 中间层，用来连接数据库
const Monk = require('monk')
const mongodb = Monk('localhost/list') // test就是你的数据库
// // 读取user集合
const list = mongodb.get('test')
// 静态资源目录对于相对入口文件index.js的路径
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './build'

app.use(static(
  path.join(__dirname, staticPath)
))


let getlist = new Router()
getlist.get('/todoList', async (ctx) => {
  console.log(22222)
  const data1 = await list.find()

  const data = JSON.stringify(data1)
  console.log(data)
  ctx.body = data
})
getlist.post('/addList', async (ctx) => {
  console.log(22222)
  let postData = ctx.request.body
  console.log(postData, 'postData')
  const data1 = await list.insert(postData)
  ctx.body = data1
})
getlist.post('/delete', async (ctx) => {
  console.log(22222)
  let postData = ctx.request.body
  const res = await list.remove({ _id: postData.id })
  ctx.body = res
})
getlist.post('/edit', async (ctx) => {
  let postData = ctx.request.body
  console.log(postData)
  const res = await list.update({ '_id': postData.id }, { $set: { 'list': postData.list } })
  console.log(res)
  ctx.body = res
})



let router = new Router()
router.use('/get', getlist.routes(), getlist.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(3001, (req, res) => {
  console.log(222)
})


