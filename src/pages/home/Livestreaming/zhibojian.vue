<template>
    <div class="zhibojian">
        <van-pull-refresh
                v-model="refreshing"
                success-text="刷新成功"
                loosing-text="释放即可刷新..."
                loading-text="刷新中"
                @refresh="onRefresh"
        >

            <div class="room">
                <div class="no-data" v-if="!zhibojian.length">
                    <img class="no-data-img" src="../../../assets/images/live/kongbai.png"/>
                    <div>当前还没有主播直播哦</div>
                </div>
                <div class="van-list">
                    <div
                            class="room-main"
                            v-for="(item,index) in zhibojian"
                            :key="index"
                            :style="{'background-image':'url(' + item.live.coverImage + ')'}"
                            @click="detaillive(item)"
                    >
                        <div class="room-m-icon" ref="roommicon">
                            <div class="room-m-icon1">
                                <img src="../../../assets/images/common/aimumisi.png" alt/>
                            </div>
                            <div class="room-m-icon2">{{item.filename}}</div>
                        </div>

                        <div class="room-m-icon-fores">
                            <div></div>
                            <div>直播中</div>
                        </div>

                        <div class="room-m-icon-weizhi" v-if="item.live.isOpenLocation == 1">
                            <img src="../../../assets/images/live/weizhi.png" alt/>
                            <div>{{item.live.city}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import UpRefresh from "../../../assets/js/libs/uprefresh.js";
    import {getMessage} from "../../../api/live/index";
    import {mapActions, mapState} from "vuex";
    import Vue from "vue";
    // import axios from 'axios';
    // import map from "../../../assets/js/utils/map.js";

    export default {
        data() {
            return {
                refreshing: false,
                totalRecords: "",
                zhibojianWithLocation: []
            };
        },

        created() {

            this.pullUp = new UpRefresh();
            this.livetoroom();
            //this.fetchLocation();

        },
        computed: {
            ...mapState({
                zhibojian: state => state.live.zhibojian,
                roomName: state => state.live.roomName,
                userName: state => state.live.username,
                userType: state => state.live.userType
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.livetoroom();
            next()
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        methods: {
            ...mapActions({
                getlivelist: "live/getlivelist",
                getlivelistPage: "live/getlivelistPage"
            }),
            fetchLocation() {
                // let that = this;
                // this.zhibojianWithLocation = this.zhibojian;
                // this.zhibojianWithLocation.forEach((x, i) => {
                //     map.init().then(BMap => {
                //         const gc = new BMap.Geocoder();
                //         const point = new BMap.Point(x.live.longitude, x.live.latitude);
                //         gc.getLocation(point, function (rs) {
                //             let addComp = rs.addressComponents;
                //             console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                //             x.live.city = addComp.city;
                //         })
                //     });
                // });
            },

            livetoroom() {
                this.getlivelist({
                    success: res => {
                        this.fetchLocation();
                        this.pullUp.init(
                            {curPage: 1, maxPage: res.data.ret.totalPnum, offsetBottom: 100},
                            page => {
                                this.getlivelistPage({
                                    page: page,
                                    success: () => {
                                    }
                                });
                            }
                        );
                        // console.log(res);
                    }
                });
            }
            ,
            onRefresh() {
                setTimeout(() => {
                    this.refreshing = false;
                    this.livetoroom();
                }, 1000);
            }
            ,
            detaillive(item) {
                localStorage.setItem('userType2', item.live.userType);
                localStorage["hlsPullUrl"] = item.live.hlsPullUrl;
                localStorage.setItem("roomName", item.name);
                this.$router.push({name: 'play', params: {proid: item.cid, name: item.filename}});
            }
        }
    };
</script>

<style scoped>
    .no-data {
        width: 100%;
        height: 60%;
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
        color: #7b7f82;
    }

    .no-data-img {
        width: 3rem;
        height: 3rem;
    }

    .zhibojian {
        width: 100vw;
        height: 100vh;
        /* overflow-x: hidden;
              overflow-y: scroll; */
    }

    .zhibojian::-webkit-scrollbar {
        display: none;
    }

    .van-pull-refresh {
        width: 100%;
        height: 100%;
    }

    .room {
        width: 100%;
        height: 100%;
        padding-bottom: 1.5rem;
        box-sizing: border-box;
    }

    .van-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.135rem;
        box-sizing: border-box;
        /* overflow-x: hidden;
              overflow-y: scroll; */
    }

    .room .van-list .room-main {
        position: relative;
        border-radius: 4px;
        width: 3.3135rem;
        margin-left: 0.135rem;
        margin-right: 0.135rem;
        height: 4.0655rem;
        margin-top: 0.2585rem;
        background-image: url("../../../assets/images/common/aimumisi.png");
        background-position: center;
        background-size: 100%;
    }

    .room .van-list .room-main .room-m-icon {
        margin: 0.094rem;
        position: absolute;
        background: rgba(51, 51, 51, 1);
        opacity: 0.5;
        border-radius: 10px;
        display: flex;
        align-items: center;
        height: 0.47rem;
    }

    .room .van-list .room-main .room-m-icon1 {
        width: 0.376rem;
        height: 0.376rem;
        border-radius: 50%;
        margin-left: 0.0235rem;
    }

    .room .van-list .room-main .room-m-icon1 img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .room .van-list .room-main .room-m-icon2 {
        margin-left: 0.141rem;
        margin-right: 0.141rem;
        font-size: 10px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #ffffff;
        height: 0.3525rem;
    }

    .room .van-list .room-main .room-m-icon-fores {
        padding: 0.0705rem 0.141rem;
        box-sizing: border-box;
        margin-left: 0.135rem;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0.094rem;
        border: 0px solid rgba(255, 255, 255, 1);
        border-radius: 1rem;
        background: rgba(0, 0, 0, 1);
        opacity: 0.5;
    }

    .room .van-list .room-main .room-m-icon-fores div:nth-child(1) {
        width: 0.094rem;
        height: 0.094rem;
        border-radius: 50%;
        background-color: #ff3657;
    }

    .room .van-list .room-main .room-m-icon-fores div:nth-child(2) {
        font-size: 0.2115rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
    }

    .room .van-list .room-main .room-m-icon-weizhi {
        background: rgba(0, 0, 0, 1);
        position: absolute;
        right: 0;
        bottom: 0;
        color: white;
        display: flex;
        align-items: center;
        margin: 0.0705rem 0;
        padding: .0705rem .141rem;
        font-size: .2115rem;
        opacity: .5;
    }

    .room .van-list .room-main .room-m-icon-weizhi img {
        width: .4rem;
        height: .4rem;
    }
</style>

