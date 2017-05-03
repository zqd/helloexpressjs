/**
 * Author : zhangqiandong
 * Created Date : 2017/5/3
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const schema = {
    'type': {
        in: 'body',
        notEmpty: true,
        isBoolean: {
            errorMessage: "not is boolean"
        }
    }
}

module.exports = schema