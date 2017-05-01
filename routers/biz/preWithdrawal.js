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
const consts = require("../constants")
const accountsState = require('../test_accounts')

const toPreWithdrawalsWithIdPath = pathToRegexp.compile(consts.act_pre_withdrawal_with_id_path())

const pwdMeta = params => ({
    confirm_path: toPreWithdrawalsWithIdPath(params)
})

module.exports =(req, res) => {
    const actId = req.params[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {
        if (amtKey in req.body && Number.isInteger(req.body[amtKey])) {
            const act = accountsState[actId]
            const amt = req.body[amtKey]
            if (act.balance > amt) {
                const id = shortid.generate()
                act.balance = act.balance - amt
                if (!act.pwds) act.pwds = {}
                act.pwds[id] = amt

                const pwd = pwdMeta({[consts.ACT_ID]: actId, [consts.PRE_WITHDRAWAL_ID]: id})
                res.set("Location", pwd.url)
                res.status(HttpStatus.CREATED).send(pwd)
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE).end()
            }
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).end()
        }
    }
}