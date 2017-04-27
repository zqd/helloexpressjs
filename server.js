/**
 * Author : zhangqiandong
 * Created Date : 2017/4/27
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const bodyParsers = require('body-parser')
const route = require('./routers')
const app = express()

app.use(bodyParsers.json())

app.use(route)

app.listen(3000)