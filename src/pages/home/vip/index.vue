<template>
    <div class="vip">
        <div class="nav-bar">
            <div @click="$router.go(-1)" class="arrow arrow-left"></div>
            <div class="title">{{name}}</div>
        </div>
        <div class="join" v-if="!isVIP">
            <img alt class="huiyuan" src="../../../assets/images/vip/huiyuan.png"/>
            <img @click="pay"
                 alt
                 class="btn-join"
                 src="../../../assets/images/vip/btn_join.png"
            />
        </div>
        <div class="vipzone" v-if="isVIP">
            <div class="topnav">
                <div class="userinfo">
                    <img alt class="topbg" src="../../../assets/images/vip/topbg.png"/>
                    <div class="username">
                        <div class="header">
                            <img :src="head?head:require('../../../assets/images/common/renxiang.png')" alt/>
                        </div>
                        <div class="nickname">{{nickname}}</div>
                    </div>
                </div>
                <div class="quicknav">
                    <div>
                        <img alt src="../../../assets/images/vip/exclusive.png"/>
                        <div>专享好物</div>
                    </div>
                    <div>
                        <img alt src="../../../assets/images/vip/99.png"/>
                        <div>99元专区</div>
                    </div>
                    <div>
                        <img alt src="../../../assets/images/vip/coupon.png"/>
                        <div>优惠券</div>
                    </div>
                    <div>
                        <img alt src="../../../assets/images/vip/support.png"/>
                        <div>专属客服</div>
                    </div>
                </div>
            </div>
            <div class='products'>
                <div class='products-nav'>
                    <div :class="{ 'products-nav-item': true, active: productsNav === 0}" @click="productsNav = 0">
                        专享好物
                    </div>
                    <div :class="{ 'products-nav-item': true, active: productsNav === 1}" @click="productsNav = 1">
                        99元专区
                    </div>
                </div>
            </div>
            <div class='products-content'>
                <div class="products-items" v-if="productsNav === 0">
                    <div
                            :key="index"
                            @click="$router.push('/goods/details?productID='+item.productID)"
                            class="goods-list"
                            style="padding:0 0 .2rem;"
                            v-for="(item,index) in vipProducts"
                    >
                        <div class="goods-image">
                            <img :src="item.titleImg"/>
                        </div>
                        <div class="goods-title">{{item.productName}}</div>
                        <div class="goods-price">
                            <div class="price">
                                <span>¥{{(item.lowPrice*0.01).toFixed(2)}}</span>
                            </div>
                            <div class="cart">
                                <!--                                <img src="../../../assets/images/home/goods/cart.png" alt/>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="products-items" v-if="productsNav === 1">
                    <div
                            :key="index"
                            @click="$router.push('/goods/details?productID='+item.productID)"
                            class="goods-list"
                            style="padding:0 0 .2rem;"
                            v-for="(item,index) in vipProducts99"
                    >
                        <div class="goods-image">
                            <img :src="item.titleImg"/>
                        </div>
                        <div class="goods-title">{{item.productName}}</div>
                        <div class="goods-price">
                            <div
                                    class="price"
                            >
                                <span>¥{{(item.lowPrice*0.01).toFixed(2)}}</span>
                            </div>
                            <div class="cart">
                                <!--                                <img src="../../../assets/images/home/goods/cart.png" alt/>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-overlay :show="joinVIPSuccess" @click="joinVIPSuccess = false" class="join-success" z-index="999">
            <div class="wrapper">
                <div class="block">
                    <img alt src="../../../assets/images/vip/VIP.png"/>
                    <div @click.stop="$router.push('/coupon')">立即查看</div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import UpRefresh from "../../../assets/js/libs/uprefresh.js";
    import axios from 'axios';
    import {mapActions, mapState} from "vuex";
    import Vue from "vue";
    import {Dialog, Overlay, PullRefresh, Toast} from "vant";

    Vue.use(PullRefresh);
    Vue.use(Overlay);
    Vue.use(Dialog);
    Vue.use(Toast);

    export default {
        name: "VIP_center",
        data() {
            return {
                isVIP: this.userType == '2',
                name: "会员中心",
                productsNav: 0,
                joinVIPSuccess: false,
                pullUp: null,
                status: ""
            }
        },
        created() {
            console.log("vip/index.vue created(): " + this.userType);
            this.isVIP = this.userType == '2';
            // console.log("userType: " + this.userType + " " + (this.userType === '2') + " " + this.isVIP);
            this.pullUp = new UpRefresh();
            this.getVipProducts();
            this.getVipProducts99();
        },
        computed: {
            ...mapState({
                isLogin: state => state.user.isLogin,
                nickname: state => state.user.nickname,
                head: state => state.user.head,
                userType: state => state.user.userType,
                vipProducts: state => state.goods.vipProducts,
                vipProducts99: state => state.goods.vipProducts99
            })
        },
        methods: {
            ...mapActions({
                getVipProds: "goods/getVipProds",
                getVipProdsPage: "goods/getVipProdsPage",
                getVipProds99: "goods/getVipProds99",
                getVipProds99Page: "goods/getVipProds99Page"
            }),

            pay() {
                if (this.userType == '3' || this.userType == '4') {
                    Dialog.alert({message: "经销商或商家不可以开通会员"});
                    return;
                }
                let orderIDList = {
                    spbillCreateIp: returnCitySN["cip"],
                    type: 2,
                    userID: localStorage["uid"],
                    totalAmount: 100
                };
                // console.log(returnCitySN["cip"])

                axios({
                    method: "post",
                    url: this.$config.baseApi + "/wxPay/H5pay",
                    headers: {
                        "Content-Type": "application/json;"
                    },
                    data: JSON.stringify(orderIDList)
                }).then(res => {
                    plus.webview.create(res.data.data.mweb_url, "支付", {
                        additionalHttpHeaders: {Referer: "http://www.ammsshop.com"}
                    });
                    console.log(JSON.stringify(res));
                    window.setTimeout(() => {
                        Dialog.confirm({
                            message: "是否完成支付?",
                            confirmButtonColor: "#000000",
                            confirmButtonText: "已完成支付",
                            cancelButtonText: "支付遇到问题",
                            cancelButtonColor: "#AAAAAA"
                        }).then(() => {
                            // console.log(this.$route.query.out_trade_no);
                            axios({
                                method: "post",
                                url: this.$config.baseApi + "/wxPay/orderQuery",
                                headers: {
                                    "Content-Type": "application/json;"
                                },
                                params: {
                                    outTradeNo: res.data.data.out_trade_no
                                }
                            }).then(res => {
                                console.log(JSON.stringify(res));
                                this.totalAmount = res.data.data.total_fee;
                                if (res.data.data.trade_state === "SUCCESS") {
                                    this.status = "支付成功";
                                    this.joinVIPSuccess = true;
                                    console.log("SUCCESS");
                                } else {
                                    this.status = "支付失败";
                                    console.log("FAIL");
                                }
                            });
                        }).catch(() => {
                            console.log(this.$route.query.out_trade_no);
                            axios({
                                method: "post",
                                url: this.$config.baseApi + "/wxPay/orderQuery",
                                headers: {
                                    "Content-Type": "application/json;"
                                },
                                params: {
                                    outTradeNo: res.data.data.out_trade_no
                                }
                            }).then(res => {
                                console.log(JSON.stringify(res));
                                console.log(res.data.data.trade_state);
                                this.totalAmount = res.data.data.total_fee;
                                if (res.data.data.trade_state === "SUCCESS") {
                                    this.status = "支付成功";
                                    this.joinVIPSuccess = true;
                                    console.log("SUCCESS");
                                } else {
                                    this.status = "支付失败";
                                    console.log("FAIL");
                                }
                            });
                        });
                    }, 0);

                    // if (res.err_msg === "get_brand_wcpay_request:ok") {
                    //     console.log("pay支付成功");
                    // localStorage.setItem('isVIP', "1");
                    // Dialog.alert({message: "支付成功"});

                    //this.opya = res;
                    // this.$router.push({
                    //     path: "/order/end",
                    //     query: {status: res.err_msg, type: true}
                    // });
                    // } else {
                    //     console.log("pay支付失败");
                    //console.log(res);
                    //this.opya = res;
                    // this.$router.push({
                    //     path: "/order/end",
                    //     query: {status: res.err_msg, type: true}
                    // });
                    // console.log(res);
                    // this.opya = res;
                    //Dialog.alert({message: "支付失败请重试"});
                    // var vm = this;
                    // vm.$router.go(-1);
                    // }
                });
            },

            getVipProducts() {
                this.getVipProds({
                    success: res => {
                        this.pullUp.init(
                            {curPage: 1, maxPage: res.data.pages, offsetBottom: 100},
                            page => {
                                this.getVipProdsPage({
                                    page: page,
                                    success: () => {
                                        this.$nextTick(() => {
                                            this.$utils.lazyImg();
                                        });
                                    }
                                });
                            }
                        );
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            },

            getVipProducts99() {
                this.getVipProds99({
                    success: res => {
                        this.pullUp.init(
                            {curPage: 1, maxPage: res.data.pages, offsetBottom: 100},
                            page => {
                                this.getVipProds99Page({
                                    page: page,
                                    success: () => {
                                        this.$nextTick(() => {
                                            this.$utils.lazyImg();
                                        });
                                    }
                                });
                            }
                        );
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .vip {
        width: 100%;
        text-align: center;
    }

    .nav-bar .arrow {
        display: block;
        width: .24rem;
        height: .24rem;
        border-top: .01rem solid white;
        border-right: 0.01rem solid white;
        position: absolute;
        left: .3rem;
        top: .35rem;
    }

    .nav-bar .arrow-left {
        transform: rotate(-135deg);
    }

    .nav-bar .title {
        height: 1rem;
        background: #333333;
        color: white;
        line-height: 1rem;
    }

    .join {
        width: 100%;
        text-align: center;
    }

    .huiyuan {
        width: 100%;
    }

    .btn-join {
        width: 80%;
        margin-top: .5rem;
    }

    .topnav {
        background: #333333;
        padding: 0 .2rem .2rem .2rem;
    }

    .topnav .topbg {
        width: 100%;

    }

    .topnav .userinfo {
        position: relative;;
    }

    .topnav .userinfo .username {
        position: absolute;
        top: 25%;
        left: .5rem;
        right: .5rem;
        display: flex;
        align-items: center;
        width: 80%;
    }

    .topnav .userinfo .username .header {
        margin-right: .2rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: white;
    }

    .topnav .userinfo .username .header img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .topnav .userinfo .username .nickname {
        color: #664630;
        font-family: PingFang SC, serif;
        width: 4rem;
        text-align: left;
    }

    .topnav .quicknav {
        display: flex;
        justify-content: space-around;
    }

    .topnav .quicknav img {
        width: 1rem;
        height: 1rem;
    }

    .topnav .quicknav div {
        color: #FEF1C6;
        font-family: PingFang SC, serif;
        font-size: .3rem;
    }

    .products-nav {
        display: flex;
        justify-content: space-around;
        background: #F7E5BB;
    }

    .products-nav .products-nav-item {
        width: 100%;
        height: 100%;
        padding: .3rem 0;
    }

    .products-nav .active {
        background: white;
        border-radius: .2rem .2rem 0 0;
    }

    .join-success .wrapper {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .join-success .wrapper .block {
        width: 6rem;
        height: 7rem;
        position: relative;
    }

    .join-success .wrapper .block img {
        width: 100%;
        height: 100%;
    }

    .join-success .wrapper .block div {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: .95rem;
        background: #FFF4EC;
        width: 2.5rem;
        padding: .1rem 0;
        border-radius: .5rem;
        color: #736452;
    }

    .products-content {
        padding: 0 .3rem;
    }

    .products-content .products-items {
        width: 100%;
        display: flex;
        justify-content: space-between;
        /*padding: 0px 0.2rem;*/
        box-sizing: border-box;
        flex-wrap: wrap;
    }

    .products-content .products-items .goods-list {
        width: 48.6%;
        height: auto;
        background-color: #ffffff;
        padding: 0.2rem 0;
        margin-top: 0.2rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }

    .products-content .products-items .goods-image {
        width: 3.2rem;
        height: 3.2rem;
        margin: 0 auto;
    }

    .products-content .products-items .goods-image img {
        width: 100%;
        height: 100%;
    }

    .products-content .products-items .goods-title {
        width: 80%;
        height: auto;
        font-size: 0.28rem;
        margin-top: 0.1rem;
        margin-left: 0.26rem;
        margin-right: 0.26rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .products-content .products-items .goods-list .goods-price {
        width: auto;
        height: auto;
        font-size: 0.3rem;
        color: #D7A762;
        margin-top: 0.1rem;
        margin-left: 0.26rem;
        margin-right: 0.26rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .products-content .products-items .goods-list .goods-price .cart {
        width: .5rem;
        height: .5rem;
    }

    .products-content .products-items .goods-list .goods-price .cart img {
        width: 100%;
        height: 100%;
    }
</style>
