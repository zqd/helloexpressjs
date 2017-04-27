const shortid = require('shortid')
const router = require('express').Router()
const accountsState = require('./test_accounts')
const consts = require("./constants")
const pathToRegexp = require('path-to-regexp')
const HttpStatus = require('http-status-codes')

const toActPath = pathToRegexp.compile(consts.act_path())
const toActQueryPath = pathToRegexp.compile(consts.act_query_path())
const toPreWithdrawalsPath = pathToRegexp.compile(consts.act_pre_withdrawal_path())
const toPreDepositPath = pathToRegexp.compile(consts.act_pre_deposit_path())
const toPreWithdrawalsWithIdPath = pathToRegexp.compile(consts.act_pre_withdrawal_with_id_path())
const toPreDepositWithIdPath = pathToRegexp.compile(consts.act_pre_deposit_with_id_path())

const actsMeta = {
    create_act: consts.acts_path()
}
const actMeta = params => ({
    url: toActPath(params),
    query_path: toActQueryPath(params),
    pre_withdrawals_path: toPreWithdrawalsPath(params),
    pre_deposit_path: toPreDepositPath(params)
})

const pwdsMeta = params => ({
    create_pwd: toPreWithdrawalsPath(params)
})

const pwdMeta = params => ({
    confirm_path: toPreWithdrawalsWithIdPath(params)
})

const depositsMeta = params => ({
    create_deposit: toPreDepositPath(params)
})

const depositMeta = params => ({
    confirm_path: toPreDepositWithIdPath(params)
})

router.get(consts.acts_path(), function (req, res) {
    res.send(actsMeta)
}).post(consts.acts_path(), (req, res) => {
    const id = shortid.generate()
    accountsState[id] = req.body

    res.set("Location", req.body.url)
    res.status(HttpStatus.CREATED).send(actMeta({[consts.ACT_ID]: id}))
}).get(consts.act_path(), function (req, res) {
    res.send(actMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}).post(consts.act_pre_withdrawal_path(), function (req, res) {
    // 参数验证，内容验证
    const actId = req.params[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {
        if (amtKey in creq.body && Number.isInteger(req.body[amtKey])) {
            const act = accountsState[actId]
            const amt = req.body[amtKey]
            if (act.balance > amt) {
                const id = shortid.generate()
                act.balance = act.balance - amt
                if (!act.pwds) act.pwds = {}
                act.pwds[id] = amt
                res.set("Location", req.body.url)
                res.status(HttpStatus.CREATED).send(pwdMeta({[consts.ACT_ID]: actId, [consts.PRE_WITHDRAWAL_ID]: id}))
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}).get(consts.act_pre_withdrawal_with_id_path(), function (req, res) {
    res.send(
        pwdMeta({
            [consts.ACT_ID]: req.params[consts.ACT_ID],
            [consts.PRE_WITHDRAWAL_ID]: req.params[consts.PRE_WITHDRAWAL_ID]
        })
    )
}).post(consts.act_pre_deposit_path(), function (req, res) {
    const actId = req.params[consts.ACT_ID]
    const amtKey = "amt"
    if (actId && actId in accountsState) {
        if (amtKey in req.body && Number.isInteger(req.body[amtKey])) {
            const act = accountsState[actId]
            const amt = req.body[amtKey]
            const id = shortid.generate()

            if (!act.deposits) act.deposits = {}
            act.deposits[id] = amt
            res.set("Location", req.body.url)
            res.status(HttpStatus.CREATED).send(depositMeta({[consts.ACT_ID]: actId, [consts.PRE_DEPOSIT_ID]: id}))
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}).get(consts.act_pre_deposit_with_id_path(), function (req, res) {
    res.send(
        depositMeta({
            [consts.ACT_ID]: req.params[consts.ACT_ID],
            [consts.PRE_DEPOSIT_ID]: req.params[consts.PRE_DEPOSIT_ID]
        })
    )
}).get(consts.act_pre_withdrawal_path(), function (req, res) {
    res.send(pwdsMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}).get(consts.act_pre_deposit_path(), function (req, res) {
    res.send(depositsMeta({[consts.ACT_ID]: req.params[consts.ACT_ID]}))
}).put(consts.act_pre_deposit_with_id_path(), function (req, res) {
    const actId = req.params[consts.ACT_ID]
    const depositId = req.params[consts.PRE_DEPOSIT_ID]
    const typeKey = "type"

    if (actId && actId in accountsState) {
        const act = accountsState[actId]
        if (depositId && depositId in act.deposits) {
            if (typeKey in req.body) {
                const type = req.body[typeKey]
                if (type) {
                    act.balance = act.balance + act.deposits[depositId]
                }
                delete act.deposits[depositId]
                res.status(HttpStatus.OK)
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            res.status(HttpStatus.OK)
        }
    } else {
        res.status(HttpStatus.PRECONDITION_FAILED)
    }
}).put(consts.act_pre_withdrawal_with_id_path(), function (req, res) {
    const actId = req.params[consts.ACT_ID]
    const pwdId = req.params[consts.PRE_WITHDRAWAL_ID]
    const typeKey = "type"

    if (actId && actId in accountsState) {
        const act = accountsState[actId]
        if (pwdId && pwdId in act.pwds) {
            if (typeKey in req.body) {
                const type = req.body[typeKey]
                if (!type) {
                    act.balance = act.balance + act.pwds[pwdId]
                }
                delete act.pwds[pwdId]
                res.status(HttpStatus.OK)
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            res.status(HttpStatus.OK)
        }
    } else {
        res.status(HttpStatus.PRECONDITION_FAILED)
    }
})


// test
router.get(consts.act_query_path(), function (req, res) {
    if (req.params[consts.ACT_ID] in accountsState) {
        res.send(accountsState[req.params[consts.ACT_ID]])
    }
})
module.exports = router