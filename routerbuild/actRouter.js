const make = require('./router-make')
const seed = require('./tree')
const HttpStatus = require('http-status-codes')
const shortid = require('shortid')

const state = {}
const tree = seed()

const act = {
    name: 'act',
    existRes: async ({params, body}) => {
        if (!(params['actId'] in state)) {
            throw {status: HttpStatus.NOT_FOUND}
        }
    },
    createHandle: async ({params, body}) => {
        const id = shortid.generate()
        state[id] = {balance: params.balance}
        return id
    },
    createHandleValidator: {
        'balance': {
            in: 'body',
            notEmpty: true,
            isInt: {
                errorMessage: "not is int"
            }
        }
    }
}

const pwd = {
    name: 'pwd',
    existRes: async ({params, body}) => {
        if (!(params['actId'] in state) || !(params['pwdId'] in state[params['actId']].pwds)) {
            throw {status: HttpStatus.NOT_FOUND}
        }
    },
    createHandle: async ({params, body}) => {
        const id = shortid.generate()
        const actId = params['actId']
        if (!state[actId].pwds) {
            state[actId].pwds = {}
        }
        if (state[actId].balance < params['amt'])
            throw new Error({status: HttpStatus.NOT_ACCEPTABLE})
        state[actId].balance -= params['amt']
        state[actId].pwds[id] = params['amt']
        return id
    },
    createHandleValidator: {
        'amt': {
            in: 'body',
            notEmpty: true,
            isInt: {
                errorMessage: "not is int"
            }
        }
    },
    putHandle: async ({params, body}) => {
        const actId = params['actId']
        const pwdId = params['pwdId']

        const act = state[actId]
        console.log(act)
        const type = body['type']
        if (!type) {
            act.balance = act.balance + act.pwds[pwdId]
        }
        delete act.pwds[pwdId]
    },
    putHandleValidator: {
        'type': {
            in: 'body',
            notEmpty: true,
            isBoolean: {
                errorMessage: "not is boolean"
            }
        }
    },
}

const dpst = {
    name: 'dpst',
    existRes: async () => true,
    createHandle: async () => console.log(this.name),
    putHandle: async () => console.log(this.name)
}

tree(act, () => {
    tree(pwd)
    tree(dpst)
})

module.exports = function (router) {
    make(tree.peek(), router)
    return router
}
