/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../constants")
const HttpStatus = require('http-status-codes')
const accountsState = require('../test_accounts')

module.exports = (req, res) => {
    const actId = req.params[consts.ACT_ID]
    const pwdId = req.params[consts.PRE_WITHDRAWAL_ID]
    const typeKey = "type"

    if (actId && actId in accountsState) {
        const act = accountsState[actId]
        if (pwdId && pwdId in act.pwds) {
            if (typeKey in req.body) {
                const type = req.body[typeKey]
                if (!type) {
                    act.balance = act.balance + act.pwds[pwdId]
                }
                delete act.pwds[pwdId]
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