<template>
    <div class="page">
        <SubHeader title="订单详情"></SubHeader>
        <div class='main' style="margin-top: 1.86rem;">
            <div class='list success'>
                <div style="width:100%;height: 1.39rem;display: flex;justify-content: center;">
                    <div style="width: 1.39rem;height: 1.39rem;">
                        <img alt=""
                             src="../../../assets/images/user/orders/zhifuchenggong.png"
                             style="width: 100%;height: 100%;">
                    </div>
                </div>

                <div style="margin-top: 0.48rem;">
                    {{status}}
                </div>
            </div>
            <div class='list ordernum'>
                订单编号：<span>{{orderIDList}}</span></div>
            <div class='list ordernum'>
                实付金额：
                <span style="color: #FF4444;">{{totalAmount/100}}元</span>
            </div>
            <div class='list ordernum'>
                支付方式：
                <span v-if="payStyle">支付宝支付</span>
                <span v-else>微信支付</span>

            </div>


            <div style="width: 100%;display: flex;flex-wrap: wrap;justify-content: center;
			text-align: center;border-top: 1px solid #E5E5E5;padding-top: 1rem;">
                <div @click="backtoorder()"
                     style="border: 1px solid #C3C3C3;width: 1.6rem;height: 0.4rem;margin-right: 0.5rem;">查看订单
                </div>
                <div @click="backtoindex()"
                     style="border: 1px solid #C3C3C3;width: 1.6rem;height: 0.4rem;margin-left: 0.5rem;">返回首页
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapActions, mapState} from "vuex";
    import SubHeader from "../../../components/sub_header";
    import {Dialog} from 'vant';
    import axios from 'axios';

    Vue.use(Dialog);

    export default {
        name: "order-end",
        components: {
            SubHeader
        },
        data() {
            return {
                orderID: "",
                totalAmount: "",
                payStyle: sessionStorage['payStyle'],
                status: ""
            }
        },
        created() {
            console.log("order/PaymentMethod.vue: created()");
            console.log("orderID: " + this.$route.query.orderID);
            this.status = "正在支付...";

            //console.log(sessionStorage['payStyle'] )
            this.orderID = this.$route.query.orderID;
            this.orderIDList = sessionStorage['orderIDList'] || this.orderID;
            this.totalAmount = sessionStorage['totalAmount'];
            // this.$utils.safeUser(this);
            this.getOrderNum();
        },
        mounted(){
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
                        outTradeNo: this.$route.query.out_trade_no
                    }
                }).then(res => {
                    console.log(JSON.stringify(res));
                    this.totalAmount = res.data.data.total_fee;
                    if (res.data.data.trade_state === "SUCCESS") {
                        this.status = "支付成功";
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
                        outTradeNo: this.$route.query.out_trade_no
                    }
                }).then(res => {
                    console.log(JSON.stringify(res));
                    console.log(res.data.data.trade_state);
                    this.totalAmount = res.data.data.total_fee;
                    if (res.data.data.trade_state === "SUCCESS") {
                        this.status = "支付成功";
                        console.log("SUCCESS");
                    } else {
                        this.status = "支付失败";
                        console.log("FAIL");
                    }
                });
            });
        },
        computed: {
            ...mapState({
                orderNum: state => state.order.orderNum
            })
        },
        methods: {
            ...mapActions({
                getOrderNum: "order/getOrderNum"
            }),

            backtoorder() {
                this.$router.push('/user/order')
                sessionStorage.clear()
            },
            backtoindex() {
                this.$router.push('/index')
                sessionStorage.clear()
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #FFFFFF;
        overflow: hidden;
    }

    .main {
        width: 100%;
        margin-top: 1.3rem;
    }

    .main .list {
        width: 100%;
        font-size: 0.32rem;
        text-align: center;
        margin-bottom: 0.2rem;

    }

    .main .list.success {
        margin-top: 0.48rem;
        color: #000000
    }

    .main .list.ordernum {
        padding: 0 0.8rem;
        text-align: left;
        color: #000000
    }

    .main .list.ordernum span {
        /* margin-left: 0.15rem; */
    }

    .main .pay-btn {
        width: 3.2rem;
        height: 0.6rem;
        font-size: 0.28rem;
        color: #000000;
        text-align: center;
        margin: 0 auto;
        line-height: 0.6rem;
        border-radius: 4px;
    }
</style>
