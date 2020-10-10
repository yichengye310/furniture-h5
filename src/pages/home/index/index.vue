<template>

    <div class="page" id="page">
        <div :class="{header:true}">
            <div class="classify-icon"></div>
            <div @click="searchShow.show=true" class="search-wrap">
                <div class="search-icon"></div>
                <div class="text">请输入宝贝名称</div>
            </div>
            <div class="login">搜索</div>
            <div class="my-icon"></div>
        </div>

        <van-pull-refresh @refresh="onRefresh" success-text="刷新成功" v-model="isLoading">
            <!-- 幻灯片 -->
            <div class="banner-wrap" style="margin-top: 1rem;">
                <div class="swiper-container" ref="swiper1">
                    <div class="swiper-wrapper">
                        <div
                                :key="index"
                                @click="$router.push('/goods/details?productID=' + item.relationID)"
                                class="swiper-slide"
                                v-for="(item,index) in swipers"
                        >
                            <img :src="item.imageUrl"/>
                        </div>
                    </div>
                    <div class="swiper-pagination" ref="swiper-pagination1"></div>
                </div>
            </div>
            <!-- 导航 -->
            <div class="quick-nav">
                <ul
                        @click="$router.push('/itemshop?levelTwoCategoryID=2&name=办公桌&isSpecialGoods=1&categoryName=成人系列&index=1')"
                        class="item"
                >
                    <li>
                        <img src="../../../assets/images/home/index/zhuozi@3x.png"/>
                    </li>
                    <li>办公桌</li>
                </ul>
                <ul
                        @click="$router.push('/itemshop?levelTwoCategoryID=1&name=沙发&isSpecialGoods=4&categoryName=简约系列&index=1')"
                        class="item"
                >
                    <li>
                        <img src="../../../assets/images/home/index/shafa@3x.png"/>
                    </li>
                    <li>沙发</li>
                </ul>
                <!-- yye $router.push('/membercenter') -->
                <ul @click="showVIP" class="item">
                    <li>
                        <img src="../../../assets/images/home/index/zuanshi.png"/>
                    </li>
                    <li>会员</li>
                </ul>
                <ul @click="$router.push('/dingzhi')" class="item">
                    <li>
                        <img src="../../../assets/images/home/index/dinzhi.png"/>
                    </li>
                    <li>定制</li>
                </ul>
            </div>
            <!-- 主体商品 -->
            <template>
                <div class="goods-main" v-show="time !== 0">
                    <div class="classify-name">
                        <div style="height: 40%;width:3%;line-height: 40%;">
                            <img
                                    alt
                                    src="../../../assets/images/home/index/xianshi.png"
                                    style="width: 100%;height: 100%;"
                            />
                        </div>
                        <div>限时抢购</div>
                        <div style="padding:0 0.14rem;box-sizing: border-box;">
                            <van-count-down
                                    :time="time"
                                    format="DD 天 HH : mm : ss"
                                    style="background-color: #000000;color: #FFFFFF;border-radius:0.1rem;padding:0 0.14rem;box-sizing: border-box;"
                            ></van-count-down>
                        </div>
                    </div>
                    <div class="goods-row-2">
                        <div
                                :key="'info-'+index"
                                @click="gototimedetile(item.limitedTimeProductID)"
                                class="goods-list"
                                v-for="(item,index) in ProductLimitedTime"
                        >
                            <div class="goods-image">
                                <img :alt="item.activityImg" :src="item.activityImg"/>
                            </div>
                            <!-- 折后价格的商品 -->
                            <div class="price-warp" v-if="!item.full">

                                <div
                                        :key="'info2-'+index3"
                                        class="price"
                                        v-for="(item3,index3) in item.productLimitedTimeStandardsDTOS.slice(0,1)">
                  <span>
                    ¥{{userType == '3'? (item3.tradePrice * .01).toFixed(2): (item3.discountPrice*0.01).toFixed(2)}}
                      <!-- ￥{{item3.discountPrice}} -->
                  </span>
                                </div>
                                <div
                                        :key="'info3-'+index2"
                                        class="price line"
                                        v-for="(item2,index2) in item.productLimitedTimeStandardsDTOS.slice(0,1)">
                                    <span>
                            ¥{{(item2.originalPrice*0.01).toFixed(2)}}
                                        </span>
                                    <!--¥{{(item2.originalPrice).toFixed(2)}}-->
                                </div>

                            </div>
                            <!-- 满减价格的商品 -->
                            <div class="price-warp"
                                 v-if="item.full">

                                <div class="price">
                                  <span>
                                    ¥{{((item.full - item.reduce)*0.01).toFixed(2)}}
                                  </span>
                                </div>

                                <div
                                        :key="'info3-'+index2"
                                        class="price line"
                                        v-for="(item2,index2) in item.productLimitedTimeStandardsDTOS.slice(0,1)">
                                    <span>
                                    ¥{{(item2.originalPrice*0.01).toFixed(2)}}
                                    </span>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </template>
            <div class="tuijian-warp">
                <div class="tuijian">热门推荐</div>
                <div class="banner-wrap2 banner-wrap">
                    <div class="banner-wrap">
                        <div class="swiper-container" ref="swiper2">
                            <div class="swiper-wrapper">
                                <div
                                        :key="'info4-'+index"
                                        @click="$router.push('/goods/details?productID='+item.relationID)"
                                        class="swiper-slide"
                                        v-for="(item,index) in swipersrecom"
                                >
                                    <div class="banner-img">
                                        <img :src="item.imageUrl"/>
                                    </div>
                                    <div class="banner-text">
                                        <div style="width:60vw;">
                                            <div
                                                    style="
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;"
                                            >{{item.product.productName}}
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                    :key="'info5-'+index4"
                                                    style="color: red"
                                                    v-for="(item4,index4) in item.product.productStandards"
                                            >¥{{userType == '3'? (item4.tradePrice * .01).toFixed(2):
                                                (item4.bandPrice*0.01).toFixed(2)}}
                                                <!--                                                ¥{{(item4.bandPrice*0.01).toFixed(2)}}-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goods-recom-nav">
                <div class="recom-wrap">
                    <div class="icon"></div>
                    <div class="text">全部商品</div>
                </div>
            </div>
            <div class="goods-recom">
                <div
                        :key="index"
                        @click="$router.push('/goods/details?productID='+item.productID)"
                        class="goods-list"
                        style="padding:0 0 .2rem;"
                        v-for="(item,index) in recomgoods"
                >
                    <div class="goods-image">
                        <img :src="item.titleImg"/>
                    </div>
                    <div class="goods-title">{{item.productName}}</div>
                    <div
                            class="goods-title"
                            style="color: #989898;font-size: 0.24rem;overflow: hidden;"
                    >{{item.productDescription}}
                    </div>
                    <div class="goods-price">
                        <div
                                :key="'info6-'+index2"
                                class="price"
                                v-for="(item2,index2) in item.productStandards.slice(0,1)"
                        >
                            <span>
                                ¥{{userType == '3'? (item2.tradePrice * .01).toFixed(2): (item2.bandPrice*0.01).toFixed(2)}}
                                <!--                                ¥{{(item2.bandPrice*0.01).toFixed(2)}}-->
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <my-search :show="searchShow"></my-search>
        <div id="pusherto"></div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import UpRefresh from "../../../assets/js/libs/uprefresh.js";
    import Vue from "vue";
    import {CountDown, Dialog, PullRefresh, Toast} from "vant";
    import Swiper from "../../../assets/js/libs/swiper";
    import MySearch from "../../../components/search";

    Vue.use(PullRefresh);
    Vue.use(CountDown);
    Vue.use(Dialog);

    export default {
        name: "index",
        data() {
            return {
                isLoading: false,
                time: 0,
                shengjitishi: false,
                searchShow: {
                    show: false
                },
                productLimitedTimeshop: [],
                pageNindex: 1,
                order: [],
                pusher: null
            };
        },
        components: {
            MySearch
        },
        created() {
            console.log("index.vue - created");
            this.getCartGoods({
                success: res => {
                    this.pullUp.init(
                        {
                            curPage: 1,
                            maxPage: res.data.list.length / 6 + 1,
                            offsetBottom: 100
                        },
                        page => {
                            let Page2 = page ? page : 1;
                            this.getCartGoodsPage({
                                page: Page2,
                                success: res => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                    });
                                }
                            });
                        }
                    );
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            }); //查询购物车数量
            //升级
            this.shengji();

            this.pullUp = new UpRefresh();
            this.getRecomGoods({
                success: res => {
                    this.pullUp.init(
                        {curPage: 1, maxPage: res.data.pages, offsetBottom: 100},
                        page => {
                            this.getRecomGoodsPage({
                                page: page,
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                    });
                                }
                            });
                        }
                    );
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
            this.getProductLimited({
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                        this.time = ((this.ProductLimitedTime[0].endTime ? this.ProductLimitedTime[0].endTime : 0) - Math.round(new Date() / 1000)) * 1000;
                    });
                }
            });

            this.getSwiper({
                success: () => {
                    this.$nextTick(() => {
                        new Swiper(this.$refs["swiper1"], {
                            autoplay: 3000,
                            pagination: this.$refs["swiper-pagination1"],
                            paginationClickable: true,
                            autoplayDisableOnInteraction: false
                        });
                    });
                }
            });
            this.getShop({
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
            this.getSwipersrecom({
                success: () => {
                    this.$nextTick(() => {
                        this.$nextTick(() => {
                            new Swiper(this.$refs["swiper2"], {
                                autoplay: 3000,
                                paginationClickable: true,
                                autoplayDisableOnInteraction: false
                            });
                        });
                    });
                }
            });
        },
        mounted() {
            console.log(this.ProductLimitedTime);
            //直播初始化
            this.$nextTick(() => {
                if (window.plus) {
                    this.plusReady();
                } else {
                    document.addEventListener("plusready", this.plusReady, false);
                }
            })
        },
        computed: {
            ...mapState({
                userType: state => state.user.userType,
                swipers: state => state.index.swipers,
                shops: state => state.index.shops,
                swipersrecom: state => state.index.swipersrecom,
                recomgoods: state => state.index.recomgoods,
                isLogin: state => state.user.isLogin,
                ProductLimitedTime: state => state.index.ProductLimitedTime
            })
        },
        methods: {
            ...mapActions({
                getCartGoods: "cart/getCartGoods",
                getversionID: "index/getversionID", //检查版本
                getSwiper: "index/getSwiper",
                getShop: "index/getShop",
                getProductLimited: "index/getProductLimited",
                getSwipersrecom: "index/getSwipersrecom",
                getRecomGoods: "index/getRecomGoods",
                getRecomGoodsPage: "index/getRecomGoodsPage"
            }),
            plusReady() {
                if (!this.pusher) {
                    this.pusher = new plus.video.LivePusher("pusherto", {
                        url: '',
                        top: '0px',
                        left: '0px',
                        width: '0%',
                        height: '0%'
                    });
                    this.pusher.close();
                }
            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            },
            showVIP() {
                // Dialog.alert({
                //     title: "",
                //     message: "敬请期待"
                // });
                this.$router.push("/vip")
            },
            shengji() {
                this.getversionID({
                    success: res => {
                        var webview = plus.webview.currentWebview();
                        if (res.status === 1) {
                            if (res.data == null) {
                                //表示当前就是最新版本
                            } else {
                                Dialog.confirm({
                                    message: "当前版本不是最新版本",
                                    title: "最新版本",
                                    confirmButtonText: "立即升级",
                                    confirmButtonColor: "#239BFE",
                                    cancelButtonText: "暂不升级",
                                    cancelButtonColor: "#239BFE"
                                })
                                    .then(() => {
                                        window.location.href = res.data.downloadUrl;
                                        //确认后的操作
                                    })
                                    .catch(() => {
                                        //取消后的操作
                                        webview.close();
                                    });
                            }
                        }
                    }
                });
            },
            member() {
                Toast("功能还未开放尽请期待");
            },
            gototimedetile(url) {
                if (this.time === 0) {
                    Toast("抢购已结束");
                } else {
                    this.$router.push("/goods/timeshop?productCode=" + url);
                }
            },
            finish() {
                Toast();
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.getRecomGoods({
                success: res => {
                    var pages = res.data.pages;
                    this.pullUp.init(
                        {
                            curPage: 1,
                            maxPage: pages,
                            offsetBottom: 100
                        },
                        page => {
                            this.getRecomGoodsPage({
                                page: page,
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                    });
                                }
                            });
                        }
                    );
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
        }
    };
</script>

<style scoped>
    @import url("../../../assets/css/common/swiper.css");

    .page {
        width: 100%;
        min-height: 100%;
        margin-bottom: 1.5rem;
        background-color: #ffffff;
    }

    [v-cloak] {
        display: none !important;
    }

    .header {
        width: 100%;
        height: 1rem;
        position: fixed;
        z-index: 10;
        left: 0px;
        top: 0px;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0.3rem;
        box-sizing: border-box;
    }

    .header .classify-icon {
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .header .search-wrap {
        width: 5.2rem;
        height: 0.6rem;
        background-color: #f2f2f2;
        border-radius: 15px;
        display: flex;
        align-items: center;
        margin-right: 0.1rem;
    }

    .header .search-wrap .search-icon {
        width: 0.44rem;
        height: 0.44rem;
        background-image: url("../../../assets/images/common/search_icon.png");
        background-size: 80% 80%;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 0.2rem;
        margin-right: 0.07rem;
    }

    .header .search-wrap .text {
        font-size: 0.3rem;
        color: #989898;
    }

    .header .login {
        width: 1rem;
        height: 0.44rem;
        font-size: 0.3rem;
        color: #333;
    }

    .banner-wrap {
        width: 100%;
        height: 3.66rem;
    }

    .banner-wrap img {
        width: 100%;
        height: 100%;
    }

    .banner-wrap .swiper-container {
        width: 100%;
        height: 100%;
    }

    .banner-wrap2 {
        margin-top: 0.2rem;
        width: 100%;
        height: 3.6rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
    }

    .banner-img {
        height: 3rem;
    }

    .banner-text {
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.14rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
    }

    .quick-nav {
        width: 100%;
        height: 1.6rem;
        background-color: #ffffff;
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 0.2rem;
        box-sizing: border-box;
    }

    .quick-nav .item {
        width: 1.4rem;
    }

    .quick-nav .item li:nth-child(1) {
        width: 0.46rem;
        height: 0.42rem;
        margin: 0 auto;
    }

    .quick-nav .item li:nth-child(1) img {
        width: 100%;
        height: 100%;
    }

    .quick-nav .item li:nth-child(2) {
        font-size: 0.24rem;
        color: #7b7f82;
        text-align: center;
        margin-top: 0.2rem;
    }

    .goods-main {
        width: 100%;
        height: 3.7rem;
        background-color: #ffffff;
        margin-top: 0.2rem;
        overflow: hidde62;
    }

    .goods-main .classify-name {
        width: 100%;
        height: 0.64rem;
        font-size: 0.32rem;
        line-height: 0.64rem;
        padding: 0 0.32rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .goods-main .item {
        display: inline-block;
        width: 22px;
        /* margin:0 5px; */
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        /* background-color: #FFFFFF; */
    }

    .tuijian-warp {
        padding: 0 0.32rem;
        box-sizing: border-box;
        margin-top: 0.33rem;
    }

    .tuijian-warp .tuijian {
        width: 100%;
        height: 0.64rem;
        font-size: 0.32rem;
        line-height: 0.64rem;
    }

    .goods-main .goods-row-2 {
        width: 100%;
        height: 3.2rem;
        overflow: hidden;
        display: flex;
        padding: 0 0.32rem;
        box-sizing: border-box;
    }

    .goods-main .goods-row-2 .goods-list {
        width: 33.33333%;
        height: 100%;
    }

    .goods-main .goods-row-2 .goods-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 85%;
        height: 0.4rem;
        font-size: 0.28rem;
        font-weight: bold;
        text-align: center;
        margin-top: 0.22rem;
    }

    .goods-main .goods-row-2 .goods-image {
        width: 2.2rem;
        height: 2.4rem;
        margin: 0 auto;
        margin-top: 0.22rem;
    }

    .goods-main .goods-row-2 .goods-image img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .goods-main .goods-row-2 .price-warp {
        display: flex;
        text-align: left;
    }

    .goods-main .goods-row-2 .price {
        width: 100%;
        height: auto;
        font-size: 0.26rem;
        margin-top: 0.1rem;
    }

    .goods-main .goods-row-2 .price.line {
        font-size: 0.22rem;
        color: #989898;
        text-decoration: line-through;
        margin-top: 0.1rem;
    }

    .goods-recom-nav {
        margin-top: 0.4rem;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .goods-recom-nav .line {
        width: 35%;
        height: 1px;
        background-color: #d4d4d4;
    }

    .goods-recom-nav .recom-wrap {
        width: 1.8rem;
        height: 0.44rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .goods-recom-nav .recom-wrap .text {
        width: auto;
        height: auto;
        font-size: 0.32rem;
    }

    .goods-recom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0px 0.2rem;
        box-sizing: border-box;
        flex-wrap: wrap;
    }

    .goods-recom .goods-list {
        width: 48.6%;
        height: auto;
        background-color: #ffffff;
        padding: 0.2rem 0;
        margin-top: 0.2rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }

    .goods-recom .goods-list .goods-image {
        width: 3.5rem;
        height: 3.5rem;
        margin: 0 auto;
    }

    .goods-recom .goods-list .goods-image img {
        width: 100%;
        height: 100%;
    }

    .goods-recom .goods-list .goods-title {
        width: 80%;
        height: auto;
        font-size: 0.28rem;
        margin-top: 0.1rem;
        margin-left: 0.26rem;
        margin-right: 0.26rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .goods-recom .goods-list .goods-price {
        width: auto;
        height: auto;
        font-size: 0.26rem;
        color: red;
        margin-top: 0.1rem;
        margin-left: 0.26rem;
        margin-right: 0.26rem;

    }
</style>
