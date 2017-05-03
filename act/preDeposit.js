/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const shortid = require('shortid')
const accountsState = require('../routers/test_accounts')

module.exports = (obj) => {
    const actId = obj[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {

        const act = accountsState[actId]
        const amt = obj[amtKey]
        const id = shortid.generate()

        if (!act.deposits) act.deposits = {}
        act.deposits[id] = amt

        // res.status(HttpStatus.CREATED)
        return {isSuccess: true, id: id}
    }
}