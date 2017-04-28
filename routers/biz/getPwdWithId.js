/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const pathToRegexp = require('path-to-regexp')

const toPreWithdrawalsWithIdPath = pathToRegexp.compile(consts.act_pre_withdrawal_with_id_path())

const pwdMeta = params => ({
    confirm_path: toPreWithdrawalsWithIdPath(params)
})

module.exports = (req, res) => {
    res.send(
        pwdMeta({
            [consts.ACT_ID]: req.params[consts.ACT_ID],
            [consts.PRE_WITHDRAWAL_ID]: req.params[consts.PRE_WITHDRAWAL_ID]
        })
    )
}