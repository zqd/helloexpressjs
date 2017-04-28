/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const HttpStatus = require('http-status-codes')

module.exports = accountsState => (req, res) => {
    const actId = req.params[consts.ACT_ID]
    const depositId = req.params[consts.PRE_DEPOSIT_ID]
    const typeKey = "type"

    if (actId && actId in accountsState) {
        const act = accountsState[actId]
        if (depositId && depositId in act.deposits) {
            if (typeKey in req.body) {
                const type = req.body[typeKey]
                if (type) {
                    act.balance = act.balance + act.deposits[depositId]
                }
                delete act.deposits[depositId]
                res.status(HttpStatus.OK).end()
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE).end()
            }
        } else {
            res.status(HttpStatus.OK).end()
        }
    } else {
        res.status(HttpStatus.PRECONDITION_FAILED).end()
    }
}