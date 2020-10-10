<template>
    <div>
        <div style="color:rgba(154,154,154,0.5);font-size: 0.3rem;text-align: center;margin-top:.3rem"
             v-show="orders.length == 0">
            暂无商品快去下单吧
        </div>
        <!-- 全部订单 -->
        <div :key="'ind'+index2" @click="$router.push('/user/order/details?ordernum='+item2.orderID)" class='order-list'
             v-for="(item2,index2) in orders" v-show='$route.query.status ==="all"'>

            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item2.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">
                    {{item2.orderState==0?'等待买家付款':item2.orderState==1?'买家已付款':item2.orderState==2?'卖家已发货':item2.orderState==3?'买家已收货':item2.orderState==4?'已申请售后':''}}
                </div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img :data-echo="item2.productTitleImage" alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                        {{item2.productName}}
                    </div>
                    <div style="color: #999999;font-size: 0.28rem;">
                        {{item2.productColour}};{{item2.productStandard}}
                    </div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;
					justify-content: space-between;
					margin-top: 0.2rem;">
                        <div>¥{{(item2.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item2.productNumber}}</div>
                    </div>
                </div>
                <div class='amount' style="text-align: right;color: #232323;">
                    <div>共计<span>{{item2.productNumber}}</span>
                        件商品¥{{(item2.totalAmount*0.01).toFixed(2)}}(含运费¥0.00)
                    </div>
                </div>
            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class="status-wrap">
                    <div @click.stop="cancelOrdertwo(index2,item2.orderID)" class='status-btn'
                         style="border: 1px solid #CCCCCC;"
                         v-if="item2.orderState===0">取消订单
                    </div>
                    <div class='status-btn' v-if="item2.orderState===9">已评价</div>
                    <div class='status-btn' style="border: 1px solid #CCCCCC;"
                         v-if="item2.orderState===11">订单已取消
                    </div>
                    <div class='status-btn' v-if="item2.orderState===4">已申请售后</div>
                    <div @click.stop="sureOrder(index2,item2)"
                         class='status-btn'
                         v-if="item2.orderState!==11">
                        付款
                    </div>
                </div>
            </div>
        </div>
        <!-- //去付款 -->

        <div :key="index3"
             @click="$router.push('/user/order/details?ordernum='+item3.orderID)"
             class='order-list' v-for="(item3,index3) in ordersPay"
             v-show='$route.query.status ==="0"'>
            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item3.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">
                    {{item3.orderState==0?'等待买家付款':''}}
                </div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img :data-echo="item3.productTitleImage" alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">{{item3.productName}}</div>
                    <div style="color: #999999;font-size: 0.28rem;">
                        {{item3.productColour}};{{item3.productStandard}}
                    </div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;justify-content: space-between;margin-top: 0.2rem;">
                        <div>¥{{(item3.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item3.productNumber}}</div>
                    </div>
                </div>
                <div class='amount' style="text-align: right;color: #232323;">
                    <div>共计<span>{{item3.productNumber}}</span>
                        件商品¥{{(item3.totalAmount*0.01).toFixed(2)}}(含运费¥0.00)
                    </div>
                </div>
            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class="status-wrap">
                    <div @click.stop="cancelOrdertwo(index3,item3.orderID)"
                         class='status-btn'
                         style="border: 1px solid #CCCCCC;"
                         v-if="item3.orderState===0">取消订单
                    </div>
                    <div @click.stop="sureOrder(index3,item3)"
                         class='status-btn'
                         v-if="item3.orderPaymentState == 9">
                        付款
                    </div>
                </div>
            </div>
        </div>

        <!-- //待发货ordersOut-->
        <div :key="index4"
             @click="$router.push('/user/order/details?ordernum='+item4.orderID)"
             class='order-list'
             v-for="(item4,index4) in ordersOut"
             v-show='$route.query.status ==="1"'>

            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item4.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">
                    {{item4.orderState==1?'买家已付款':''}}
                </div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img
                            :data-echo="item4.productTitleImage"
                            alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                        {{item4.productName}}
                    </div>
                    <div
                            style="color: #999999;font-size: 0.28rem;">
                        {{item4.productColour}};{{item4.productStandard}}
                    </div>
                    <div style="color: #999999;font-size: 0.2rem;">预计15天内送达</div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;justify-content: space-between;
					margin-top: 0.2rem;">
                        <div>¥{{(item4.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item4.productNumber}}</div>
                    </div>
                </div>

            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class="status-wrap">
                    <div class='amount'
                         style="text-align: right;color: #232323;font-size: 0.2rem;">
                        <div>共计<span>{{item4.productNumber}}</span>
                            件商品¥{{(item4.totalAmount*0.01).toFixed(2)}}(含运费¥0.00)
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- //待收货orderFrom -->
        <div :key="index5" @click="$router.push('/user/order/details?ordernum='+item5.orderID)"
             class='order-list'
             v-for="(item5,index5) in orderFrom" v-show='$route.query.status ==="2"'>
            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item5.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">
                    {{item5.orderState==2?'买家已发货':''}}
                </div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img :data-echo="item5.productTitleImage" alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                        {{item5.productName}}
                    </div>
                    <div style="color: #999999;font-size: 0.28rem;">
                        {{item5.productColour}};{{item5.productStandard}}
                    </div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;justify-content: space-between;
					margin-top: 0.2rem;">
                        <div>¥{{(item5.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item5.productNumber}}</div>
                    </div>
                </div>
                <div class='amount' style="text-align: right;color: #232323;">
                    <div>共计<span>{{item5.productNumber}}</span>
                        件商品¥{{(item5.totalAmount*0.01).toFixed(2)}}(含运费¥0.00)
                    </div>
                </div>
            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class="status-wrap">
                    <div class='status-btn' v-if="item5.orderState===2"
                    <div @click.stop="sureOrdertheer(index5,item5)"
                         class='status-btn'
                         style="border: 1px solid #CCCCCC;">
                        {{item5.orderState==2?'确认收货':'已收货'}}
                    </div>
                </div>
            </div>
        </div>
        <!-- //待评价orderAppraised-->
        <div :key="index1" @click="$router.push('/user/order/details?ordernum='+item1.orderID)" class='order-list'
             v-for="(item1,index1) in orderAppraised"
             v-show="$route.query.status === '3'">
            <!-- <div v-show="orderAppraised.length === 0" style="color: rgb(154,154,154);font-size: 0.24rem;">暂无商品快去添加吧</div> -->
            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item1.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">
                    {{item1.orderState==3?'买家已收货':''}}
                </div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img :data-echo="item1.productTitleImage" alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                        {{item1.productName}}
                    </div>
                    <div style="color: #999999;font-size: 0.28rem;">
                        {{item1.productColour}};{{item1.productStandard}}
                    </div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;justify-content: space-between;
					margin-top: 0.2rem;">
                        <div>¥{{(item1.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item1.productNumber}}</div>
                    </div>
                </div>
                <div class='amount' style="text-align: right;color: #232323;">
                    <div>共计<span>{{item1.productNumber}}</span>
                        件商品¥{{(item1.totalAmount*0.01*item1.productNumber).toFixed(2)}}(含运费¥0.00)
                    </div>
                </div>
            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class="status-wrap">
                    <div @click.stop="shegqqingshouhuo(item1)" class='status-btn' v-if="item1.orderFrom===0">申请售后</div>
                    <div @click.stop="subgotoreview(item1,index1)" class='status-btn' v-show="item1.orderFrom==0">
                        去评价
                    </div>
                    <div class='status-btn' v-show="item1.orderFrom==1">
                        已评价
                    </div>
                </div>
            </div>
        </div>
        <!-- 售后/退款 -->
        <div :key="index6" @click="$router.push('/user/order/details?ordernum='+item6.orderID)"
             class='order-list' v-for="(item6,index6) in shouhou"
             v-show='$route.query.status ==="4"'>
            <!-- <div v-show="shouhou.length === 0" style="color: rgb(154,154,154);font-size: 0.24rem;">暂无商品快去添加吧</div> -->
            <div class='ordernum-wrap'>
                <div class='ordernum'>订单编号：{{item6.orderID}}</div>
                <div class='ordernum' style="color:#EFB02F;">{{item6.orderState==4?'已申请售后':''}}</div>
            </div>
            <div class='item-list'>
                <div class='image'>
                    <img :data-echo="item6.productTitleImage"
                         alt="" src="../../../assets/images/common/lazyImg.jpg"/>
                </div><!-- productColour  productStandard -->
                <div class='title'>
                    <div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                        {{item6.productName}}
                    </div>
                    <div style="color: #999999;font-size: 0.28rem;">
                        {{item6.productColour}};{{item6.productStandard}}
                    </div>
                    <div style="
					color: #333333;font-size: 0.22rem;
					display: flex;justify-content: space-between;
					margin-top: 0.2rem;">
                        <div>¥{{(item6.totalAmount*0.01).toFixed(2)}}</div>
                        <div>x{{item6.productNumber}}</div>
                    </div>
                </div>
                <!--  -->
            </div>
            <div class='total-wrap'>
                <div class='total'></div>
                <div class='amount' style="text-align: right;color: #232323;font-size: 0.2rem;">
                    <div>共计<span>{{item6.productNumber}}</span>
                        件商品¥{{(item6.totalAmount*0.01).toFixed(2)}}(含运费¥0.00)
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    import Vue from 'vue';
    import {mapActions, mapMutations, mapState} from "vuex";
    import axios from "axios"
    import {Dialog, Toast} from 'vant';

    Vue.use(Toast);
    export default {
        name: "order-list",
        computed: {
            ...mapState({
                orders: state => state.order.orders, //全部订单
                ordersPay: state => state.order.ordersPay, //待付款
                ordersOut: state => state.order.ordersOut, //待发货
                orderFrom: state => state.order.orderFrom, //待收货
                orderAppraised: state => state.order.orderAppraised, //待评价
                shouhou: state => state.order.shouhou, //售后

            })
        },
        mounted() {
            //console.log(this.ordersPay.length)
        },
        created() {
            this.status = this.$route.query.status ? this.$route.query.status : "all";
            this.getData();
        },

        beforeRouteUpdate(to, from, next) {
            this.status = to.query.status;
            this.getData();
            next();
        },
        methods: {
            ...mapActions({
                getMyOrder: "order/getMyOrder",
                cancelOrder: "order/cancelOrder",
                sureOrderthree: "order/sureOrderthree",
                getshouhouorderID: "order/getshouhouorderID",
            }),
            ...mapMutations({
                ADD_ORDER: "cart/ADD_ORDER",
                SET_REVIEW_SERVICES: "order/SET_REVIEW_SERVICES",
                SUM_TOORDER: "cart/SUM_TOORDER",
            }),
            getData() {
                this.getMyOrder({
                    orderState: this.$route.query.status,
                    success: () => {
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            },
            // //取消订单
            cancelOrdertwo(index, orderID) {
                Dialog.confirm({
                    title: '',
                    message: '确认要取消吗？'
                }).then(() => {
                    //取消订单
                    // console.log(orderID)
                    this.cancelOrder({
                        orderID: orderID,
                        success: (res) => {
                            // console.log(res)
                            if (res.status === 0) {
                                Toast(res.message)
                                this.getMyOrder({
                                    success: () => {
                                        this.$nextTick(() => {
                                            this.$utils.lazyImg();
                                            Vue.set(this.orders)
                                        });
                                    }
                                })
                            } else {
                                Toast(res.message)
                            }
                        }
                    })
                    //
                }).catch(() => {

                })
            },
            //去付款
            sureOrder(index, item) {
                if (item.orderState === 0) {


                    let a = {
                        "orderList": [item.orderID],
                        "productList": [{
                            "productID": item.productID,
                            "standardID": item.productStandardID,
                            "colourID": item.productColourID,
                            "productNumber": item.productNumber
                        },],
                        "userID": localStorage['uid']
                    }

                    axios({
                        method: "post",
                        url: this.$config.baseApi + "/order/calculate",
                        headers: {
                            "Content-Type": "application/json;"
                        },
                        data: JSON.stringify(a)
                    }).then(res => {
                        if (res.data.status === 0) {
                            this.SUM_TOORDER({
                                price: res.data.data.totalAmount * .01
                            });
                            this.$router.push("/order/Paymentmethod?orderFrom=1&list=jojo&orderID=" + item.orderID);
                        } else {
                            Toast(res.data.message)
                        }

                    })


                }
            },
            //确认收获
            sureOrdertheer(index, item) {
                this.sureOrderthree({
                    orderID: item.orderID,
                    success: (res) => {
                        if (res.status === 0) {
                            Toast(res.message)
                            this.getMyOrder({
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                        Vue.set(this.orders)
                                    });
                                }
                            })
                        } else {
                            Toast(res.message)
                        }

                    }
                })
            },
            subgotoreview(item, index) {
                // console.log(this.orderAppraised)
                this.$router.push('/user/order/add_review')
                this.SET_REVIEW_SERVICES({
                    reviewServices: item,
                })
            },

            shegqqingshouhuo(item) {
                this.getshouhouorderID({
                    orderID: item.orderID,
                    success: (res) => {
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                            this.getMyOrder({
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                        Vue.set(this.orders)
                                    });
                                }
                            })
                        });
                        if (res.status === 0) {

                            Toast(res.message)
                        } else {
                            Toast(res.message)
                        }
                    }
                })
            }

        },


    }
</script>

<style scoped>
    .order-list {
        border-bottom: 0.26rem solid #F2F2F2;
        padding: 0.3rem 0.24rem;
        box-sizing: border-box;
        width: 100%;
        height: auto;
    }

    .order-list .ordernum-wrap {
        width: 96%;
        height: 0.8rem;
        border-bottom: #EFEFEF 1px solid;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%;
        align-items: center;
        -webkit-align-items: center;
    }

    .order-list .ordernum-wrap .ordernum,
    .order-list .ordernum-wrap .status {
        width: auto;
        height: auto;
        font-size: 0.28rem;
        color: #999999;
    }

    .item-list {
        width: 100%;
        height: 2.3rem;
        border-bottom: #EFEFEF 1px solid;
        position: relative;
        z-index: 1;

    }

    .item-list .image {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        z-index: 1;
        left: 2%;
        top: 0.2rem;
    }

    .item-list .image img {
        width: 100%;
        height: 100%;
    }

    .item-list .title {
        width: 72%;
        height: auto;
        font-size: 0.28rem;
        position: absolute;
        z-index: 1;
        left: 22%;
        top: 0.2rem;
    }

    .item-list .amount {
        width: 72%;
        height: auto;
        position: absolute;
        z-index: 1;
        left: 22%;
        bottom: 0.2rem;
        font-size: 0.24rem;
        color: #909090;

    }

    .total-wrap {
        width: 96%;
        height: 0.8rem;
        /* border-bottom: 1px solid #F17F1F; */
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%;
    }

    .total-wrap .total {
        font-size: 0.28rem;
    }

    .total-wrap .status-btn {
        font-size: 0.24rem;
        width: auto;
        min-width: 1.5rem;
        height: 0.52rem;
        line-height: 0.52rem;
        text-align: center;
        border: 1px solid #EFB02F;
        border-radius: 0.5rem;
        margin-left: 0.2rem;
    }

    .total-wrap .status-wrap {
        display: flex;
        width: auto;
        justify-content: flex-end;
    }
</style>
