<template>
    <div class="page">

        <div class="order">
            <div class='details-header'>
                <div class='tab-wrap back' @click="goback">
                    <div>确认订单</div>
                </div>
            </div>
        </div>

        <div class='main'>
            <div class='address-wrap' @click="$router.push('/address')">
                <div class='persion-info' v-show="receiverName?true:false">
                    <span>收货人：{{receiverName}}</span><span>{{mobilePhone}}</span>
                </div>
                <div class='address' v-show="receiverName?true:false">
                    <img src="../../../assets/images/home/cart/map.png" alt="收货地址"/>
                    <span>{{showArea}}</span>
                </div>
                <div v-show="!receiverName?true:false" class='address-null' style="display: flex;">
                    <div style="width: 0.5rem;height: 0.5rem;">
                        <img style="width:100%;height:100%;" src="../../../assets/images/home/cart/map.png" alt="收货地址"/>
                    </div>
                    <div>
                        您的收货地址为空,点击添加收货地址
                    </div>
                </div>
                <div class='arrow'></div>
            </div>

            <!-- 多个商品结算 -->
            <div class='goods-wrap' v-show="this.$route.query.cartdata">
                <div style="margin:0 0.4rem;font-weight: bold;color: #333333;">您的订单明细</div>
                <div class='goods-list' v-for="(item,index) in cartsorderdata" :key="index">
                    <div class='image'><img :src="item.cartData.img" alt=""/></div>
                    <div class='goods-param'>
                        <div style="
						display: flex;
						align-items: center;
						justify-content: space-between;">
                            <div class='title'>
                                {{item.cartData.productName}}
                            </div>
                            <div style="font-size: 0.24rem;color: #868686;">
                                ¥{{item.cartData.attrs[0].param[0].bandPrice.toFixed(2)}}
                            </div>
                        </div>
                        <div class='amount'>x{{item.cartData.amount}}</div>
                        <div style="display: flex;align-items: center;justify-content: space-between;">
                            <div class='attr'>
                                颜色:<span v-for="(item2,index2) in item" :key="index2">
									{{item2.attrs[0].param[1].colourName}}
								</span>
                                ;规格:<span v-for="(item2,index2) in item" :key="index2">
									<template>
										{{item2.attrs[0].param[0].standard}}
									</template>
								</span>
                            </div>

                        </div>

                        <!-- <div style="font-size: 12px;color: #EFB02F;">发货时间:付款后七天内发货</div> -->
                    </div>
                </div>
            </div>


            <!-- 单个商品结算 -->
            <div class='goods-wrap' v-show="!this.$route.query.cartdata">
                <div style="margin:0 0.4rem;font-weight: bold;color: #333333;">您的订单明细</div>

                <div class='goods-list' v-for="(item,index) in orderBuy" :key="'inde'+index">
                    <div class='image'><img :src="item.img" alt=""/></div>
                    <div class='goods-param'>
                        <div style="display: flex;align-items: center;justify-content: space-between;">
                            <div class='title'>
                                {{item.productName}}
                            </div>
                            <div style="font-size: 0.24rem;color: #868686;">
                                ¥{{(item.attrs[0].param[0].bandPrice*0.01).toFixed(2)}}
                            </div>
                        </div>
                        <div class='amount'>x{{item.amount}}</div>
                        <div style="display: flex;align-items: center;justify-content: space-between;">
                            <div class='attr'>
                                颜色:<span v-for="(item2,index2) in item.attrs" :key="'inde'+index2">
									<template v-for="(item3) in item2.param">
										{{item3.colourName}}
									</template>
								</span>
                                ;规格:<span v-for="(item2,index2) in item.attrs" :key="index2">
										<span v-for="(item3,index3) in item2.param" :key="index3">
											{{item3.standard}}
										</span>
									</span>
                            </div>
                        </div>

                        <!-- <div style="font-size: 12px;color: #EFB02F;">发货时间:付款后七天内发货</div> -->
                    </div>
                </div>
            </div>

            <!-- 单个结算 -->
            <ul class='total-wrap'>
                <li>商品合计</li>
                <li>
                    <div class='price'>
                        ¥{{price.toFixed(2)}}
                    </div>
                </li>
            </ul>
            <ul class='total-wrap'>
                <li>运费</li>
                <li>¥{{freight.toFixed(2)}}</li>
            </ul>
            <ul class='total-wrap'>
                <li>优惠券</li>
                <li>- ¥{{youhui.toFixed(2)}}</li>
            </ul>
            <ul class='total-wrap' style="border-bottom:solid 8px #F6F6F60;">
                <li>实付</li>
                <li>
					<span>
						<span class='price'>
							¥{{(price-youhui).toFixed(2)}}
						</span>
					</span>
                </li>
            </ul>


            <!-- 订单备注 -->
            <ul class='total-wrap'>
                <li>订单备注</li>
            </ul>
            <ul class='total-wrap orderBeiZhu'>
                <li>
                    <textarea placeholder="您有什么要求请在这里留言，我们会有专人跟您联系" name="" id="" cols="90" rows="10"
                              v-model="value"></textarea>
                </li>
            </ul>


        </div>


        <div class='balance-wrap'>
            <div class='price-wrap'>

				<span>
					<span class='price'>
						¥{{(price - youhui).toFixed(2)}}
					</span>
				</span>
            </div>

            <div class='balance-btn' @click="submitOrder()">提交订单</div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from "vuex";
    // import SubHeader from "../../../components/sub_header";
    import {
        Toast
    } from 'vant'
    import axios from 'axios';

    export default {
        name: "order",
        data() {
            return {
                value: '',
                userAddressID: "",
                receiverName: "",
                mobilePhone: "",
                showArea: "",
                youhui: 0,
            }
        },
        components: {
            // SubHeader
        },
        computed: {
            ...mapState({
                cartsorderdata: state => state.cart.cartsorderdata,
                orderBuy: state => state.cart.orderBuy,
                price: state => state.cart.price,
                couponAmount: state => state.cart.couponAmount,
                couponID: state => state.cart.couponID
            }),
            ...mapGetters({
                total: "cart/total",
                freight: "cart/freight"
            }),
        },
        created() {

            this.clearSession();
            this.$utils.safeUser(this);
            this.isSubmit = true;
            if (this.$route.query.cartdata === '1') {
                this.ADD_CARTORDER_GOODSPRICE()
            } else {
                this.GET_GOODSPRICE()
            }

            axios({
                method: "post",
                url: this.$config.baseApi + "/order/getCouponInfo",
                headers: {
                    "Content-Type": "application/json;"
                },
                params: {
                    userID: localStorage.getItem('uid'),
                    totalAmount: this.price * 100
                }
            }).then(res => {
                console.log(JSON.stringify(res));
                if (res.data.status === 1) {
                    this.youhui = res.data.data.couponAmount / 100;
                    // this.couponID = res.data.data.
                } else {
                    this.youhui = 0;
                }
            });
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        methods: {
            ...mapActions({
                getAddressInfo: "address/getAddressInfo",
                getDefaultAddress: "address/getDefaultAddress",
                addOrder: "order/addOrder",

            }),
            ...mapMutations({
                GET_GOODSPRICE: "cart/GET_GOODSPRICE",
                ADD_CARTORDER_GOODSPRICE: "cart/ADD_CARTORDER_GOODSPRICE",
                APPLY_COUPON: 'cart/APPLY_COUPON'
            }),
            goback() {
                this.$router.go(-1)
                this.orderBuy = this.orderBuy.splice(0, this.orderBuy.length)
                // sessionStorage.clear()
            },
            //选择地址并清空
            clearSession() {
                this.userAddressID = sessionStorage['userAddressID']
                this.receiverName = sessionStorage['receiverName']
                this.mobilePhone = sessionStorage['mobilePhone']
                this.showArea = sessionStorage['province'] + sessionStorage['county'] + sessionStorage['city'] + sessionStorage['address']

            },

            //提交订单
            submitOrder() {

                if (this.isSubmit) {
                    this.isSubmit = false;
                    if (this.receiverName) {
                        this.APPLY_COUPON({
                            couponAmount: this.youhui,
                            couponID: this.couponID
                        });
                        if (this.$route.query.cartdata === '1') {
                            sessionStorage['value'] = this.value
                            this.$router.push("/order/Paymentmethod?orderFrom=" + this.$route.query.orderFrom + "&cartdata=1")
                        } else {
                            sessionStorage['value'] = this.value
                            if (this.$route.query.zhibo) {
                                this.$router.push("/order/Paymentmethod?orderFrom=" + this.$route.query.orderFrom + "&zhibo=1")
                            } else {
                                this.$router.push("/order/Paymentmethod?orderFrom=" + this.$route.query.orderFrom)
                            }
                        }
                    }
                    if (this.receiverName === undefined) {
                        Toast('请选择收货地址')
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #ffffff;
        overflow: hidden;

    }

    .order {
        z-index: 9;
        background-color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .details-header {
        background-color: #ffffff;
        height: 1rem;
        display: flex;
        align-items: center;
        padding: 0 0.22rem;
        /* justify-content: center; */
    }

    .details-header .tab-wrap {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    .order .details-header .back {
        /* 		width:0.4rem;
        height:0.6rem; */
        background-image: url("../../../assets/images/home/goods/back.png");
        background-size: 2.5%;
        background-repeat: no-repeat;
        background-position: left;
    }

    .main {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1.4rem;
    }

    .address-wrap {
        width: 100%;
        height: 1.06rem;
        position: relative;
        z-index: 1;
        border-top: solid 8px #F6F6F6;
        border-bottom: solid 8px #F6F6F6;
    }

    .address-wrap .address-border-wrap {
        width: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
        display: flex;
        display: -webkit-flex;
    }


    .address-wrap .persion-info {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: 0.9rem;
        top: 0.1rem;
        font-size: 0.28rem;
        font-weight: bold;
    }

    .address-wrap .persion-info span:nth-child(1) {
        padding-right: 1rem;
    }

    .address-wrap .address {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: 0.4rem;
        top: 0.6rem;
    }

    .address-wrap .address img {
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        margin-right: 0.1rem;
    }

    .address-wrap .address span {
        font-size: 0.24rem;
    }

    .address-wrap .arrow {
        width: 0.32rem;
        height: 0.32rem;
        background-image: url("../../../assets/images/common/right_arrow.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 1;
        right: 0.2rem;
        top: 0.4rem;
    }

    .address-wrap .address-null {
        width: auto;
        height: auto;
        font-size: 0.28rem;
        position: absolute;
        z-index: 1;
        left: 48%;
        top: 0;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        display: table;
        margin-top: 0.35rem;
        white-space: nowrap;
    }

    .goods-wrap {
        width: 100%;
        margin-top: 0.4rem;
        overflow: hidden;
    }

    .goods-wrap .goods-list {
        width: 90%;
        height: 2rem;
        margin: 0 auto;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin-bottom: 0.4rem;
    }

    .goods-wrap .goods-list .image {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.3rem;
        box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.1);
    }

    .goods-wrap .goods-list .image img {
        width: 100%;
        height: 100%;
    }

    .goods-wrap .goods-list .goods-param {
        width: 75%;
    }

    .goods-wrap .goods-list .goods-param .title {
        width: 80%;
        /* height:0.4rem; */
        overflow: hidden;
        font-size: 0.28rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .goods-wrap .goods-list .attr {
        width: 95%;
        height: 0.4rem;
        font-size: 0.28rem;
        margin-top: 0.1rem;
        color: #868686;
        font-size: 0.28rem;

        /* text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        /* display: -webkit-box; */


    }

    .goods-wrap .goods-list .attr span {
        /* padding-right: 0.3rem; */
    }

    .goods-wrap .goods-list .amount {
        font-size: 0.24rem;
        color: #868686;
        margin-top: 0.1rem;
        text-align: right;
    }

    .goods-wrap .goods-list .price {
        font-size: 0.28rem;
        color: #F51D2A;
        margin-top: 0.1rem;
        margin-left: -0.07rem;
    }

    .total-wrap {
        width: 92%;
        margin: 0 auto;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size: 0.32rem;
        margin-bottom: 0.3rem;
    }

    .orderBeiZhu {

        height: 2rem;
        /* border: 1px solid rgba(157,153,153,1); */
    }

    .orderBeiZhu li textarea {
        width: 100%;
        height: 100%;
    }

    .total-wrap li:nth-child(1) {
        color: #787878;
    }

    .total-wrap li:nth-child(2) {
        color: #000000;
    }

    .balance-wrap {
        width: 100%;
        height: 1rem;
        border-top: 1px solid #EFEFEF;
        position: fixed;
        z-index: 5;
        left: 0;
        bottom: 0;
        background-color: #FFFFFF;
        display: flex;
        display: -webkit-flex;
    }

    .balance-wrap .price-wrap {
        flex: 2;
        -webkit-flex: 2;
        text-align: left;
        line-height: 1rem;
        padding-left: 0.2rem;
        font-size: 0.32rem;
    }

    .balance-wrap .price-wrap span:nth-child(2) {
        color: #000000;
    }

    .balance-wrap .balance-btn {
        flex: 1;
        -webkit-flex: 1;
        background-color: #000000;
        font-size: 0.32rem;
        color: #FFFFFF;
        line-height: 1rem;
        text-align: center;
    }
</style>
