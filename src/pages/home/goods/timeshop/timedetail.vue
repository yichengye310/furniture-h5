<template>
    <div class="page">
        <div class="swpier-wrap swiper-container" ref="swpier-wrap">
            <div class="swiper-wrapper">
                <div :key="index" class="swiper-slide" v-for="(items,index) in details.commonImage">
                    <img :src="items.imageUrl" alt/>
                </div>
            </div>
            <div class="swiper-pagination" ref="swiper-pagination3"></div>
        </div>

        <div class="goods-ele-main">
            <div class="goods-title">
                <div class="goods-title-all">
                    <div class="goods-title-price">
                        <div class="goods-title-pricefont">
                            <div>抢购价</div>
                            <div>
                                <span>{{details.alreadyRobbedNum}}</span>件已售
                            </div>
                        </div>

                        <div class="goods-title-pricereal" v-if="!details.full">
                            <div>¥{{(productLimitedTimeStandardsDTOS.discountPrice*0.01).toFixed(2)}}</div>
                            <div>原价¥{{(productLimitedTimeStandardsDTOS.originalPrice*0.01).toFixed(2)}}</div>
                        </div>
                        <div class="goods-title-pricereal" v-if="details.full">
                            <div>¥{{((details.full - details.reduce)*0.01).toFixed(2)}}</div>
                            <div>原价¥{{(productLimitedTimeStandardsDTOS.originalPrice*0.01).toFixed(2)}}</div>
                        </div>
                    </div>

                    <div class="goods-title-time">
                        <div class="goods-title-timetwo">
                            <div class="goods-title-time2">限时抢购</div>
                            <div class="goods-title-time3">
                                <van-count-down :time="time" format="距结束DD天HH:mm:ss"></van-count-down>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                    style="
			margin-top: 10px;
			margin-left: 16px;
			font-size:8px;
			font-family:Hiragino Sans GB;
			color: #EB2626;background:rgba(235,38,38,.1);border-radius:3px;"
                    v-if="details.full"
            >满{{(details.full*0.01).toFixed(2)}}减{{(details.reduce*0.01).toFixed(2)}}
            </button>
            <div class="price1 price">{{details.productName}}</div>
            <div
                    class="price2 price"
                    style="font-size: 14px;color: #B5B5B5;margin-top: 0.2rem;"
            >{{details.productDescription}}
            </div>

            <ul class="sales-wrap" style="color: #000000;">
                <li>
                    <div>发货</div>
                    <div
                            style="
						flex: 1;
						width: 100%;
						font-size: 14px;
						margin-left: 0.2rem;
						display: flex;
						justify-content:space-between;"
                    >
                        <div>
                            <span style="color: #B5B5B5;">苏州</span>
                            <span style="margin:0 0.2rem;">|</span>快递
                            <span style="color: #B5B5B5;">:0.00</span>
                        </div>
                        <!-- <div style="color: #B5B5B5;font-size: 14px;">销量0</div> -->
                    </div>
                </li>
                <li @click="isLogin?showPanelbuy():$router.push('/login')" class="colorthename">
                    <div>颜色</div>
                    <div
                            :key="index3"
                            style="display: flex;"
                            v-for="(item3,index3) in details.productLimitedTimeStandardsDTOS"
                    >
                        <div
                                :key="index4"
                                style="border-radius:2px;height: auto;
						margin-left: 0.2rem;padding: 0.14rem;"
                                v-for="(item4,index4) in item3.productLimitedTimeStandardsColour"
                        >
                            <span style="color: #B5B5B5;">{{item4.colourName}}</span>
                        </div>
                    </div>
                </li>
                <li @click="isLogin?showPanelbuy():$router.push('/login')" class="colorthename">
                    <div>规格</div>
                    <div
                            :key="index"
                            style="border-radius:2px;height: auto;margin-left: 0.2rem;padding: 0.14rem;color: #B5B5B5;"
                            v-for="(item3,index) in details.productLimitedTimeStandardsDTOS"
                    >{{item3.standard}}
                    </div>
                </li>

                <!-- <li>
                            <div>材质</div>
                            <div style="margin-left: 0.2rem;font-size: 0.28rem;color: #B5B5B5;">{{details.material}}</div>
                </li>-->
            </ul>
        </div>
        <!-- <div class='reviews-main'>
                <div class="reviews-title" style="font-size: 0.28rem;color: #000000;">商品评价</div>
                <div class="no-data" v-show="details.productComments" style="font-size: 0.28rem;color: rgb(154,154,154,0.2);">暂无评价！</div>
        </div>-->
        <div class="contenthtmltitle" v-show="productLimitedTimeDetail">
            <div></div>
            宝贝详情
            <div></div>
        </div>
        <div class="contenthtml">
            <div class="content" v-html="productLimitedTimeDetail"></div>
        </div>
        <!-- 底部按键 -->
        <div class="bottom-btn-wrap">
            <div class="btn" style="display: flex;align-items: center;border-top: 1px solid #eaeaea;">
                <div @click="kefudianhua" id="cart-icon1" style="border:none;flex: 1;">
                    <div style="display: flex;justify-content: center;">
                        <div style="width: 0.4rem;height: 0.36rem;">
                            <div class="cart-icon1"></div>
                        </div>
                    </div>
                </div>
                <div
                        @click="$router.push('/cart?from=goods_details')"
                        id="cart-icon2"
                        style="position: relative;border-left: 1px solid #EAEAEA;flex: 1;"
                >
                    <div style="display: flex;justify-content: center;">
                        <div style="width: 0.4rem;height: 0.36rem;">
                            <div class="cart-icon2"></div>
                        </div>
                    </div>
                    <div
                            class="spot"
                            style="text-align: center;
					border-radius: 50%; right: 0.5rem;top: -0.1rem;line-height: 0.2rem;font-size: 0.16rem; position: absolute; width: 0.2rem;height: 0.2rem;background-color: #E51B19;"
                            v-show="cartsgoods.length>0"
                    >
                        <span>{{cartsgoods.length}}</span>
                    </div>
                </div>
            </div>

            <div class="btn fav" style="background: #CCCCCC;" v-show="anniu">已抢完</div>
            <div class="btn fav" style="background: #CCCCCC;" v-show="!userAlreadyRobbedList">立即购买</div>
            <div
                    @click="isLogin?showPanelbuy():$router.push('/login')"
                    class="btn fav"
                    v-show="userAlreadyRobbedList"
            >立即购买
            </div>
        </div>

        <div @click="hidePanel()" class="mask" v-show="isPanel"></div>
        <div :class="isPanel?'cart-panel up':'cart-panel down'" ref="cart-panel">
            <div class="goods-info" ref="goods-info">
                <div class="close-panel-wrap">
                    <div class="spot"></div>
                    <div class="line"></div>
                    <div @click="hidePanel()" class="close"></div>
                </div>
                <div class="goods-img" ref="goods-img">
                    <img :src="colourImage" alt/>
                </div>
                <div class="goods-wrap">
                    <div class="goods-title">¥{{(originalPrice/100.00).toFixed(2)}}</div>
                    <div class="price" v-if="!details.full">
                        折后¥{{(discountPrice/100.00).toFixed(2)}}
                        <!-- 库存:{{details.limitNum}} -->
                    </div>
                    <div
                            class="price"
                            v-if="details.full"
                    >券后¥{{((details.full - details.reduce)*0.01).toFixed(2)}}
                    </div>
                </div>
            </div>

            <div class="amount-wrap">
                <div class="amount-name">购买数量</div>
                <div
                        class="amount-input-wrap"
                        style="border-radius: 0.1rem;
		 		border: 1px solid #D3D3D3;height: 0.54rem;margin-top: 0.1rem;"
                >
                    <div :class="amount>1?'btn dec':'btn dec active'" @click="amount>1?--amount:1">-</div>
                    <div class="amount-input">
                        <input :value="amount" @input="setAmount($event)" type="tel"/>
                    </div>
                    <div @click="setmaxnum()" class="btn inc">+</div>
                </div>
            </div>

            <div class="attr-wrap">
                <div>颜色</div>
                <div class="attr-list" style="width: auto;justify-content: flex-start;">
                    <div
                            :key="index"
                            @click="getcolour(index)"
                            class="val-wrap"
                            style="width: auto;display: flex;flex-wrap: wrap;"
                            v-for="(item,index) in Colour"
                    >
                        <div :class="{'val':true,'active':item.active}">
                            <div class="colourImage" style="height: 0.4rem;width: 0.4rem;margin-right: 0.05rem;">
                                <img :src="item.colourImage" alt/>
                            </div>
                            <div>{{item.colourName }}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: .17rem;">尺寸</div>
                <div class="attr-list">
                    <div
                            :key="index"
                            @click="getstandard(index)"
                            class="val-wrap"
                            style="display: flex;flex-wrap: wrap;"
                            v-for="(item,index) in details.productLimitedTimeStandardsDTOS"
                    >
                        <div :class="{'val':true,'active':item.active}" style="margin-bottom: 0;">{{item.standard}}</div>
                    </div>
                    <div
                            class="val-wrap"
                            style="display: flex;flex-wrap: wrap;"
                    >
                        <div @click="$router.push('/dingzhi')" class="val active">定制</div>
                    </div>
                </div>
            </div>

            <div @click="sureSubmit()" class="sure-btn">确认下单</div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {mapActions, mapMutations, mapState} from "vuex";
    import Swiper from "../../../../assets/js/libs/swiper";
    import axios from "axios";
    import {CountDown, Toast} from "vant";

    Vue.use(CountDown);
    Vue.use(Toast);
    export default {
        data() {
            return {
                anniu: false,
                time: 0,
                productCode: this.$route.query.productCode
                    ? this.$route.query.productCode
                    : "",
                productLimitedTimeStandardsDTOS: [],
                productLimitedTimeDetail: "",
                Colour: [],
                originalPrice: "",
                discountPrice: "",
                tradePrice: "",
                StandardID: "",
                ColourID: "",
                colourName: "",
                colourImage: "",
                Standard: "",
                zhijiegoumai: 0,
                isPanel: false,
                amount: 1,
                productID: this.$route.query.productCode
                    ? this.$route.query.productCode
                    : "",
                isarrtsearch: false,
                userAlreadyRobbedList: true,
                personLimitNum: ""
            };
        },
        created() {
            this.isMove = true;
            this.getProductLimitedDetails({
                productCode: this.productCode,
                success: () => {
                    this.$nextTick(() => {
                        // console.log(this.details)
                        this.personLimitNum = this.details.personLimitNum;
                        this.time =
                            (this.details.endTime - Math.round(new Date() / 1000)) * 1000;
                        this.productLimitedTimeStandardsDTOS = this.details.productLimitedTimeStandardsDTOS[0];
                        this.productLimitedTimeDetail = this.details.productLimitedTimeDetail.appDescription;
                        //console.log(this.productLimitedTimeDetail)
                        this.originalPrice = this.productLimitedTimeStandardsDTOS.originalPrice;
                        if (this.details.full) {
                            this.discountPrice = (
                                this.details.full - this.details.reduce
                            ).toFixed(2);
                        } else {
                            this.discountPrice = this.productLimitedTimeStandardsDTOS.discountPrice;
                        }

                        this.tradePrice = this.productLimitedTimeStandardsDTOS.tradePrice;
                        this.Colour = this.details.productLimitedTimeStandardsDTOS[0].productLimitedTimeStandardsColour;

                        this.$utils.lazyImg();
                        document.title = this.details.title;
                        new Swiper(this.$refs["swpier-wrap"], {
                            autoplay: 3000,
                            pagination: this.$refs["swiper-pagination3"],
                            paginationClickable: true,
                            autoplayDisableOnInteraction: false
                        });
                    });
                }
            });

            this.relationType();

            this.getSpec({
                productID: this.productID
            });
        },
        computed: {
            ...mapState({
                details: state => state.index.details,

                cartsgoods: state => state.cart.cartsgoods, //changdu
                indexyanse: state => state.goods.indexyanse,
                attrs: state => state.goods.attrs,
                total: state => state.goodsReview.total,
                isLogin: state => state.user.isLogin
            })
        },
        mounted() {
        },
        methods: {
            ...mapMutations({
                SELECT_ATTRTWO: "goods/SELECT_ATTRTWO",
                ADD_ORDER: "cart/ADD_ORDER"
            }),
            ...mapActions({
                getProductLimitedDetails: "index/getProductLimitedDetails",
                getSpec: "goods/getSpec"
            }),

            kefudianhua() {
                window.location.href = "tel:051269571961";
            },
            //显示属性面板
            showPanel() {
                this.zhijiegoumai = 0;
                this.isPanel = true;
            },
            //判断用户是否购买过限时抢购
            relationType() {
                axios({
                    method: "get",
                    url: this.$config.baseApi + "/userAlreadyRobbed/userAlreadyRobbedList",
                    params: {
                        relationID: this.$route.query.productCode,
                        userID: localStorage["uid"],
                        relationType: "2"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        // console.log(res)
                        if (res.data.data == undefined || res.data.data.length <= 0) {
                        } else {
                            Toast("你已经抢购过了还请歇歇吧");
                            this.userAlreadyRobbedList = false;
                        }
                    } else {
                        Toast(res.data.message);
                    }
                });
            },

            showPanelbuy() {
                //立即购买
                //console.log(this.details)
                // console.log(this.Colour)
                this.isPanel = true;
                this.zhijiegoumai = 1;
                this.details.productLimitedTimeStandardsDTOS[0].active = true;
                this.Colour[0].active = true;
                this.StandardID = this.details.productLimitedTimeStandardsDTOS[0].standardID;
                this.Standard = this.details.productLimitedTimeStandardsDTOS[0].standard;
                this.ColourID = this.Colour[0].colourID;
                this.colourName = this.Colour[0].colourName;
                this.colourImage = this.Colour[0].colourImage;
            },
            //隐藏属性面板
            hidePanel() {
                if (this.isMove) {
                    this.isPanel = false;
                    this.zhijiegoumai = 0;
                }
            },
            setmaxnum() {
                ++this.amount;
                if (this.amount > this.details.personLimitNum) {
                    this.amount = this.details.personLimitNum;
                    Toast("该产品只能购买" + this.details.personLimitNum + "个");
                }
            },
            //设置数量
            setAmount(e) {
                this.amount = e.target.value;
                this.amount = this.amount.replace(/[^\d]/g, "");

                if (!this.amount || this.amount === "0") {
                    this.amount = 1;
                }
                if (this.amount > this.details.personLimitNum) {
                    this.amount = this.details.personLimitNum;
                    Toast("该产品只能购买" + this.details.personLimitNum + "个");
                }
            },
            //选择尺寸
            getstandard(index) {
                for (
                    let i = 0;
                    i < this.details.productLimitedTimeStandardsDTOS.length;
                    i++
                ) {
                    if (this.details.productLimitedTimeStandardsDTOS[i].active) {
                        this.details.productLimitedTimeStandardsDTOS[i].active = false;
                        break;
                    }
                }
                // console.log(this.details.productLimitedTimeStandardsDTOS[index].standardID)
                this.details.productLimitedTimeStandardsDTOS[index].active = true;
                this.StandardID = this.details.productLimitedTimeStandardsDTOS[
                    index
                    ].standardID;
                this.Standard = this.details.productLimitedTimeStandardsDTOS[
                    index
                    ].standard;
                this.originalPrice = this.details.productLimitedTimeStandardsDTOS[
                    index
                    ].originalPrice;

                if (this.details.full) {
                    console.log(this.details);
                    this.discountPrice = (this.details.full - this.details.reduce).toFixed(
                        2
                    );
                } else {
                    console.log(this.details);
                    this.discountPrice = this.productLimitedTimeStandardsDTOS[
                        index
                        ].discountPrice;
                }
                this.tradePrice = this.details.productLimitedTimeStandardsDTOS[
                    index
                    ].tradePrice;
                this.Colour = this.details.productLimitedTimeStandardsDTOS[
                    index
                    ].productLimitedTimeStandardsColour;
                this.$set(
                    this.details.productLimitedTimeStandardsDTOS,
                    index,
                    this.details.productLimitedTimeStandardsDTOS[index]
                );
            },
            //选择颜色
            getcolour(index) {
                for (let i = 0; i < this.Colour.length; i++) {
                    if (this.Colour[i].active) {
                        this.Colour[i].active = false;
                        break;
                    }
                }
                this.Colour[index].active = true;
                this.ColourID = this.Colour[index].colourID;

                this.colourName = this.Colour[index].colourName;
                this.colourImage = this.Colour[index].colourImage;

                this.$set(this.Colour, index, this.Colour[index]);
            },
            //确认提交
            sureSubmit() {
                if (this.details.alreadyRobbedNum === this.details.limitNum) {
                    this.anniu = true;
                    // Toast('商品已抢完')
                    return;
                } else {
                    let param = [
                        {
                            standard: this.Standard,
                            standardID: this.StandardID,
                            bandPrice: this.discountPrice
                        },
                        {
                            colourName: this.colourName,
                            colourID: this.ColourID
                        }
                    ];
                    let attrs = [];
                    attrs.push({
                        param: param
                    });
                    let cartData = {
                        productID: this.details.limitedTimeProductID,
                        productName: this.details.productName,
                        amount: this.amount,
                        img: this.details.activityImg,
                        attrs: attrs,
                        goumaizhuangtai: 1
                    };

                    this.ADD_ORDER({
                        orderBuy: cartData
                    });
                    if (this.$route.query.zhibo) {
                        this.$router.push("/order?orderFrom=2&zhibo=1");
                    } else {
                        this.$router.push("/order?orderFrom=2");
                    }
                }
            }
        }
    };
</script>

<style scoped>
    @import "../../../../assets/css/common/swiper.css";

    .swpier-wrap {
        width: 100%;
        height: 5rem;
        overflow: hidden;
        position: relative;
        z-index: 1;
        margin-top: 1rem;
    }

    .swpier-wrap img {
        width: 100%;
    }

    .goods-ele-main {
        width: 100%;
        height: auto;
        background-color: #ffffff;
        margin: 0 auto;
    }

    .goods-ele-main .goods-title {
        background-image: url("../../../../assets/images/home/goods/detailactivebg.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        font-size: 0.28rem;
        height: 1.36rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    .goods-title-all {
        padding-bottom: 0.01rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        overflow: hidden;
    }

    .goods-title-price {
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        box-sizing: border-box;
        flex: 1;
    }

    .goods-title-price .goods-title-pricefont {
        display: flex;
        align-items: center;
        color: #ffffff;
    }

    .goods-title-price .goods-title-pricefont div:nth-child(2) {
        display: flex;
        align-items: center;
        background: #ff0000;
        font-size: 0.16rem;
        padding: 0 0.08rem;
        border-radius: 0.3rem;
        overflow: hidden;
        margin-left: 0.1rem;
    }

    .goods-title-price .goods-title-pricereal {
        display: flex;
        margin-top: 0.2rem;
        /* padding: 0.24rem 0 0.32rem 0; */
        align-items: center;
    }

    .goods-title-price .goods-title-pricereal div:nth-child(1) {
        font-size: 0.28rem;
        color: #ffffff;
    }

    .goods-title-price .goods-title-pricereal div:nth-child(2) {
        font-size: 0.18rem;
        color: #eb2626;
        padding: 0 0.2rem;
        background: #fdd14b;
        overflow: hidden;
        border-radius: 0.5rem;
        margin-left: 0.2rem;
    }

    .goods-title-time {
        flex: 0.45;
        display: flex;
        align-items: center;
    }

    .goods-title-time .goods-title-timetwo {
        width: 100%;
        height: auto;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        /* padding: 0 0.1rem;
              box-sizing: border-box; */
    }

    .goods-title-time .goods-title-timetwo .goods-title-time2 {
        width: 100%;
        height: auto;
        font-size: 0.32rem;
        color: #ffffff;
        /* margin-right: 0.5rem; */
        padding-top: 0.1rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
    }

    .goods-title-time .goods-title-timetwo .goods-title-time3 {
        width: 100%;
        height: auto;
        color: #ec1919;
        font-size: 0.28rem;
        display: flex;
        justify-content: right;
        padding: 0 0.1rem;
        box-sizing: border-box;
        align-items: center;
    }

    .goods-title-time .goods-title-timetwo .goods-title-time3 span {
        font-size: 0.2rem;
        flex: 1;
    }

    .goods-title-time .goods-title-timetwo .goods-title-time3 >>> .van-count-down {
        width: 100%;
        color: #ec1919;
        font-size: 0.2rem;
    }

    .goods-ele-main .price1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #333333;
        font-size: 0.38rem;
    }

    .goods-ele-main .price {
        color: #000000;
        width: 90%;
        margin: 0 auto;
        font-size: 0.32rem;
        margin-top: 0.3rem;
    }

    .goods-ele-main .sales-wrap {
        width: 93%;
        margin-left: 0.3rem;
        font-size: 0.24rem;
        color: #969696;
        margin-top: 0.2rem;
    }

    .goods-ele-main .sales-wrap li {
        align-items: center;
        display: flex;
        height: 0.86rem;
        border-bottom: 1px solid #eaeaea;
    }

    .goods-ele-main .sales-wrap .colorthename {
        background-image: url("../../../../assets/images/home/goods/leftto.png");
        background-size: 2.5%;
        background-repeat: no-repeat;
        background-position: right;
    }

    .reviews-main {
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px #eaeaea solid;
        overflow: hidden;
        padding-bottom: 1.7rem;
    }

    .reviews-main .reviews-title {
        width: 90%;
        margin: 0 auto;
        margin-top: 0.2rem;
    }

    .reviews-main .reviews-wrap {
        width: 90%;
        margin: 0 auto;
    }

    .reviews-main .reviews-wrap .reviews-list {
        width: 100%;
        margin-top: 0.4rem;
    }

    .reviews-main .reviews-list .uinfo {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        height: 0.6rem;
        align-items: center;
        -webkit-align-items: center;
    }

    .reviews-main .reviews-list .uinfo .head {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.2rem;
    }

    .reviews-main .reviews-list .uinfo .head img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .reviews-main .reviews-list .uinfo .nickname {
        width: auto;
        font-size: 0.28rem;
    }

    .reviews-main .reviews-list .reviews-content {
        width: 100%;
        margin: 0 auto;
        font-size: 0.28rem;
        margin-top: 0.2rem;
    }

    .reviews-main .reviews-list .reviews-date {
        width: auto;
        font-size: 0.28rem;
        color: #7b7f82;
        margin-top: 0.2rem;
    }

    .reviews-main .reviews-more {
        width: 2.44rem;
        height: 0.56rem;
        border: solid 1px #d50a17;
        line-height: 0.56rem;
        text-align: center;
        font-size: 0.28rem;
        margin: 0 auto;
        margin-top: 0.5rem;
        border-radius: 0.1rem;
    }

    .bottom-btn-wrap {
        width: 100%;
        height: 1.02rem;
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 10;
        display: flex;
        display: -webkit-flex;
        /* border-left: 0.1px solid #CCCCCC; */
    }

    .btnz {
        width: 0.5rem;
        height: 100%;
        color: #000000;
        text-align: center;
        line-height: 0.6rem;
    }

    .btn1 {
        height: 0.4rem;
        width: 100%;
        line-height: 0.4rem;
    }

    .btn2 {
        margin-top: 0.1rem;
        height: 0.18rem;
        width: 100%;
        align-items: center;
        line-height: 0.18rem;
    }

    .btn1 img {
        width: 100%;
        height: 100%;
    }

    .bottom-btn-wrap {
        background-color: #ffffff;
        /* border-top: 1px solid #EAEAEA; */
    }

    .bottom-btn-wrap .btn {
        width: auto;
        height: 100%;
        flex: 1;
        -webkit-flex: 0.5;
        font-size: 0.36rem;
        color: #ffffff;
        text-align: center;
        line-height: 1.02rem;
        /* border-top: #EAEAEA 0.5px solid; */
    }

    .bottom-btn-wrap .btn.cart {
        background-color: #ffffff;
        color: #000000;
        border-left: #eaeaea 0.5px solid;
    }

    .bottom-btn-wrap .btn.fav {
        background-color: #000000;
        color: #ffffff;
    }

    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 11;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .cart-panel {
        width: 100%;
        height: 70%;
        position: fixed;
        z-index: 12;
        left: 0px;
        bottom: 0px;
        background-color: #ffffff;
        transition: transform 0.3s;
        -webkit-transition: transform 0.3s;
    }

    .cart-panel.down {
        transform: translateY(120%);
        -webkit-transform: translateY(120%);
    }

    .cart-panel.up {
        transform: translateY(0%);
        -webkit-transform: translateY(0%);
    }

    .cart-panel .goods-info {
        padding-top: 0.3rem;
        width: 98%;
        height: 1.22rem;
        border-bottom: #ffffff solid 1px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 0.2rem;
        position: relative;
        z-index: 1;
        background-color: #ffffff;
    }

    .cart-panel .goods-info .goods-img {
        width: 1.24rem;
        height: 1.24rem;
        margin-right: 0.3rem;
    }

    .cart-panel .goods-info .goods-img img {
        width: 100%;
        height: 100%;
    }

    .cart-panel .goods-info .goods-wrap {
        width: 80%;
        height: auto;
    }

    .cart-panel .goods-info .goods-wrap .goods-title {
        width: 100%;
        height: 0.7rem;
        font-size: 0.24rem;
        overflow: hidden;
    }

    .cart-panel .goods-info .goods-wrap .price {
        color: #f93036;
        font-size: 0.24rem;
    }

    .cart-panel .goods-info .goods-wrap .goods-code {
        color: #888888;
        font-size: 0.24rem;
        position: absolute;
        z-index: 1;
        right: 0.2rem;
        bottom: 0px;
    }

    .cart-panel .close-panel-wrap {
        width: 0.6rem;
        height: 1.2rem;
        position: absolute;
        right: -0.2rem;
        top: -1rem;
        z-index: 2;
    }

    .cart-panel .close-panel-wrap .spot {
        width: 0.12rem;
        height: 0.12rem;
        position: absolute;
        z-index: 1;
        bottom: 0px;
        left: 0px;
        background-color: #000000;
        border-radius: 100%;
    }

    .cart-panel .close-panel-wrap .line {
        width: 1px;
        height: 0.72rem;
        background-color: #ffffff;
        position: absolute;
        z-index: 1;
        left: 0.05rem;
        bottom: 0.05rem;
    }

    .cart-panel .close-panel-wrap .close {
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("../../../../assets/images/home/goods/x.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        left: -0.14rem;
        top: 0.1rem;
        z-index: 1;
    }

    .cart-panel .attr-wrap {
        width: auto;
        max-height: 5rem;
        padding-left: 0.2rem;
        background-color: #ffffff;
        overflow-y: scroll;
        overflow-scrolling: touch;
        -webkit-overflow-scrolling: touch;
    }

    .cart-panel .attr-wrap .attr-list {
        width: 100%;
        height: 100%;
        /* margin-top:0.2rem; */
        display: flex;
        flex-wrap: wrap;
        text-align: center;
    }

    .cart-panel .attr-list .attr-name {
        width: auto;
        font-size: 0.32rem;
    }

    .cart-panel .attr-list .val-wrap {
        margin-top: 0.2rem;
        text-align: center;
    }

    .cart-panel .attr-list .val-wrap .val {
        width: 3.008rem;
        height: 0.6815rem;
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 0.32rem;
        color: #cccccc;
        padding: 0.04rem 0.2rem;
        border-radius: 0.1rem;
        margin-right: 0.17rem;
        border: 1px solid #cccccc;
        /* display:table; */
        margin-bottom: 0.17rem;
    }

    .cart-panel .attr-list .val-wrap .val .colourImage img {
        height: 100%;
        width: 100%;
    }

    .cart-panel .attr-list .val-wrap .val.active {
        border: 1px solid #000000;
        color: #000000;
    }

    .cart-panel .amount-wrap {
        width: auto;
        padding-left: 0.2rem;
        margin-top: 0.2rem;
        padding-top: 0.2rem;
        height: 1.1rem;
        align-items: center;
        -webkit-align-items: center;
        background-color: #ffffff;
        padding-bottom: 0.3rem;
    }

    .cart-panel .amount-wrap .amount-name {
        width: auto;
        font-size: 0.32rem;
    }

    .cart-panel .amount-wrap .amount-input-wrap {
        width: 1.6rem;
        height: 0.6rem;
        border: 1px solid #d3d3d3;
        margin-right: 0.2rem;
        border-radius: 0.2rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin-top: 0.22rem;
    }

    .cart-panel .amount-wrap .amount-input-wrap .btn {
        width: 0.6rem;
        height: 0.4rem;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.4rem;
    }

    .cart-panel .amount-wrap .amount-input-wrap .btn.active {
        color: #b5b5b5;
    }

    .cart-panel .amount-wrap .amount-input-wrap .dec {
        border-right: 1px solid #d3d3d3;
    }

    .cart-panel .amount-wrap .amount-input-wrap .amount-input {
        width: 0.76rem;
        height: 100%;
    }

    .cart-panel .amount-wrap .amount-input-wrap .amount-input input {
        width: 100%;
        height: 95%;
        color: #333333;
        font-size: 11px;
        font-family: PingFang;
        text-align: center;
    }

    .cart-panel .amount-wrap .amount-input-wrap .inc {
        border-left: 1px solid #d3d3d3;
    }

    .cart-panel .sure-btn {
        width: 100%;
        height: 0.8rem;
        position: absolute;
        bottom: 0px;
        left: 0px;
        z-index: 1;
        color: #ffffff;
        font-size: 0.32rem;
        background-color: #000000;
        text-align: center;
        line-height: 0.8rem;
    }

    .cart-icon1 {
        flex: 1;
        width: 100%;
        height: 100%;
        background-image: url("../../../../assets/images/home/goods/kefu.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        position: relative;
        z-index: 1;
        /* border-left: #CCCCCC solid 0.5px; */
        /* 	margin-top: 0.2rem;
              margin-left:0.1rem;
              margin-right: 0.1rem; */
    }

    .cart-icon2 {
        flex: 1;
        width: 100%;
        height: 100%;
        background-image: url("../../../../assets/images/home/goods/dianpu.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        /* padding: 0 0.1rem; */
        position: relative;
        z-index: 1;
        /* border-left: #CCCCCC solid 0.5px; */
        /* margin-top: 0.2rem; */
    }

    .content {
        width: 100%;
        margin: 0 auto;
        font-size: 0.32rem;
        line-height: 0.5rem;
    }

    .content >>> img {
        width: 100%;
    }

    .contenthtml {
        background-color: #ffffff;
        width: 100%;
        overflow: hidden;
        margin-bottom: 1.1rem;
    }

    .contenthtmltitle {
        text-align: center;
        width: 100%;
        overflow: hidden;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .contenthtmltitle div {
        height: 1px;
        width: 0.84rem;
        background-color: #c6c6c6;
        margin: 0 5px;
    }

    .cart-icon .spot {
        width: 0.2rem;
        height: 0.2rem;
        background-color: #cc0004;
        border-radius: 100%;
        position: absolute;
        z-index: 1;
        right: 0px;
        top: 0.15rem;
    }
</style>
