<template>
    <div class="livesteart" ref="imageToFile">
        <div id="pusherto"></div>
        <div class="barrage" ref="barrage">
        </div>
        <van-dialog
                :before-close="beforeClose"
                :style='{top:"unset", bottom:"0px"}'
                id="leaveDialog"
                show-cancel-button
                title="确认关闭直播吗"
                v-model="isShow"
        >
        </van-dialog>
        <!-- 直播下方显示栏 -->
        <div class="jinitaimeiformain">
            <div class="jinitaimei">
                <div @click="tan" class="jinitaimei-img forthtwo">
                    <div style="font-size:.28rem;">{{timeshop1.length + livetheshop.length}}</div>
                </div>
                <div @click="addCoupon()" class="add-coupon">
                    <img alt src="../../../assets/images/live/add_coupon.png"/>
                </div>
                <div class="jinitaimei-input" style="margin-right: 0.175rem;">
                    <input placeholder="跟观众说点什么?" type="text" v-model="value"/>

                    <div>
                        <img @click="websocketsend()" alt src="../../../assets/images/live/send.png"/>
                    </div>
                </div>

                <div
                        @click="switchCamera()"
                        class="jinitaimei-img"
                        style="width:0.4465rem;height:0.4465rem;margin-right: 0.175rem;"
                >
                    <img alt src="../../../assets/images/live/liangjifanzhuan.png"/>
                </div>

                <div
                        @click="stopPusher()"
                        class="jinitaimei-img"
                        style="width: 0.4465rem;height:0.4465rem;"
                >
                    <img alt src="../../../assets/images/live/closeto.png"/>
                </div>
            </div>
        </div>

        <transition name="van-slide-up" style="position: absolute;top: 0;z-index: 999999 !important;">
            <div style="width: 100%;height: 4rem; position: fixed; bottom: 0; z-index: 2;" v-show="show">
                <div class="swpier-wrap swiper-container" ref="swiper2" style="background-color: #FFFFFF;">
                    <div class="swiper-wrapper">
                        <div :key="index4" class="swiper-slide" v-for="(item,index4) in timeshop1">
                            <!-- 标题部分 -->
                            <div style="width: 100%;font-size:0.235rem;">
                                <div class="timetitle">
                                    <div class="timetitle-img">
                                        <img
                                                src="../../../assets/images/home/index/xianshi.png"
                                                style="width: 100%;height: 100%;"
                                        />
                                    </div>

                                    <div>限时抢购</div>

                                    <div style="padding:0 0.14rem;box-sizing: border-box;">
                                        <van-count-down
                                                :time="time"
                                                format="DD天HH:mm:ss"
                                                style="background-color: #FADFDC;color: #E52C5C;
										font-size: 0.235rem;padding:0 0.14rem;box-sizing: border-box;"
                                        ></van-count-down>
                                    </div>

                                    <div
                                            style="width: 30px;height: 20px;display: flex;flex: 1;justify-content: flex-end;"
                                    >
                                        <div
                                                class="button-prev"
                                                style="width: 14px;height:100%;transform: rotate(180deg);margin-right: 17px;"
                                        >
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>

                                        <div @click="sendtorew()" class="button-next" style="width: 14px;height:100%;">
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>
                                    </div>
                                </div>

                                <!-- 主体商品部分 -->
                                <div class="timeshopmain">
                                    <div class="timeshopmain-img">
                                        <img :src="item.activityImg" style="width:100%;height:100%;"/>
                                    </div>

                                    <div style="flex: 1;">
                                        <div class="timeshopmain-title">{{item.productName}}</div>

                                        <div class="timeshopmain-title2">{{item.productDescription}}</div>

                                        <div class="timeshopmain-title3">
                                            <button style="background-color: #FFFFFF;color: #FFFFFF;" v-if="!item.full">
                                                满减
                                            </button>
                                            <button
                                                    style="margin-top: 0.05rem;"
                                                    v-if="item.full"
                                            >满{{(item.full*0.01).toFixed(2)}}减{{(item.reduce*0.01).toFixed(2)}}
                                            </button>
                                        </div>

                                        <div
                                                :key="'asd'+index2"
                                                class="timeshopmain-title4"
                                                v-for="(item2,index2) in (item.productLimitedTimeStandardsDTOS || '').slice(0,1)"
                                        >
                                            <div v-if="item.full">￥{{((item.full - item.reduce)*0.01).toFixed(2)}}</div>

                                            <div v-if="!item.full">￥{{((item2.discountPrice)*0.01).toFixed(2)}}</div>

                                            <div>
                                                <button
                                                        @click.stop="recommend(item)"
                                                        style="background:rgba(254,127,10,1);margin-right: 0.2115rem;"
                                                        type="default"
                                                >推荐
                                                </button>
                                                <button @click="deletetimeshop(item)" type="default">清除</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div :key="'asd'+index" class="swiper-slide" v-for="(item,index) in livetheshop">
                            <div style="width: 100%;" v-if="livetheshop.length > 0">
                                <div class="timetitle">
                                    <div>活动商品共{{livetheshop.length}}件</div>
                                    <div
                                            style="width: 30px;height: 20px;display: flex;flex: 1;justify-content: flex-end;"
                                    >
                                        <div
                                                class="button-prev"
                                                style="width: 14px;height:100%;transform: rotate(180deg);margin-right: 17px;"
                                        >
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>

                                        <div class="button-next" style="width: 14px;height:100%;">
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeshopmain">
                                    <div class="timeshopmain-img">
                                        <img :src="item.titleImg" style="width:100%;height:100%;"/>
                                    </div>

                                    <div style="flex: 1;">
                                        <div class="timeshopmain-title">{{item.productName}}</div>

                                        <div class="timeshopmain-title2">{{item.productDescription}}</div>

                                        <div class="timeshopmain-title3">
                                            <button style="background-color: #FFFFFF;color: #FFFFFF;">满减</button>
                                        </div>

                                        <div
                                                :key="'asd'+index3"
                                                class="timeshopmain-title4"
                                                v-for="(item3,index3) in (item.productStandards || '').slice(0,1)"
                                        >
                                            <div>￥{{(item3.bandPrice*0.01).toFixed(2)}}</div>

                                            <div>
                                                <button
                                                        @click.stop="recommend(item)"
                                                        style="background:rgba(254,127,10,1);margin-right: 0.2115rem;"
                                                        type="default"
                                                >推荐
                                                </button>
                                                <button @click="deleteshop(item)" type="default">清除</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="van-slide-up" style="position: absolute;top: 0;z-index: 999999 !important;">
            <div style="width: 100%;height: 4.6rem; position: fixed; bottom: 0; z-index: 2;" v-show="show2">
                <div class="swpier-wrap swiper-container" ref="swiper3" style="background-color: #FFFFFF;">
                    <div class="swiper-wrapper">
                        <div :key="index4" class="swiper-slide" v-for="(item,index4) in coupons">
                            <!-- 标题部分 -->
                            <div style="width: 100%;font-size:0.235rem;">
                                <div class="timetitle">
                                    <div
                                            style="width: 30px;height: 20px;display: flex;flex: 1;justify-content: flex-end;"
                                    >
                                        <div>
                                            <button
                                                    @click.stop="sendCoupon(item.couponID)"
                                                    style="background:rgba(254,127,10,1);margin-right: 0.2115rem;"
                                                    type="default"
                                            >发放
                                            </button>
                                        </div>
                                        <div
                                                class="button-prev"
                                                style="width: 14px;height:100%;transform: rotate(180deg);margin-right: 17px;"
                                        >
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>

                                        <div @click="sendtorew()" class="button-next" style="width: 14px;height:100%;">
                                            <img alt src="../../../assets/images/common/right_arrow.png"/>
                                        </div>
                                    </div>
                                </div>

                                <!-- 主体商品部分 -->
                                <div class="nouse">
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
                                            <div class="nouse-main1-t1">全场满{{item.discountLimit * .01}}可用</div>
                                            <div class="nouse-main1-t2">有效期{{dateFormat(new
                                                Date(item.couponBeginTime))}}至{{dateFormat(new Date(item.couponEndTime))
                                                }}
                                            </div>
                                        </div>
                                        <div class="nouse-main2">
                                            <div>{{item.couponAmount * .01}}</div>
                                            <div>元</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- <van-popup
          v-model="show"

          position="bottom"
          :style="{ height: '50%',width:'100%',bottom:'0'}">



        </van-popup>-->
    </div>
</template>

<script>
    import {getMessage} from "../../../api/live/index.js";
    import Vue from "vue";
    import axios from "axios";
    import Swiper from "../../../assets/js/libs/swiper.js";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {Dialog, Popup, Swipe, SwipeItem, Toast} from "vant";

    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Popup);
    Vue.use(Dialog);
    Vue.use(Toast);
    // var nv=null;
    // function createView(){
    //     nv=nv||new plus.nativeObj.View('test', {top:'100px',bottom:'0px'}, [
    //         {id:'background', tag:'rect', position:{left:'0px',right:'0px',top:'0px',bottom:'0px',width:'100%',height:'100%'}, color:'rgba(0,0,0,0)'},
    //         {id:'rect1', tag:'rect', position:{top:'25%', width:'320px', height:'118px'}, color:'white'},
    //         {id:'font1', tag:'font', position:{left:'0px',right:'100px',top:'25px'}, text:'确认关闭直播吗',
    //             textStyles:{color:'#000000',size:'14px'}},
    //         {id:'font2', tag:'font', position:{left:'20px',top:''}, text:'取消',
    //             textStyles:{color:'#323233',size:'16px'}},
    //         {id:'font3', tag:'font', position:{bottom:'35px',right:'20px'}, text:'确认',
    //             textStyles:{color:'#1989fa',size:'16px'}}
    //     ]);
    //
    //     nv.show();
    //   addEventView(nv);
    // }
    // // 监听原生View控件click事件
    // function addEventView(view){
    //     view.addEventListener("click", onClick, false);
    // }
    // // 监听事件函数
    // function onClick(e){
    //     console.log("点击原生控件："+JSON.stringify(e));
    //     var clientX = e.clientX;	// 在View控件中的X坐标
    //     var clientY = e.clientY;	// 在View控件中的Y坐标
    //     var pageX = e.pageX;		// 在当前Webview窗口（运行此脚本的窗口）中的X坐标
    //     var pageY = e.pageY;		// 在当前Webview窗口（运行此脚本的窗口）中的Y坐标
    //     var screenX = e.screenX;	// 在屏幕中的X坐标
    //     var screenY = e.screenY;	// 在屏幕中的Y坐标
    //     var target = e.target;		// View控件对象
    //
    //     if (e.clientX >= 160 && e.clientY > 68){
    //         //this.stopPusher();
    //         //this.$router.replace({ path: "/live" });
    //         this.pusher.stop();
    //         localStorage.removeItem("pushUrl");
    //         this.$router.go(-1);
    //         localStorage["flage"] = 0;
    //     } else {
    //       nv.cancel();
    //     }
    // }

    export default {
        name: "livefore",
        data() {
            return {
                isShow: false,
                view: null,
                pusher: null,
                parth: localStorage.getItem("pushUrl"),
                // parth:"https://domain/push_stream",
                time: 0,
                show: false, // 产品
                show2: false, // 优惠券
                value: "",
                img: "",
                ai: "",
                bitmap: "",
                websock: null,
                redata: "",
                roomName: localStorage.getItem("liveTitle"),
                userName: localStorage.getItem("phoneNumber"),
                // userType: localStorage.getItem("userType2"),
                zhuboimg: require("../../../assets/images/live/zhubo.png"),

                listenPro: {},
                timer: null,
                stopped: false,
                tryStop: false
            };
        },

        created() {
            console.log("livezhibo.vue -> created(): " + this.userType);
            // this.$nextTick(() => {
            //    this.initWebSocket();
            // })

        },

        computed: {
            ...mapState({
                timeshop1: state => state.live.timeshop1,
                livetheshop: state => state.live.livetheshop,
                coupons: state => state.coupon.coupons,
                userType: state => state.user.userType
            })
        },

        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
            window.removeEventListener("popstate", this.goBack, false);
            //next();
        },
        destroyed() {
            this.webSocket.close();
            //页面销毁时关闭长连接
            this.pusher.close();
        },
        mounted() {
            //直播初始化
            this.$nextTick(() => {
                if (window.plus) {
                    this.plusReady();
                    this.ppPusher();

                    this.initWebSocket();
                } else {
                    document.addEventListener("plusready", this.plusReady, false);
                    this.ppPusher();

                    this.initWebSocket();
                }
            });

            // yye this.timer = setInterval(this.screenShot(), 30000);

            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener("popstate", this.goBack, false);
            }
        },

        // computed: {
        //   ...mapState({
        //     roomName: state => state.live.roomName,
        //     userName: state => state.live.username,
        //   })
        // },
        methods: {
            ...mapMutations({
                DELETE_TIME_SHOP: "live/DELETE_TIME_SHOP",
                DELETE_SHOP: "live/DELETE_SHOP",
                // getPushMsg:"live/getPushMsg"
                "SET_LIVE_SHOP": "live/SET_LIVE_SHOP",
                "SET_TIME_SHOP": "live/SET_TIME_SHOP"
            }),
            ...mapActions({
                getlivetomessage: "live/getlivetomessage",
                getcoupondata: "coupon/getcoupondata",
                getAcceptedableCouponList: "coupon/getAcceptedableCouponList"
            }),

            addCoupon() {
                this.show2 = !this.show2;
                // this.getcoupondata({
                //     param: 1,
                //     uid: localStorage['uid'],
                // }).then(() => {
                //     this.swiperto2();
                // });
                console.log(localStorage['uid'], this.userType);
                this.getAcceptedableCouponList({
                    uid: localStorage['uid'],
                    userType: this.userType,
                    couponReleaseWindow: 2
                }).then(res => {
                    console.log("res: " + JSON.stringify(res));
                    this.swiperto2();
                }).catch(err => {
                    console.log("err: " + err);
                });
                // getMessage(this.roomName, this.userName, "主播发优惠券啦", 7, 5, couponID);
            },

            sendCoupon(couponID) {
                console.log(couponID);
                getMessage(this.roomName, this.userName, "主播发优惠券啦", 7, 5, null, null, couponID);
            },

            dateFormat(time) {
                return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
            },
            // 'ws://36.154.123.82:8081/websocket/chat/' +this.$route.query.liveTitle+'/'+localStorage['phoneNumber'];

            getPermission(permissionIdentity, successCallBack, errorCallBack) {
                //权限标识转换成大写
                permissionIdentity = permissionIdentity.toUpperCase();
                //获取检测权限的状态
                var checkResult = plus.navigator.checkPermission(permissionIdentity);
                //权限状态是否正常
                var permissionStatusOk = false;
                //权限中文名称
                var permissionName = '';
                //对应 andorid 的具体权限
                var androidPermission = '';
                //获取权限中文意思与对应 android 系统的权限字符串
                switch (permissionIdentity) {
                    case 'CAMERA':
                        permissionName = '摄像头';
                        androidPermission = 'android.permission.CAMERA';
                        break;
                    case 'CONTACTS':
                        permissionName = '系统联系人';
                        androidPermission = 'android.permission.READ_CONTACTS'
                        break;
                    case 'GALLERY':
                        permissionName = '系统相册';
                        androidPermission = 'android.permission.READ_EXTERNAL_STORAGE';
                        break;
                    case 'LOCATION':
                        permissionName = '定位';
                        androidPermission = 'android.permission.ACCESS_COARSE_LOCATION';
                        break;
                    case 'NOTIFITION':
                        permissionName = '消息通知';
                        androidPermission = '消息通知';
                        break;
                    case 'RECORD':
                        permissionName = '录音';
                        androidPermission = 'android.permission.RECORD_AUDIO';
                        break;
                    case 'SHORTCUT':
                        permissionName = '创建桌面快捷方式';
                        androidPermission = 'com.android.launcher.permission.INSTALL_SHORTCUT';
                        break;
                    default:
                        permissionName = '未知';
                        androidPermission = '未知';
                        break;
                }

                //判断检查权限的结果
                switch (checkResult) {
                    case 'authorized':
                        //正常的
                        permissionStatusOk = true
                        break;
                    case 'denied':
                        //表示程序已被用户拒绝使用此权限，如果是拒绝的就再次提示用户打开确认提示框
                        //如果有该权限但是没有打开不进行操作还是会去申请或手动打开
                        // console.log('已关闭' + permissionName + '权限')
                        // errorCallBack('已关闭' + permissionName + '权限');
                        // return
                        break;
                    case 'undetermined':
                        // 表示程序未确定是否可使用此权限，此时调用对应的API时系统会弹出提示框让用户确认
                        // this.requestPermissions(androidPermission, permissionName, successCallBack, errorCallBack)
                        // errorCallBack('未确定' + permissionName + '权限');
                        // return
                        break;
                    case 'unknown':
                        errorCallBack('无法查询' + permissionName + '权限');
                        return
                        break;
                    default:
                        errorCallBack('不支持' + permissionName + '权限');
                        return
                        break;
                }

                //如果权限是正常的执行成功回调
                if (permissionStatusOk) {
                    successCallBack()
                } else {
                    //如果不正常，如果是 andorid 系统，就动态申请权限
                    if (plus.os.name == 'Android') {
                        //动态申请权限
                        plus.android.requestPermissions([androidPermission], function (e) {
                            console.log("livezhibo.vue->getPermission(): requestPermission: " + JSON.stringify(e));
                            if (e.deniedAlways.length > 0) {
                                //权限被永久拒绝
                                // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                                errorCallBack(permissionName + ' 权限被永久拒绝，请到设置权限里找到应用手动开启权限，否则将不能使用此功能。')
                                // console.log('Always Denied!!! ' + e.deniedAlways.toString());
                            }
                            if (e.deniedPresent.length > 0) {
                                //权限被临时拒绝
                                // 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
                                errorCallBack('拒绝开启 ' + permissionName + ' 权限，将不能使用此功能！')
                                // console.log('Present Denied!!! ' + e.deniedPresent.toString());
                            }
                            if (e.granted.length > 0) {
                                //权限被允许
                                //调用依赖获取定位权限的代码
                                successCallBack()
                                // console.log('Granted!!! ' + e.granted.toString());
                            }
                        }, function (e) {
                            errorCallBack('请求 ' + permissionName + ' 权限失败，' + +JSON.stringify(e))
                            // console.log('Request Permissions error:' + JSON.stringify(e));
                        })
                    } else if (plus.os.name == 'iOS') {
                        //ios ,第一次使用目的权限时，应用的权限列表里是不存在的，所以先默认执行一下成功回调，打开要使用的操作，比如 plus.camera
                        //这时系统会提示是否打开相应的权限，如果拒绝也没关系，因为应用的权限列表里已经存在该权限了，下次再调用相应权限时，就会
                        //走 else 里的流程，会给用户提示，并且跳转到应该的权限页面，让用户手动打开。
                        if (checkResult == 'undetermined') {
                            //调用依赖获取定位权限的代码
                            successCallBack(true)
                        } else {
                            //如果是 ios 系统，ios 没有动态申请操作，所以提示用户去设置页面手动打开
                            Dialog.confirm({
                                message: permissionName + ' 权限没有开启，是否去开启？'
                            }).then(function (e) {
                                //取消
                                if (e.index == 0) {
                                    errorCallBack('拒绝开启 ' + permissionName + ' 权限，将不能使用此功能！')
                                } else if (e.index == 1) {
                                    //确认，打开当前应用权限设置页面
                                    var UIApplication = plus.ios.import('UIApplication');
                                    var application2 = UIApplication.sharedApplication();
                                    var NSURL2 = plus.ios.import('NSURL');
                                    // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");
                                    var setting2 = NSURL2.URLWithString('app-settings:');
                                    application2.openURL(setting2);

                                    plus.ios.deleteObject(setting2);
                                    plus.ios.deleteObject(NSURL2);
                                    plus.ios.deleteObject(application2)
                                }
                            })
                        }
                    }
                }
            },
            goBack() {
                this.stopPusher();
                this.$router.replace({path: "/live"});
                //yye
                // Dialog.confirm({
                //   message: "您确定要退出吗"
                // })
                //   .then(() => {
                //     this.$router.replace({ path: "/live" });
                //     this.stopPusher();
                //   })
                //   .catch(() => {
                //     webview.back(0); //关闭应用
                //   });
            },
            //主播页面推荐限时抢购商品

            recommend(item) {
                // console.log('我执行了没')
                if (item.limitedTimeProductID) {
                    getMessage(
                        this.roomName,
                        this.userName,
                        "",
                        5,
                        5,
                        "",
                        item.limitedTimeProductID
                    );
                    Toast("商品推荐成功");
                } else {
                    //普通商品
                    getMessage(this.roomName, this.userName, "", 5, 5, item.productID);
                    Toast("商品推荐成功");
                }
            },

            //发送评论消息
            websocketsend() {
                if (this.value.trim() && this.value.length < 50) {
                    getMessage(this.roomName, this.userName, this.value, 1, 5);
                    this.value = "";
                } else {
                    Toast("输入内容不能为空或者大于五十字");
                    this.value = "";
                }
            },
            sendtorew() {
            },
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
                        childItem1.style.backgroundColor = "transparent";
                        childItem1.style.fontSize = ".28rem";
                        childItem1.style.padding = ".08rem";
                        childItem1.style.display = "flex";
                        childItem1.style.alignItems = "center";
                        childItem1.style.justifyContent = "flex-start";
                        childItem1.innerHTML = `${this.msgList.msg}`;
                        barrage.appendChild(childItem1);
                        break;
                    case 2:
                        let childItem2 = document.createElement("button");
                        childItem2.style.color = "#FFDA00";
                        childItem2.style.backgroundColor = "transparent";
                        childItem2.style.fontSize = ".28rem";
                        childItem2.style.padding = ".08rem";
                        childItem2.style.display = "flex";
                        childItem2.style.alignItems = "center";
                        childItem2.style.justifyContent = "flex-start";
                        childItem2.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/huiyuan.png" alt />会员</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem2);
                        break;
                    case 3:
                        let childItem3 = document.createElement("button");
                        childItem3.style.color = "#45ED7E";
                        childItem3.style.backgroundColor = "transparent";
                        childItem3.style.fontSize = ".28rem";
                        childItem3.style.padding = ".08rem";
                        childItem3.style.display = "flex";
                        childItem3.style.alignItems = "center";
                        childItem3.style.justifyContent = "flex-start";
                        childItem3.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/huiyuan.png" alt />经销商</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem3);
                        break;
                    case 4:
                        let childItem4 = document.createElement("button");
                        childItem4.style.color = "#00C4FF";
                        childItem4.style.backgroundColor = "transparent";
                        childItem4.style.fontSize = ".28rem";
                        childItem4.style.padding = ".08rem";
                        childItem4.style.display = "flex";
                        childItem4.style.alignItems = "center";
                        childItem4.style.justifyContent = "flex-start";
                        childItem4.innerHTML = `<div style="white-space: nowrap;"><img src="../../../assets/images/live/shangjia.png" alt />商家</div>${this.msgList.msg}`;
                        barrage.appendChild(childItem4);
                        break;
                    case 5:
                        let childItem5 = document.createElement("button");
                        childItem5.style.color = "#F2D491";
                        childItem5.style.backgroundColor = "transparent";
                        childItem5.style.fontSize = ".28rem";
                        childItem5.style.padding = ".08rem";
                        childItem5.style.display = "flex";
                        childItem5.style.alignItems = "center";
                        childItem5.style.justifyContent = "flex-start";
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

            initWebSocket() {
                //初始化weosocket
                const wsuri = `ws://${process.env.VUE_APP_URL_WS}/websocket/chat/${this.roomName}/${this.userName}`; //ws地址
                console.log(wsuri);
                this.webSocket = new WebSocket(wsuri);
                this.webSocket.onopen = this.wsonopen;

                this.webSocket.onerror = this.wsonerror;

                this.webSocket.onmessage = this.wsonmessage;
                this.webSocket.onclose = this.wsclose;
            },

            wsonopen() {
                console.log("WebSocket连接成功");
                getMessage(this.roomName, this.userName, "直播开始啦", 1, 5);
                // yye getMessage(this.roomName, this.userName, "", 4, this.userType);
            },
            wsonerror(e) {
                //错误
                console.log("WebSocket连接发生错误");
            },
            wsonmessage(e) {
                console.log(JSON.stringify(e));
                //数据接收
                // const redata = JSON.parse(e.data); // 接收数据
                // this.msg = redata;
                this.msgList = JSON.parse(e.data);
                //接收数据，同时判断数据的类型
                //当为消息类型的数据的时候，显示消息
                if (this.msgList.pushType === 8) {
                    //this.msgList.msg = this.userName.replace(/(\d{3})\d{4}(\d{4})/g, "$1****$2") +"   点了赞";
                } else if (this.msgList.pushType == 4) {
                    this.number = this.msgList.onlineNum;
                    localStorage.setItem("onlineNum", this.msgList.onlineNum);
                } else {
                    this.number = localStorage.getItem("onlineNum");
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
            },

            //商品的左右滑动
            swiperto() {
                this.$nextTick(() => {
                    new Swiper(this.$refs["swiper2"], {
                        // autoplay: 3000,
                        pagination: this.$refs["swiper-pagination1"],

                        prevButton: ".button-prev",
                        nextButton: ".button-next",
                        observer: true,
                        paginationClickable: true,
                        autoplayDisableOnInteraction: false
                    });
                });
            },
            //商品的弹出
            tan() {
                this.show = !this.show;
                this.swiperto();
                if (this.timeshop1.length > 0) {
                    this.time = (this.timeshop1[0].endTime - Math.round(new Date() / 1000)) * 1000;
                }
            },

            //商品的左右滑动
            swiperto2() {
                this.$nextTick(() => {
                    new Swiper(this.$refs["swiper3"], {
                        // autoplay: 3000,
                        pagination: this.$refs["swiper-pagination2"],

                        prevButton: ".button-prev",
                        nextButton: ".button-next",
                        observer: true,
                        paginationClickable: true,
                        autoplayDisableOnInteraction: false
                    });
                });
            },
            //限时抢购的删除商品
            deletetimeshop(item) {
                let limit = this.timeshop1
                    .filter(x => x.limitedTimeProductID != item.limitedTimeProductID)
                    .map(x => x.limitedTimeProductID);
                console.log("deletetimeshop: " + "[" + limit + "]" + " " + localStorage["livecid"]);
                // for (let i = 0; i < this.timeshop1.length; i++) {
                //     if (this.timeshop1[i].limitedTimeProductID !== item.limitedTimeProductID) {
                //         limit.push(this.timeshop1[i].limitedTimeProductID);
                //     }
                // }
                axios({
                    method: "post",
                    url: this.$config.baseApi + "/live/update",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        "cid": localStorage["livecid"],
                        "limitProducts": "[" + limit + "]"
                    }
                }).then(res => {
                    this.DELETE_TIME_SHOP({timedeleteshopid: item.limitedTimeProductID});
                });
                //getMessage(this.roomName, this.userName, "", 7, 5);
            },
            //普通商品不封的删除商品
            deleteshop(item) {
                let normal = this.livetheshop
                    .filter(x => x.productID != item.productID)
                    .map(x => x.productID);
                console.log("deleteshop: " + "[" + normal + "]" + " " + localStorage["livecid"]);
                axios({
                    method: "post",
                    url: this.$config.baseApi + "/live/update",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        "cid": localStorage["livecid"],
                        "products": "[" + normal + "]"
                    }
                }).then(res => {
                    this.DELETE_SHOP({productID: item.productID});
                });
                //getMessage(this.roomName, this.userName, "", 7, 5);
            },

            plusReady() {

                // 监听状态变化事件
// 监听状态变化事件
                let that = this;

                this.pusher = new plus.video.LivePusher("pusherto", {
                    url: that.parth,
                    top: '0px',
                    left: '0px',
                    //width: '100%',
                    //height: '68%'
                });

                this.pusher && this.pusher.addEventListener('statechange', function (e) {
                    console.log('statechange: ' + JSON.stringify(e));
                    console.log('statechange: ' + e.detail.message);
                    console.log("statechange: tryStop: " + that.tryStop);
                    if (that.tryStop && e.detail.message === 'disconnected') {
                        that.stopped = true;
                        console.log("statechange: this.stopped set to true");
                    } else {
                        that.stopped = false;
                    }
                }, false);
                // 监听网络状态变化事件
                // this.pusher.addEventListener('netstatus', function (e) {
                //     console.log('netstatus: ' + JSON.stringify(e));
                // }, false);
                // 监听错误事件
                this.pusher && this.pusher.addEventListener('error', function (e) {
                    console.log('error: ' + JSON.stringify(e));
                }, false);
            },
            //开始直播
            ppPusher() {
                this.pusher && this.pusher.setStyles({
                    url: this.parth,
                    mode: "SD",
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '68%'
                });
                console.log('livezhibo.vue->ppPusher()');
                let that = this;
                this.getPermission('CAMERA', function () {
                    that.getPermission('RECORD', function () {
                        that.pusher && that.pusher.start(function () {
                            console.log("ppPusher: 开始推流");
                        }, function (event) {
                            //event={code:"错误代码",message:"错误描述信息"}
                            that.stopped = true;
                            console.log("ppPusher: " + JSON.stringify(event));
                        });
                    }, function (msg) {
                        Dialog.confirm({
                            message: msg
                        }).then(() => {
                            that.stopped = true;
                            that.$router.replace("/live");
                        }).catch(() => {
                            that.stopped = true;
                            that.$router.replace("/live");
                        });
                    });
                }, function (msg) {
                    Dialog.confirm({
                        message: msg
                    }).then(() => {
                        that.stopped = true;
                        that.$router.replace("/live");
                    }).catch(() => {
                        that.stopped = true;
                        that.$router.replace("/live");
                    });
                });
            },


            stopPusher() {
                console.log("停止直播");
                //close可以关闭APP页面的视图，但网易云信上并没有关闭
                //createView();
                // yye
                // Dialog.confirm({
                //   title: "",
                //   message: "确认关闭直播吗"
                // }).then(() => {
                //   this.pusher.stop();
                //   localStorage.removeItem("pushUrl");
                //   this.$router.go(-1);
                //   localStorage["flage"] = 0;
                //   // this.resetSetItem('flage', 0);
                // });
                this.isShow = true;
            },
            //关闭直播
            // closePusher() {
            //   console.log("关闭直播");
            //   this.pusher.close();
            //   localStorage.removeItem("pushUrl");
            // },
            switchCamera() {
                //切换摄像头
                this.pusher.switchCamera();
            },

            async beforeClose(action, done) {
                console.log("before close");
                if (action === 'confirm') {
                    try {
                        this.tryStop = true;
                        while (!this.stopped) {
                            this.pusher && this.pusher.stop();
                            await new Promise(r => setTimeout(r, 500));
                            console.log("this.stopped: " + this.stopped);
                        }
                        this.SET_LIVE_SHOP({livetheshop: []});
                        this.SET_TIME_SHOP({timeshop1:[]});
                        localStorage.removeItem("pushUrl");
                        this.$router.replace('/live');
                        localStorage["flage"] = 0;
                        console.log("推流停止");
                        getMessage(this.roomName, this.userName, "直播结束啦", 6, 5);
                    } catch (e) {
                        console.log("before-close: " + JSON.stringify(e));
                    } finally {
                        this.pusher && this.pusher.close();
                        console.log("beforeClose finally 是否关闭:" + this.pusher)
                    }
                } else if (action === 'cancel') {
                    this.tryStop = false;
                    done(); //关闭
                }
            }
        },
        async beforeRouteLeave(to, form, next) {
            var that = this;
            that.isShow = true;
            // this.$nextTick(() => {
            //     console.log("beforeRouteLeave");
            //this.$refs.leaveDialo

            // if (localStorage['flage'] === 1) {
            //     this.pusher && this.stopPusher();
            //     this.pusher && this.pusher.close();
            //     localStorage.removeItem("pushUrl");
            // }
            while (!that.stopped) {
                await new Promise(r => setTimeout(r, 500));
            }
            this.SET_LIVE_SHOP({livetheshop: []});
            this.SET_TIME_SHOP({timeshop1:[]});
            getMessage(this.roomName, this.userName, "直播结束啦", 6, 5);
            next();
            // });
        }
    };
</script>

<style scoped>
    @import "../../../assets/css/common/swiper.css";

    .swpier-wrap {
        width: 100%;
        height: 3.5rem;

        position: relative;
    }

    .swpier-wrap img {
        width: 100%;
        height: 100%;
    }

    .livesteart {
        position: fixed;
        width: 100vw;
        height: 100%;
        background-color: #000000;
    }

    .livesteart .barrage {
        position: absolute;
        left: 0.4rem;
        bottom: 1.1rem;
        height: 3.2rem;
        color: #fff;
        font-size: 0.28rem;
        /* overflow: hidden; */
        overflow-y: auto;
        z-index: 1;
        width: 100%;
    }

    .item5 {
        display: flex;
        color: #e52c5c;
    }

    #pusherto {
        left: 0;
        top: 0;
        width: 100%;
        height: 68%;
        z-index: 1;
        background: #000000;
        position: absolute;
    }

    .jinitaimeiformain {
        position: absolute;
        left: 0;
        bottom: 0rem;
        width: 100%;
        height: 32%;
        background-image: url("../../../assets/images/live/tuceng2.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .jinitaimeiformain .add-coupon {
        /*width: 100%;*/
        /* right: 0; */
        /*position: relative;*/
        /* left: 0; */
        /*height: 100%;*/
    }

    .jinitaimeiformain .add-coupon img {
        width: 0.7815rem;
        height: 0.8285rem;
        margin-bottom: -.1rem;
        /*position: absolute;*/
        /*right: 0.5rem;*/
        /* left: 0; */
        z-index: 2;
    }

    .jinitaimei {
        position: absolute;
        left: 0;
        bottom: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        margin-bottom: 0.2115rem;
        /* height:32%; */
        display: flex;
        align-items: center;
        padding: 0 0.38rem;
        box-sizing: border-box;
        justify-content: space-between;
        z-index: 999 !important;
    }

    .forthtwo {
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../../../assets/images/common/gouwu.png");
        margin-right: 0.175rem;
        color: #ffffff;
        font-size: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forthtwo div {
        margin-top: 0.23rem;
    }

    .jinitaimei-img {
        width: 0.6815rem;
        height: 0.7285rem;
    }

    .jinitaimei-img img {
        width: 100%;
        height: 100%;
    }

    .jinitaimei-input {
        width: 60%;
        height: 0.5rem;
        border-radius: 0.5rem;
        background-color: rgba(255, 255, 255, 0.78);
        display: flex;
        align-items: center;
    }

    .jinitaimei-input input {
        width: 90%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        font-size: 0.2rem;
        line-height: 100%;
        padding-left: 0.18rem;
        border-radius: 0.5rem;
    }

    .jinitaimei-input div {
        width: 0.2585rem;
        height: 0.2115rem;
        margin-right: 0.141rem;
        position: relative;
        overflow: hidden;
    }

    .jinitaimei-input div img {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
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
        padding: 0rem 0.32rem;
        box-sizing: border-box;
    }

    .timeshopmain .timeshopmain-img {
        width: 1.8095rem;
        height: 1.8095rem;
        margin-left: 0.1175rem;
        margin-right: 0.1175rem;
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
        -webkit-line-clamp: 1;
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
        background-color: #fff5ef;
        color: #e52c5c;
        font-size: 8px;
        font-family: PingFang SC;
        font-weight: 400;
    }

    .timeshopmain-title4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.329rem;
        margin-top: 0.1rem;
        /* padding-bottom: 0.2115rem; */
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

    .nouse {
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

    .timetitle button {
        width: 1.1985rem;
        height: 0.4935rem;
        background: rgba(254, 43, 84, 1);
        border-radius: 0.047rem;
        font-size: 0.235rem;
        color: #ffffff;
    }

    .nouse .nouse-header {
        width: auto;
        display: flex;
        position: relative;
        align-items: center;
    }

    .nouse .nouse-header .nouse-header-img {
        width: 0.2155rem;
        height: 0.188rem;
        position: relative;
        margin-right: 0.047rem;
    }

    .nouse .nouse-header .nouse-header-img img {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .nouse .nouse-header .nouse-header-text {
        font-size: 0.235rem;
        font-family: DFPHeiW9-GB;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.3055rem;
        background: linear-gradient(-90deg, rgba(247, 203, 123, 1) 1.123046875%, rgba(237, 227, 182, 1) 23.3154296875%, rgba(247, 202, 122, 1) 49.7802734375%, rgba(237, 227, 182, 1) 78.2470703125%, rgba(247, 202, 122, 1) 98.4130859375%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .nouse .nouse-main {
        display: flex;
        align-items: center;
        color: #FFFFFF;
        justify-content: space-between;
        padding: 0 0.255rem;
        box-sizing: border-box;

    }

    .nouse .nouse-main .nouse-main1 .nouse-main1-t1 {
        margin-top: 0.255rem;
        font-size: 0.3995rem;
        font-family: PingFang SC;
    }

    .nouse .nouse-main .nouse-main1 .nouse-main1-t2 {
        font-size: 0.2115rem;
        opacity: 0.5;
        margin: 0.255rem 0;
    }

    .nouse .nouse-main .nouse-main2 {
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

    .nouse .nouse-main .nouse-main2 div:nth-child(1) {
        width: auto;
        height: auto;
        font-size: 0.6rem;
        line-height: 0.3055rem;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    }

    .nouse .nouse-main .nouse-main2 div:nth-child(2) {
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
