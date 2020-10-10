<template>
    <div class="livesteart">
        <div class="live-input live-input-2">

            <input
                    type="text"
                    placeholder="请输入直播标题"
                    v-model="livetitle"
                    style="margin-left:0.3525rem;;width: 80%;"
            />

        </div>

        <div class="live-input dingwei">
            <div class="dingwei-icon">
                <img src="../../../assets/images/live/weizhi.png" alt/>
            </div>
            <input type="text" placeholder="打开定位直播效果更好" v-model="LocationCity"/>
            <van-switch v-model="checked" @input="onInput" size="0.5405rem" active-color="#000000"/>
        </div>

        <van-collapse v-model="activeNames">

            <!-- yye 该版本隐藏录屏功能 -> 隐藏直播方式，默认摄像头直播
            <van-collapse-item title="直播方式" name="1">
                <van-radio-group v-model="radio" class="live-for-style-choose">
                    <van-radio name="1">
                        摄像头直播
                        <template #icon="props">
                            <img style="height:0.3525rem;" :src="props.checked ? activeIcon:inactiveIcon"/>
                        </template>
                    </van-radio>
                    <van-radio name="2">
                        录屏直播
                        <template #icon="props">
                            <img style="height:0.3525rem;" :src="props.checked ? activeIcon : inactiveIcon"/>
                        </template>
                    </van-radio>
                </van-radio-group>
            </van-collapse-item>
            -->

            <van-collapse-item name="2">
                <template #title>
                    <div @click="choosetheputong()">选择限时抢购产品</div>
                </template>
                <div ref="wrapper" class="wrapper" style=" touch-action: none">
                    <div class="tags-wrap cont" ref="cont" style="display: flex;width: 100%;">
                        <div class="choose-shop-tolive" v-for="(item,index) in timeshop1" :key="index">
                            <div style="height: 1.9975rem;">
                                <img :src="item.activityImg" alt style="width:100%;height:100%"/>
                            </div>
                            <div class="choose-shop-tolive-title">{{item.productDescription}}</div>
                        </div>

                        <div v-show="timeshop1.length <= 0">您还没有添加商品,请先添加商品</div>
                    </div>
                </div>
            </van-collapse-item>

            <van-collapse-item name="3">
                <template #title>
                    <div @click="tochoose()">选择普通产品</div>
                </template>

                <div ref="wrapper" class="wrapper" style=" touch-action: none">
                    <div class="tags-wrap cont" ref="cont" style="display: flex;width: 100%;">
                        <div class="choose-shop-tolive" v-for="(item,index) in livetheshop" :key="index">
                            <div style="height: 1.9975rem;">
                                <img :src="item.titleImg" alt style="width:100%;height:100%"/>
                            </div>
                            <div class="choose-shop-tolive-title">{{item.productName}}</div>
                        </div>
                        <div v-show="livetheshop.length <= 0">您还没有添加商品,请先添加商品</div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>

        <div
                style="font-size:14px;
			font-family:Hiragino Sans GB;
			font-weight:normal;
			color:rgba(51,51,51,0.42);
			margin-left:0.3525rem;
            margin-top: .2rem;"
        >*限时抢购商品和普通商品至少选一样
        </div>
        <div class="starttozthelive">
            <div class="live-button" @click="ppPusher()">开始直播</div>
        </div>
    </div>
</template>

<script>
    import map from "../../../assets/js/utils/map.js";
    import {mapState, mapMutations, mapActions} from "vuex";
    import BScroll from "better-scroll";
    import Vue from "vue";
    import axios from "axios";
    import {
        Icon,
        Toast,
        Switch,
        Collapse,
        CollapseItem,
        Radio,
        RadioGroup
    } from "vant";

    Vue.use(Icon);
    Vue.use(Toast);
    Vue.use(Switch);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    export default {
        name: "livefore",
        data() {
            return {
                istolive: false,
                radio: "1",
                activeIcon: require("../../../assets/images/live/choose2.png"),
                inactiveIcon: require("../../../assets/images/live/choose1.png"),
                activeNames: ["1", "2", "3"],
                checked: false,
                checkednum: '',

                cityto: "",
                // liveshop:[1,2],
                partsrc: "",
                pusher: null,
                livetitle: localStorage['livetitle'] ? localStorage['livetitle'] : "",

                LocationCity: "",
                longitude: "", //经纬度
                latitude: "", //经纬度
                randomNumber: Math.random()
            };
        },
        created() {
            console.log("zhibbo created");
            console.log("zhibbo created 普通商品: " + JSON.stringify(this.livetheshopID));
            console.log("zhibbo created 限时商品: " + JSON.stringify(this.timeshop1id));
        },
        computed: {
            ...mapState({
                livetheshop: state => state.live.livetheshop,
                livetheshopID: state => state.live.livetheshopID,
                timeshop1: state => state.live.timeshop1,
                timeshop1id: state => state.live.timeshop1id
            })
        },

        mounted() {
            this.$nextTick(() => {
                let timer = setTimeout(() => {
                    //不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
                    if (timer) {
                        clearTimeout(timer);
                        this.verScroll();
                    }
                }, 0);
            });
        },

        methods: {
            choosetheputong() {
                this.$router.push('/livechooseshoptime?livetitle=' + this.livetitle)
                localStorage['livetitle'] = this.livetitle
            },
            tochoose() {
                console.log(this.livetitle === '');
                if (this.livetitle === '') {
                    Toast('请输入直播间名称')
                    // plus.nativeUI.toast('请输入直播间名称')
                } else {
                    this.$router.push('/livechooseshop?livetitle=' + this.livetitle)
                    localStorage['livetitle'] = this.livetitle
                }
            },
            city() {
                Toast("定位中...");
                // plus.nativeUI.toast("定位中...");
                map.init().then(BMap => {
                    const geolocation = new BMap.Geolocation();
                    var that = this;
                    geolocation.getCurrentPosition(
                        function getinfo(options) {
                            let province = options.address.province;
                            let city = options.address.city;
                            that.LocationCity = province + city;
                            that.longitude = options.longitude;
                            that.latitude = options.latitude;
                        },
                        function (e) {
                            that.LocationCity = "定位失败";
                        },
                        {
                            provider: "baidu"
                        }
                    );
                });
            },
            onInput() {
                if (this.checked) {
                    //开启定位
                    this.checkednum = 1
                    this.city();
                } else {
                    this.checkednum = 2
                }

            },

            //横向滚动
            verScroll() {
                var ww = "";
                if (this.livetheshop.length === 0) {
                    ww = 100;
                    this.vs(ww);
                } else if (this.livetheshop.length > 0) {
                    ww = this.livetheshop.length;
                    this.vs(ww);
                }
            },
            vs(ww) {

                let width = ww * 120;
                // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
                this.$refs.cont.style.width = (width * 2) / 100 + "rem"; // 修改滚动区域的宽度
                this.$refs.cont.style.top = 1 + "rem";
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: "vertical"
                        });
                    } else {
                        this.scroll.refresh(); //如果dom结构发生改变调用该方法
                    }
                });
            },

            ppPusher() {
                if (this.livetitle.length > 10) {
                    Toast("直播间名称不要大于十个字符");
                    // plus.nativeUI.toast("直播间名称不要大于十个字符");
                    return;
                }
                console.log("普通: " + this.livetheshopID);
                console.log("限时: " + this.timeshop1id);
                if (this.livetheshopID.length === 0 && this.timeshop1id.length === 0) {
                    Toast("限时抢购商品和普通商品至少选一样");
                    return;
                }

                if (this.livetitle != null && this.livetitle.length > 0) {

                    (localStorage["longitude"] = this.longitude), //选填，经度
                        (localStorage["latitude"] = this.latitude), //选填，纬度
                        (localStorage["isOpenLocation"] = this.checkednum), //选填，是否开启定位 1是2否 默认2
                        (localStorage["liveWay"] = this.radio), //选填，直播方式 1摄像头直播 2录屏直播 默认1
                        (localStorage["products"] = JSON.stringify(this.livetheshopID)), //必填，产品数组字符串   ；如 [2,3,4,5]
                        (localStorage["userType"] = "1"), //选填，用户类型1.爱慕米思商户   2：爱慕米思经销商 默认1
                        (localStorage["liveTitle"] = this.livetitle), //必填，直播标题
                        (localStorage["userID"] = localStorage["uid"]), //必填，用户ID
                        (localStorage["limitProducts"] = JSON.stringify(this.timeshop1id));

                    let liveurl = {
                        longitude: this.longitude, //选填，经度
                        latitude: this.latitude, //选填，纬度
                        isOpenLocation: this.checkednum, //选填，是否开启定位 1是2否 默认2
                        liveWay: this.radio, //选填，直播方式 1摄像头直播 2录屏直播 默认1
                        products: JSON.stringify(this.livetheshopID), //必填，产品数组字符串   ；如 [2,3,4,5]
                        userType: "1", //选填，用户类型1.爱慕米思商户   2：爱慕米思经销商 默认1
                        liveTitle: this.livetitle, //必填，直播标题
                        coverImage: "", //必填，直播封面图片地址
                        userID: localStorage["uid"], //必填，用户ID
                        limitProducts: JSON.stringify(this.timeshop1id)
                    };
                    console.log("zhibbo.vue: 直播参数: " + JSON.stringify(liveurl));
                    axios({
                        method: "post",
                        url: this.$config.baseApi + "/live/create",
                        headers: {
                            "Content-Type": "application/json;"
                        },
                        data: liveurl
                    }).then(res => {
                        console.log("zhibbo.vue: create返回数据: " + JSON.stringify(res));

                        if (res.data.data.error) {
                            Toast(res.data.data.error);
                            // plus.nativeUI.toast(res.data.data.error);
                        }
                        if (res.data.data.success) {
                            // Toast("创建成功");
                            // plus.nativeUI.toast("创建成功")
                            localStorage["livecid"] = res.data.data.success.cid;
                            localStorage["pushUrl"] = res.data.data.success.pushUrl;
                            console.log("zhibbo.vue - create: " + res.data.data.success.pushUrl + " " + res.data.data.success.cid);
                            localStorage['flage'] = 1;
                            // this.resetSetItem('flage', 1);
                            this.$router.push({
                                path: "/livezhibo",
                                query: {liveTitle: this.livetitle}
                            });
                        }

                    });
                } else {
                    Toast("直播间名称不能为空");
                    // plus.nativeUI.toast("直播间名称不能为空");
                }

            }
        }
    };
</script>
<style scoped>
    .livesteart {
        width: 100%;
        height: 100%;
        margin-bottom: 1.5rem;
    }

    .livesteart::-webkit-scrollbar {
        display: none;
    }

    .livesteart .live-input-2 {
        border-bottom: 1px solid rgba(235, 237, 240, 0.5);
    }

    .livesteart .live-input {
        width: 100%;
        margin-right: 0.329rem;
        display: flex;
        align-items: center;
        padding: 0.3525rem 0;
        box-sizing: border-box;
        position: relative;
    }

    .livesteart .live-input input {
        margin-left: 0.141rem;
        width: 70%;
    }

    .livesteart .live-input .live-input-ico {
        width: 0.1645rem;
        height: 0.1645rem;
        position: absolute;
        /* background: #333333;
          transform:rotate(45deg); */
    }

    .livesteart .live-input .live-input-ico img {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    ::-webkit-input-placeholder {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
    }

    .livesteart .dingwei .dingwei-icon {
        width: 0.3525rem;
        height: 0.329rem;
        margin-left: 0.3525rem;
    }

    .livesteart .dingwei .dingwei-icon img {
        width: 100%;
        height: 100%;
    }

    .livesteart .starttozthelive {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        text-align: center;
        margin-top: 0.5875rem;
    }

    .livesteart .live-button {
        width: 80%;
        background-color: #000000;
        width: 5.0055rem;
        height: 0.705rem;
        line-height: 0.705rem;
        background: rgba(51, 51, 51, 1);
        border-radius: 0.3525rem;
    }

    .live-for-style {
        display: flex;
        align-items: center;
    }

    .live-for-style2 {
        width: 0.1645rem;
        height: 0.1645rem;
        position: absolute;
        /* background: #333333;
          transform:rotate(45deg); */
    }

    .live-for-style2 img {
        width: 100%;
        height: 100%;
        position: absolute;
        /* background: #333333;
          transform:rotate(45deg); */
    }

    .live-for-style3 {
        margin-left: 0.3525rem;
    }

    .live-for-style-choose {
        display: flex;
        justify-content: space-between;
        padding: 0 0.5405rem;
    }

    .choose-shop {
        display: flex;
        align-items: center;
    }

    .choose-shop div:nth-child(1) {
        width: 0.1645rem;
        height: 0.1645rem;
        position: absolute;
        /* background: #333333;transform:rotate(45deg); */
    }

    .choose-shop div:nth-child(1) img {
        width: 100%;
        height: 100%;
        position: absolute;
        /* background: #333333;transform:rotate(45deg); */
    }

    .choose-shop-tolive {
        width: 1.9975rem;
        /* border: 1px solid #CCCCCC; */
        margin-left: 0.3525rem;
    }

    .choose-shop-tolive-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 95%;
        padding: 0 0.094rem;
        box-sizing: border-box;
        font-size: 0.188rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(40, 40, 40, 1);
    }
</style>
