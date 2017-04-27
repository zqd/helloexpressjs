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
const route1 = express.Router()


route1.get("/:name", function (req, res) {
    console.log(req.params)
    res.send("this is route1")
})

route.get("/:id", route1)

app.use("/", route)

app.listen(3000)