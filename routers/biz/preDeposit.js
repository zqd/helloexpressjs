/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../constants")
const pathToRegexp = require('path-to-regexp')
const HttpStatus = require('http-status-codes')
const shortid = require('shortid')
const accountsState = require('../test_accounts')

const toPreDepositWithIdPath = pathToRegexp.compile(consts.act_pre_deposit_with_id_path())

const depositMeta = params => ({
    confirm_path: toPreDepositWithIdPath(params)
})

module.exports = (req, res) => {
    const actId = req.params[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {
        if (amtKey in req.body && Number.isInteger(req.body[amtKey])) {
            const act = accountsState[actId]
            const amt = req.body[amtKey]
            const id = shortid.generate()

            if (!act.deposits) act.deposits = {}
            act.deposits[id] = amt

            const deposit = depositMeta({[consts.ACT_ID]: actId, [consts.PRE_DEPOSIT_ID]: id})
            res.set("Location", deposit.url)
            res.status(HttpStatus.CREATED).send(deposit)
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).end()
        }
    }
}