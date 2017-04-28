/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const shortid = require('shortid')
const HttpStatus = require('http-status-codes')
const pathToRegexp = require('path-to-regexp')
const consts = require("../routers/constants")

const toActPath = pathToRegexp.compile(consts.act_path())
const toActQueryPath = pathToRegexp.compile(consts.act_query_path())
const toPreWithdrawalsPath = pathToRegexp.compile(consts.act_pre_withdrawal_path())
const toPreDepositPath = pathToRegexp.compile(consts.act_pre_deposit_path())

const actMeta = params => ({
    url: toActPath(params),
    query_path: toActQueryPath(params),
    pre_withdrawals_path: toPreWithdrawalsPath(params),
    pre_deposit_path: toPreDepositPath(params)
})

module.exports = accountsState => (req,res)=>{
    const id = shortid.generate()

    accountsState[id] = req.body

    const act = actMeta({[consts.ACT_ID]: id})
    res.set("Location", act.url)
    res.status(HttpStatus.CREATED).send(act)
}