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

                <div class="nickname">{{username?username:'昵称'}}</div>
            </div>
            <div class="huiyuan-img">
                <img src="../../../assets/images/user/my/huiyuan.png" alt/>
                <!-- <div class="now" @click="goPage('/membercenter')">立即开通</div> -->
                <div class="now" @click="$router.push('/vip')">{{userType == '2'? '立即进入': '立即开通'}}</div>
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
                <div class="text">待评价</div>
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
                window.location.href = "tel:051269571961";
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
    }

    .user-info-wrap .right-btn-wrapper .right-btn {
        height: 0.5rem;
        width: .5rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAkCAYAAAAD3IPhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxNEFBRjE2ODVENDExRUFCQjE4QzI4MTFDNEJBRjg0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxNEFBRjE3ODVENDExRUFCQjE4QzI4MTFDNEJBRjg0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjE0QUFGMTQ4NUQ0MTFFQUJCMThDMjgxMUM0QkFGODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjE0QUFGMTU4NUQ0MTFFQUJCMThDMjgxMUM0QkFGODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xGDcVAAAD7klEQVR42rSYa0hVQRDH71VL7WGKZEqZvehdKuWHjJKEyvRDD8jE/NKHNIwKhZIo7UUQ9KUXZBQpWJQVUYRKUEYvJNRIyopS7GlqppRy0Uxv/4XZmE5zzj1XcuDH3cfM7pw9O3tmr9PtdjsGIbkgEfiCAWpzUv0lyAfdXo+qnPGS3W7PUjWIcR1OGysTBtpYvZXaPhB+1N4PRoFoqseCZ1QOAS7QO9iVmQzugx5Qztqb6elzBJvxbHXGUdsR0EV2KVYrY+VIl2Hpa0EC+ET1PYLdNKa/AhwUXmGaN86oAT8y44sm+yJOsA0EXwTdS+A1q6+140wk+MqMdlB7nmHwvRbLvRx8Njii2qfQK9eSYuXMWPCDKecKry4VzLQRGf5gJYgxtMeDfjbHYjNnbpOC8n7bYELTJrHgPc31i230v5zRHjcMoSOas2x1EiRnzjCF0zYHDQBzQTQIs2mTDgZoniYQZLaBK5lissWAajOeAm3sAdTrLQPLLOwimH4jd0Ryxhd8J+V9JgNmMofN5LKJbTLTWSNFkzqEHoE3hJZVwmAZrF85dBxsAZvAAVDP+q8K9uG0ad0U/mq+F+CwdkaSc8JAY1i/etfzTJ7+CtPLEPrVgdcrzLlTO9MNDtHhlmgySRHpqoEmedikVaSrXrmP0D8BZIFsUEe617QzzTYOMRfpHrMRMUvZE8/yoFtMesU+9PFWaUCAxcc9HARSucZGmtSgEgIqz/GgG6QTCB+bOdhwVu6zof+TlUfbTfS0M+opeiz0Og3JlicJpTTUQQmYlfQZnVG/wSxrM0o7aKRypg1n0ln5qYmOypeHAf8/q882WjtoAXfAEmGjrWe6Ry02ZBLTKxP6Q8AFCpoWFuYlqvOxEPPqQIsSBuK6RZQS6NCdTmmHW0g9NUr3gTCfyqHitNJGsItiXydAeYIzI9m54GYnaZMwgXSCL2L958l5ddaESt+mBWzZcixeRaHFd+khmG1iF8P0Cq2uKupSdpfK38B80GyxSReCBBBBG1HZ1IGbHjZ3KUil8kmwXbqq6CT8LR3XQ5lcXWcrFK/b+aE3gl3GOh1DKy5WDpBWJo152yFEwv+i0hD6PmbJVQFTVLnGRHYzKAHVoBTMsJgsiD6mT8AtQ8ZYYdjoHi9x+5lBPYVoqyFi1IEVbOLMDSHCVoMTrF7tzfU23yRsy9ndKluwi2S698ArYYwab+/aDuGerJf7HdU3m9wWtOhMsIO1qRPcaTann8WOLwC1YCr9tVFJ7TqvWUe5CP9LJILZqzzmOf1uoK9zIctz/hE7/88YpQIk2dCLspE+iPmMN7KVVspFSVQP0Ut1dWpneeuIkt8CDABuMLOGB5KdBgAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: right;
        margin: 0 0.2rem;
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
