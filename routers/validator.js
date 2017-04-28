/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const HttpStatus = require('http-status-codes')

module.exports = schema =>(req,res,next)=>{
    req.check(schema)
    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            next()
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(result.array())
        }
    })
}