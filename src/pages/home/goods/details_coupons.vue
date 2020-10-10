<template>
    <div id="coupon">

        <SubHeader title="优惠券"></SubHeader>

        <div class="maintoc">
            <div title="未使用">

                <div :key="index" class="nouse" v-for="(item, index) in coupons">
                    <div class="nouse-main">
                        <div class="nouse-main1">
                            <div class="nouse-header">
                                <div class="nouse-header-img">
                                    <img src="../../../assets/images/user/member/activestart.png">
                                </div>
                                <div class="nouse-header-text">
                                    {{item.couponName}}
                                </div>
                            </div>
                            <div class="nouse-main1-t1">全场满{{item.discountLimit}}可用</div>
                            <div class="nouse-main1-t2">有效期{{dateFormat(new
                                Date(item.couponBeginTime))}}至{{dateFormat(new Date(item.couponEndTime)) }}
                            </div>
                        </div>
                        <div class="nouse-main2">
                            <div>{{item.couponAmount}}</div>
                            <div>元</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SubHeader from '../../../components/sub_header/index.vue'
    import Vue from 'vue';
    import {mapActions, mapState} from "vuex";
    import {CouponCell, CouponList, Tab, Tabs} from 'vant';

    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(CouponCell);
    Vue.use(CouponList);
    export default {
        data() {
            return {
                active: 0,
                list: [1, 2, 3]
            }
        },
        computed: {
            ...mapState({
                coupons: state => state.coupon.coupons,
                userType: state => state.user.userType
            })
        },
        created() {
            this.getAcceptedableCouponList({
                uid: localStorage.getItem('uid'),
                userType: this.userType,
                couponReleaseWindow: 3
            });
        },
        methods: {
            ...mapActions({
                getAcceptedableCouponList: "coupon/getAcceptedableCouponList"
            }),

            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            },

            dateFormat(time) {
                return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
            },

            change(index) {
                // console.log(name, title);
                this.getcoupondata({
                    param: index + 1,
                    uid: localStorage['uid'],
                });
                console.log(this.coupons)
            }
        },
        components: {
            SubHeader,
        },

    }
</script>

<style>


    #coupon {
        width: 100vw;
        height: 100vh;

        overflow-x: hidden;
        overflow-y: scroll;
    }

    .maintoc {
        margin-top: 1rem;
        width: 100vw;
        height: 100%;
    }

    #coupon::-webkit-scrollbar {
        display: none;
    }

    .maintoc .nouse {
        height: 2.4675rem;
        width: 90%;
        background-image: url("../../../assets/images/user/member/nouse.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: 0.235rem 0.329rem;
        padding: 0.141rem;
        box-sizing: border-box;
        position: relative;
    }

    .maintoc .nouse2 {
        height: 2.4675rem;
        width: 90%;
        background-image: url("../../../assets/images/user/member/user.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: 0.235rem 0.329rem;
        padding: 0.141rem;
        box-sizing: border-box;
        position: relative;
    }

    .maintoc .nouse3 {
        height: 2.4675rem;
        width: 90%;
        background-image: url("../../../assets/images/user/member/fuck.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: 0.235rem 0.329rem;
        padding: 0.141rem;
        box-sizing: border-box;
        position: relative;
    }

    .maintoc .nouse3 .nouse-main .nouse-main2 {
        background-image: url("../../../assets/images/user/member/isfuck.png");
        background-repeat: no-repeat;
        background-position: top right;
        background-size: 60%;
        opacity: 0.5;
        z-index: 9;
    }


    .maintoc .nouse .nouse-header {
        width: auto;
        display: flex;
        position: relative;
        align-items: center;
    }

    .maintoc .nouse .nouse-header .nouse-header-img {
        width: 0.2155rem;
        height: 0.188rem;
        position: relative;
        margin-right: 0.047rem;
    }

    .maintoc .nouse .nouse-header .nouse-header-img img {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .maintoc .nouse .nouse-header .nouse-header-text {
        font-size: 0.235rem;
        font-family: DFPHeiW9-GB;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.3055rem;
        background: linear-gradient(-90deg, rgba(247, 203, 123, 1) 1.123046875%, rgba(237, 227, 182, 1) 23.3154296875%, rgba(247, 202, 122, 1) 49.7802734375%, rgba(237, 227, 182, 1) 78.2470703125%, rgba(247, 202, 122, 1) 98.4130859375%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .maintoc .nouse .nouse-main {
        display: flex;
        align-items: center;
        color: #FFFFFF;
        justify-content: space-between;
        padding: 0 0.255rem;
        box-sizing: border-box;

    }

    .maintoc .nouse .nouse-main .nouse-main1 .nouse-main1-t1 {
        margin-top: 0.255rem;
        font-size: 0.3995rem;
        font-family: PingFang SC;
    }

    .maintoc .nouse .nouse-main .nouse-main1 .nouse-main1-t2 {
        font-size: 0.2115rem;
        opacity: 0.5;
        margin: 0.255rem 0;
    }

    .maintoc .nouse .nouse-main .nouse-main2 {
        width: 2.397rem;
        height: 1.9505rem;
        right: 0;
        position: absolute;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .maintoc .nouse .nouse-main .nouse-main2 div:nth-child(1) {
        width: auto;
        height: auto;
        font-size: 0.6rem;
        line-height: 0.3055rem;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    }

    .maintoc .nouse .nouse-main .nouse-main2 div:nth-child(2) {
        height: auto;
        font-size: 0.3055rem;
        margin-left: 0.1175rem;
        margin-top: 0.1175rem;
        font-family: PingFang SC;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
        line-height: 13px;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    }

</style>
