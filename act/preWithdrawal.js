/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const shortid = require('shortid')
const consts = require("../routers/constants")
const accountsState = require('../routers/test_accounts')

module.exports = (obj) => {
    const actId = obj[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {

        const act = accountsState[actId]
        const amt = obj[amtKey]
        console.log(act.balance)
        console.log(amt)
        if (act.balance >= amt) {
            const id = shortid.generate()
            act.balance = act.balance - amt
            if (!act.pwds) act.pwds = {}
            act.pwds[id] = amt
            return {isSuccess: true, id: id}
            // const pwd = pwdMeta({[consts.ACT_ID]: actId, [consts.PRE_WITHDRAWAL_ID]: id})
            // res.set("Location", pwd.url)
            // res.status(HttpStatus.CREATED).send(pwd)
        } else {
            return {isSuccess: false}
            // res.status(HttpStatus.NOT_ACCEPTABLE).end()
        }
    }
}