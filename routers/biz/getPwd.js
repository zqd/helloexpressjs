/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")
const pathToRegexp = require('path-to-regexp')

const toPreWithdrawalsPath = pathToRegexp.compile(consts.act_pre_withdrawal_path())

const pwdsMeta = params => ({
    create_pwd: toPreWithdrawalsPath(params)
})

module.exports = (req, res) => {
    res.send(pwdsMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}