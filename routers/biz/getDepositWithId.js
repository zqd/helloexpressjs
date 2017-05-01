/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../constants")
const pathToRegexp = require('path-to-regexp')

const toPreDepositWithIdPath = pathToRegexp.compile(consts.act_pre_deposit_with_id_path())

const depositMeta = params => ({
    confirm_path: toPreDepositWithIdPath(params)
})

module.exports = (req, res) => {
    res.send(
        depositMeta({
            [consts.ACT_ID]: req.params[consts.ACT_ID],
            [consts.PRE_DEPOSIT_ID]: req.params[consts.PRE_DEPOSIT_ID]
        })
    )
}