/**
 * Author : zhangqiandong
 * Created Date : 2017/4/27
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const bodyParsers = require('body-parser')
const app = express()
const route = express.Router()

route.post("/acts",function (req, res) {
    console.log(req.body)
    res.send({actID:"1",url:"/acts/1"})
})

app.use(bodyParsers.json())

app.use(route)

app.listen(3000)