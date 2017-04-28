/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const consts = require("../routers/constants")

const actsMeta = {
    create_act: consts.acts_path()
}

module.exports = (req, res) => {
    res.send(actsMeta)
}