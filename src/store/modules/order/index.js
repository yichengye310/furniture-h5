import {
    addOrderData,
    addReviewData,
    cancelOrderData,
    getMyOrderData,
    getOrderInfoData,
    getOrderNumData,
    getshouhou,
    sureOrderData
} from "../../../api/order";

export default {
    namespaced: true,
    state: {
        orderNum: "",
        orders: [],//全部订单
        ordersPay: [],//待付款
        ordersOut: [],//待发货
        orderFrom: [],//待收货
        orderAppraised: [],//待评价
        shouhou: [],//售后

        orderInfo: {},
        reviewOrders: [],

        reviewServices: []
    },
    mutations: {
        ["SET_ORDERNUM"](state, payload) {
            state.orderNum = payload.orderNum;
        },
        //我的订单
        ["SET_ORDERS"](state, payload) {
            state.orders = payload.orders;
            state.ordersPay = [];
            state.ordersOut = [];
            state.orderFrom = [];
            state.orderAppraised = [];
            state.shouhou = [];
            for (let i = 0; i < payload.orders.length; i++) {
                if (payload.orders[i].orderState === 0) {
                    //待付款
                    state.ordersPay.push(payload.orders[i]);

                }
                if (payload.orders[i].orderState === 1) {
                    //待发货
                    state.ordersOut.push(payload.orders[i]);
                }
                if (payload.orders[i].orderState === 2) {
                    //待收货
                    state.orderFrom.push(payload.orders[i]);
                }
                if (payload.orders[i].orderState === 3) {
                    //待评价
                    state.orderAppraised.push(payload.orders[i]);
                }
                if (payload.orders[i].orderState === 4) {
                    //已经售后
                    state.shouhou.push(payload.orders[i]);
                }
            }

        },
        //我的订单分页
        ["SET_ORDERS_PAGE"](state, payload) {
            state.orders.push(...payload.orders);
        },
        //取消订单
        ["DEL_ORDERS"](state, payload) {
            state.orders.splice(payload.index, 1);
        },
        //改变订单状态
        ["SET_STATUS"](state, payload) {
            state.orders[payload.index].status = payload.status;
        },
        //设置订单详情
        ["SET_ORDER_INFO"](state, payload) {
            state.orderInfo = payload.orderInfo;
        },
        //设置待评价订单
        ["SET_REVIEW_ORDERS"](state, payload) {
            state.reviewOrders = payload.reviewOrders;
        },
        //设置待评价订单
        ["SET_REVIEW_ORDERS_PAGE"](state, payload) {
            state.reviewOrders.push(...payload.reviewOrders);
        },
        //设置评价服务选项
        ["SET_REVIEW_SERVICES"](state, payload) {
            // console.log(payload)
            state.reviewServices = payload.reviewServices;
        },


        //设置评价分数
        ["SET_REVIEW_SCORE"](state, payload) {
            if (state.reviewServices.length > 0) {
                for (let i = payload.index2 + 1; i < state.reviewServices[payload.index].scores.length; i++) {
                    state.reviewServices[payload.index].scores[i].active = false;
                }
                for (let i = 0; i <= payload.index2; i++) {
                    state.reviewServices[payload.index].scores[i].active = true;
                }
                state.reviewServices[payload.index].score = payload.score;
            }
        }
    },
    actions: {
        //提交订单
        addOrder(conText, payload) {
            addOrderData({userID: conText.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //获取订单编号
        getOrderNum(conText, payload) {
            getOrderNumData(conText.rootState.user.uid).then(res => {
                if (res.code === 200) {
                    conText.commit("SET_ORDERNUM", {orderNum: res.data.ordernum});
                }
            })
        },
        //获取我的订单
        getMyOrder(conText, payload) {
            getMyOrderData({uid: conText.rootState.user.uid}).then(res => {
                if (res.status === 0) {
                    conText.commit("SET_ORDERS", {orders: res.data.orderList});

                } else {
                    conText.commit("SET_ORDERS", {orders: []});
                }
                if (payload.success) {
                    payload.success();
                }
            })
        },

        //取消订单
        cancelOrder(conText, payload) {
            cancelOrderData(payload.orderID).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //确认收货
        sureOrderthree(conText, payload) {
            sureOrderData(payload.orderID).then(res => {
                if (res.status === 0) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })
        },
        //订单详情
        getOrderInfo(conText, payload) {
            getOrderInfoData(...payload).then(res => {
                //console.log(res)
                if (res.status === 0) {
                    conText.commit("SET_ORDER_INFO", {orderInfo: res.data});
                    if (payload.success) {
                        payload.success(res);
                    }
                }

            })
        },

        //生情售后

        getshouhouorderID(conText, payload) {
            getshouhou(payload.orderID).then(res => {
                if (res.status === 0) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })

        },


        //提交评价
        addReview(conText, payload) {

            addReviewData({...payload}).then(res => {
                //console.log(res)
                // if(payload.success){
                //     payload.success(res);
                // }
            })
        },


    }
}
