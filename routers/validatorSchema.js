/**
 * Author : zhangqiandong
 * Created Date : 2017/4/28
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const balanceSchema = {
    'balance': {
        in: 'body',
        notEmpty: true,
        isInt: {
            errorMessage: "not is int"
        }
    }
}

module.exports = balanceSchema

