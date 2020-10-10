<template>
<div>
	<div class="open" v-show="adver"
	:style="{'background-image':'url('+imgurl2+')'}">
		
		<!-- <div style="width: 100%;height: 100%;position: absolute;" >
			<img :src="imgurl2" alt="" style="width: 100%;height: 100%;">
		</div> -->
		
	  <div @click="finish()" class="jump">
	    跳过
	    <van-count-down
	      @finish="finish"
	      :time="time"
	      style="display:inline;color:#fff;font-size:.3rem;"
	    >
	      <template v-slot="timeData">
	        <span class="block">{{ timeData.seconds }}</span>
	      </template>
	    </van-count-down>
	  </div>
	</div>
	
	
	 <div v-show="!adver">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
</div>
   
	
</template>

<script>
	import Vue from "vue";
	import { CountDown } from "vant";
	import axios from 'axios'
	Vue.use(CountDown);
	export default {
	  name: "app",
	  data() {
	    return {
	      adver: true,
	      time: 4000,
		  imgurl2:""
	    };
	  },
	  created() {
			axios({
				method:"get",
				url:this.$config.baseApi+"/getStartImg",
				headers: {
					"Content-Type": "application/json"
				},
				}).then((res)=>{ 
					if(res.data.status === 1){
						this.imgurl2 = res.data.data.imgURL
						this.time = (res.data.data.startSeconds + 1) * 1000
				}
			})
	  },
	  methods: {
	    finish() {
	      this.adver = false;
	    }
		
	  }
	}
</script>

<style>
@import "./assets/css/common/public.css";
	.open {
	  width: 100%;
	  height: 100vh;
	  background-size: 100% 100%;
	}
	.open .jump {
	  position: relative;
	  top: 0.75rem;
	  left: 74%;
	  width: 1.8rem;
	  height: 0.6rem;
	  line-height: 0.6rem;
	  text-align: center;
	  background-color: rgba(0, 0, 0, 0.35);
	  color: #fff;
	  border-radius: 0.5rem;
	  letter-spacing: 0.02rem;
	  font-weight: 300;
	  font-size: 0.3rem;
	  cursor: pointer;
	}
</style>
