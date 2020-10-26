import {
    addAddressData,
    delAddressData,
    getAddresData,
    getAddressInfoData,
    getAllProvince,
    getCityByProvinceID,
    getDefaultAddressData,
    modAddressData,
} from "../../../api/address";

export default {
    namespaced: true,
    state: {
        address: [],
        AllProvince: [],//省份
        AllProvinceID: 5,//省份ID
        CityByProvince: [],//市
        CityID: 4458,//市ID
        DistrictsByCity: [],//县
        lastModifierID: 0

    },
    mutations: {
        ["SET_ADDRESS"](state, payload) {
            state.address = payload.address;
        },
        ["All_PROVINCE"](state, payload) {
            state.AllProvince = payload.AllProvince;
        },
        ["All_PROVINCEID"](state, payload) {
            state.AllProvinceID = payload[0].code;
            //console.log(state.AllProvinceID)
        },
        //删除收货地址
        ["DEL_ADDRESS"](state, payload) {
            state.address.splice(payload.index, 1);
        }
    },

    actions: {
        //获取省份id
        getProvince(conText, payload) {
            getAllProvince(payload).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //获取市id
        getCity(conText, payload) {
            getCityByProvinceID({provinceID: conText.state.AllProvinceID}, payload).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })

        },
        //县
        // getCity(conText,payload){
        // 	getDistrictsByCityID({cityID:conText.state.cityID},payload).then(res=>{
        // 		if(payload.success){
        // 		    payload.success(res);
        // 		}
        // 	})

        // },


        //获取收货地址
        getAddress(conText, payload) {
            getAddresData(conText.rootState.user.uid).then(res => {
                if (res.status === 0) {
                    conText.commit("SET_ADDRESS", {address: res.data});
                }
            })
        },
        //删除收货地址
        delAddress(conText, payload) {
            delAddressData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    if (payload.index) {
                        conText.commit("DEL_ADDRESS", {index: payload.index});
                    }
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        //添加收货地址
        addAddress(conText, payload) {
            // console.log(conText.rootState.user.uid)
            addAddressData({userID: conText.rootState.user.uid, ...payload}).then(res => {
                // console.log(res)
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //收货地址详情
        getAddressInfo(conText, payload) {
            getAddressInfoData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                if (res.status === 0) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })
        },
        //修改收货地址
        modAddress(conText, payload) {
            modAddressData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //获取默认收货地址
        getDefaultAddress(conText, payload) {
            getDefaultAddressData(conText.rootState.user.uid).then(res => {
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })
        }
    }
}
