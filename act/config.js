/**
 * Author : zhangqiandong
 * Created Date : 2017/5/3
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const tree = require('../tree')()
const actCreateHandle = require('./createAct')
const pwdCreateHandle = require('./preWithdrawal')
const pwdPutHandle = require('./confirmPwd')
const dpstCreateHandle = require('./preDeposit')
const dpstPutHandle = require('./confirmDeposit')
const accountsState = require('../routers/test_accounts')
const balanceSchema = require('./validator/balanceSchema')
const pwdSchema = require('./validator/pwdSchema')
const dpstSchema = require('./validator/dpstSchema')
const confirmDpstSchema = require('./validator/confirmDpstSchema')
const confirmPwdSchema = require('./validator/confirmPwdSchema')
const consts = require('../constants')

const act = {
    name: 'act',
    existRes: function (params) {
        //TODO 消除字符串-未完成！！！
        const act = `${this.name + consts.ID}`
        const actId = params[act]
        return actId in accountsState
    },
    createHandle: actCreateHandle,
    createHandleValidator: balanceSchema,
    putHandle: () => {
    }
}

const pwd = {
    name: 'pwd',
    existRes: () => true,
    createHandle: pwdCreateHandle,
    createHandleValidator: pwdSchema,
    putHandle: pwdPutHandle,
    putHandleValidator: confirmPwdSchema
}

const dpst = {
    name: 'dpst',
    existRes: () => true,
    createHandle: dpstCreateHandle,
    createHandleValidator: dpstSchema,
    putHandle: dpstPutHandle,
    putHandleValidator: confirmDpstSchema
}

tree(act, () => {
    tree(pwd)
    tree(dpst)
})

module.exports = tree