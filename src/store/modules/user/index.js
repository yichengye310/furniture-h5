import {
    checkVCodeData,
    delFavData,
    getduanxinyanzhengma,
    getFavData,
    getUserInfoData,
    loginData,
    regUserData,
    safeOutLoginData,
    safeUserData,
    updateCellphoneData,
    updatePasswordData,
    updateUserInfoData,
    uploadHeadData
} from "../../../api/user";

let modules = {
    namespaced: true,
    state: {
        userType: localStorage['userType'] || "",
        phoneNumber: localStorage['phoneNumber'] || "",
        uid: localStorage['uid'] ? localStorage['uid'] : "",
        nickname: localStorage['nickname'] || "",
        isLogin: localStorage['isLogin'] ? Boolean(localStorage['isLogin']) : false,
        authToken: localStorage["authToken"] || "",
        head: "",
        points: 0,
        favs: []
    },
    mutations: {
        ["SET_LOGIN"](state, payload) {
            console.log("SET_LOGIN: " + JSON.stringify(payload));
            state.phoneNumber = payload.phoneNumber;
            state.uid = payload.uid;
            state.nickname = payload.nickname;
            state.isLogin = payload.isLogin;
            state.authToken = payload.authToken;
            state.userType = payload.userType;
            localStorage["uid"] = payload.uid;
            localStorage['nickname'] = payload.nickname;
            localStorage['isLogin'] = payload.isLogin;
            localStorage['phoneNumber'] = payload.phoneNumber;
            localStorage["authToken"] = payload.authToken;
            localStorage['userType'] = payload.userType;
            console.log(JSON.stringify(this.state.user));
        },
        ["OUT_LOGIN"](state) {
            state.uid = "";
            state.nickname = "";
            state.isLogin = false;
            state.phoneNumber = "";
            state.authToken = "";
            state.points = 0;
            state.userType = "";
            // state.head="";
            localStorage.removeItem("phoneNumber");
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("isLogin");
            // localStorage.removeItem("authToken");
            localStorage.removeItem("cartData");
            localStorage.removeItem("userType");
            sessionStorage.removeItem("addsid");
        },
        ["SET_USER_INFO"](state, payload) {
            state.head = payload.head;
            state.points = payload.points;
            state.nickname = payload.nickname;
        },
        //设置我的收藏
        ["SET_FAVS"](state, payload) {
            state.favs = payload.favs;
        },
        ["SET_FAVS_PAGE"](state, payload) {
            state.favs.push(...payload.favs);
        },
        //删除收藏
        ["DEL_FAVS"](state, payload) {
            state.favs.splice(payload.index, 1);
        },

        ["ADD_SET_FAVS"](state, payload) {
            if (payload.favs.length > 0) {
                for (let i = 0; i < payload.favs.length; i++) {
                    state.favs.push(payload.favs[i])
                }
            }
        },


    },
    actions: {
        //会员登录
        login(conText, payload) {
            // console.log(payload)
            loginData(payload).then(res => {
                console.log("login -> res: " + JSON.stringify(res));
                if (res.status === 0) {
                    // console.log(res.data)
                    localStorage.setItem('isOpenLive', res.data.isOpenLive);
                    // console.log(res.data.userID)
                    conText.commit("SET_LOGIN",
                        {
                            uid: res.data.userID,
                            nickname: res.data.userName,
                            phoneNumber: res.data.phoneNumber,
                            isLogin: true,
                            authToken: res.data.token,
                            userType: res.data.userType
                        });
                }
                if (payload.success) {
                    payload.success(res)
                }
            })
        },
        //安全退出
        outLogin(conText) {

            safeOutLoginData({uid: conText.state.uid})
                .then(res => {
                    localStorage.clear();

                    conText.rootState.cart.cartData = [];
                    conText.commit("OUT_LOGIN");
                });
        },
        //会员安全认证
        safeUser(conText, payload) {
            safeUserData(payload).then(res => {

            });
        },
        //检测图片验证码
        checkVCode(conText, payload) {
            return checkVCodeData(payload.vcode).then(res => {
                return res;
            })
        },
        //是否注册会员
        isReg(conText, payload) {

        },
        //发送短信验证码
        getduanxinyanzhengma(conText, payload) {
            return getduanxinyanzhengma(payload.phoneNumber).then(res => {
                return res
            })
        },
        //注册会员
        regUser(conText, payload) {
            regUserData(payload).then(res => {
                if (payload.success) {
                    payload.success(res)
                }
            })
        },
        //获取会员信息
        getUserInfo(conText, payload) {
            getUserInfoData(conText.state.uid).then(res => {
                if (res.code === 200) {
                    conText.commit("SET_USER_INFO", {
                        head: res.data.head,
                        points: res.data.points,
                        nickname: res.data.nickname
                    });
                    if (payload && payload.success) {
                        payload.success(res.data);
                    }
                }
            })
        },
        //上传头像
        uploadHead(conText, payload) {
            uploadHeadData(payload).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //修改会员信息
        updateUserInfo(conText, payload) {
            updateUserInfoData({uid: conText.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //修改手机号
        updateCellphone(conText, payload) {
            updateCellphoneData({uid: conText.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //修改密码
        updatePassword(conText, payload) {
            updatePasswordData({uid: conText.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },


        //我的收藏
        getFav(conText, payload) {
            getFavData(conText.rootState.user.uid, payload.page).then(res => {
                if (res.status === 1) {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].istochoose = false
                    }
                    conText.commit("SET_FAVS", {favs: res.data.list});
                }
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        getFavPage(conText, payload) {
            //console.log(payload.page)
            getFavData(conText.rootState.user.uid, payload.page).then(res => {
                if (res.status === 1) {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].istochoose = false
                    }
                    conText.commit("ADD_SET_FAVS", {favs: res.data.list});
                }

            })
        },


        //删除收藏
        delFav(conText, payload) {
            delFavData({uid: conText.state.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    conText.commit("DEL_FAVS", {index: payload.index});
                    if (payload.success) {
                        payload.success();
                    }
                }
            });
        }
    }

}
export default modules;
