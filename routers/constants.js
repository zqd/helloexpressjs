/**
 * Created by cuitao on 2017/4/26.
 */

module.exports = {
    DOMAIN: "domains",
    ACTS: "acts",
    QUERIES: "queries",
    ACT_ID: "actId",
    PRE_WITHDRAWALS: "pwds",
    PRE_WITHDRAWAL_ID: "pwdId",
    PRE_DEPOSIT: "dpsts",
    PRE_DEPOSIT_ID: "dpspId",
    acts_path: function () {
        return `/${this.DOMAIN}/${this.ACTS}`
    },
    act_path: function () {
        return `/${this.DOMAIN}/${this.ACTS}/:${this.ACT_ID}`
    },
    act_query_path: function () {
        return `/${this.QUERIES}/${this.ACTS}/:${this.ACT_ID}`
    },
    act_pre_withdrawal_path: function () {
        return `${this.acts_path()}/:${this.ACT_ID}/${this.PRE_WITHDRAWALS}`
    },
    act_pre_withdrawal_with_id_path: function () {
        return `${this.act_pre_withdrawal_path()}/:${this.PRE_WITHDRAWAL_ID}`
    },
    act_pre_deposit_path: function () {
        return `${this.acts_path()}/:${this.ACT_ID}/${this.PRE_DEPOSIT}`
    },
    act_pre_deposit_with_id_path: function () {
        return `${this.act_pre_deposit_path()}/:${this.PRE_DEPOSIT_ID}`
    }
}