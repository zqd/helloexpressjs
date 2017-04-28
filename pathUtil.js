/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
module.exports = path => params => {
    for(const p in params){
        if(params.hasOwnProperty(p)){
            path = path.replace(":"+p,params[p])
        }
     }
    return path
}