<template>
    <div class='page'>
        <SubHeader title="订单详情"></SubHeader>
        <div :key='index' class='main' v-for="(item,index) in orderInfo">
            <!-- <div class='ordernum'>订单编号：{{orderInfo.orderID}}</div> -->
            <div class='address-wrap'>
                <div class='address-info' v-show="item.deliverAddress">
                    <div class='name'>
                        <img alt=""
                             src="../../../assets/images/common/dingwei.png"/>
                        <span>发货人：</span>{{item.deliverName}}
                    </div>
                    <div class='cellphone'>
                        {{item.deliverPhoneNum}}
                    </div>
                    <div class='address'>
                        {{item.expressTime}}
                    </div>
                </div>
                <div class='address-info'>
                    <div class='name'>
                        <img alt=""
                             src="../../../assets/images/common/dingwei.png"/>
                        <span>收货人：</span>{{item.receiverName}}
                    </div>
                    <div class='cellphone'>
                        {{item.receiverPhoneNum}}
                    </div>
                    <div class='address'>
                        {{item.receiverProvince}}
                        {{item.receiverCity}}
                        {{item.receiverCounty}}
                        {{item.receiverAddress}}
                    </div>
                </div>

            </div>

            <div class='buy-title'>您的订单明细</div>
            <div class='goods-list'>
                <div class='image'>
                    <img :src="item.productTitleImage" alt=""/>
                </div>
                <div class='goods-info'>
                    <div class='title'>{{item.productName}}</div>
                    <div class='attr'>
                        <span class='amount'>{{item.productColour}}</span>
                        <span class='amount'>{{item.productStandard}}</span>
                    </div>
                </div>
                <div class="price">
                    <div class="total-price" style="color: red;">￥{{(item.totalAmount * 0.01).toFixed(2)}}</div>
                    <div>x{{item.productNumber}}</div>
                </div>
            </div>
            <div class='total-wrap'>
                <ul class='total'>
                    <li>商品合计</li>
                    <li>¥{{(item.totalAmount*0.01).toFixed(2)}}</li>
                </ul>
                <ul class='total'>
                    <li>运费</li>
                    <li>¥0</li>
                </ul>
                <ul class='total'>
                    <li>优惠券</li>
                    <li>{{ item.favourAmount === 0? '不使用优惠券': ('-¥' + item.favourAmount * .01) }}</li>
                </ul>
                <ul class='total'>
                    <li>实付</li>
                    <li>¥{{(item.finalAmount*0.01).toFixed(2)}}</li>
                </ul>
                <ul class='total' style="border-bottom:#F6F6F6 0.2rem solid;">
                    <li>订单编号</li>
                    <li>{{item.orderID}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import SubHeader from "../../../components/sub_header";
    import axios from "axios"
    import Vue from "vue"
    import {Toast} from "vant"

    Vue.use(Toast);
    export default {
        name: "order-details",
        data() {
            return {
                orderInfo: [],
                ordernum: this.$route.query.ordernum ? this.$route.query.ordernum : ""
            }
        },
        components: {
            SubHeader
        },
        computed: {},
        methods: {
            ...mapActions({
                getOrderInfo: "order/getOrderInfo"
            })
        },
        created() {
            this.$utils.safeUser(this);
            axios({
                method: "post",
                url: this.$config.baseApi + "/order/getOrderDetail",
                headers: {
                    "Content-Type": "application/json;"
                },
                data: {
                    orderIDList: [this.ordernum]
                }
            }).then(res => {
                if (res.data.status === 0) {
                    this.orderInfo = res.data.data
                    // console.log(this.orderInfo)
                } else {
                    Toast(res.data.message)
                }

            })
        },
        mounted() {
            document.title = this.$route.meta.title;
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

    .sub-header {
        width: 100%;
        height: 1rem;
        background-color: #FFFFFF;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 1px solid #EFEFEF;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
    }

    .sub-header .back {
        width: 0.8rem;
        height: 0.8rem;
        background-image: url("../../../assets/images/home/goods/back.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .sub-header .title {
        width: 79%;
        height: auto;
        font-size: 0.32rem;
        text-align: center;
    }

    .sub-header .right-btn {
        width: auto;
        height: auto;
        font-size: 0.32rem;
    }

    .main {
        width: 100%;
        padding-top: 1.02rem;
    }

    .ordernum {
        width: auto;
        height: auto;
        font-size: 0.28rem;
        padding-left: 5%;
        padding-top: 0.2rem;
    }

    .address-wrap {
        border-top: #F6F6F6 0.2rem solid;
        border-bottom: #F6F6F6 0.2rem solid;
        width: 100%;
    }

    .address-wrap .skew-wrap {
        width: 100%;
        height: 0.08rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }


    .address-wrap .address-info {
        width: 100%;
        height: 1.8rem;
        background-color: #FFFFFF;
        position: relative;
        z-index: 1;
    }

    .address-wrap .address-info .name {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: 5%;
        top: 0.3rem;
        font-size: 0.28rem;
    }

    .address-wrap .address-info .name img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.2rem;
        vertical-align: middle;
    }

    .address-wrap .address-info .cellphone {
        width: auto;
        height: auto;
        position: absolute;
        right: 5%;
        top: 0.3rem;
        font-size: 0.28rem;
    }

    .address-wrap .address-info .address {
        width: 95%;
        height: 0.8rem;
        overflow: hidden;
        font-size: 0.28rem;
        position: absolute;
        z-index: 1;
        left: 10%;
        top: 0.9rem;
        color: #848689;
        margin-left: 0.2rem;
    }

    .buy-title {
        width: 100%;
        height: 0.8rem;

        font-size: 0.28rem;
        line-height: 0.8rem;
        padding-left: 5%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .goods-list {

        width: 100%;
        height: 1.6rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .goods-list .image {
        width: 1.2rem;
        height: 1.2rem;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 1);
    }

    .goods-list .image img {
        width: 100%;
        height: 100%;
    }

    .goods-list .goods-info {
        width: 4rem;
        height: auto;
    }

    .goods-list .price {
        font-size: 0.28rem;
        text-align: right;
    }

    .good-list .price .total-price {
        color: red;
    }

    .goods-list .goods-info .title {
        width: 100%;
        height: 0.8rem;
        font-size: 0.28rem;
    }

    .goods-list .goods-info .attr {
        width: 100%;
        height: auto;
        font-size: 0.24rem;
    }

    .goods-list .goods-info .attr .amount {
        color: #848689;
    }

    .goods-list .goods-info .attr span {
        padding-right: 0.3rem;
    }

    .order-status {
        width: 100%;
        height: 0.8rem;
        border-bottom: 1px solid #EFEFEF;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        font-size: 0.28rem;
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .total-wrap {
        width: 100%;
        height: 1.4rem;
    }

    .total-wrap .total {
        width: 100%;
        height: auto;
        font-size: 0.28rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin-top: 0.3rem;
    }

    .total-wrap .total li {
        color: #000000;
    }

    .true-total {
        width: 100%;
        height: 1rem;
    }

    .true-total .total {
        width: auto;
        text-align: right;
        font-size: 0.28rem;
        padding-right: 2%;
        margin-top: 0.2rem;
    }

    .true-total .total span {
        color: #f15353;
    }

    .true-total .order-time {
        width: auto;
        text-align: right;
        font-size: 0.24rem;
        padding-right: 2%;
        margin-top: 0.1rem;
        color: #848689;
    }
</style>
