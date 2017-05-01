/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../constants")
const pathToRegexp = require('path-to-regexp')

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

module.exports = (req, res) => {
    res.send(actMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}