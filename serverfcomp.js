/**
 * Author : zhangqiandong
 * Created Date : 2017/4/27
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const app = express()
const compression = require('compression')

app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    return compression.filter(req, res)
}

app.get('/', function (req, res) {
    var s = "hello world"
    for(var i=0 ;i<200;i++){
        s = s + "hello world"
    }
    res.send(s)
})

app.listen(3000)