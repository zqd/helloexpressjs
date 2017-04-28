/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const shortid = require('shortid')
const HttpStatus = require('http-status-codes')
const consts = require("../routers/constants")
const pathUtil = require('../../pathUtil')

const actMeta = params => ({

    url: pathUtil(consts.act_path())(params),
    query_path: pathUtil(consts.act_query_path())(params),
    pre_withdrawals_path: pathUtil(consts.act_pre_withdrawal_path())(params),
    pre_deposit_path: pathUtil(consts.act_pre_deposit_path())(params)
})

module.exports = accountsState => (req,res)=>{
    const id = shortid.generate()

    accountsState[id] = req.body

    const act = actMeta({[consts.ACT_ID]: id})
    res.set("Location", act.url)
    res.status(HttpStatus.CREATED).send(act)
}