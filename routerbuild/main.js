function getMeta(params, template) {
    let v = template
    for (const k in params) {
        const reg = new RegExp(`\/:${k}(?=$|\/)`, 'g')
        v = v.replace(reg, '/' + params[k])
    }

    return v
}

const url = 'http://:id/:id1/:id'

console.log(getMeta({id: '10a', id1: '11b'}, url))

