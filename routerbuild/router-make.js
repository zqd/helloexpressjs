const pluralize = require('pluralize')
const HttpStatus = require('http-status-codes')
const validator = require('./validator')
// 首字母大写
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getIdName(name) {
    return name + 'Id'
}

const buildPath = (path, name) => `${path}/${name}`

function make(tree, builder) {
    function p(path, node, parentNode) {
        const resPath = buildPath(path, ':' + getIdName(node.value.name))
        const childBucketCompensate = builder(path, resPath, node.value, parentNode.value) || function () {
            }
        node.forest.forEach(t => {
            const childBucketPath = buildPath(resPath, pluralize(t.value.name))
            childBucketCompensate(childBucketPath, t.value)
            p(childBucketPath, t, node)
        })
    }

    p(buildPath('', pluralize(tree.value.name)), tree, {value: {}})
}

/********************************上面通用，下面不通用***********************************/

function transformP(p) {
    return p || async function() {}
}

function resultProc(handle) {
    let tmp = (Array.isArray(handle) ? handle : [handle]).map(p => transformP(p))

    return (req, res, next) => tmp.reduce((s, e) => s.then(() => e({
        params: req.params,
        body: req.body
    })), Promise.resolve())
        .then(retVal => req.retVal = retVal)
        .then(() => next())
        .catch(e => res.status(e.status || HttpStatus.INTERNAL_SERVER_ERROR).end())
}

function getMeta(params, template) {
    let v = template
    for (const k in params) {
        const reg = new RegExp(`\/:${k}(?=$|\/)`, 'g')
        for (const i in v) {
            v[i] = v[i].replace(reg, '/' + params[k])
        }
    }

    return v
}

function configRouter(bucketPath, resPath, bucketMeta, resMeta, props, parentProps, router) {
    router.get(bucketPath, resultProc(parentProps.existRes), (req, res) => res.send(getMeta(req.params, bucketMeta)))
        .post(bucketPath, validator(props.createHandleValidator), resultProc(props.createHandle),
            (req, res) => res.status(HttpStatus.CREATED).send(getMeta(Object.assign({[getIdName(props.name)]: req.retVal}, req.params), resMeta)))
    router.get(resPath, resultProc(props.existRes), (req, res) => res.send(getMeta(req.params, resMeta)))
        .put(resPath, validator(props.putHandleValidator), resultProc([props.existRes, props.putHandle]))
}

function makeRouterBuilder(router) {
    return function (bucketPath, resPath, props, parentProps) {
        const bucketMeta = {url: bucketPath}
        const resMeta = {url: resPath}
        configRouter(bucketPath, resPath, bucketMeta, resMeta, props, parentProps, router)
        return function (childBucketPath, props) {
            return resMeta['create' + capitalizeFirstLetter(props.name)] = childBucketPath
        }
    }
}

module.exports = (tree, router) => make(tree, makeRouterBuilder(router))
