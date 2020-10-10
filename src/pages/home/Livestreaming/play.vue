<template>
    <div class="play"
         style="overflow:hidden;">
        <video
                :src="hlsPullUrl"
                @abort="closeVideo1()"
                @change="onchange()"
                @ended="closeVideo3()"
                @error="closeVideo2()"
                @load="onloaded()"
                @play="onplay()"
                @playing="onplaying()"
                @progress="onprogress()"
                autoplay="autoplay"
                id="video"
                poster="../../../assets/images/live/3f631408dc159184941a0ce48c005c5.jpg"
                preload="auto"
                style="width:100%;height:100%;object-fit:fill;"
        ></video>
        <div class="liveEnded" ref="liveEnded" style="display: none;">
            <img src="../../../assets/images/live/zhibojieshu.png">
            <div class="text">主播已经离开啦~去看看其他内容吧</div>
            <div @click="closeVideo()" class="back">返回</div>
        </div>
        <div @click="openGetCouponDialog()" class="check-coupon" v-if="btnCheckCoupon">
            <img src="../../../assets/images/live/get_coupon.png"/>
        </div>
        <div @click="showCoupon=false" class="get-coupon" v-if="showCoupon">
            <img alt src="../../../assets/images/live/coupon_dialog.png"/>
            <div @click.stop="btnGetCoupon? getCoupon(): ''" class="get-coupon-text">领取</div>
            <div class="get-coupon-timer"><span style="color: red;">{{getCouponTimer}}</span>秒后自动关闭</div>
        </div>
        <div class="title">
            <div class="left">
                <div class="logo">
                    <img alt src="../../../assets/images/common/aimumisi.png"/>
                </div>
                <div class="des">
                    <div class="name">{{number}}人观看中</div>
                    <!-- <div class="name">我是视频标题</div> -->
                </div>
            </div>
            <div class="right">
                <img @click="closeVideo()" alt src="../../../assets/images/live/closeto.png"/>
            </div>
        </div>

        <div class="barrage" ref="barrage"></div>
        <!-- <div class="barrage-item" > -->
        <!-- <div class="item" v-if="msg.userType==2" style="color:#F1CE03;" ref="huiyuan">
          <div>
            <img src="../../../assets/images/live/huiyuan.png" alt />会员
          </div>
          {{msg.msg}}
        </div>
        <div class="item" v-if="msg.userType==3" style="color:#006633;" ref="jingxiao">
          <div>
            <img src="../../../assets/images/live/shangjia.png" alt />经销商
          </div>
          {{msg.msg}}
        </div>
        <div class="item" v-if="msg.userType==4" style="color:#00C4FF" ref="shangjia">
          <div>
            <img src="../../../assets/images/live/shangjia.png" alt />商家
          </div>
          {{msg.msg}}
        </div>
        <div class="item" v-if="msg.userType==5" style="color:#FA3C6F;" ref="zhubo">
          <img src="../../../assets/images/live/zhubo.png" alt />主播
        </div>-->
        <!-- </div> -->

        <div class="pro-recommend" v-if="msgList.productLimitedTime">
            <div class="put">宝贝上架了，快来抢~</div>
            <div @click="limit(msgList.productLimitedTime.limitedTimeProductID)" class="commodity">
                <div class="left">
                    <img :src="msgList.productLimitedTime.activityImg" alt/>
                </div>
                <div class="right">
                    <div class="live-name">{{msgList.productLimitedTime.productName}}</div>
                    <div style="height:.5rem;display:flex;align-items:center;">
                        <div
                                style="background-color:#FFF5EF;color:#FF225B;font-size:.24rem;width:2rem;text-align:center;"
                                v-if="msgList.productLimitedTime.discountWay==1"
                        >
                            满{{(msgList.productLimitedTime.full*0.01).toFixed(2)}}减{{(msgList.productLimitedTime.reduce*0.01).toFixed(2)}}
                        </div>
                    </div>

                    <div class="price-now" style="height:.6rem;">
                        <div
                                class="price"
                                v-if="msgList.productLimitedTime.discountWay==1"
                        >￥{{((msgList.productLimitedTime.full - msgList.productLimitedTime.reduce)*0.01).toFixed(2)}}
                        </div>
                        <div
                                class="price"
                                v-if="msgList.productLimitedTime.discountWay==2"
                        >
                            ￥{{(msgList.productLimitedTime.productLimitedTimeStandardsDTOS[0].discountPrice*0.01).toFixed(2)}}
                        </div>
                        <div class="now">立即抢购</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pro-recommend" v-if="msgList.product">
            <div class="put">宝贝上架了，快来抢~</div>
            <div @click="toBuy(msgList.product.productID)" class="commodity">
                <div class="left">
                    <img :src="msgList.product.titleImg" alt/>
                </div>
                <div class="right">
                    <div class="live-name">{{msgList.product.productName}}</div>
                    <div style="height:.2rem;"></div>
                    <div class="price-now">
                        <div class="price">￥{{(msgList.product.lowPrice*0.01).toFixed(2)}}</div>
                        <div class="now">立即抢购</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="jinitaimei">
            <div @click="showProduct()" class="jinitaimei-img">
                <div class="img" v-if="limitProducts || products">{{limitProducts.length + products.length}}</div>
            </div>

            <div class="jinitaimei-input">
                <input placeholder="跟主播说点什么吧" type="text" v-model="value"/>
                <img @click="sendMessage()" alt src="../../../assets/images/live/fasong.png"/>
            </div>

            <div @click="changeColor()" class="jinitaimei-click">
                <img alt class="journal-reward" ref="aixin" src="../../../assets/images/live/dianzan.png"/>
            </div>
        </div>
        <div class="zhibo-product" ref="product">
            <!-- 限时抢购栏标题 -->
            <div class="pro-title">
                <div class="Snapped-up" v-if="limitProducts && limitProducts.length>0">
                    <div class="icon">
                        <img alt src="../../../assets/images/home/index/xianshi.png"/>
                    </div>
                    <div class="text">限时抢购</div>
                    <!-- <div class="time"> -->
                    <button class="time">
                        <van-count-down :time="Getdate" class="left" format="DD 天 HH : mm : ss "/>
                    </button>
                    <!-- </div> -->
                </div>
                <div @click="closeProduct()" class="close">
                    <img alt src="../../../assets/images/common/search_x.png"/>
                </div>
            </div>

            <!-- 限时抢购商品列表 -->
            <div class="limit-list">
                <div :key="index" class="limit-pro" v-for="(item,index) in limitProducts">
                    <div
                            :style="{'background-image':'url('+item.activityImg+')','background-size':'100% 100%'}"
                            @click="limitLook(item)"
                            class="img"
                    >
                        <div class="pro-model">{{item.limitedTimeProductID}}</div>
                    </div>
                    <div @click="limitLook(item)" class="pro-detail">
                        <div class="pro-name">{{item.productName}}</div>
                        <div class="pro-des">{{item.productDescription}}</div>
                        <div class="container">
                            <div
                                    class="reduce"
                                    v-if="item.discountWay==1"
                            >满{{(item.full*0.01).toFixed(2)}}减{{(item.reduce*0.01).toFixed(2)}}
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
                            <div class="look">去看看</div>
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
                <div :key="index" class="limit-pro" v-for="(item,index) in products">
                    <div
                            :style="{'background-image':'url('+item.titleImg+')','background-size':'100% 100%'}"
                            @click="proLook(item)"
                            class="img"
                    >
                        <div class="pro-model">{{item.productID}}</div>
                    </div>
                    <div @click="proLook(item)" class="pro-detail">
                        <div class="pro-name">{{item.productName}}</div>
                        <div class="pro-des">{{item.productDescription}}</div>
                        <div class="container">
                            <div class="pro-price"></div>
                        </div>

                        <div class="price-look">
                            <div class="price">￥{{(item.lowPrice*0.01).toFixed(2)}}</div>
                            <div class="look">去看看</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getMessage} from "../../../api/live/index";
    import BubbleHearts from "../../../assets/js/libs/flutter-hearts-zmt";
    import Vue from "vue";
    import axios from "axios";
    import {mapState} from "vuex";
    import {Dialog, Popup, Toast} from "vant";

    Vue.use(Toast);
    Vue.use(Popup);
    Vue.use(Dialog);
    // function closeVideo1() {
    //     Toast("直播已结束1");
    //     this.$router.go(-1);
    // }
    // function closeVideo2() {
    //     Toast("直播已结束2");
    //     this.$router.go(-1);
    // }
    // function closeVideo3() {
    //     Toast("直播已结束3");
    //     this.$router.go(-1);
    // }
    // function onplay(){
    //     console.log("onplay");
    //     this.$refs.poster.display = "none";
    // }
    // function onplaying() {
    //     console.log("onplaying");
    //     this.$refs.poster.display = "none";
    // }
    // function onchange() {
    //     console.log("onchange");
    //     this.$refs.poster.display = "none";
    // }
    // function onprogress() {
    //     console.log("onprogress");
    //     this.$refs.poster.display = "none";
    // }
    // function onloaded(){
    //     console.log("onloaded");
    //     this.$refs.poster.display = "none";
    // }

    export default {
        data() {
            return {
                webSocket: null,
                hlsPullUrl: localStorage["hlsPullUrl"],
                pushMsg: {},
                video: null,
                show: false,
                value: "",
                msgList: {},
                Getdate: "",
                limitProducts: [],
                products: [],
                number: localStorage.getItem("onlineNum"),
                flage: localStorage.getItem("flage"),
                showCoupon: false,
                couponID: "",
                btnGetCoupon: false,
                btnCheckCoupon: false,
                getCouponTimer: 10,
                //userType: localStorage.getItem("userType2")
            };
        },
        watch: {
            flage: {
                handler(newValue, oldValue) {
                    console.log('play.vue - watch: newValue：' + newValue + ", oldValue: " + oldValue);
                    // yye
                    // TODO
                    // this.flage = newValue;
                    // if (this.flage === '0') {
                    //     this.closeVideo();
                    //     Toast("直播已结束");
                    //     this.$router.go(-1)
                    // }
                },
                immediate: true
            }
        },
        created() {
            console.log("play.vue -> created(): " + this.userType);
//     window.addEventListener('setItem', ()=> {
//     this.flage = sessionStorage.getItem('flage');
//     if (this.flage === 0) {
//         this.closeVideo();
//         Toast("直播已结束");
//         this.$router.go(-1)
//       }
// })
            this.$nextTick(() => {
                //页面刚进入时开启长连接
                this.initWebSocket();
            });
            // 获取视频文件信息
            let proid = "";
            if (!this.$route.params.proid) {
                proid = sessionStorage.getItem("proid");
            } else {
                proid = this.$route.params.proid;
            }
            axios({
                method: "get",
                url: this.$config.baseApi + "/live/liveProducts",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    cid: proid
                }
            }).then(res => {
                this.limitProducts = res.data.data.limitProducts;
                this.products = res.data.data.products;
                if (this.limitProducts.length > 0) {
                    this.Getdate = this.limitProducts[0].endTime * 1000 - new Date().getTime();
                }
                sessionStorage.setItem("proid", proid);
            });

            this.$nextTick(() => {
                //yye
                // if (window.plus) {
                //     this.plusReady();
                //     this.playVideo1();
                // } else {
                //     plus.globalEvent.addEventListener("plusready", this.plusReady, false);
                //     this.playVideo1();
                // }

            });
        },
        computed: {
            ...mapState({
                // roomName: state => state.live.roomName,
                userName: state => state.user.phoneNumber || "游客",
                userType: state => state.user.userType,
            })
        },

        mounted() {
            // 图片地址在此处更换  可换成你的图片
            var assets = [
                require("../../../assets/images/live/aixin1.png"),
                require("../../../assets/images/live/aixin2.png"),
                require("../../../assets/images/live/aixin3.png"),
                require("../../../assets/images/live/aixin4.png"),
                require("../../../assets/images/live/aixin5.png"),
                require("../../../assets/images/live/aixin6.png")
            ];
            assets.forEach(function (src, index) {
                assets[index] = new Promise(function (resolve) {
                    var img = new Image();
                    img.onload = resolve.bind(null, img);
                    img.src = src;
                });
            });

            Promise.all(assets).then(function (images) {
                var random = {
                    uniform: function (min, max) {
                        return min + (max - min) * Math.random();
                    },
                    uniformDiscrete: function (i, j) {
                        return i + Math.floor((j - i + 1) * random.uniform(0, 1));
                    }
                };
                var stage = new BubbleHearts();
                var canvas = stage.canvas;
                canvas.width = 100;
                canvas.height = 200;
                canvas.style["width"] = "170px";
                canvas.style["height"] = "300px";
                canvas.style["position"] = "fixed";
                canvas.style["right"] = "-50px";
                canvas.style["bottom"] = "1.2rem";
                document.body.appendChild(canvas);
                //journal-reward 为赏桃的按钮
                document
                    .getElementsByClassName("journal-reward")[0]
                    .addEventListener("click", function () {
                        //随机飘动
                        stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
                        if (document.querySelectorAll("canvas").length > 1) {
                            document.body.removeChild(document.querySelectorAll("canvas")[0]);
                        }
                        //垂直向上飘动效果
                        // let image = images[random.uniformDiscrete(0, images.length - 1)];
                        // stage.bubble(image, 3000, function(lifespan) {
                        //   if (lifespan >= 0) {
                        //     stage.context.drawImage(
                        //       image,
                        //       (canvas.width - image.width) / 2,
                        //       (canvas.height - image.height) * lifespan,
                        //       image.width,
                        //       image.height
                        //     );
                        //   } else {
                        //     return true;
                        //   }
                        // });
                    });
            });
        },
        methods: {
            barrage() {
                let barrage = this.$refs.barrage;
                let yonghu = this.$refs.yonghu;
                let huiyuan = this.$refs.huiyuan;
                let jingxiao = this.$refs.jingxiao;
                let shangjia = this.$refs.shangjia;
                let zhubo = this.$refs.zhubo;
                switch (this.msgList.userType) {
                    case 1:
                        let childItem1 = document.createElement("button");
                        childItem1.style.color = "#fff";
                        childItem1.style.backgroundColor = "rgba(0,0,0,.3)";
                        childItem1.style.fontSize = ".28rem";
                        childItem1.style.padding = ".06rem .08rem";
                        childItem1.style.display = "flex";
                        childItem1.style.alignItems = "center";
                        childItem1.style.justifyContent = "flex-start";
                        childItem1.style.margin = ".1rem 0";

                        childItem1.innerHTML = `${this.msgList.msg}`;
                        barrage.appendChild(childItem1);
                        break;
                    case 2:
                        let childItem2 = document.createElement("button");
                        childItem2.style.color = "#FFDA00";
                        childItem2.style.backgroundColor = "rgba(0,0,0,.3)";
                        childItem2.style.fontSize = ".28rem";
                        childItem2.style.padding = ".08rem";
                        childItem2.style.display = "flex";
                        childItem2.style.alignItems = "center";
                        childItem2.style.justifyContent = "flex-start";
                        childItem2.style.margin = ".1rem 0";
                        childItem2.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/huiyuan.png" alt />会员</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem2);
                        break;
                    case 3:
                        let childItem3 = document.createElement("button");
                        childItem3.style.color = "#45ED7E";
                        childItem3.style.backgroundColor = "rgba(0,0,0,.3)";
                        childItem3.style.fontSize = ".28rem";
                        childItem3.style.padding = ".08rem";
                        childItem3.style.display = "flex";
                        childItem3.style.alignItems = "center";
                        childItem3.style.justifyContent = "flex-start";
                        childItem3.style.margin = ".1rem 0";
                        childItem3.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/huiyuan.png" alt />经销商</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem3);
                        break;
                    case 4:
                        let childItem4 = document.createElement("button");
                        childItem4.style.color = "#00C4FF";
                        childItem4.style.backgroundColor = "rgba(0,0,0,.3)";
                        childItem4.style.fontSize = ".28rem";
                        childItem4.style.padding = ".08rem";
                        childItem4.style.display = "flex";
                        childItem4.style.alignItems = "center";
                        childItem4.style.justifyContent = "flex-start";
                        childItem4.style.margin = ".1rem 0";
                        childItem4.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/shangjia.png" alt />商家</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem4);
                        break;
                    case 5:
                        let childItem5 = document.createElement("button");
                        childItem5.style.color = "#F2D491";
                        childItem5.style.backgroundColor = "rgba(0,0,0,.3)";
                        childItem5.style.fontSize = ".28rem";
                        childItem5.style.padding = ".08rem";
                        childItem5.style.display = "flex";
                        childItem5.style.alignItems = "center";
                        childItem5.style.justifyContent = "flex-start";
                        childItem5.style.margin = ".1rem 0";

                        let inner = "";
                        if (this.msgList.pushType == 5) {
                            inner = `${this.msgList.msg}`;
                        } else {
                            inner = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/zhubo.png" alt />主播: </div>${this.msgList.msg}`;
                        }
                        childItem5.innerHTML = inner;
                        barrage.appendChild(childItem5);
                        break;
                }
                barrage.scrollTop = barrage.scrollHeight;
            },
            checkCoupon() {
                axios({
                    method: "GET",
                    url: this.$config.baseApi + "/coupon/getAcceptedableCouponList",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        "userID": localStorage.getItem("uid"),
                        "userType": this.userType,
                        "couponReleaseWindow": 2
                    }
                }).then(res => {
                    console.log("play.vue: checkCoupon(): " + JSON.stringify(res));
                    if (res.data.data.length >= 0) {
                        this.showCoupon = true;
                        let timer = window.setInterval(() => {
                            this.getCouponTimer--;
                            if (this.getCouponTimer === 0) {
                                window.clearInterval(timer);
                                this.showCoupon = false;
                                this.getCouponTimer = 10;
                                this.btnCheckCoupon = false;
                                this.couponID = "";
                            }
                        }, 1000);
                        // TODO
                        this.couponID = res.data.data[0].couponID;
                    } else {
                        this.couponID = "";
                    }
                });
            },

            openGetCouponDialog() {
                this.showCoupon = true;
                this.btnGetCoupon = true;
                let timer = window.setInterval(() => {
                    this.getCouponTimer--;
                    if (this.getCouponTimer === 0) {
                        window.clearInterval(timer);
                        this.showCoupon = false;
                        this.getCouponTimer = 10;
                        this.btnCheckCoupon = false;
                        this.btnGetCoupon = false;
                        this.couponID = "";
                    }
                }, 1000);
            },

            getCoupon() {
                this.btnGetCoupon = false;
                console.log(this.couponID,localStorage.getItem("uid"));
                axios({
                    method: "GET",
                    url: this.$config.baseApi + "/coupon/gainedCouponByID",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        "userID": localStorage.getItem("uid"),
                        "couponID": this.couponID
                    }
                }).then(res => {
                    console.log("play.vue: getCoupon(): " + JSON.stringify(res));
                    // this.btnGetCoupon = ;
                    // TODO
                    if (res.data.status === 0) {
                        Dialog.alert({
                            message: "优惠券领取成功"
                        }).then(() => {
                            this.btnCheckCoupon = false;
                            this.showCoupon = false;
                            this.btnGetCoupon = false;
                            this.couponID = "";
                        })
                    } else {
                        Dialog.alert({
                            message: "优惠券领取失败，请重试"
                        }).then(() => {
                            // this.btnCheckCoupon = false;
                            // this.showCoupon = false
                        })
                    }
                });
            },

            limit(e) {
                // if(this.limitProducts && this.limitProducts.length>0){
                this.$router.push({
                    path: "/goods/timeshop",
                    query: {productCode: e, limit: 1, zhibo: 1}
                });
                // }
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    3,
                    this.userType,
                    "",
                    e
                );
            },
            limitLook(item) {
                this.$router.push({
                    path: "/goods/timeshop",
                    query: {productCode: item.limitedTimeProductID, limit: 1, zhibo: 1}
                });
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    3,
                    this.userType,
                    "",
                    item.limitedTimeProductID
                );
            },
            toBuy(e) {
                this.$router.push({
                    path: "/goods/details",
                    query: {productID: e, zhibo: 1}
                });
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    3,
                    this.userType,
                    e
                );
            },
            proLook(item) {
                this.$router.push({
                    path: "/goods/details",
                    query: {productID: item.productID, zhibo: 1}
                });
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    3,
                    this.userType,
                    item.products.productID
                );
            },
            closeVideo() {
                this.$router.go(-1);
            },
            closeVideo1() {
                Toast("直播中断");
                // this.$router.go(-1);
            },
            closeVideo2() {
                Toast("发生错误");
                //this.$router.go(-1);
            },
            closeVideo3() {
                Toast("直播已结束");
                // this.$router.go(-1);
            },
            ceplay() {
                console.log("onplay");
                // this.$refs.poster.display = "none";
            },
            onplaying() {
                console.log("onplaying");
                //this.$refs.poster.display = "none";
            },
            onchange() {
                console.log("onchange");
                // this.$refs.poster.display = "none";
            },
            onprogress() {
                console.log("onprogress");
                // this.$refs.poster.display = "none";
            },
            onloaded() {
                console.log("onloaded");
                // this.$refs.poster.display = "none";
            },
            closeProduct() {
                this.$refs.product.style.height = 0;
                this.$refs.product.style.transition = ".4s";
            },
            showProduct() {
                this.$refs.product.style.height = "70%";
                this.$refs.product.style.transition = ".4s";
                this.$refs.product.style.overflow = "auto";
                let that = this;
                let proid = "";
                if (!this.$route.params.proid) {
                    proid = sessionStorage.getItem("proid");
                } else {
                    proid = this.$route.params.proid;
                }
                axios({
                    method: "get",
                    url: that.$config.baseApi + "/live/liveProducts",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        cid: proid
                    }
                }).then(res => {
                    that.limitProducts = res.data.data.limitProducts;
                    that.products = res.data.data.products;
                    if (that.limitProducts.length > 0) {
                        that.Getdate = that.limitProducts[0].endTime * 1000 - new Date().getTime();
                    }
                    sessionStorage.setItem("proid", proid);
                });
            },

            toLimit(item) {
                this.$router.push(
                    "/goods/timeshop?productCode=" + item.limitedTimeProductID + "&zhibo=1"
                );
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    3,
                    this.userType
                );
            },
            sendMessage() {
                if (localStorage['isLogin']) {
                    let roomName = localStorage.getItem("roomName");
                    if (this.value.trim() && this.value.length < 50) {
                        getMessage(
                            localStorage.getItem("roomName"),
                            this.userName,
                            this.value,
                            1,
                            this.userType
                        );
                        let barrage = this.$refs.barrage;
                        barrage.scrollTop = barrage.scrollHeight;
                        this.value = "";
                    } else {
                        Toast("输入内容不能为空或者大于五十字");
                        this.value = "";
                    }
                } else {
                    Dialog.confirm({
                        message: "请先登录"
                    }).then(() => {
                        this.$router.replace("/login");
                    }).catch(() => {

                    });
                }
            },
            changeColor() {
                this.$refs.aixin.src = require("../../../assets/images/live/dianle.png");
            },

            initWebSocket() {
                //初始化weosocket
                // console.log(process.env.VUE_APP_URL_WS);
                const wsuri = `ws://${process.env.VUE_APP_URL_WS}/websocket/chat/${localStorage["roomName"]}/${this.userName}`; //ws地址
                console.log(wsuri);
                this.webSocket = new WebSocket(wsuri);
                this.webSocket.onopen = this.wsonopen;

                this.webSocket.onerror = this.wsonerror;

                this.webSocket.onmessage = this.wsonmessage;
                this.webSocket.onclose = this.wsclose;
            },

            wsonopen() {
                console.log("WebSocket连接成功");
                console.log(this.$store.state.user);

                let childItem1 = document.createElement("button");
                childItem1.style.color = "#fff";
                childItem1.style.backgroundColor = "rgba(0,0,0,.3)";
                childItem1.style.fontSize = ".28rem";
                childItem1.style.padding = ".06rem .08rem";
                childItem1.style.display = "flex";
                childItem1.style.alignItems = "flex-start";
                childItem1.style.justifyContent = "flex-start";
                childItem1.style.margin = ".1rem 0";
                childItem1.style.textAlign = "left";

                childItem1.innerHTML = '公告:官方倡导绿色直播，对直播内容进行24小时 在线巡查。任何传播低俗，引诱，穿着暴露，黄赌毒等一切违法行为将会封停账号。';
                this.$refs.barrage.appendChild(childItem1);

                // getMessage(this.roomName, this.userName, "", 4, this.userType);
                getMessage(
                    localStorage.getItem("roomName"),
                    this.userName,
                    "",
                    4,
                    localStorage.getItem("userType2")
                );
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
                if (this.msgList.pushType === 7) { // 发优惠券
                    console.log("play.vue->wsonmessage(): 发优惠券了");
                    this.btnCheckCoupon = true;
                    console.log(JSON.stringify(this.msgList));
                    this.couponID = this.msgList.couponModel.couponID;
                } else if (this.msgList.pushType === 6) {
                    if (!this.msgList.isOpenLive) {
                        console.log("play.vue->wsonmessage(): 直播结束了");
                        this.$refs.liveEnded.style.display = "flex";
                        return;
                    }
                } else if (this.msgList.pushType === 4) {
                    this.number = this.msgList.onlineNum;
                    localStorage.setItem("onlineNum", this.msgList.onlineNum);
                } else {
                    this.number = localStorage.getItem("onlineNum");
                }
                if (this.msgList.pushType === 5 && this.msgList.userType === 5) {
                    if (this.msgList.productLimitedTime) {
                        this.pushMsg = this.msgList.productLimitedTime;
                    } else {
                        this.pushMsg = this.msgList.product;
                    }
                }

                this.barrage();
            },

            wssend(agentData) {
                //数据发送
                this.ws.send(agentData);
            },

            wsclose(e) {
                //关闭
                console.log("connection closed (" + e.code + ")");
            }
        },

        beforeRouteLeave(to, form, next) {
            next();
        },

        destroyed() {
            this.webSocket.close();
            //页面销毁时关闭长连接
        }
    };
</script>

<style scoped>
    .play {
        background-color: white;
        background-image: url('../../../assets/images/live/3f631408dc159184941a0ce48c005c5.jpg');
        background-size: 100% 100%;
    }

    .play .title {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        display: flex;
        justify-content: space-between;
        width: 90%;
        height: 1rem;
        padding: 0.4rem 5% 0;
    }

    .play .title .left {
        width: 3.2rem;
        height: 0.8rem;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.38rem;
        display: flex;
        align-items: center;
    }

    .play .title .left .logo {
        width: 0.64rem;
        height: 0.64rem;
        padding-left: 0.06rem;
    }

    .play .title .left .logo img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .play .title .left .des {
        width: 2.1rem;
        padding-left: 0.08rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: left;
    }

    .play .title .left .des .name {
        padding-left: 0.08rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.28rem;
    }

    .play .title .left .des .num {
        width: 100%;
        font-size: 0.24rem;
        transform: scale(0.9);
    }

    .play .title .right {
        height: 0.6rem;
        width: 0.6rem;
    }

    .play .title .right img {
        width: 100%;
        height: 100%;
    }

    .pro-recommend {
        position: absolute;
        left: 0.4rem;
        bottom: 10%;
        width: 4.8rem;
        /* height: 2rem; */
        background-color: rgba(255, 255, 255);
        border-radius: 0.2rem;
        z-index: 99;
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
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.42rem;
    }

    .pro-recommend .commodity {
        width: 92%;
        /* background: rgba(0, 0, 0, 0.2); */
        padding: 0.2rem 4%;
        height: 1.4rem;
        border-radius: 0 0 0.2rem 0.2rem;
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
        font-size: 0.28rem;
    }

    .pro-recommend .commodity .right .price-now {
        height: 0.86rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .pro-recommend .commodity .right .price-now .price {
        color: #ff225b;
        font-size: 0.28rem;
        width: 1rem;
    }

    .pro-recommend .commodity .right .price-now .now {
        width: 1.3rem;
        height: 0.46rem;
        border-radius: 0.2rem;
        background-color: #ff225b;
        color: #fff;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.48rem;
        margin-right: -0.06rem;
    }

    .play .barrage {
        position: absolute;
        left: 0.4rem;
        bottom: 2.4rem;
        height: 4rem;
        font-size: 0.28rem;
        z-index: 99;
        overflow-y: auto;
    }

    .play .check-coupon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        right: 0;
        top: 2rem;
    }

    .play .check-coupon img {
        width: 100%;
    }

    .play .get-coupon {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 30%;
        width: 4rem;
        z-index: 2;
    }

    .play .get-coupon img {
        width: 100%;
    }

    .play .get-coupon .get-coupon-text {
        color: white;
        font-size: .4rem;
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: .77rem;
    }

    .play .get-coupon .get-coupon-timer {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        /* margin: 0 auto; */
        font-size: .25rem;
        color: white;
        bottom: .3rem;
    }

    canvas {
        display: block;
        position: fixed;
        bottom: 100px;
        right: 24px;
        z-index: 20;
        cursor: pointer;
        /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
    }

    canvas img {
        width: 0.4rem;
        height: 0.4rem;
    }

    .play {
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    .jinitaimei {
        position: absolute;
        left: 0;
        bottom: 0.1rem;
        width: 100%;
        height: auto;
        display: flex;
        padding: 0.2115rem 0.38rem;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        z-index: 99;
    }

    .jinitaimei-img {
        width: 0.6815rem;
        height: 0.7285rem;
    }

    .jinitaimei-img .img {
        font-size: .28rem;
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: 350%;
        background-image: url(../../../assets/images/live/gouwu.png);
        background-size: 100% 100%;
    }

    .jinitaimei-input {
        width: 76%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .jinitaimei-input input {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        background-color: rgba(255, 255, 255, 0.7);
        font-size: 0.28rem;
        line-height: 100%;
        padding-left: 0.18rem;
        padding-right: 0.58rem;
        outline: none;
    }

    .jinitaimei-input img {
        position: absolute;
        right: 0.18rem;
        top: 0.15rem;
        height: 0.3rem;
        width: 0.3rem;
    }

    .jinitaimei-click {
        width: 0.564rem;
        height: 0.564rem;
        position: relative;
    }

    .jinitaimei-click img {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .timetitle {
        display: flex;
        padding: 0.282rem 0.376rem;
        align-items: center;
    }

    .timetitle-img {
        height: 40%;
        width: 3%;
        line-height: 40%;
    }

    .timeshopmain {
        display: flex;
        padding: 0.141rem 0.329rem;
        box-sizing: border-box;
    }

    .timeshopmain .timeshopmain-img {
        width: 1.8095rem;
        height: 1.8095rem;
        margin: 0.1175rem;
    }

    .timeshopmain-title {
        font-size: 0.235rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        overflow: hidden;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

    .timeshopmain-title2 {
        font-size: 0.188rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

    .timeshopmain-title3 {
        position: relative;
        background-color: #ffffff;
    }

    .timeshopmain-title3 button {
        width: auto;
        background-color: #fadfdc;
        color: #e52c5c;
        font-size: 8px;
        font-family: PingFang SC;
        font-weight: 400;
    }

    .timeshopmain-title4 {
        display: flex;
        justify-content: space-between;
        padding-right: 0.329rem;
        padding-bottom: 0.2115rem;
        border-bottom: 0.0235rem solid rgba(0, 0, 0, 0.06);
    }

    .timeshopmain-title4 div {
        font-size: 0.3055rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 34, 91, 1);
    }

    .timeshopmain-title4 button {
        width: 1.1985rem;
        height: 0.4935rem;
        background: rgba(254, 43, 84, 1);
        border-radius: 0.047rem;
        font-size: 0.235rem;
        color: #ffffff;
    }

    .play .zhibo-product {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 0;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        border-radius: 0.34rem 0.34rem 0 0;
        z-index: 999;
    }

    .play .zhibo-product .pro-title {
        width: 94%;
        padding: 0.4rem 3%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .Snapped-up {
        width: 90%;
        display: flex;
        align-items: center;
    }

    .play .zhibo-product .pro-title .icon {
        width: 0.3rem;
        height: 0.4rem;
        vertical-align: middle;
    }

    .play .zhibo-product .pro-title .icon img {
        width: 100%;
        height: 100%;
    }

    .play .zhibo-product .pro-title .text {
        font-size: 0.32rem;
        margin: 0 0.2rem 0 0.06rem;
    }

    .play .zhibo-product .pro-title .time {
        width: 43%;
        height: 0.4rem;
        background-color: #fadfdc;
        border-radius: 0.04rem;
        text-align: center;
    }

    .play .zhibo-product .van-count-down {
        line-height: 0.4rem;
    }

    .play .zhibo-product .pro-title .time .left {
        width: 2.4rem;
        height: 0.42rem;
        color: #e52c5c;
        font-size: 0.28rem;
        background: none;
        border-radius: 0;
        font-weight: bolder;
        /* padding-left: 0.1rem; */
    }

    .play .zhibo-product .pro-title .close {
        margin: -0.2rem 0.06rem 0 0;
        width: 5%;
    }

    .play .zhibo-product .pro-title .close img {
        width: 100%;
        height: 100%;
    }

    .play .zhibo-product .limit-list {
        width: 97%;
        padding-left: 3%;
    }

    .play .zhibo-product .limit-list .limit-pro {
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
        background-color: #FFF5EF;
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

    .liveEnded {
        background: rgba(0, 0, 0, .7);
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: -moz-box;
        display: -moz-flex;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -moz-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -moz-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .liveEnded img {
        width: 2rem;
        height: 2rem;
    }

    .liveEnded .text {
        color: white;
        margin-top: .2rem;
    }

    .liveEnded .back {
        color: white;
        border: solid 1px white;
        width: 1rem;
        border-radius: .3rem;
        text-align: center;
        margin-top: .2rem;
    }
</style>
