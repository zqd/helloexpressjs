/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const accountsState = require('../routers/test_accounts')

module.exports = (obj) => {
    const actId = obj[consts.ACT_ID]
    const pwdId = obj[consts.PRE_WITHDRAWAL_ID]
    const typeKey = "type"

    const act = accountsState[actId]
    if (pwdId && pwdId in act.pwds) {
        const type = obj[typeKey]
        if (!type) {
            act.balance = act.balance + act.pwds[pwdId]
        }
        delete act.pwds[pwdId]
    }
}