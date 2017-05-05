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
            throw new Error({ status: HttpStatus.NOT_FOUNT })
        }
    },
    createHandle: async params => {
        const id = shortid.generate()
        state[id] = { balance: params.balance }
        return id
    },
    putHandle: undefined
}

const pwd = {
    name: 'pwd',
    existRes: async params => {
        if (!(params['actId'] in state) || !(params['pwdId'] in state[params['actId']])) {
            throw new Error({ status: HttpStatus.NOT_FOUNT })
        }
    },
    createHandle: async params => {
        const id = shortid.generate()
        const actId = params['actId']
        if (!state[actId].pwds) {
            state[actId] = {}
        }
        if(state[actId] < params['amt'])
            throw new Error({status: HttpStatus.NOT_ACCEPTABLE})
        state[actId].balance -= params['amt']
        state[actId][id] = params['amt']
        return id
    },
    putHandle: async params => {

    }

}

const dpst = {
    name: 'dpst',
    existRes: async() => true,
    createHandle: async() => console.log(this.name),
    putHandle: async() => console.log(this.name)
}

tree(act, () => {
    tree(pwd)
    tree(dpst)
})

// printPath(tree.peek())
const express = require('express')
const router = express.Router()
make(tree.peek(), router)

module.exports = router
