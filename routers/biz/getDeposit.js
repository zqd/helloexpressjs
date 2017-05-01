/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../constants")
const pathToRegexp = require('path-to-regexp')

const toPreDepositPath = pathToRegexp.compile(consts.act_pre_deposit_path())

const depositsMeta = params => ({
    create_deposit: toPreDepositPath(params)
})

module.exports =  (req, res) => {
    res.send(depositsMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}