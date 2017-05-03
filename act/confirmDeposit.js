/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const accountsState = require('../test_accounts')

module.exports = (obj) => {
    const actId = obj[consts.ACT_ID]
    const depositId = obj[consts.PRE_DEPOSIT_ID]
    const typeKey = "type"

    const act = accountsState[actId]
    if (depositId && depositId in act.deposits) {
        const type = obj[typeKey]
        if (type) {
            act.balance = act.balance + act.deposits[depositId]
        }
        delete act.deposits[depositId]
    }
}