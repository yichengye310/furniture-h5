<template>
    <div class="wrapper" id="payment">
        <SubHeader title="支付方式"></SubHeader>

        <!-- 支付方式选择 -->
        <div class="paymain">
            <div class="paymain-pic">
                <div>支付金额</div>
                <div class="paymain-pic1">￥{{price.toFixed(2)}}</div>
            </div>

            <div class="choose">选择支付方式</div>
            <div @click="Alipaypayment()" class="payment-weixin pay">
                <div class="radio">
                    <div :class="{active:isactive===1}" class="radio-n"></div>
                </div>

                <div class="pay-w pay1">
                    <div class="pay-icon">
                        <img alt="" src="../../../assets/images/user/orders/zhifubao.png">
                    </div>
                    <div>支付宝支付</div>
                </div>
            </div>
            {{opya}}
            <div @click="WeChatpayment()" class="payment-zhifubao pay">
                <div class="radio">
                    <div :class="{active:isactive===2}" class="radio-n"></div>
                </div>

                <div class="pay-z pay1">
                    <div class="pay-icon">
                        <img alt src="../../../assets/images/user/orders/weixin.png"/>
                    </div>
                    <div>微信支付</div>
                </div>
            </div>
        </div>

        <div @click="sub()" class="queren">确认下单</div>

        <!-- <div v-show="!pay" style="z-index: 99999;height: 100vh;width: 100%;">{{weixinpayform}}</div> -->
    </div>
</template>

<script>
    import {getMessage} from "../../../api/live/index";
    import SubHeader from "../../../components/sub_header";
    import {mapState} from "vuex";
    import axios from "axios";
    import {Toast} from "vant";

    export default {
        name: "order-Paymentmethod",
        components: {
            SubHeader
        },
        data() {
            return {
                opya: "",
                isactive: 2,
                productID: "",
                standardID: "",
                colourID: "",
                productNumber: "",
                orderprice: "",
                weixinpayform: "",
                pay: true,
                bodygoumai: [],
                dandugoumai: [],
                ordertheid: [],
                roomName: localStorage.getItem("roomName"),
                userName: localStorage.getItem("phoneNumber"),
                userType: localStorage.getItem("userType2"),
                channels: "",
                alipayChannel: "",
                wxpayChannel: ""
            };
        },
        computed: {
            ...mapState({
                orderBuy: state => state.cart.orderBuy,
                cartsorderdata: state => state.cart.cartsorderdata,
                price: state => state.cart.price,
                couponAmount: state => state.cart.couponAmount
            })
        },
        created() {
            this.$nextTick(() => {
                //页面刚进入时开启长连接
                this.initWebSocket();
            });

            if (this.$route.query.list === "jojo") {
                this.orderprice = this.price;
                let index = 0;
                this.$set(this.orderprice, "0", this.orderprice);
            }
            if (this.$route.query.cartdata === "1") {
                this.gouwuchetijiao();
            } else {
                this.shujutijao();
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (window.plus) {
                    this.plusReady();
                } else {
                    document.addEventListener("plusready", this.plusReady, false);
                }
            })
        },

        methods: {
            plusReady() {
                // 获取支付通道
                let that = this;
                plus.payment.getChannels(function (channels) {
                    that.channels = channels;
                    for (let i =0; i < channels.length; i++) {
                        let curr = channels[i];
                        if (curr['id'] === 'alipay') {
                            that.alipayChannel = curr;
                        } else if (curr['id'] === 'wxpay') {
                            that.wxpayChannel = curr;
                        }
                    }
                    console.log(JSON.stringify(channels));
                }, function (e) {
                    alert("获取支付通道失败：" + e.message);
                });
            },
            gouwuchetijiao() {
                let bodygoumai = [];
                let v = [];
                let ordertheid = [];
                for (let i = 0; i < this.cartsorderdata.length; i++) {
                    let shopsparams = {};
                    ordertheid.push(this.cartsorderdata[i].cartData.cartIDList);
                    shopsparams.productNumber = this.cartsorderdata[i].cartData.amount;
                    shopsparams.productID = this.cartsorderdata[i].cartData.productID;
                    for (let j = 0; j < this.cartsorderdata[i].cartData.attrs.length; j++) {
                        v.push(this.cartsorderdata[i].cartData.attrs[j].param[0].bandPrice);
                        shopsparams.standardID = this.cartsorderdata[i].cartData.attrs[
                            j
                            ].param[0].standardID;
                        shopsparams.colourID = this.cartsorderdata[i].cartData.attrs[
                            j
                            ].param[1].colourID;
                        bodygoumai.push({...shopsparams});
                    }
                }
                this.bodygoumai = bodygoumai;
                this.ordertheid = ordertheid;
                // console.log(ordertheid)
                var s = 0;
                v.forEach(function (val, idx, v) {
                    s += val;
                }, 0);
                return (this.orderprice = s);
            },
            shujutijao() {
                let dandugoumai = [];
                let v = [];
                for (let i = 0; i < this.orderBuy.length; i++) {
                    let shopsparams = {};
                    shopsparams.productNumber = this.orderBuy[i].amount;
                    shopsparams.productID = this.orderBuy[i].productID;
                    for (let j = 0; j < this.orderBuy[i].attrs.length; j++) {
                        v.push(this.orderBuy[i].attrs[j].param[0].bandPrice);
                        shopsparams.standardID = this.orderBuy[i].attrs[
                            j
                            ].param[0].standardID;
                        shopsparams.colourID = this.orderBuy[i].attrs[j].param[1].colourID;
                        dandugoumai.push({...shopsparams});
                    }
                }
                this.dandugoumai = dandugoumai;
                var s = 0;
                v.forEach(function (val, idx, v) {
                    s += val;
                }, 0);
                return (this.orderprice = s);
            },

            contentScroll(position) {
                this.isshowbacktop = -position.y > 1000;
                this.istabfixed = -position.y > this.tabberoffsettop;
            },
            sub() {
                let WXPAY_SERVER = this.$config.baseApi + "/wxPay/pay";
                let ALIPAY_SERVER = this.$config.baseApi + "/zfbPay/toPayApp";
                let bodyall = {};
                if (this.$route.query.cartdata === "1") {
                    let body = {
                        productList: this.bodygoumai,
                        userID: localStorage["uid"],
                        userRemark: sessionStorage["value"],
                        favourMode: this.couponAmount > 0 ? 1 : 0,
                        favourAmount: (this.couponAmount || 0) * 100,
                        favourRelatedCouponID: 0,
                        transportationExpense: 0,
                        userAddressID: sessionStorage["userAddressID"],
                        orderFrom: this.$route.query.orderFrom,
                        cartIDList: this.ordertheid,
                        orderType: this.$route.query.orderFrom
                    };
                    bodyall = body;
                } else {
                    let body = {
                        productList: this.dandugoumai,
                        userID: localStorage["uid"],
                        userRemark: sessionStorage["value"],
                        favourMode: this.couponAmount > 0 ? 1 : 0,
                        favourAmount: (this.couponAmount || 0) * 100,
                        favourRelatedCouponID: 0,
                        transportationExpense: 0,
                        userAddressID: sessionStorage["userAddressID"],
                        orderFrom: this.$route.query.orderFrom,
                        orderType: this.$route.query.orderFrom
                    };
                    bodyall = body;
                }

                if (this.$route.query.list === "jojo") {
                    let orderIDList = {
                        orderIDList: [this.$route.query.orderID],
                        spbillCreateIp: returnCitySN["cip"],
                        type: 1,
                        userID: localStorage["uid"],
                        totalAmount: this.price
                    };
                    let that = this;
                    axios({
                        method: "post",
                        url: this.isactive === 1? ALIPAY_SERVER: WXPAY_SERVER,
                        headers: {
                            "Content-Type": "application/json;"
                        },
                        data: JSON.stringify(orderIDList)
                    }).then(res => {
                        let channel = that.isactive === 1? that.alipayChannel: that.wxpayChannel;
                        plus.payment.request(channel,res.data.data,function(result){
                            plus.nativeUI.alert("支付成功！",function(){

                            });
                        },function(error){
                            plus.nativeUI.alert("支付失败：" + error.code);
                        });
                    });
                } else {
                    let that = this;
                    axios({
                        method: "post",
                        url: this.$config.baseApi + "/order/submit",
                        headers: {
                            "Content-Type": "application/json;"
                        },
                        data: JSON.stringify(bodyall)
                    }).then(res => {
                        //console.log(res)
                        if (res.data.status === 0) {
                            sessionStorage["orderID"] = res.data.data.orderID;
                            sessionStorage["totalAmount"] = res.data.data.totalAmount;
                            sessionStorage["orderIDList"] = res.data.data.orderIDList;

                            let orderIDList = {
                                orderIDList: res.data.data.orderIDList,
                                spbillCreateIp: returnCitySN["cip"],
                                type: 1,
                                userID: localStorage["uid"],
                                totalAmount: res.data.data.totalAmount
                            };
                            // console.log(returnCitySN["cip"])
                            Toast("订单提交成功");
                            
                            axios({
                                method: "post",
                                url: that.isactive === 1? ALIPAY_SERVER: WXPAY_SERVER,
                                headers: {
                                    "Content-Type": "application/json;"
                                },
                                data: JSON.stringify(orderIDList)
                            }).then(res => {
                                console.log(JSON.stringify(res));
                                let channel = that.isactive === 1? that.alipayChannel: that.wxpayChannel;
                                plus.payment.request(channel,res.data.data,function(result){
                                    plus.nativeUI.alert("支付成功！",function(){

                                    });
                                },function(error){
                                    plus.nativeUI.alert("支付失败：" + error.code);
                                });
                            });

                        } else {
                            Toast("订单提交失败");
                        }
                    });
                }
            },
            gobacktohome() {
                this.$router.back();
            },
            Alipaypayment() {
                this.isactive = 1;
                sessionStorage["payStyle"] = true;
            },
            WeChatpayment() {
                this.isactive = 2;
                sessionStorage["payStyle"] = false;
            },

            initWebSocket() {
                //初始化weosocket
                const wsuri = `ws://${process.env.VUE_APP_URL_WS}/websocket/chat/${this.roomName}/${this.userName}`; //ws地址
                this.webSocket = new WebSocket(wsuri);
                this.webSocket.onopen = this.wsonopen;

                this.webSocket.onerror = this.wsonerror;

                this.webSocket.onmessage = this.wsonmessage;
                this.webSocket.onclose = this.wsclose;
            },

            wsonopen() {
                console.log("WebSocket连接成功");
                getMessage(this.roomName, this.userName, "", 4, this.userType);
            },
            wsonerror(e) {
                //错误
                console.log("WebSocket连接发生错误");
            },
            wsonmessage(e) {
                // console.log(e);
                //数据接收
                // const redata = JSON.parse(e.data); // 接收数据
                // this.msg = redata;
                this.msgList = JSON.parse(e.data);

                console.log(this.msgList);

                //接收数据，同时判断数据的类型
                //当为消息类型的数据的时候，显示消息
                //   if (this.msgList.pushType == 4) {
                //     this.number = this.msgList.onlineNum;
                //     localStorage.setItem("onlineNum", this.msgList.onlineNum);
                //   } else {
                //     this.number = localStorage.getItem("onlineNum");
                //   }
                //   if(this.msgList.pushType ==5 && this.msgList.userType ==5 ){
                //     if(this.msgList.productLimitedTime){
                //     this.pushMsg = this.msgList.productLimitedTime
                //     }else{
                //     this.pushMsg = this.msgList.product

                //     }
                //   }
            },

            wssend(agentData) {
                //数据发送
                this.ws.send(agentData);
            },

            wsclose(e) {
                //关闭
                console.log("connection closed (" + e.code + ")");
            }
        }
    };
</script>


<style scoped="scoped">
    /* 头部 */
    #payment {
        /* 视口高度 */
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 99;
        text-align: center;
        height: 1rem;
        align-items: center;
        box-shadow: 0 0.125rem 0.5625rem rgba(100, 100, 100, 0.1);
    }

    .home-nav-left {
        width: 0.5rem;
        height: 100%;
        margin-left: 1.125rem;
    }

    .home-nav-left img {
        width: 100%;
        height: 0.85rem;
    }

    .home-nav-center {
        font-size: 1.225rem;
        color: #333333;
    }

    .paymain {
        margin-top: 1rem;
    }

    .radio {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.3rem;
        height: 0.3rem;
        border: 1px solid #c4c4c4;
        border-radius: 50%;
    }

    .radio-n {
        width: 0.14rem;
        height: 0.14rem;
        border-radius: 50%;
        background: #c4c4c4;
    }

    .active {
        background: #fec627;
    }

    .pay-icon {
        width: 0.28rem;
        height: 0.28rem;
        margin: 0 0.38rem;
    }

    .pay-icon img {
        width: 100%;
        height: 100%;
    }

    .pay1 {
        display: flex;
        align-items: center;
    }

    .pay {
        display: flex;
        align-items: center;
        border-bottom: 0.0625rem #f7f6f6 solid;
        padding: 0.32rem 0.38rem;
    }

    .choose {
        background: #f7f6f6;
        padding: 0.5rem 0.5rem 0.1rem 0.5rem;
        color: #999999;
        font-size: 14px;
    }

    .paymain-pic {
        height: 1rem;
        align-items: center;
        display: flex;
        padding: 0 0.9rem;
        justify-content: space-between;
        color: #999999;
        font-size: 16px;
    }

    .paymain-pic1 {
        color: #333333;
    }

    .queren {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000000;
        font-size: 0.32rem;
        color: #ffffff;
        line-height: 1rem;
        text-align: center;
    }
</style>
