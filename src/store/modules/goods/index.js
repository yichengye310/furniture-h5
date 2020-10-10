import Vue from 'vue';
import {
    getClassifyData,
    getLimitDetailsData,
    getGoodsData, getDetailsData, getSpecData, addFavData, getVipProducts, getVipProducts99
} from '../../../api/goods';

export default {
    namespaced: true,
    state: {
        classifys: [],//分类
        goods: [],//分类右

        attrs: [],
        indexyanse: 1,
        details: {},
        guige: [],

        vipProducts: [],
        vipProducts99: []
    },
    mutations: {
        ["SET_CLASSIFYS"](state, payload) {
            //console.log("SET_CLASSIFYS: " + JSON.stringify(payload));
            state.classifys = payload.classifys
        },
        ["SELECT_ITEM"](state, payload) {
            console.log("payload" + JSON.stringify(payload));
            if (state.classifys.length > 0) {
                for (let i = 0; i < state.classifys.length; i++) {
                    if (state.classifys[i].active) {
                        state.classifys[i].active = false;
                        break;
                    }
                }
                state.classifys[payload.index].active = true;
                Vue.set(state.classifys, payload.index, state.classifys[payload.index]);
            }
        },
        ["SET_GOODS"](state, payload) {
            state.goods = payload.goods;
        },
        //选择商品属性
        ["SELECT_ATTR"](state, payload) {

            for (let i = 0; i < state.attrs[payload.index].productStandardsColours.length; i++) {
                if (!state.attrs[payload.index].productStandardsColours[i].state) {
                    state.attrs[payload.index].productStandardsColours[i].state = 1;
                    break;
                }

            }


            state.attrs[payload.index].productStandardsColours[payload.index2].state = 0;
            Vue.set(state.attrs[payload.index].productStandardsColours[payload.index2],
                payload.index2, state.attrs[payload.index].productStandardsColours[payload.index2]);
        },
        //选择商品属性尺寸2222
        ["SELECT_ATTRTWO"](state, payload) {
            for (let i = 0; i < state.attrs.length; i++) {
                if (!state.attrs[i].state) {
                    state.attrs[i].state = true;
                    state.indexyanse = i

                    break;
                }
            }

            state.attrs[payload.index].state = 0;
            Vue.set(state.attrs[payload.index]);

        },
        //设置商品详情
        ["SET_DETAILS"](state, payload) {
            console.log(JSON.stringify(payload));
            state.details = payload.details;
            // if (payload.details.titleVideo) {
            //     state.details.commonImage.push({
            //         imageUrl: payload.details.titleVideo,
            //         type: 'video'
            //     });
            // }
            console.log(state.details)
        },
        //设置商品规格
        ["SET_ATTRS"](state, payload) {
            state.attrs = payload.attrs;
        },

        ["SET_VIP_PRODS"](state, payload) {
            state.vipProducts = payload.list;
        },

        ["ADD_VIP_PRODS"](state, payload) {
            state.vipProducts = state.vipProducts.concat(payload.list);
        },

        ["SET_VIP_PRODS99"](state, payload) {
            state.vipProducts99 = payload.list;
        },

        ["ADD_VIP_PRODS99"](state, payload) {
            state.vipProducts99 = state.vipProducts99.concat(payload.list)
        }
    },
    actions: {
        //左侧分类
        getClassify(conText, payload) {
            getClassifyData().then(res => {
                console.log("getClassifyData");
                if (res.status === 1) {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].active = false;
                    }
                    conText.commit("SET_CLASSIFYS", {classifys: res.data.list});
                    if (payload && payload.success) {
                        payload.success(res);
                    }
                }
            })
        },
        //右侧商品
        getGoods(conText, payload) {
            getGoodsData(payload.indexnumber).then(res => {
                if (res.status === 1) {
                    conText.commit("SET_GOODS", {goods: res.data.list[payload.indexnumber].productCategoryLevelThrees});
                    if (payload.success) {
                        payload.success();
                    }
                } else {
                    conText.commit("SET_GOODS", {goods: []});
                }
            })
        },
        //商品详情
        getDetails(conText, payload) {
            getDetailsData(payload.productID).then(res => {
                if (res.status === 1) {
                    conText.commit("SET_DETAILS", {details: res.data});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getLimitDetails(conText, payload) {
            getLimitDetailsData(payload.productID).then(res => {
                if (res.status === 1) {
                    //有需要再改
                    conText.commit("SET_DETAILS", {details: res.data});
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        //获取商品规格
        getSpec(conText, payload) {
            getSpecData(payload.productID).then(res => {
                if (res.status === 1) {
                    for (let i = 0; i < res.data.productStandards.length; i++) {
                        res.data.productStandards[i].active = false
                        for (let j = 0; j < res.data.productStandards[i].productStandardsColours.length; j++) {
                            res.data.productStandards[i].productStandardsColours[j].active = false
                        }
                    }
                    conText.commit("SET_ATTRS", {attrs: res.data.productStandards});
                    if (payload.success) {
                        payload.success();
                    }
                }

            })
        },
        //加入收藏
        addFav(conText, payload) {
            addFavData({uid: conText.rootState.user.uid, ...payload})
                .then(res => {
                    if (payload.success) {
                        payload.success(res)
                    }
                })
        },
        //取消收藏
        cancelFav(conText, payload) {
            // eslint-disable-next-line no-undef
            cancelFav({uid: conText.rootState.user.uid, ...payload})
                .then(res => {
                    if (payload.success) {
                        payload.success(res)
                    }
                })
        },

        getVipProds(conText, payload) {
            getVipProducts(payload.page)
                .then(res => {
                    if (res.status === 1) {
                        conText.commit("SET_VIP_PRODS", {list: res.data.list});
                        if (payload.success) {
                            payload.success(res);
                        }
                    }
                });
        },

        getVipProdsPage(conText, payload) {
            getVipProducts(payload.page)
                .then(res => {
                    if (res.status === 1) {
                        conText.commit("ADD_VIP_PRODS", {list: res.data.list});
                        if (payload.success) {
                            payload.success(res);
                        }
                    }
                });
        },

        getVipProds99(conText, payload) {
            getVipProducts99(payload.page)
                .then(res => {
                    if (res.status === 1) {
                        conText.commit("SET_VIP_PRODS99", {list: res.data.list});
                        if (payload.success) {
                            payload.success(res);
                        }
                    }
                });
        },

        getVipProds99Page(conText, payload) {
            getVipProducts99(payload.page)
                .then(res => {
                    if (res.status === 1) {
                        conText.commit("ADD_VIP_PRODS99", {list: res.data.list});
                        if (payload.success) {
                            payload.success(res);
                        }
                    }
                });
        }
    }
}
