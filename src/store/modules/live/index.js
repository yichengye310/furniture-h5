import Vue from 'vue';
import {getSearchData} from "../../../api/search";
import {getpushlive} from "../../../api/live";
import {getProductLimitedTimeData, sendMessage} from "../../../api/index";
import map from "../../../assets/js/utils/map.js";

export default {
    namespaced: true,
    state: {

        livetheshop: [],
        livetheshopID: [],

        zhibojian: [],

        timeshop: [],

        timeshop1: [],

        timeshop1id: [],
        roomName: localStorage.getItem('roomName'),
        username: localStorage.getItem('phoneNumber'),
        // userType: localStorage.getItem('userType2'),
    },


    mutations: {

        //删除限时抢购选择的商品
        ["DELETE_TIME_SHOP"](state, payload) {

            for (let i = 0; i < state.timeshop1.length; i++) {
                if (state.timeshop1[i].limitedTimeProductID === payload.timedeleteshopid) {
                    state.timeshop1.splice(i, 1);
                    state.timeshop1id.splice(i, 1);
                }
            }
        },
        //删除普通活动选择的商品
        ["DELETE_SHOP"](state, payload) {
            console.log(payload.productID);
            for (let i = 0; i < state.livetheshop.length; i++) {
                if (state.livetheshop[i].productID === payload.productID) {
                    state.livetheshop.splice(i, 1);
                    state.livetheshopID.splice(i, 1);
                }
            }
            //console.log("moduel/live/index/DELETE_SHOP: " + JSON.stringify(state))
        },

        //设置选择结果

        ["SET_LIVE_SHOP"](state, payload) {
            // yye state.livetheshop = state.livetheshop.concat(payload.livetheshop)
            console.log("module/live/index->set_live_shop: " + JSON.stringify(payload));
            state.livetheshop = payload.livetheshop;
            state.livetheshopID = state.livetheshop.map(x => x.productID);
            console.log("module/live/index->set_live_shop: state.livetheshopID" + JSON.stringify(state.livetheshopID));
            // yye for (let i = 0; i < payload.livetheshop.length; i++) {
            //     state.livetheshopID.push(payload.livetheshop[i].productID)
            // }

        },
        ["SET_LIVE_SHOPTWO"](state, payload) {
            console.log("module/live/index->set_live_shoptwo: " + JSON.stringify(payload));
            // yye state.livetheshop =state.livetheshop.concat(payload.itemlist)
            state.livetheshop = payload.itemlist;
            state.livetheshopID = state.livetheshop.map(x => x.productID);
            console.log("module/live/index->set_live_shoptwo: state.livetheshopID" + JSON.stringify(state.livetheshopID));

            // yye for (let i = 0; i < payload.itemlist.length; i++) {
            //     state.livetheshopID.push(payload.itemlist[i].productID)
            // }
        },
        ["SET_LIVE_ROOM"](state, payload) {
            state.zhibojian = payload.zhibojian;
        },

        ["ADD_LIVE_ROOM"](state, payload) {
            state.zhibojian = state.zhibojian.concat(payload.zhibojian);
            // yye if (payload.zhibojian.length > 0) {
            //     for (let i = 0; i < payload.zhibojian.length; i++) {
            //         state.zhibojian.push(payload.zhibojian[i])
            //     }
            // }

        },
        ["ADD_TIME_SHOP"](state, payload) {
            state.timeshop = payload.timeshop;
        },
        ["SET_TIME_SHOP"](state, payload) {
            //选择的限时抢购产品
            console.log("module/live/index->SET_TIME_SHOP: " + JSON.stringify(payload));
            state.timeshop1 = payload.timeshop1;
            state.timeshop1id = state.timeshop1.map(x => x.limitedTimeProductID);
            console.log("module/live/index->SET_TIME_SHOP: " + JSON.stringify(state.timeshop1id));

            //console.log(state.timeshop1);
            // yye for (let i = 0; i < payload.timeshop1.length; i++) {
            //     state.timeshop1id.push(payload.timeshop1[i].limitedTimeProductID)
            // }
        },

    },
    actions: {
        getlivelist(conText, payload) {
            getpushlive(payload.page).then(res => {
                let list = res.data.ret.list;
                list.forEach((x, i) => {
                    map.initOnly().then(BMap => {
                        const gc = new BMap.Geocoder();
                        const point = new BMap.Point(x.live.longitude, x.live.latitude);
                        gc.getLocation(point, function (rs) {
                            let addComp = rs.addressComponents;
                            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                            x.live = {
                                city: addComp.city,
                                ...x.live
                            };
                        });
                    });
                });
                conText.commit("SET_LIVE_ROOM", {zhibojian: list});
                if (payload.success) {
                    payload.success(res);
                }
                //console.log(JSON.stringify(list[0].live));

            })
        },

        getlivelistPage(conText, payload) {
            getpushlive(payload.page).then(res => {
                let list = res.data.ret.list;
                list.forEach((x, i) => {
                    map.initOnly().then(BMap => {
                        const gc = new BMap.Geocoder();
                        const point = new BMap.Point(x.live.longitude, x.live.latitude);
                        gc.getLocation(point, function (rs) {
                            let addComp = rs.addressComponents;
                            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                            x.live = {
                                city: addComp.city,
                                ...x.live
                            };
                        })
                    });
                });
                //console.log(JSON.stringify(list));
                conText.commit("ADD_LIVE_ROOM", {zhibojian: list});
                if (payload.success) {
                    payload.success();
                }
            })
        },


        getlivetimedata(conText, payload) {
            getProductLimitedTimeData().then(res => {

                if (res.status === 1) {

                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].istochoose = false
                    }
                    conText.commit("ADD_TIME_SHOP", {timeshop: res.data.list});
                }
            })
        }

    }
}
