/**
 * Author : zhangqiandong
 * Created Date : 2017/4/27
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const bodyParsers = require('body-parser')
// const route = require('./routers')
const app = express()
const compression = require('compression')
const expressValidator = require('express-validator')
const makeRouter = require('./routerbuild/actRouter')
// const actConfig = require('./act/config')
// const tree = require('./tree')

app.use(compression({filter: shouldCompress}))

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }

    return compression.filter(req, res)
}

app.use(bodyParsers.json())
app.use(expressValidator())

const router = express.Router()
app.use(makeRouter(router))

app.listen(3000)