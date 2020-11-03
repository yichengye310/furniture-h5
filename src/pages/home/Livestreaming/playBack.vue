<template>
    <div class="play-back">
        <van-swipe @change="onChange" style="width:100%;height:100%;">
            <van-swipe-item v-for="(item,index) in video" :key="index" style="width:100%;height:100%;">
                <video
                        :src="item"
                        autoplay
                        controls
                        preload="auto"
                        class="video"
                        ref="video"
                        playsinline
                        style="width:100%;height:100%;object-fit:fill;"
                ></video>
            </van-swipe-item>
        </van-swipe>

        <!-- 视频信息及关闭 -->
        <div class="title">
            <div class="left">
                <div class="logo">
                    <img src="../../../assets/images/common/qiaoli.png" alt/>
                </div>
                <div class="des">
                    <div class="name">{{title}}</div>
                    <!-- <div class="name">我是视频标题</div> -->
                </div>
            </div>
            <div class="right">
                <img src="../../../assets/images/common/search_x.png" alt @click="closeVideo()"/>
            </div>
        </div>

        <!-- <div class="pro-recommend" v-if="limitProducts && limitProducts.length > 0">
          <div class="put">宝贝上架了，快来抢~</div>
          <div class="commodity"  @click="$router.push({path:'/goods/timeshop',query:{productCode:limitProducts[0].limitedTimeProductID,limit:1}})">
            <div class="left">
              <img :src="limitProducts[0].activityImg" alt />
            </div>
            <div class="right">
              <div class="live-name">{{limitProducts[0].productName}}</div>
              <div class="price-now">
                <div
                  class="price"
                >￥{{(limitProducts[0].productLimitedTimeStandardsDTOS[0].discountPrice*0.01).toFixed(2)}}</div>
                <div
                  class="now"
                >立即抢购</div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- <div class="pro-recommend" v-else-if="products && products.length > 0">
          <div class="put">宝贝上架了，快来抢~</div>
          <div class="commodity">
            <div class="left">
              <img :src="products[0].titleImg" alt />
            </div>
            <div class="right">
              <div class="live-name">{{products[0].productName}}</div>
              <div class="price-now">
                <div
                  class="price"
                >￥{{(products[0].lowPrice*0.01).toFixed(2)}}</div>
                <div
                  class="now"
                  @click="$router.push('/goods/details?productID='+products[0].productID)"
                >立即抢购</div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- 显示商品 -->
        <div class="show-product" @click="showProduct()">
            <span v-if="limitProducts && products">{{limitProducts.length+products.length}}</span>
            <span v-else-if="limitProducts">{{limitProducts.length}}</span>
            <span v-else-if="products">{{products.length}}</span>
        </div>

        <div class="zhibo-product" ref="product">
            <!-- 限时抢购栏标题 -->
            <div class="pro-title">
                <div class="Snapped-up" v-if="limitProducts">
                    <div class="icon">
                        <img src="../../../assets/images/home/index/xianshi.png" alt/>
                    </div>
                    <div class="text">限时抢购</div>
                    <div class="time">
                        <van-count-down class="left" :time="Getdate" format="DD 天 HH : mm : ss "/>
                    </div>
                </div>
                <div v-else style="width:94%;"></div>
                <div class="close" @click="closeProduct()" v-if="limitProducts">
                    <img src="../../../assets/images/common/search_x.png" alt/>
                </div>
                <div @click="closeProduct()" v-else style="margin: -.2rem .06rem 0 0;width:5%;">
                    <img src="../../../assets/images/common/search_x.png" style="width:100%;height:100%;" alt/>
                </div>
            </div>

            <!-- 限时抢购商品列表 -->
            <div class="limit-list">
                <div class="limit-pro" v-for="(item,index) in limitProducts" :key="index">
                    <div
                            class="img"
                            :style="{'background-image':'url('+item.activityImg+')','background-size':'100% 100%'}"
                            @click="$router.push({path:'/goods/timeshop',query:{productCode:item.limitedTimeProductID,limit:1}})"
                    >
                        <div class="pro-model">{{item.limitedTimeProductID}}</div>
                    </div>
                    <div class="pro-detail"
                         @click="$router.push({path:'/goods/details',query:{productID:item.limitedTimeProductID,limit:1}})">
                        <div class="pro-name">{{item.productName}}</div>
                        <div class="pro-des">{{item.productDescription}}</div>
                        <div class="container">
                            <div class="reduce" v-if="item.discountWay==1">
                                满{{(item.full*0.01).toFixed(2)}}减{{(item.reduce*0.01).toFixed(2)}}
                            </div>
                            <div
                                    class="pro-price"
                                    style="font-size:.3rem;"
                                    v-if="item.discountWay==2"
                            >原价：{{(item.productLimitedTimeStandardsDTOS[0].originalPrice*0.01).toFixed(2)}}
                            </div>
                        </div>

                        <div class="price-look">
                            <div
                                    class="price"
                                    v-if="item.discountWay==2"
                            >折后：￥{{(item.productLimitedTimeStandardsDTOS[0].discountPrice*0.01).toFixed(2)}}
                            </div>
                            <div
                                    class="price"
                                    v-if="item.discountWay==1"
                            >￥{{((item.full - item.reduce)*0.01).toFixed(2)}}
                            </div>
                            <div
                                    class="look"
                            >去看看
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                    style="width:100%;height:.8rem;text-indent:3%;font-size:.3rem;font-weight:bold;"
                    v-if="products.length"
            >活动商品共{{products.length}}件
            </div>
            <!-- 普通商品列表 -->
            <div class="limit-list">
                <div class="limit-pro" v-for="(item,index) in products" :key="index">
                    <div
                            class="img"
                            :style="{'background-image':'url('+item.titleImg+')','background-size':'100% 100%'}"
                            @click="$router.push('/goods/details?productID='+item.productID)"
                    >
                        <div class="pro-model">{{item.productID}}</div>
                    </div>
                    <div class="pro-detail" @click="$router.push('/goods/details?productID='+item.productID)">
                        <div class="pro-name">{{item.productName}}</div>
                        <div class="pro-des">{{item.productDescription}}</div>
                        <div class="container">
                            <div class="pro-price"></div>
                        </div>

                        <div class="price-look">
                            <div class="price">￥{{(item.lowPrice*0.01).toFixed(2)}}</div>
                            <div
                                    class="look"
                            >去看看
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {mapActions, mapState} from "vuex";
    import {CountDown, Slider, Swipe, SwipeItem} from "vant";
    import axios from "axios";

    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(CountDown);
    Vue.use(Slider);

    export default {
        data() {
            return {
                video: [],
                title: "",
                reduce: false,
                list: [],
                videoList: [],
                current: 0,
                pre: "http://jdvodynvxravh.vod.126.net/jdvodynvxravh/",
                limitProducts: [],
                products: [],
                Getdate: ""
            };
        },
        methods: {
            onChange(index) {
                this.current = index;
            },
            showProduct() {
                this.$refs.product.style.height = "70%";
                this.$refs.product.style.transition = ".4s";
                this.$refs.product.style.overflow = "auto";
            },
            closeVideo() {
                this.$router.go(-1);
            },

            closeProduct() {
                this.$refs.product.style.height = 0;
                this.$refs.product.style.transition = ".4s";
            }
        },
        created() {
            // 获取视频文件信息
            let cid = "";
            if (!this.$route.params.cid) {

                cid = sessionStorage.getItem("cid");
            } else {
                cid = this.$route.params.cid;

            }
            axios({
                method: "get",
                url: this.$config.baseApi + "/live/wyyx/videoList",
                headers: {
                    "Content-Type": "application/json;"
                },
                params: {
                    cid: cid
                }
            }).then(res => {

                this.videoList = res.data.ret.videoList;
                //   this.video =this.videoList;

                this.videoList.forEach(item => {
                    this.video.push(this.pre + item.orig_video_key);
                    this.title = item.video_name;
                });
                // sessionStorage.setItem("cid", cid);

                s(res.data);
            });

            axios({
                method: "get",
                url: this.$config.baseApi + "/live/liveProducts",
                headers: {
                    "Content-Type": "application/json;"
                },
                params: {
                    cid: cid
                }
            }).then(res => {

                this.limitProducts = res.data.data.limitProducts;
                this.products = res.data.data.products;

                if (this.limitProducts) {
                    this.Getdate = this.limitProducts[0].endTime * 1000 - new Date().getTime();
                }
                sessionStorage.setItem("cid", cid);

            });

        }
        // beforeDestroy(){
        //     this.$refs.video.pause();
        // }

    };
</script>

<style>
    .van-swipe__track {
        width: 100% !important;
    }

    .pro-recommend {
        position: absolute;
        left: 1.4rem;
        bottom: 10%;
        width: 4.4rem;
        height: 2rem;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 0.2rem;
    }

    .pro-recommend .put {
        width: 100%;
        height: 0.42rem;
        background: linear-gradient(
                90deg,
                rgba(255, 239, 215, 1) 0%,
                rgba(255, 249, 239, 1) 100%
        );
        opacity: 0.8;
        border-radius: 0.2rem 0.2rem 0 0;
        color: #ffad02;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.42rem;
    }

    .pro-recommend .commodity {
        width: 92%;
        padding: 0.2rem 4%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
    }

    .pro-recommend .commodity .left {
        width: 30%;
        height: 100%;
    }

    .pro-recommend .commodity .left img {
        width: 100%;
        height: 100%;
    }

    .pro-recommend .commodity .right {
        width: 66%;
        height: 100%;
        position: relative;
    }

    .pro-recommend .commodity .right .live-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* color: #fff; */
        font-size: 0.2rem;
    }

    .pro-recommend .commodity .right .price-now {
        height: 0.86rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .pro-recommend .commodity .right .price-now .price {
        color: #ff225b;
        font-size: 0.2rem;
        width: 1rem;
    }

    .pro-recommend .commodity .right .price-now .now {
        width: 1.2rem;
        height: 0.4rem;
        border-radius: 0.18rem;
        background-color: #ff225b;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.4rem;
    }

    .play-back {
        width: 100vw;
        height: 100vh;
        position: relative;
        overflow: hidden;
    }

    .play-back .video {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border: none;
    }

    .play-back .title {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        width: 90%;
        height: 1rem;
        padding: 0.4rem 5% 0;
    }

    .play-back .title .left {
        width: 3.2rem;
        height: 0.8rem;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.38rem;
        display: flex;
        align-items: center;
    }

    .play-back .title .left .logo {
        width: 0.64rem;
        height: 0.64rem;
        padding-left: 0.06rem;
    }

    .play-back .title .left .logo img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .play-back .title .left .des {
        width: 2.1rem;
        padding-left: 0.08rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: left;
    }

    .play-back .title .left .des .name {
        padding-left: 0.08rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.28rem;
    }

    .play-back .title .left .des .num {
        width: 100%;
        font-size: 0.24rem;
        transform: scale(0.9);
    }

    .play-back .title .right {
        height: 0.6rem;
        width: 0.6rem;
    }

    .play-back .title .right img {
        width: 100%;
        height: 100%;
    }

    .play-back .show-product {
        width: 0.7rem;
        height: 0.8rem;
        position: absolute;
        left: 0.38rem;
        bottom: 10%;
        background-image: url(../../../assets/images/live/gouwu.png);
        background-size: 100% 100%;
        color: #fff;
        text-align: center;
        line-height: 350%;
    }

    .play-back .zhibo-product {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 0;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        border-radius: 0.34rem 0.34rem 0 0;
    }

    .play-back .zhibo-product .pro-title {
        width: 94%;
        padding: 0.4rem 3%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .Snapped-up {
        display: flex;
    }

    .play-back .zhibo-product .pro-title .icon {
        width: 0.3rem;
        height: 0.4rem;
    }

    .play-back .zhibo-product .pro-title .icon img {
        width: 100%;
        height: 100%;
        margin-top: 0.06rem;
    }

    .play-back .zhibo-product .pro-title .text {
        font-size: 0.32rem;
        margin: 0 0.2rem 0 0.06rem;
    }

    .play-back .zhibo-product .pro-title .time {
        width: 2.4rem;
        height: 0.4rem;
        background-color: #fadfdc;
        border-radius: 0.04rem;
    }

    .play-back .zhibo-product .van-count-down {
        line-height: 0.4rem;
    }

    .play-back .zhibo-product .pro-title .time .left {
        width: 2.4rem;
        height: 0.42rem;
        color: #e52c5c;
        font-size: 0.28rem;
        background: none;
        border-radius: 0;
        font-weight: bolder;
        padding-left: 0.1rem;
    }

    .play-back .zhibo-product .pro-title .close {
        margin: -0.4rem .06rem 0 0;
        width: 5%;
    }

    .play-back .zhibo-product .pro-title .close img {
        width: 100%;
        height: 100%;
    }

    .play-back .zhibo-product .limit-list {
        width: 97%;
        padding-left: 3%;
    }

    .play-back .zhibo-product .limit-list .limit-pro {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 2.2rem;
        margin-bottom: 0.4rem;
    }

    .zhibo-product .limit-list .limit-pro .img {
        width: 2.2rem;
        height: 100%;
        position: relative;
    }

    .zhibo-product .limit-list .limit-pro .img .pro-model {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
    }

    .zhibo-product .limit-list .limit-pro .pro-detail {
        width: 64%;
        height: 100%;
        position: relative;
        padding-bottom: 0.2rem;
        padding-right: 3%;
        border-bottom: 0.8px solid #ddd;
    }

    .limit-pro .pro-detail .pro-name {
        font-size: 0.28rem;
        margin-bottom: 0.04rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .limit-pro .pro-detail .pro-des {
        font-size: 0.2rem;
        color: #333;
        margin-bottom: 0.06rem;
        height: 0.64rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .zhibo-product .limit-list .limit-pro .pro-detail .container {
        width: 100%;
        height: 0.48rem;
    }

    .limit-pro .pro-detail .reduce {
        width: 1.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        background-color: #e3cdd1;
        color: #ff225b;
        font-size: 0.2rem;
    }

    .limit-pro .pro-detail .price-look {
        /* position: absolute; */
        /* right: 0;
        bottom: 0; */
        width: 100%;
        height: 0.6rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .limit-pro .pro-detail .price-look .price {
        color: #fe2b54;
        font-size: 0.32rem;
    }

    .limit-pro .pro-detail .price-look .look {
        width: 1.2rem;
        height: 0.5rem;
        background-color: #fe2b54;
        color: #fff;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
</style>
