/**
 * Author : zhangqiandong
 * Created Date : 2017/5/3
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const Route = require('express').Router
const pluralize = require('pluralize')
const HttpStatus = require('http-status-codes')
const pathUtil = require('./pathUtil')
const validator = require('./act/validator/validator')

// 首字母大写
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function makeRouter(tree) {

    const route = Route()

    const buildPath = (path, name) => `${path}/${name}`

    function p(path, node) {

        if (node) {
            const cPath = `${path}/:${node.value.name}ID`

            const meta = { url: cPath }
            node.forest.forEach(t => {
                const bPath = meta['create' + capitalizeFirstLetter(t.value.name)] = buildPath(cPath, pluralize(t.value.name))
                p(bPath, t)
            })

            resRoute(route)(cPath,meta)(node)
        }

        barrelRoute(route)(path,{url:path})(node)
    }

    p(buildPath('', pluralize(tree.value.name)), tree)

    return route
}

const barrelRoute = route => (path,meta)=> node=> {
    route.get(path, (req, res) => {
        res.send(meta)
    }).post(path, validator(node.value.createHandleValidator),(req, res) => {
        const rs = node.value.createHandle(Object.assign({}, req.params, req.body))

        const temp = pathUtil(path)(req.params)

        meta.resPath = `${temp}/${rs.id}`

        if (rs.isSuccess)
            res.status(HttpStatus.CREATED).send(meta)
        else
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).end()
    })
}

const resRoute = route => (path,meta)=> node=>{
    route.get(path, (req, res) => {
        if (node.value.existRes(req.params)) {
            res.send(meta)
        }
        else
            res.status(HttpStatus.NOT_FOUND).end()
    }).put(path,validator(node.value.putHandleValidator) , (req, res) => {
        if (node.value.existRes(req.params)) {
            // TODO: 处理结果，或try或promise
            node.value.putHandle(Object.assign({}, req.params, req.body))
            res.status(HttpStatus.OK).end()
        } else
            res.status(HttpStatus.NOT_FOUND).end()
    })
}

module.exports = makeRouter