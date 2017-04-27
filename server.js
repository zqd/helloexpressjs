/**
 * Author : zhangqiandong
 * Created Date : 2017/4/27
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const app = express()
const route = express.Router()

const nameRoute = route.get("/:name",function (req, res) {
    console.log(req.params)
    req.send("hello")
})

route.get("/:id",nameRoute)

app.use("/",route)

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

// const route1 = express.Router()
// route1.get("/:id",function (req, res) {
//     console.log(req.params)
//     res.send("this is route1")
// })
//
// app.use(route1)

app.listen(3000)