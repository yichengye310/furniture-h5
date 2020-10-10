<template>
    <div class="live-to">
        <van-tabs
                :border='false'
                animated
                sticky
                color="#000000"
                line-width='22px'
                v-model="active">
            <van-tab title="直播间">
                <zhibojian></zhibojian>
            </van-tab>
            <!--		<van-tab title="精彩回放">-->
            <!--			<huifang></huifang>-->
            <!--		</van-tab>-->
            <van-tab title="开始直播" v-if="isOpen==1">
                <zhibo></zhibo>
            </van-tab>
            <van-tab disabled></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import zhibo from './zhibbo.vue'
    import zhibojian from './zhibojian.vue'
    import huifang from './huifang.vue'
    import Vue from 'vue'
    import {Tab, Tabs, Toast} from 'vant';

    Vue.use(Tab);
    Vue.use(Tabs);

    export default {
        data() {
            return {
                active: 0,
                isOpen: ''
            }
        },

        created() {
            console.log('index.vue - this.$route.query.active: ' + this.$route.query.active);
            if (this.$route.query.active) {
                this.active = 1
            } else {
                this.active = 0
            }
        },
        components: {
            zhibo,
            zhibojian,
            //yye huifang,
        },
        mounted() {
            this.isOpen = localStorage.getItem('isOpenLive');
            document.title = this.$route.meta.title
        },
        methods: {},
    }
</script>

<style scoped>
    .live-to {
        width: 100%;
        height: 100%;
    }

</style>
