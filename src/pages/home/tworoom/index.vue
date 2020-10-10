<template>
    <div class="page">
        <div :class="{header:true}">
			<div class="classify-icon" @click="goBack()"></div>
            <div class="search-wrap">
                <div class="text">两厅</div>
            </div>
			<div class="classify-icon2"></div>
        </div>
		<!-- 幻灯片 -->
        <div class="banner-wrap">
            <div class="swiper-container" ref='swiper1'>
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in swipers" :key="index">
						<img :src="item.image" :alt="item.title">
					</div>
				</div>
            </div>
        </div>
		
		<div class="anlixiu">
			<div class="anlititle">案例秀</div>
			<ul class="anliitem">
				<li @click="$router.push('/tworoomdetail')">
					<div></div>
					<div>都市风格</div>
					<div>+</div>
				</li>
				<li>
					<div></div>
					<div>简欧风格</div>
					<div>+</div>
				</li>
				<li>
					<div></div>
					<div>简约风格</div>
					<div>+</div>
				</li>
			</ul>
		</div>
		
		<div class="banner-wrap2" style="padding:0 0.32rem;width: 100%;">
			<div class="swiper-container2" ref='swiper2' style="width: 100%;">
				<div class="swiper-wrapper" style="width: 100%;">
					<div class="swiper-slide" v-for="(item,index) in swipersrecom" :key="index"
					style="width: 48%;">
						<img :src="item.image" :alt="item.title">
					</div>
				</div>
			</div>
		</div>
		
		<div class="anlixiu">
			<div class="anlititle remen" style="margin-bottom: 0.28rem;">热门产品</div>
			<div class="banner-wrap2 banner-wrap3" style="padding-left: 0.34rem;">
				<div class="swiper-container2" ref='swiper3'>
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in swipers" :key="index">
							<img :src="item.image" :alt="item.title">
						</div>
					</div>
				</div>
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
               
                searchShow:{show:false}
            }
        },
        components:{
            
        },
        created(){
            this.getSwiper({success:()=>{
                    this.$nextTick(()=>{
                        new Swiper(this.$refs['swiper1'], {
							effect:'coverflow',
							slidesPerView:1.23,
							centeredSlides:true,
                            autoplay: 3000,
                            paginationClickable :true,
                            autoplayDisableOnInteraction : false,
                        })
                    });
                }});
			this.getSwipersrecom({success:()=>{
                    this.$nextTick(()=> {
                        new Swiper(this.$refs['swiper2'], {
							centeredSlides:true,
							slidesOffsetBefore:1,
                        })
                    })
                }});
            this.getRecomGoods({success:()=>{
                    this.$nextTick(()=> {
                        new Swiper(this.$refs['swiper3'], {
							centeredSlides:true,
							slidesOffsetBefore:1,
                            
                        })
                    })
                }});
        },
        mounted(){

        },
        computed:{
            ...mapState({
               swipers:(state)=>state.index.swipers,
               
               swipersrecom:(state)=>state.index.swipersrecom,
               recomgoods:(state)=>state.index.recomgoods,
               isLogin:state=>state.user.isLogin
            })
        },
        methods:{
            ...mapActions({
				getSwiper:"index/getSwiper",

				getSwipersrecom:"index/getSwipersrecom",
				getRecomGoods:"index/getRecomGoods",
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
    .page{width:100%;min-height:100%;margin-bottom:1.5rem; background-color: #FFFFFF;overflow: hidden;}
    .header{width:100%;height:1rem;position: fixed;z-index:10;left:0px;top:0px;
	background:#FFFFFF;display:flex;justify-content: space-between;align-items: center;padding:0px 0.3rem;box-sizing: border-box;}
    .header.scroll{background:linear-gradient(hsla(0,0%,100%,0))}
    .header .classify-icon{
		width:0.6rem;height:0.6rem;background-image:url("../../../assets/images/home/goods/back.png");
		background-size:100%;background-repeat: no-repeat;background-position: center;
	}
	.header .classify-icon2{
		width:0.6rem;height:0.6rem;
	}

    .header .search-wrap .search-icon{
		margin-right:0.2rem;
		}
    .header .search-wrap .text{font-size:0.32rem;}
	.banner-wrap .swiper-container .swiper-wrapper .swiper-slide{
		height:3.9rem
	}
    .banner-wrap{width:100%;height:3.9rem; margin-top: 1rem;}
    .banner-wrap img{width:100%;height:100%}
	.banner-wrap2{
		overflow: hidden;
		width:100%;
		height:2rem;
		background:rgba(255,255,255,1);
		border-radius:5px;
	}
	.banner-wrap2 img{width:100%;height:100%}
	.banner-wrap2 .swiper-container2{
		height:100%
	}
	.banner-wrap2 .swiper-container2 .swiper-wrapper{
		display: flex;
	}
	.banner-wrap2 .swiper-container2 .swiper-wrapper .swiper-slide{
		margin-right: 0.24rem;
		border-radius: 5px;
		overflow: hidden;
	}
	.banner-wrap3 .swiper-container2 .swiper-wrapper .swiper-slide{
		flex: 1;
	}
	.banner-img{
		height:3rem;
	}
	.banner-text{
		height:0.6rem;
		line-height: 0.6rem;
		padding: 0 0.14rem;
		font-size: 0.24rem;
		display: flex;
		justify-content: space-between;
	}
	.anlixiu{
		width: 100
	}
	.anliitem{
		display: flex;
		padding: 0 0.32rem;
	}
	.anliitem li{
		border: 1px solid #EAEAEA;
		border-radius: 5px;
		height:1.1rem;
		flex:1;
		margin:0.32rem 0.08rem;
	}

	.anliitem li div:nth-child(1){
		margin-top: 0.18rem;
		margin-left: 0.18rem;
		border-radius: 50%;
		width:5px;
		height: 5px;
		background-color: #000000;
	}
	.anliitem li div:nth-child(2){
		text-align: center;
	}
	.anliitem li div:nth-child(3){
		text-align: right;
		padding-right: 0.18rem;
	}
    .anlititle{
		padding: 0.18rem 0.34rem;
		color: #000000;
		font-size: 0.32rem;
		font-weight: bold;
		
	}
</style>