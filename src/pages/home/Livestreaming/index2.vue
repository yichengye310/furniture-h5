<template>
    <div class="livesteart">
        <video id="pusher" style="width:100%;height:100vh;background-color: #000000;" ref='abc'>

        </video>

        <!-- <div id="pusher" style="width:100%;height:300px;background-color: #000000;" ref='abc'></div> -->
        <button @click="ppPusher()" style="margin-left: 10px;width: 55px;">开始</button>

        <button @click="stopPusher()" style="margin-left: 10px;">停止</button>

        <button @click="switchCamera()" style="margin-left: 10px;">切换摄像头</button>


    </div>
</template>

<script>

    import Vue from "vue";

    export default {
        name: 'livefore',
        data() {
            return {
                showlive: false,
                pusher: null,
                parth: 'rtmp://p4d52be21.live.126.net/live/760f6b4ab3cb40ddb0613cda22667a9c?wsSecret=6d936a518477ab57be95779cb77fec6d&wsTime=1589263803'

            }
        },

        created() {


        },
        mounted() {
            this.$nextTick(() => {
                if (window.plus) {
                    this.plusReady();
                    this.ppPusher();
                } else {
                    document.addEventListener('plusready', this.plusReady, false);
                    this.ppPusher();
                }
            })

        },
        methods: {
            plusReady() {
                // 创建直播推流控件
                this.pusher = new plus.video.LivePusher("pusher", {
                    url: this.parth,
                });
                // 监听状态变化事件
                this.pusher.addEventListener('statechange', function (e) {
                    console.log('statechange: ' + JSON.stringify(e));
                }, false);
            },
            ppPusher() {
                this.pusher.setStyles({
                    url: this.parth,
                    beauty: 1,
                    whiteness: 5,//美白程度，0，1，2，3，4，5
                });
                this.pusher.start();
            },
            stopPusher() {
                this.pusher.stop();
            },
            switchCamera() {
                //切换摄像头
                this.pusher.switchCamera();
            },

        },

    }
</script>
<style scoped>
    .livesteart {
        position: fixed;
        width: 100%;
        height: 100%;
        margin-bottom: 1.5rem;
    }

    .livesteart::-webkit-scrollbar {
        display: none;
    }

    .livesteart .live-input {
        width: 90%;
        margin-right: 0.329rem;
        margin-left: 0.329rem;
        display: flex;
        align-items: center;
        border-bottom: #CCCCCC 1px solid;
        padding: 0.3525rem 0;
        box-sizing: border-box;
        position: relative;
    }

    .livesteart .live-input input {
        margin-left: 0.3525rem;
        width: 90%;
    }

    .livesteart .live-input .live-input-ico {
        width: 0.1645rem;
        height: 0.1645rem;
        background: #333333;
        position: absolute;
        transform: rotate(45deg);
    }

    ::-webkit-input-placeholder {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
    }

    .livesteart .dingwei .dingwei-icon {
        width: 0.3525rem;
        height: 0.3525rem;
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
        color: #FFFFFF;
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
        background: #333333;
        transform: rotate(45deg);
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
        background: #333333;
        transform: rotate(45deg);
    }

    .choose-shop-tolive {
        width: 1.9975rem;
        border: 1px solid #CCCCCC;
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
