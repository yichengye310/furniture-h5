import {getcoupon, getAcceptedableCouponList} from '../../../api/coupon';

export default {
    namespaced: true,
    state: {
        coupons: []
    },
    mutations: {
        ["SET_COUPONS"](state, payload) {
            state.coupons = payload.coupons
        }
    },
    actions: {

        getcoupondata(conText, payload) {
            // console.log(payload);
            getcoupon(payload).then(res => {
                // console.log(res);
                if (res.status === 0) {
                    conText.commit("SET_COUPONS", {coupons: res.data});
                } else {
                    conText.commit("SET_COUPONS", {coupons: []});
                }
                if (payload.success) {
                    payload.success();
                }
            })

        },

        getAcceptedableCouponList(conText, payload) {
            // console.log(payload);
            getAcceptedableCouponList(payload).then(res => {
                // console.log(res);
                if (res.status === 0) {
                    conText.commit("SET_COUPONS", {coupons: res.data});
                } else {
                    conText.commit("SET_COUPONS", {coupons: []});
                }
                if (payload.success) {
                    payload.success();
                }
            })

        },

    }
}
