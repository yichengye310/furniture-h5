<template>
  <div class="huifang">
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      loosing-text="释放即可刷新..."
      loading-text="刷新中"
      @refresh="onRefresh"
    >
      <div class="vedio-room">
        <van-list>
          <div
            class="room-main"
            v-for="(item,index) in list"
            :key="index"
            @click="goPlayBack(item)"
			:style="{'background-image':'url('+item.coverImage+')','background-size':'100% 100%'}"
          >
            <div class="room-m-icon">
              <div class="room-m-icon1">
                <img src="../../../assets/images/common/aimumisi.png" alt />
              </div>
              <div class="room-m-icon2">{{item.liveTitle}}</div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>

    <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5"></div> -->
  </div>
</template>

<script>
import UpRefresh from "../../../assets/js/libs/uprefresh.js";
import { List, PullRefresh } from "vant";
Vue.use(List);
Vue.use(PullRefresh);
import Vue from "vue";
import axios from "axios";

export default {
  data() {
    return {
      list: [],

      // loading: false,
      // finished: false,
      refreshing: false,
      count:0,
      // busy:false
    };
  },

  created() {
	this.pullUp = new UpRefresh();
	//下拉加载
	this.jiazai()
  },
  components: {},
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
	jiazai(){
      axios({
        method:'get',
        url:this.$config.baseApi+"/live/channelListByPage",
        headers: {
            "Content-Type": "application/json;"
        },
        params: {
          liveWay: 2,
          pageNo: 1,
          pageSize: 10
        }
      }).then(res=>{
        this.list = res.data.data.list;
        console.log(res);

        this.pullUp.init(
          { curPage: 1, maxPage: res.data.data.pages, offsetBottom: 100 },
          page => {
            axios({
              method:'get',
              url:this.$config.baseApi+"/live/channelListByPage",
              headers: {
                  "Content-Type": "application/json;"
              },
              params:{
                liveWay:2,
                pageNo:page,
                pageSize:10
              }
            }).then(res=>{
              //console.log(res.data.data.list);
              this.list = this.list.concat(res.data.data.list);
              //console.log(this.list.length);
              if(res.data.data.pages == page){
                  this.refreshing = false
              }
            })
          })
		})
	},
	goPlayBack(item){
		this.$router.push({name:'playBack',params:{hlsPullUrl:item.hlsPullUrl,title:item.liveTitle,cid:item.cid}})
	},

    onRefresh() {
     setTimeout(() => {
		this.refreshing = false;
		this.jiazai()

     }, 1000);
    }
  }
};
</script>

<style scoped>
.huifang {
  /* width: 100vw;
  height: 100vh; */
}
.huifang .vedio-room {
  width: 100%;
  margin-bottom: 1.2rem;
}
.huifang .vedio-room .van-list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 3.8%;
}
.huifang .vedio-room .room-main {
  /* position: relative; */
  width: 45%;
  height: 4.0655rem;
  /* background-color: skyblue; */
  margin: .2rem .2rem 0 0;
  border-radius: .15rem;
}
.huifang .vedio-room .room-main .room-m-icon {
  width: 2.5rem;
  height: 0.5rem;
  margin: .15rem 0 0 .1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.huifang .vedio-room .room-main .room-m-icon .room-m-icon1 {
  padding-left: .06rem;
  width: 23%;
}
.huifang .vedio-room .room-main .room-m-icon .room-m-icon1 img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  vertical-align: middle;
}
.huifang .vedio-room .room-main .room-m-icon .room-m-icon2 {
  width: 77%;
  font-size: 0.2rem;
  color: #fff;
  letter-spacing: .02rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

