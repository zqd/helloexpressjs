const router = require('express').Router()
const accountsState = require('./test_accounts')
const consts = require("./constants")
const validators = require('./validator')
const createAct = require('./biz/createAct')
const preWithdrawal = require('./biz/preWithdrawal')
const getAct = require('./biz/getAct')
const getPwdWithId = require('./biz/getPwdWithId')
const preDeposit = require('./biz/preDeposit')
const confirmDeposit = require('./biz/confirmDeposit')
const confirmPwd = require('./biz/confirmPwd')
const getDeposit = require('./biz/getDeposit')
const getPwd = require('./biz/getPwd')
const getActs = require('./biz/getActs')
const balanceSchema = require('./validatorSchema')

router.get(consts.acts_path(), getActs)
    .post(consts.acts_path(), validators(balanceSchema), createAct(accountsState))
    .get(consts.act_path(), getAct)
    .post(consts.act_pre_withdrawal_path(), preWithdrawal(accountsState))
    .get(consts.act_pre_withdrawal_with_id_path(), getPwdWithId)
    .post(consts.act_pre_deposit_path(), preDeposit(accountsState))
    .get(consts.act_pre_deposit_with_id_path(), getDeposit)
    .get(consts.act_pre_withdrawal_path(), getPwd)
    .get(consts.act_pre_deposit_path(), getDeposit)
    .put(consts.act_pre_deposit_with_id_path(), confirmDeposit(accountsState))
    .put(consts.act_pre_withdrawal_with_id_path(), confirmPwd(accountsState))

// test
router.get(consts.act_query_path(), function (req, res) {
    if (req.params[consts.ACT_ID] in accountsState) {
        res.send(accountsState[req.params[consts.ACT_ID]])
    }
})
module.exports = router