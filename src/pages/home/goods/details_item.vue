<template>
    <div class="page">
        <van-swipe @change="onChange" style="height:5rem;margin-top:1rem;" v-if="details.commonImage">
            <van-swipe-item :key="`swiper-item-${index}-${items.imageUrl}`"
                            v-for="(items,index) in details.commonImage">
                <img v-if="items.imageID" :src="items.imageUrl" style="width:100%;height:100%;"/>
            </van-swipe-item>
            <van-swipe-item :key="`swiper-item-video-${details.titleVideo}`" v-if="details.titleVideo">
                <video controls :src="details.titleVideo" style="width:100%;height:100%;"/>
            </van-swipe-item>
            <template #indicator>
                <div
                        class="custom-indicator"
                        v-if="details.titleVideo"
                >{{ current + 1 }}/{{details.commonImage.length+1}}
                </div>
                <div class="custom-indicator" v-else>{{ current + 1 }}/{{details.commonImage.length}}</div>

            </template>
        </van-swipe>

        <div class="goods-ele-main">
            <div class="goods-title">
                <div>
                    <div>
            <span
                    :key="index2"
                    v-for="(item,index2) in (details.productStandards || '').slice(0,1)"
            >¥{{userType == '3'? (item.tradePrice * .01).toFixed(2): (item.bandPrice * .01).toFixed(2)}}</span>
                        <!-- ¥{{details.realPrice*0.01}} -->
                    </div>
                </div>
                <div @click="gotoisFavLock()" class="btnz">
                    <div class="btn1" v-show="!isFavLock">
                        <img src="../../../assets/images/home/goods/chongmingming1.png"/>
                    </div>
                    <div class="btn1" v-show="isFavLock">
                        <img src="../../../assets/images/home/goods/chongmingming2.png"/>
                    </div>
                    <div class="btn2" style="font-size:0.18rem;">{{details.collectNum}}</div>
                </div>
            </div>
            <!-- <div class="coupon">
              <div class="coupon-list"> -->
            <!-- v-for="(item,index) in details.productStandards"
            :key="index"-->
            <!-- <div class="coupon-item">{{item.standard}}</div> -->

            <!-- <div class="coupon-item">100元全场优惠券</div>
            <div class="coupon-item">下单立减省钱购</div>
          </div> -->
            <!-- <van-cell is-link @click="showPopup"> -->
            <!-- <div class="more" @click="showCoupon()">
              查看
              <img src="../../../assets/images/home/goods/leftto.png" alt />
            </div> -->
            <!-- </van-cell> -->
            <!-- <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }"></van-popup> -->
            <!-- </div> -->
            <!-- 遮罩层 -->
            <div class="lay" v-show="show">
                <div class="lay-content">
                    <div class="title">下单立享优惠</div>
                    <div class="my-Coupon-list">
                        <div class="my-Coupon-item" v-bind:key="index" v-for="(item, index) in coupons">
                            <div class="cate">店铺优惠券</div>
                            <div class="des">
                                <div class="num">
                                    <span>￥</span>{{item.couponAmount * .01}}
                                </div>
                                <div class="range">
                                    <div>{{item.couponName}}</div>
                                    {{item.couponBeginTime | formatDateOnly }}-{{ item.couponEndTime | formatDateOnly }}
                                </div>
                                <div @click="item.couponState === 9? '': getCoupon(item.couponID)" class="now">立即领取</div>
                            </div>
                            <div class="expired" v-if="item.couponState === 9">
                                <div class="include">
                                    <div class="has">已领取</div>
                                </div>
                                <img alt="" src="../../../assets/images/user/member/isfuck.png">
                            </div>
                        </div>
                        <!--                        <div @click="isHas()" class="my-Coupon-item">-->
                        <!--                            <div class="cate">店铺优惠券</div>-->
                        <!--                            <div class="des">-->
                        <!--                                <div class="num">-->
                        <!--                                    <span>￥</span>100-->
                        <!--                                </div>-->
                        <!--                                <div class="range">-->
                        <!--                                    <div>全场通用券</div>-->
                        <!--                                    2020.05.01-2020.05.07-->
                        <!--                                </div>-->
                        <!--                                <div class="now">立即领取</div>-->
                        <!--                            </div>-->
                        <!--                            <div class="expired" v-if="has">-->
                        <!--                                <div class="include">-->
                        <!--                                    <div class="has">已领取</div>-->
                        <!--                                </div>-->
                        <!--                                <img alt="" src="../../../assets/images/user/member/isfuck.png">-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                    </div>
                    <div @click="closeCoupon()" class="close">关闭</div>
                </div>
            </div>
            <div class="goods-coupons">
                <div class="labels">
                    <span :key="name" v-for="name in details.couponNames">{{ name }}</span>
                </div>
                <div>
                    <div @click="showCoupon" class="check">查看
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
            <div class="price1 price">{{details.productName}}</div>
            <div class="price" style="font-size: 14px;color: #B5B5B5;">{{details.productDescription}}</div>

            <ul class="sales-wrap" style="color: #000000;">
                <li>
                    <div>发货</div>
                    <div
                            style="flex: 1;width: 75%;font-size: 14px;margin-left: 0.2rem;display: flex;justify-content:space-between;"
                    >
                        <div>
                            <span style="color: #B5B5B5;">苏州</span>
                            <span style="margin:0 0.2rem;">|</span>快递
                            <span style="color: #B5B5B5;">:0.00</span>
                        </div>
                        <div style="color: #B5B5B5;font-size: 14px;">销量{{details.boughtNum}}</div>
                    </div>
                </li>
                <li @click="showPanel()" class="colorthename">
                    <div>颜色</div>
                    <div
                            :key="index3"
                            style="display: flex;"
                            v-for="(item3,index3) in (details.productStandards || '').slice(0,1)"
                    >
                        <div
                                :key="index4"
                                style="border-radius:2px;height: auto;margin-left: 0.2rem;padding: 0.14rem;"
                                v-for="(item4,index4) in item3.productStandardsColours"
                        >
                            <span style="color: #B5B5B5;">{{item4.colourName}}</span>
                        </div>
                    </div>
                </li>

                <li @click="showPanel()" class="colorthename">
                    <div style="width: 0.8rem;">规格</div>
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80%;">
            <span
                    :key="index"
                    style="
			border-radius:2px;
			height: auto;
			padding: 0.14rem;color: #B5B5B5;"
                    v-for="(item3,index) in details.productStandards"
            >{{item3.standard}}</span>
                    </div>
                </li>

                <!-- <li>
                  <div>材质</div>
                  <div style="margin-left: 0.2rem;font-size: 0.28rem;color: #B5B5B5;">{{details.material}}</div>
                </li>-->
            </ul>
        </div>
        <div
                @click="$router.replace('/goods/details/review?productID='+productID)"
                class="reviews-main"
                v-if="details.productComments"
        >
            <div class="reviews-title" style="font-size: 0.28rem;color: #000000;">商品评价</div>
            <div v-show="details.productComments.length > 0">
                <div class="reviews-wrap">
                    <div :key="index" class="reviews-list" v-for="(item,index) in details.productComments">
                        <div class="uinfo">
                            <div class="head">
                                <img
                                        :data-echo="details.titleImg"
                                        alt
                                        src="../../../assets/images/common/lazyImg.jpg"
                                />
                            </div>
                            <div class="nickname">{{item.phoneNumber}}</div>
                        </div>
                        <div class="reviews-content" v-html="item.content"></div>
                        <div class="reviews-date">{{item.createdTimestamp | formatDate}}</div>
                    </div>
                </div>
                <div class="reviews-more">查看更多评价</div>
            </div>
            <div
                    class="no-data"
                    style="font-size: 0.28rem;color: rgb(154,154,154,0.4);"
                    v-show="details.productComments.length===0"
            >暂无评价！
            </div>
        </div>

        <div class="contenthtmltitle">
            <div></div>
            宝贝详情
            <div></div>
        </div>
        <div class="contenthtml" v-show="appDescription">
            <div class="content" v-html="appDescription"></div>
        </div>

        <div class="bottom-btn-wrap">
            <div
                    class="btn"
                    style="position: relative;display: flex;align-items: center;border-top: 1px solid #eaeaea;"
            >
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
                        style="border-left: 1px solid #EAEAEA;flex: 1;"
                >
                    <div style="display: flex;justify-content: center;">
                        <div style="width: 0.4rem;height: 0.36rem;">
                            <div class="cart-icon2"></div>
                        </div>
                    </div>
                    <!-- 购物车图标上的数量 -->
                    <div class="spot" v-show="cartDataformgoods>0">
                        <span>{{cartDataformgoods}}</span>
                    </div>
                </div>
            </div>

            <div @click="showPanel()" class="btn cart">加入购物车</div>
            <div @click="showPanelbuy()" class="btn fav">立即购买</div>
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
                    <!-- item.bandPrice -->
                    <div class="goods-title">
                        ¥{{userType == '3'? (tradePrice/100.00).toFixed(2):(bandPrice/100.00).toFixed(2)}}
                    </div>
                    <div class="price">库存:{{details.productStockNum}}</div>
                </div>
            </div>

            <div class="amount-wrap">
                <div class="amount-name">购买数量</div>
                <div
                        class="amount-input-wrap"
                        style="border-radius: 0.1rem;height: auto;margin-top: 0.1rem; border: 1px solid #000000;padding: 0.02rem 0.05rem;"
                >
                    <div :class="amount>1?'btn dec':'btn dec active'" @click="amount>1?--amount:1">-</div>
                    <div class="amount-input">
                        <input :value="amount" @input="setAmount($event)" type="tel"/>
                    </div>
                    <div @click="++amount" class="btn inc">+</div>
                </div>
            </div>

            <div class="attr-wrap">
                <div>颜色</div>

                <div class="attr-list" style="width: auto;justify-content: flex-start;">
                    <div
                            :key="index"
                            @click="getcolour(item,index)"
                            class="val-wrap"
                            style="width: auto;"
                            v-for="(item,index) in Colour"
                    >
                        <div :class="{'val':true,'active':item.active}">
                            <div style="height: 0.4rem;width: 0.4rem;margin-right: 0.05rem;">
                                <img :src="item.colourImage" alt style="height:100%;width:100%;"/>
                            </div>
                            <div style="height: auto;">{{item.colourName}}</div>
                        </div>


                    </div>
                </div>

                <div>尺寸</div>
                <div class="attr-list">
                    <div class="val-wrap">
                        <div
                                :class="{'val':true,'active':item.active}" :key="index"
                                @click="getstandard(index)"
                                v-for="(item,index) in attrs">
                            {{item.standard}}
                        </div>
                        <div @click="$router.push('/dingzhi')" class="val active">定制</div>
                    </div>
                </div>
            </div>

            <div @click="sureSubmit()" class="sure-btn" v-show="zhijiegoumai === 0">加入购物车</div>
            <div @click="sureSubmit()" class="sure-btn" v-show="zhijiegoumai === 1">确认下单</div>
        </div>

        <van-overlay :show="huiyuan && userType != '2'" z-index="999">
            <div class="wrapper">
                <div class="block">
                    <img alt src="../../../assets/images/vip/join.png"/>
                    <img @click="huiyuan = false" alt class="btn-close"
                         src="../../../assets/images/vip/join-close.png"/>
                    <img @click="$router.push('/vip')" alt class="btn-join-1"
                         src="../../../assets/images/vip/join-1.png"/>
                </div>
            </div>
        </van-overlay>

        <!--        <map name="map">-->
        <!--            <area target="" alt="关闭" title="关闭" @click="alert(1)" coords="1320,38,51" shape="circle">-->
        <!--            <area target="" alt="开通" title="开通" @click="alert(2)" coords="350,1293,1126,1461" shape="rect">-->
        <!--        </map>-->
    </div>
</template>

<script>
    import Vue from "vue";
    import {mapActions, mapMutations, mapState} from "vuex";
    // import Swiper from "../../../assets/js/libs/swiper";
    // import TweenMax from '../../../assets/js/libs/TweenMax';
    import axios from "axios";
    import {Cell, Overlay, Popup, Swipe, SwipeItem, Toast} from "vant";

    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Toast);
    Vue.use(Popup);
    Vue.use(Cell);
    Vue.use(Overlay);

    export default {
        name: "details_item",

        data() {
            return {
                zhijiegoumai: 0,
                isPanel: false,
                amount: 1,
                productID: this.$route.query.productID ? this.$route.query.productID : "",
                limit: this.$route.query.limit === 1 ? true : false,
                isarrtsearch: false,
                productStandardID: "",
                productColourID: "",
                colourImage: "",
                cartDataformgoods: 0, //购物车长度

                tradePrice: "",
                standardID: "",
                bandPrice: "",
                standard: "",
                Colour: [],
                ColourID: "",
                colourName: "",

                userID: localStorage["uid"],
                isFavLock: false, // 用于标识 是否收藏该商品
                shoucang: false,

                show: false,
                current: 0,
                huiyuan: true,
                has: false,
                appDescription: ""
            };
        },
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
            },
            formatDateOnly: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d;
            }
        },
        created() {
            console.log("goods/details_item.vue - created()");
            // console.log(this.userType);
            this.getcatforthelength();
            // console.log(document.title)
            this.isFav();
            this.isMove = true;
            this.getAcceptedableCouponList({
                uid: localStorage.getItem('uid'),
                userType: this.userType,
                couponReleaseWindow: 3
            });
            console.log(this.$route.query);
            if (this.limit) {
                //限时抢购
                this.getLimitDetails({
                    productID: this.productID,
                    success: () => {
                        this.appDescription = this.details.productDetail.appDescription;
                        console.log(this.details);
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            } else {
                this.getDetails({
                    productID: this.productID,
                    success: () => {
                        this.appDescription = this.details.productDetail.appDescription;
                        console.log(this.details);
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            }

            this.getSpec({
                productID: this.productID,
                success: () => {
                    this.$nextTick(() => {
                        this.tradePrice = this.attrs[0].tradePrice;
                        this.Colour = this.attrs[0].productStandardsColours;
                        this.ColourID = this.attrs[0].productStandardsColours[0].colourID;
                        this.colourName = this.attrs[0].productStandardsColours[0].colourName;
                        this.colourImage = this.attrs[0].productStandardsColours[0].colourImage;
                        this.standard = this.attrs[0].standard;
                        this.standardID = this.attrs[0].standardID;
                        this.bandPrice = this.attrs[0].bandPrice;

                        this.$utils.lazyImg();
                    });
                }
            });

            this.getReviews({
                productID: this.productID,
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });

            this.isFav();
        },
        computed: {
            ...mapState({
                cartsgoods: state => state.cart.cartsgoods,
                indexyanse: state => state.goods.indexyanse,
                attrs: state => state.goods.attrs,
                details: state => state.goods.details,
                total: state => state.goodsReview.total,
                reviews: state => state.goodsReview.reviews,
                isLogin: state => state.user.isLogin,
                userType: state => state.user.userType,
                coupons: state => state.coupon.coupons
            })
        },
        mounted() {
            this.isFav();
        },
        methods: {
            isHas() {
                this.has = true;
            },
            showCoupon() {
                this.show = true;
            },
            getCoupon(couponID) {
                axios({
                    method: "GET",
                    url: this.$config.baseApi + "/coupon/gainedCouponByID",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        "userID": localStorage.getItem("uid"),
                        "couponID": couponID
                    }
                }).then(res => {
                    // this.btnGetCoupon = ;
                    // TODO
                    if (res.data.status === 0) {
                        this.getAcceptedableCouponList({
                            uid: localStorage.getItem('uid'),
                            userType: this.userType,
                            couponReleaseWindow: 3
                        });
                        // Dialog.alert({
                        //     message: "优惠券领取成功"
                        // }).then(() => {
                        //     this.btnCheckCoupon = false;
                        //     this.showCoupon = false;
                        //     this.btnGetCoupon = false;
                        //     this.couponID = "";
                        // })
                    } else {
                        // Dialog.alert({
                        //     message: "优惠券领取失败，请重试"
                        // }).then(() => {
                        //     // this.btnCheckCoupon = false;
                        //     // this.showCoupon = false
                        // })
                    }
                });
            },
            closeCoupon() {
                this.show = false;
            },
            onChange(index) {
                this.current = index;
            },
            ...mapMutations({
                SELECT_ATTRTWO: "goods/SELECT_ATTRTWO",
                SELECT_ATTR: "goods/SELECT_ATTR",
                ADD_ITEM: "cart/ADD_ITEM",
                ADD_ORDER: "cart/ADD_ORDER"
            }),
            ...mapActions({
                getLimitDetails: "goods/getLimitDetails",
                getDetails: "goods/getDetails",
                getSpec: "goods/getSpec",
                getReviews: "goodsReview/getReviews",
                joinFav: "goods/addFav",
                getAcceptedableCouponList: "coupon/getAcceptedableCouponList"
            }),
            //请求购物车长度
            getcatforthelength() {
                axios({
                    method: "get",
                    url: this.$config.baseApi + "/shoppingCart/shoppingCartListByPage",
                    headers: {
                        "Content-Type": "application/json;"
                    },
                    params: {
                        userID: localStorage["uid"]
                    }
                }).then(res => {
                    this.cartDataformgoods = res.data.data.list.length;
                });
            },
            getcolour(item, index) {
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
            },
            getstandard(index) {
                for (let i = 0; i < this.attrs.length; i++) {
                    if (this.attrs[i].active) {
                        this.attrs[i].active = false;
                        break;
                    }
                }
                this.attrs[index].active = true;
                this.Colour = this.attrs[index].productStandardsColours;
                this.getcolour(null, 0);
                this.standardID = this.attrs[index].standardID;
                this.bandPrice = this.attrs[index].bandPrice;
                this.standard = this.attrs[index].standard;
                this.tradePrice = this.attrs[index].tradePrice;
                this.$set(this.attrs, index, this.attrs[index]);
            },

            kefudianhua() {
                window.location.href = "tel:051269571961";
            },
            //显示属性面板
            showPanel() {
                this.zhijiegoumai = 0;
                this.isPanel = true;
                let activeIdx = this.attrs.findIndex((element) => element.active === true);
                activeIdx = activeIdx === -1 ? 0 : activeIdx;
                this.attrs[activeIdx].active = true;
                this.attrs[activeIdx].productStandardsColours[0].active = true;
            },
            showPanelbuy() {
                //立即购买
                // console.log(this.details)
                let activeIdx = this.attrs.findIndex((element) => element.active === true);
                activeIdx = activeIdx === -1 ? 0 : activeIdx;
                this.attrs[activeIdx].active = true;
                this.attrs[activeIdx].productStandardsColours[0].active = true;
                this.isPanel = true;
                this.zhijiegoumai = 1;
            },
            //隐藏属性面板
            hidePanel() {
                if (this.isMove) {
                    this.isPanel = false;
                    this.zhijiegoumai = 0;
                }
            },

            //设置数量
            setAmount(e) {
                this.amount = e.target.value;
                this.amount = this.amount.replace(/[^\d]/g, "");
                if (!this.amount || this.amount === "0") {
                    this.amount = 1;
                }
            },
            //确认提交
            sureSubmit() {
                if (this.attrs.length > 0) {
                    if (this.isLogin) {
                        if (this.zhijiegoumai === 0) {
                            if (this.details.productStockNum <= 0) {
                                Toast("库存不够了，亲");
                                return;
                            } else {
                                // Toast("加入购物车");
                                this.zhijiegoumai = 0;
                                this.addCart();
                                this.isPanel = false;
                            }
                        } else {
                            if (this.details.productStockNum <= 0) {
                                Toast("库存不够了，亲");
                                return;
                            } else {
                                this.zhijiegoumai = 1;
                                // Toast("立即购买");
                                this.buythepay();
                                this.isPanel = false;
                            }
                        }
                    } else {
                        this.$router.push("/login");
                    }
                }
            },
            buythepay() {
                if (this.isMove) {
                    let param = [
                        {
                            standard: this.standard,
                            standardID: this.standardID,
                            bandPrice: this.bandPrice
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
                        productID: this.details.productID,
                        productName: this.details.productName,
                        amount: this.amount,
                        img: this.details.titleImg,
                        attrs: attrs,
                        goumaizhuangtai: 1
                    };
                    if (this.$route.query.zhibo) {
                        this.$router.push("/order?orderFrom=1&zhibo=1");
                    } else {
                        this.$router.push("/order?orderFrom=1");
                    }
                    this.ADD_ORDER({
                        orderBuy: cartData
                    });
                }
            },
            //添加购物车
            addCart() {
                if (this.isMove) {
                    let cartData2 = {
                        productID: this.details.productID,
                        productStandardID: this.standardID,
                        productColourID: this.ColourID,
                        addedNum: this.amount,
                        userID: localStorage["uid"]
                    };

                    if (this.zhijiegoumai === 0) {
                        axios({
                            method: "post",
                            url: this.$config.baseApi + "/shoppingCart/add",
                            headers: {
                                "Content-Type": "application/json;"
                            },
                            data: JSON.stringify(cartData2)
                        }).then(res => {
                            if (res.data.status === 0) {
                                Toast("添加成功");
                                this.getcatforthelength();
                            } else {
                                Toast("添加失败");
                            }
                        });
                    }
                }
            },

            //我的收藏（判断收藏还是未收藏）
            isFav() {
                if (this.isLogin) {
                    axios({
                        methods: "get",
                        url: this.$config.baseApi + "/product/isNotCollect",
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            // token: localStorage["authToken"]
                        },
                        params: {
                            productID: this.productID,
                            userID: this.userID
                        }
                    }).then(res => {
                        if (res.data.data == 1) {
                            //已经收藏
                            this.isFavLock = true;
                        } else {
                            //未收藏
                            this.isFavLock = false;
                        }
                    });
                } else {
                    //Toast("请先登录");
                }
            },

            gotoisFavLock() {
                if (this.isLogin) {
                    if (this.isFavLock === true) {
                        this.cancelFav();
                        this.isFavLock = false;
                        return;
                    }
                    if (this.isFavLock === false) {
                        this.isFavLock = true;
                        this.addFav();
                        return;
                    }
                } else {
                    Toast("请先登录");
                }
            },

            //添加收藏
            addFav() {
                if (this.isLogin) {
                    axios({
                        method: "post",
                        url: this.$config.baseApi + "/product/addProductCollection",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            userID: this.userID,
                            productID: this.productID
                        }
                    }).then(res => {
                        if (res.data.status === 1) {
                            this.getDetails({
                                productID: this.productID,
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                        document.title = this.details.title;
                                    });
                                }
                            });

                            Toast("已收藏");
                        } else {
                            // Toast("收藏失败");
                        }
                    });
                } else {
                    // Toast("请先登录");
                }
            },
            //取消收藏
            cancelFav() {
                if (this.isLogin) {
                    axios({
                        method: "post",
                        url: this.$config.baseApi + "/product/cancelProductCollection",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        params: {
                            userID: this.userID,
                            productID: this.productID
                        }
                    }).then(res => {
                        if (res.data.status === 1) {
                            this.getDetails({
                                productID: this.productID,
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                        document.title = this.details.title;
                                    });
                                }
                            });

                            Toast("已取消收藏");
                        } else {
                            // Toast("取消收藏失败");
                        }
                    });
                } else {
                    // Toast("请登录会员");
                }
            }
        }
    };
</script>

<style scoped>
    .page .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page .wrapper .block {
        width: 6rem;
        height: 7rem;
        position: relative;
        /*background-image: url('../../../assets/images/user/member/kaitonghuiyuan.png');*/
        /*background-size: 100% 100%;*/
    }

    .page .wrapper .block img {
        width: 100%;
    }

    .page .wrapper .block .btn-close {
        position: absolute;
        top: -.5rem;
        right: 0;
        width: .5rem;
    }

    .page .wrapper .block .btn-join-1 {
        position: absolute;
        width: 3.5rem;
        bottom: 1.2rem;
        right: .8rem;
    }

    .custom-indicator {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0.8rem;
        height: 0.4rem;
        /* border-radius: 50%; */
        /* right: .3rem;
        bottom: .3rem; */

        color: #000;
        text-align: center;
        /* line-height: 1rem; */
        font-size: 0.3rem;
        font-weight: bold;
        /* background:rgba(211,212,214,1);
        border:2px solid rgba(201,202,204,1); */
    }

    .coupon {
        width: 94%;
        margin: 0.2rem 0.25rem;
        font-size: 0.25rem;
        font-family: HiraginoSansGB-W3;
        font-weight: bolder;
        color: #a12532;
        display: flex;
        align-items: center;
    }

    .coupon .coupon-list {
        width: 80%;
        display: flex;
        align-items: center;
    }

    .coupon .coupon-list .coupon-item {
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.15rem;
        margin-right: 0.16rem;
        background-color: #fff6ef;
        text-align: center;
        letter-spacing: 0.02rem;
    }

    .coupon .coupon-list .coupon-item:last-child {
        margin-right: 0;
    }

    .coupon .more {
        width: 20%;
        text-align: right;
    }

    .coupon .more img {
        margin-left: 0.05rem;
        width: 0.15rem;
        height: 0.2rem;
    }

    .lay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.55);
    }

    .lay .lay-content {
        position: fixed;
        width: 100%;
        height: 65%;
        bottom: 0;
        border-radius: 0.2rem 0.2rem 0 0;
        background-color: #fff;
    }

    .lay .lay-content .close {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background-color: #000;
        font-size: 0.34rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        cursor: pointer;
    }

    .lay .lay-content .title {
        width: 100%;
        height: 1.2rem;
        font-size: 0.34rem;
        text-align: center;
        line-height: 1.2rem;
        color: #c03049;
        letter-spacing: 0.1rem;
        font-weight: bold;
    }

    .lay .lay-content .my-Coupon-list {
        margin: 0 0.34rem;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item {
        height: 1.94rem;
        background-image: url("../../../assets/images/user/member/4.png");
        background-size: 100% 100%;
        /* background-color: #ffe0dd; */
        margin-top: 0.25rem;
        position: relative;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .expired {
        position: absolute;
        right: 0.04rem;
        bottom: 0.04rem;
        overflow: hidden;
        /* background-image: url('../../../assets/images/user/member/isfuck.png'); */
        /* background-size: 100% 100%; */
        width: 1.2rem;
        height: 1.2rem;
    }

    /* .lay .lay-content .my-Coupon-list .my-Coupon-item .expired img{
      width: 1rem;
      height: 1rem;
    } */
    .lay .lay-content .my-Coupon-list .my-Coupon-item .expired .include {
        width: 1.2rem;
        height: 1.2rem;
        border: 2.3px solid #d2ced0;
        border-radius: 50%;
        transform: rotate(-45deg);
        text-align: center;
        line-height: 1.2rem;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .expired .has {
        width: 1rem;
        height: 1rem;
        font-size: 0.26rem;
        color: #d2ced0;
        letter-spacing: 0.02rem;
        border: 1px solid #d2ced0;
        border-radius: 50%;
        text-align: center;
        line-height: 1rem;
        margin: 0.1rem auto;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item:first-child {
        margin-top: 0;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .cate {
        font-size: 0.2rem;
        color: #a12532;
        height: 0.5rem;
        line-height: 0.5rem;
        padding-left: 0.4rem;
        letter-spacing: 0.04rem;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .des {
        display: flex;
        align-items: center;
        text-align: center;
        color: #a12532;
        height: 1.08rem;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .des .num {
        width: 30%;
        font-size: 0.5rem;
        font-weight: bold;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .des .num span {
        font-size: 0.3rem;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .des .range {
        width: 45%;
        font-size: 0.2rem;
        text-align: left;
        letter-spacing: 0.01rem;
        color: #ee5765;
        line-height: 150%;
    }

    .lay .lay-content .my-Coupon-list .my-Coupon-item .des .now {
        width: 30%;
        font-size: 0.3rem;
        font-weight: bold;
        margin-top: -0.26rem;
    }

    .swpier-wrap {
        width: 100%;
        height: 5rem;
        overflow: hidden;
        position: relative;
        z-index: 1;
        margin-top: 1rem;
        margin-bottom: 0.2rem;
    }

    .swpier-wrap img {
        width: 100%;
        height: 100%;
    }

    .goods-ele-main {
        width: 100%;
        height: auto;
        background-color: #ffffff;
        margin: 0 auto;
        padding-top: 0.24rem;
    }

    .goods-ele-main .goods-title {
        width: 90%;
        font-size: 0.28rem;
        margin: 0 auto;
        height: 0.6rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
        color: red;
    }

    .goods-ele-main .price1 {
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
    }

    .goods-ele-main .price {
        color: #000000;
        width: 90%;
        margin: 0 auto;
        margin-top: 0.16rem;
        font-size: 0.32rem;
    }

    .goods-ele-main .sales-wrap {
        width: 93%;
        margin-left: 0.3rem;
        /* margin: 0 auto; */
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
        background-image: url("../../../assets/images/home/goods/leftto.png");
        background-size: 2.5%;
        background-repeat: no-repeat;
        background-position: right;
    }

    .goods-ele-main .goods-coupons {
        width: 90%;
        margin: 0 auto;
        color: #A12532;
        font-size: .225rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .goods-ele-main .goods-coupons .labels span {
        margin-right: .2rem;
        background: #FFF6EF;
        padding: .05rem;
    }

    .goods-ele-main .goods-coupons .check {
        display: flex;
        align-items: center;
    }

    .goods-ele-main .goods-coupons .arrow {
        width: .1rem;
        height: .1rem;
        border-top: .01rem solid #A12532;
        border-right: .01rem solid #A12532;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .reviews-main {
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px #eaeaea solid;
        overflow: hidden;
        padding-bottom: 1.7rem;
    }

    .reviews-main .reviews-title {
        /*  color: #7b7f82;
        font-size: 0.32rem; */
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
        border: solid 1px #000000;
        line-height: 0.56rem;
        text-align: center;
        font-size: 0.28rem;
        margin: 0 auto;
        margin-top: 0.5rem;
        border-radius: 0.1rem;
    }

    .bottom-btn-wrap {
        width: 100%;
        height: 1rem;
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
        /* border-top: 1px solid #eaeaea; */
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
    }

    .bottom-btn-wrap .btn.cart {
        border-top: 1px solid #eaeaea;
        background-color: #ffffff;
        color: #000000;
        border-left: #eaeaea 0.5px solid;
    }

    .bottom-btn-wrap .btn.fav {
        height: 100%;
        background: #000000;
        /* color: #ffffff; */
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
        color: #000000;
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
        background-image: url("../../../assets/images/home/goods/x.png");
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
        -webkit-overflow-scrolling: touch;
    }

    .cart-panel .attr-wrap .attr-list {
        width: 100%;
        height: 100%;
        /* margin-top: 0.2rem; */
        display: flex;
        flex-wrap: wrap;
    }

    .cart-panel .attr-list .attr-name {
        width: auto;
        font-size: 0.32rem;
    }

    .cart-panel .attr-list .val-wrap {
        width: auto;
        /* min-height: 39.5px; */
        margin-top: 0.1rem;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
    }

    .cart-panel .attr-list .val-wrap .val {
        width: 3.008rem;
        height: 0.6815rem;
        justify-content: center;
        color: #cccccc;
        font-size: 0.32rem;
        border: #cccccc 1px solid;
        padding: 0.04rem 0.2rem;
        border-radius: 0.1rem;
        margin-right: 0.17rem;
        display: table;
        margin-bottom: 0.17rem;
        display: flex;
        align-items: center;
    }

    .cart-panel .attr-list .val-wrap .val.active {
        /* background: #000000;color: #ffffff; */
        border: #000000 1px solid;
        color: #000000;
    }

    .cart-panel .amount-wrap {
        width: auto;
        padding-left: 0.2rem;
        margin-top: 0.2rem;
        /* padding-top: 0.2rem; */
        height: 1.1rem;
        align-items: center;
        -webkit-align-items: center;
        background-color: #ffffff;
        padding-bottom: 0.2rem;
    }

    .cart-panel .amount-wrap .amount-name {
        width: auto;
        font-size: 0.32rem;
    }

    .cart-panel .amount-wrap .amount-input-wrap {
        width: 1.6rem;
        height: 0.6rem;
        /* border: 1px solid #000000; */
        margin-right: 0.2rem;
        border-radius: 0.08rem;
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
        border-right: 1px solid #000000;
    }

    .cart-panel .amount-wrap .amount-input-wrap .amount-input {
        width: 0.76rem;
        height: 100%;
    }

    .cart-panel .amount-wrap .amount-input-wrap .amount-input input {
        width: 100%;
        height: 95%;
        text-align: center;
    }

    .cart-panel .amount-wrap .amount-input-wrap .inc {
        border-left: 1px solid #000000;
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
        background-image: url("../../../assets/images/home/goods/kefu.png");
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
        background-image: url("../../../assets/images/home/goods/dianpu.png");
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

    #cart-icon2 .spot {
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        line-height: 0.2rem;
        background-color: #cc0004;
        border-radius: 50%;
        z-index: 1;
        top: 0.2rem;
        right: 0.2rem;
        line-height: 0.2rem;
        color: #ffffff;
        font-size: 0.16rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #cart-icon2 .spot span {
        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>
