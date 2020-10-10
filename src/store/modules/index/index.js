import {
    getNavsData,
    getSwiperData,
    getShopData,
    getSwipersrecomData,
    getRecomGoodsData,
    getProductLimitedTimeData,
    getTimeShopData,
    versionID
} from "../../../api/index";

export default {
    namespaced: true,
    state: {
        navs: [],
        swipers: [],
        shops: [],
        ProductLimitedTime: [],
        swipersrecom: [],
        recomgoods: [],
        details: []//限时抢购商品
    },
    mutations: {

        ["SET_DETAILS"](state, payload) {
            state.details = payload.details;
        },
        ["SET_TIMESHOP"](state, payload) {
            state.ProductLimitedTime = payload.ProductLimitedTime;
        },
        ["SET_NAVS"](state, payload) {
            state.navs = payload.navs;
        },
        ["SET_SWIPERS"](state, payload) {
            state.swipers = payload.swipers;
        },
        ["SET_SHOPS"](state, payload) {
            state.shops = payload.shops;
        },
        ["SET_SWIPERSRECOM"](state, payload) {
            state.swipersrecom = payload.swipersrecom;
        },
        ["SET_RECOMGOODS"](state, payload) {
            state.recomgoods = payload.recomgoods
            // console.log(payload.recomgoods)
            // state.recomgoods.push(...payload.recomgoods)
        },
        //增加分页数据
        ["ADD_RECOMGOODS"](state, payload) {
            // console.log(payload.recomgoods.length)
            if (payload.recomgoods.length > 0) {
                for (let i = 0; i < payload.recomgoods.length; i++) {
                    state.recomgoods.push(payload.recomgoods[i])
                }

            }

        },
    },
    actions: {
        //检查版本
        getversionID(conText, payload) {

            versionID().then(res => {
                if (payload.success) {
                    payload.success(res)
                }

            })
        },


        //限时抢购商品
        getProductLimited(conText, payload) {
            getProductLimitedTimeData().then(res => {
                if (res.status === 1) {

                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].productLimitedTimeStandardsDTOS[0].tradePrice = res.data.list[i].productLimitedTimeStandardsDTOS[0].tradePrice * 0.01
                        res.data.list[i].productLimitedTimeStandardsDTOS[0].originalPrice = res.data.list[i].productLimitedTimeStandardsDTOS[0].originalPrice * 0.01

                    }
                    conText.commit("SET_TIMESHOP", {ProductLimitedTime: res.data.list});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        //限时抢购商品详情
        getProductLimitedDetails(conText, payload) {
            getTimeShopData(payload.productCode).then(res => {
                if (res.status === 1) {

                    for (let i = 0; i < res.data.productLimitedTimeStandardsDTOS.length; i++) {
                        res.data.productLimitedTimeStandardsDTOS[i].active = false
                        for (let j = 0; j < res.data.productLimitedTimeStandardsDTOS[i].productLimitedTimeStandardsColour.length; j++) {
                            res.data.productLimitedTimeStandardsDTOS[i].productLimitedTimeStandardsColour[j].active = false
                        }
                    }
                    conText.commit("SET_DETAILS", {details: res.data});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },


        getSwiper(conText, payload) {
            getSwiperData().then(res => {
                if (res.status === 1) {
                    conText.commit("SET_SWIPERS", {swipers: res.data.list});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getShop(conText, payload) {
            getShopData().then(res => {
                if (res.status === 1) {
                    conText.commit("SET_SHOPS", {shops: res.data.list});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getSwipersrecom(conText, payload) {
            getSwipersrecomData().then(res => {
                if (res.status === 1) {
                    conText.commit("SET_SWIPERSRECOM", {swipersrecom: res.data.list});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },

        getRecomGoods(conText, payload) {
            getRecomGoodsData(payload.page).then(res => {

                if (res.status === 1) {
                    conText.commit("SET_RECOMGOODS", {recomgoods: res.data.list});
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })
        },
        getRecomGoodsPage(conText, payload) {

            getRecomGoodsData(payload.page).then(res => {
                if (res.status === 1) {
                    conText.commit("ADD_RECOMGOODS", {recomgoods: res.data.list});
                    if (payload.success) {
                        payload.success();
                    }
                }


            })
        },
    }
}
