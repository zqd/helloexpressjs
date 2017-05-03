/**
 * Author : zhangqiandong
 * Created Date : 2017/5/2
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const shortid = require('shortid')
const accountsState = require('../routers/test_accounts')


module.exports = (obj)=>{
    const id = shortid.generate()

    accountsState[id] = obj
    return {isSuccess:true,id:id}
}