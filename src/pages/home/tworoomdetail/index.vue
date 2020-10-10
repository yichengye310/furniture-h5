<template>
    <div class="page">
        <div :class="{header:true}">
            <div class='classify-icon' @click="goBack()"></div>
        </div>
		<!-- 幻灯片 -->
        <div class="banner-wrap">
            <div class="swiper-container" ref='swiper1'>
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in swipers" :key="index">
						<img :src="item.image" :alt="item.title">
					</div>
				</div>
				<div class="swiper-pagination" ref="swiper-pagination"></div>
            </div>
        </div>
		
		<div class="pinglun">
			<div class="pinglun-title">
				<div class="touxiang">
					<img src="../../../assets/images/common/lazyImg.jpg" alt="">
				</div>
				<div>
					<div style="font-size: 15px;">名字</div>
					<div style="font-size: 12px;">日期</div>
				</div>
			</div>
			<div style="font-size: 14px;">
				评论评论评论评论评论评论评论评论
				评论评论评论评论评论评论评论评论
				评论评论评论评论评论评论评论评论
			</div>
		</div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
	
	import {Toast} from 'vant';
	
    import Swiper from '../../../assets/js/libs/swiper';
    
    export default {
        name: "index",
        data(){
            return {
               
            }
        },
        components:{
            
        },
        created(){
            this.getSwiper({success:()=>{
                    this.$nextTick(()=>{
                        new Swiper(this.$refs['swiper1'], {
                            autoplay: 3000,
                            pagination : this.$refs['swiper-pagination'],
                            paginationClickable :true,
                            autoplayDisableOnInteraction : false
                        })
                    });
                }});
          
        },
        mounted(){

        },
        computed:{
            ...mapState({
               swipers:(state)=>state.index.swipers,
               
               
               swipersrecom:(state)=>state.index.swipersrecom,
               
               
            })
        },
        methods:{
            ...mapActions({
				getSwiper:"index/getSwiper",
				
            }),
           goBack(){
               this.$router.go(-1);
           },
			finish(){
				Toast('jieshu')
			}
        },

    }
</script>

<style scoped>
	@import url("../../../assets/css/common/swiper.css");
    .page{width:100%;min-height:100%;margin-bottom:1.5rem; background-color: #FFFFFF;}
    .header{width:100%;height:1rem;position: fixed;z-index:10;left:0px;top:0px;background:linear-gradient(rgba(1,1,1,.2),hsla(0,0%,100%,0));display:flex;justify-content: space-between;align-items: center;padding:0px 0.3rem;box-sizing: border-box;}
    .header .classify-icon{
	width:0.6rem;
	height:0.6rem;
	z-index: 100;
	background-image: url("../../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
	.swiper-container{
		width:100%;height:100%
	}
    .banner-wrap{width:100%;height:9.46rem;}
    .banner-wrap img{width:100%;height:100%}
	.pinglun{
		margin-top: 0.66rem;
		padding: 0 0.32rem;
	}
	.pinglun-title{
		display: flex;
	}
	.touxiang{
		width: 0.8rem;
		height:0.8rem;
		background-color: #000000;
		border-radius: 50%;
		margin-right: 0.14rem;
	}
	.touxiang img{width:100%;height:100%}
</style>