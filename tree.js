/**
 * Author : zhangqiandong
 * Created Date : 2017/5/1
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
function seed() {
    let peak = {forest: []}

    function tree(value) {
        const closure = arguments.length <= 1 || arguments[1] === undefined ? function () {
        } : arguments[1]

        const newTree = {value: value, forest: []}
        peak.forest.push(newTree)
        const prev = peak
        peak = newTree
        closure()
        peak = prev
    }

    tree.peek = () => peak.forest[0]
    return tree
}

module.exports = seed

