<template>
    <div style="height: 100vh;width: 100%;overflow-y: auto;overflow-x:hidden;">
        <div class="user-info-wrap">
            <div class="right-btn-wrapper" @click="isLogin?goPage('/user/profile'):goPage('/login')">
                <div class="right-btn"></div>
            </div>

            <div style="width: 100%;height: auto;padding-top:.7rem;">
                <div style="width: 100%;height:auto;display: flex;justify-content: center;">
                    <div class="head" @click="isLogin?goPage('/user/profile'):goPage('/login')">
                        <img :src="head?head:require('../../../assets/images/common/renxiang.png')" alt/>
                    </div>
                </div>

                <div class="nickname" @click="isLogin?'':goPage('/login')">{{username?username:'登录/注册'}}</div>
            </div>
            <div class="huiyuan-img" @click="$router.push('/vip')">
                <img :src="userType == '2'? require('../../../assets/images/user/my/lijijinru@2x.png'):
                require('../../../assets/images/user/my/lijikaitong@2x.png')" alt/>
                <!-- <div class="now" @click="goPage('/membercenter')">立即开通</div> -->
<!--                <div class="now" @click="$router.push('/vip')">{{userType == '2'? '立即进入': '立即开通'}}</div>-->
            </div>
        </div>
        <div class="order-name-wrap">
            <div class="order-name">全部订单</div>
            <div
                    class="show-order"
                    @click="isLogin?goPage('/user/order/list?status=all'):goPage('/login')"
            >查看全部订单 &gt;
            </div>
        </div>
        <div class="order-status-wrap">
            <div class="item" @click="isLogin?goPage('/user/order/list?status=0'):goPage('/login')">
                <div class="item-xiaoyuanquan" v-show="ordersPay.length>0">
                    <span>{{ordersPay.length = (ordersPay.length < 100)?ordersPay.length:'...'}}</span>
                </div>
                <div class="icon wait1"></div>
                <div class="text">待付款</div>
            </div>
            <div class="item" @click="isLogin?goPage('/user/order/list?status=1'):goPage('/login')">
                <div class="item-xiaoyuanquan" v-show="ordersOut.length>0">
                    <span>{{ordersOut.length < 100?ordersOut.length:'...'}}</span>
                </div>
                <div class="icon wait2"></div>
                <div class="text">待发货</div>
            </div>
            <div class="item" @click="isLogin?goPage('/user/order/list?status=2'):goPage('/login')">
                <div class="item-xiaoyuanquan" v-show="orderFrom.length>0">
                    <span>{{orderFrom.length < 100?orderFrom.length:'...'}}</span>
                </div>
                <div class="icon take"></div>
                <div class="text">待收货</div>
            </div>
            <div class="item" @click="isLogin?goPage('/user/order/list?status=3'):goPage('/login')">
                <div class="item-xiaoyuanquan" v-show="orderAppraised.length>0">
                    <span>{{orderAppraised.length < 100?orderAppraised.length:'...'}}</span>
                </div>
                <div class="icon comment"></div>
                <!-- <div class="text">待评价</div> -->
                <div class="text">已完成</div>
            </div>
            <div class="item" @click="isLogin?goPage('/user/order/list?status=4'):goPage('/login')">
                <div class="item-xiaoyuanquan" v-show="shouhou.length>0">
                    <span>{{shouhou.length < 100?shouhou.length:'...'}}</span>
                </div>
                <div class="icon wait3"></div>
                <div class="text">退款/售后</div>
            </div>
        </div>
        <div class="menu-list-wrap">
            <ul @click="isLogin?goPage('/coupon'):goPage('/login')">
                <li>我的卡券</li>
                <li></li>
            </ul>
            <ul @click="isLogin?goPage('/user/fav'):goPage('/login')">
                <li>我的收藏</li>
                <li></li>
            </ul>
            <ul @click="isLogin?goPage('/address'):goPage('/login')">
                <li>收货地址</li>
                <li></li>
            </ul>
            <ul @click="kefudianhua()">
                <li>客服中心</li>
                <li></li>
            </ul>
            <ul @click="goPage('/user/ucenter/maps')">
                <li>附近的零售店</li>
                <li></li>
            </ul>
            <div style="
			color: rgb(154,154,154);
			font-size:0.2rem;
			width: 100%;
			text-align: center;
			margin-top:1rem;
			margin-bottom:1.5rem;
			"
            >
                <div>Copyright2015-2020</div>
                <div style="margin-top: 0.2rem;">苏州缔邦家具有限公司版权所有</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import {mapState, mapActions} from "vuex";
    import {Dialog} from "vant";

    Vue.use(Dialog);
    export default {
        data() {
            return {
                username: localStorage["nickname"] ? localStorage["nickname"] : ""
            };
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        created() {
            this.getMyOrder();
        },
        methods: {
            ...mapActions({
                getMyOrder: "order/getMyOrder",
                asyncOutLogin: "user/outLogin",
                login: "user/login"
            }),
            kefudianhua() {
                window.location.href = "tel:051269391566";
            },
            goPage(url) {
                this.$router.push(url);
            },
            outLogin() {
                Dialog.confirm({
                    title: "",
                    message: "确认要退出吗？"
                })
                    .then(() => {
                        this.asyncOutLogin();
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            showVIP() {
                Dialog.alert({
                    title: "",
                    message: "敬请期待"
                });
            }
        },
        computed: {
            ...mapState({
                userType: state => state.user.userType,
                isLogin: state => state.user.isLogin,
                nickname: state => state.user.nickname,
                head: state => state.user.head,
                points: state => state.user.points,
                ordersPay: state => state.order.ordersPay, //待付款
                ordersOut: state => state.order.ordersOut, //待发货
                orderFrom: state => state.order.orderFrom, //待收货
                orderAppraised: state => state.order.orderAppraised, //待评价
                shouhou: state => state.order.shouhou //售后
            })
        }
    };
</script>

<style scoped>
    .sub-header {
        width: 100%;
        height: 1rem;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 1px solid #efefef;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        justify-content: space-between;
        padding: 0px 0.1rem;
        box-sizing: border-box;
    }

    .sub-header .back {
        width: auto;
        height: auto;
    }

    .sub-header .title {
        width: 79%;
        height: auto;
        font-size: 0.32rem;
        text-align: center;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .user-info-wrap .right-btn-wrapper {
        position: absolute;
        top: 0.45rem;
        right: 0.3rem;
        width: .8rem;
    }

    .user-info-wrap .right-btn-wrapper .right-btn {
        background-image: url("../../../assets/images/user/my/setto.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: right;
        margin: 0 0.2rem;
        height: 0.5rem;
        width: .5rem;
    }

    .huiyuan {
        border-bottom: #f6f6f6 7px solid;
        width: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        padding-bottom: 0.16rem;
    }

    .huiyuanbg {
        width: 100%;
        height: 1.46rem;
    }

    .huiyuanbg img {
        width: 100%;
        height: 100%;
    }

    .user-info-wrap {
        width: 100%;
        height: 5.5rem;
        background-image: url("../../../assets/images/user/my/bgcenter.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .user-info-wrap .huiyuan-img {
        width: 100%;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        margin-bottom: 0.2rem;
        position: relative;
    }

    .user-info-wrap .huiyuan-img img {
        width: 90%;
    }

    .user-info-wrap .huiyuan-img .now {
        position: absolute;
        right: 12%;
        top: 30%;
        color: #4a2a1a;
        font-size: 0.3rem;
        z-index: 2;
        width: 1.51rem;
        height: 0.51rem;
        line-height: 0.52rem;
        border: 1px solid rgba(74, 42, 26, 1);
        border-radius: 0.28rem;
    }

    .user-info-wrap div .head {
        width: 1.34rem;
        height: 1.34rem;
        border: rgba(154, 154, 154, 0.15) 1px solid;
        border-radius: 50%;
        z-index: 1;
    }

    .user-info-wrap .head img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .user-info-wrap .nickname {
        margin-top: 0.38rem;
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        white-space: nowrap;
        z-index: 1;
        font-size: 0.24rem;
        color: #ffffff;
        text-align: center;
    }

    .user-info-wrap .points {
        width: auto;
        height: auto;
        white-space: nowrap;
        position: absolute;
        z-index: 1;
        left: 27%;
        bottom: 20%;
        font-size: 0.24rem;
        color: #000000;
    }

    .order-name-wrap {
        width: 100%;
        height: 0.8rem;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        overflow: hidden;
        margin-bottom: 1px;
        border-bottom: 1px solid #efefef;
    }

    .order-name-wrap .order-name {
        font-size: 0.28rem;
        margin-left: 3%;
    }

    .order-name-wrap .show-order {
        font-size: 0.24rem;
        margin-right: 3%;
        color: rgb(153, 153, 153);
    }

    .order-status-wrap {
        width: 100%;
        height: 1.4rem;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
    }

    .order-status-wrap .item {
        width: 1.5rem;
        height: auto;
        position: relative;
    }

    .order-status-wrap .item .item-xiaoyuanquan {
        width: 0.2rem;
        height: 0.2rem;
        background-color: #eb1625;
        line-height: 0.2rem;
        position: absolute;
        top: 0.15rem;
        right: 0.15rem;
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-radius: 50%;
        text-align: center;
    }

    .order-status-wrap .item .item-xiaoyuanquan span {
        width: 100%;
        height: 100%;
        font-size: 0.16rem;
        color: #ffffff;
        text-align: center;
        /* text-overflow:ellipsis;
              white-space:nowrap;
              overflow:hidden;
              border-radius: 50%;
              background-color: #EB1625;
              position: absolute;
              top: 0.2rem;
              right: 0.2rem;
              color: #FFFFFF;
              overflow: hidden;
              line-height:0.4rem;
              text-align: center;
              font-size: 0.08rem; */
    }

    .order-status-wrap .item .icon {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.24rem auto;
    }

    .order-status-wrap .item .icon.wait1 {
        background-image: url("../../../assets/images/user/my/daifukuan.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .order-status-wrap .item .icon.wait2 {
        background-image: url("../../../assets/images/user/my/daifahuo.png");
        background-size: 90%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .order-status-wrap .item .icon.take {
        background-image: url("../../../assets/images/user/my/daishouhuo.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .order-status-wrap .item .icon.comment {
        background-image: url("../../../assets/images/user/my/daipingjia.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .order-status-wrap .item .icon.wait3 {
        background-image: url("../../../assets/images/user/my/shouhou.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .order-status-wrap .item .text {
        width: 100%;
        font-size: 0.24rem;
        text-align: center;
    }

    .menu-list-wrap {
        width: 100%;
        height: auto;
        background-color: #ffffff;
        margin-top: 0.14rem;
        padding-left: 3%;
        box-sizing: border-box;
    }

    .menu-list-wrap ul {
        width: 100%;
        height: 0.8rem;
        border-bottom: 1px solid #efefef;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 0%;
        padding-right: 6%;
        box-sizing: border-box;
    }

    .menu-list-wrap ul li:nth-child(1) {
        font-size: 0.28rem;
    }

    .menu-list-wrap ul li:nth-child(2) {
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("../../../assets/images/common/right_arrow.png");
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .menu-list-wrap .btn {
        width: 70%;
        height: 0.8rem;
        margin: 0 auto;
        background-color: #e51b19;
        border-radius: 5px;
        font-size: 0.32rem;
        color: #ffffff;
        text-align: center;
        line-height: 0.8rem;
        margin-top: 0.4rem;
    }
</style>
