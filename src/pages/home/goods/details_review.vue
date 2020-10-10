<template>
    <div class="page">
		<SubHeader title="商品评论"></SubHeader>
        <div class='reviews-main'>
            <div class="reviews-title">商品评价</div>
			<div class="reviews-start">
				<div class="reviews-div">
					<span class="reviews-text">描述相符</span>
					<van-rate v-model="descriptionMatchScore" :size="12" :disabled ="jingyong"  disabled-color="rgb(255, 210, 30)"/>
				</div>
				<div class="reviews-div">
					<span class="reviews-text">物流服务</span>
					<van-rate v-model="logisticsServiceScore" :size="12" :disabled ="jingyong"  disabled-color="rgb(255, 210, 30)"/>
				</div>
				<div class="reviews-div">
					<span class="reviews-text">服务态度</span>
					<van-rate v-model="serviceAttitudeScore" :size="12" :disabled ="jingyong"  disabled-color="rgb(255, 210, 30)"/>
				</div>
			</div>

			<div class='reviews-wrap' v-show="reviews.length>0">
				<div class='reviews-list' 
				v-for="(item,index) in reviews" :key="index">
					<div class='uinfo'>
						<div class='head'>
							<img src="../../../assets/images/common/renxiang.png"/>
							<!-- :data-echo="item.phoneNumber" -->
						</div>
						<div>
							<div class='nickname'>{{item.phoneNumber}}</div>
							<div class='reviews-date'>{{item.createdTimestamp | formatDate}}</div>
						</div>
					</div>
					<div class='reviews-content' v-html="item.content"></div>
					<div
					class='reviews-content'
					style="width:100%;"
					 v-for="(item2,index2) in item.commonImages" :key='index2'>
						 <div style="width:2rem ;height: 2rem;">
							 <img :src="item2.imageUrl" alt="" style="width: 100%;height: 100%;">
						 </div>
					</div>
					
				</div>
			</div>
            <div class="no-data" v-show="reviews.length<=0">暂无评价！</div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from "vuex";
    import UpRefresh from '../../../assets/js/libs/uprefresh';
	import SubHeader from "../../../components/sub_header";
	import Vue from 'vue';
	import { Rate } from 'vant'
	Vue.use(Rate);
    export default {
        data(){
            return {
				jingyong:true,
				//value:5,
				descriptionMatchScore:5,
				logisticsServiceScore:5,
				serviceAttitudeScore:5,
                productID:this.$route.query.productID?this.$route.query.productID:""
            }
        },
		components:{
		    SubHeader
		},
		filters: {
		  formatDate: function (value) {
			let date = new Date(value);
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? ('0' + MM) : MM;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			let h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			let m = date.getMinutes();
			m = m < 10 ? ('0' + m) : m;
			let s = date.getSeconds();
			s = s < 10 ? ('0' + s) : s;
			return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		  }
		},
        created(){
			// console.log(document.title)
            this.pullUp=new UpRefresh();
            this.getReviews({productID:this.productID,success:(res)=>{
					this.descriptionMatchScore = this.reviews[0].descriptionMatchScore
					this.logisticsServiceScore = this.reviews[0].logisticsServiceScore
					this.serviceAttitudeScore =	this.reviews[0].serviceAttitudeScore
                    this.$nextTick(()=> {
                        this.$utils.lazyImg();
                    });
                    this.pullUp.init({"curPage":1,"maxPage":res.data.list.length/6+1,"offsetBottom":100},(page)=>{
                        this.getReviewsPage({productID:this.productID,page:page,
						success:(res)=>{
							this.$nextTick(()=> {
							    this.$utils.lazyImg();
								// console.log(this.reviews)
							});
						}
						});
                    });
                }});
        },
        computed:{
            ...mapState({
                reviews:state=>state.goodsReview.reviews,
                total:state=>state.goodsReview.total
            })
        },
        methods:{
            ...mapActions({
                "getReviews":"goodsReview/getReviews",
                "getReviewsPage":"goodsReview/getReviewsPage"
            })
        },
        beforeDestroy() {
            this.getReviews({productID:this.productID,success:(res)=>{
                    this.$nextTick(()=> {
                        this.$utils.lazyImg();
            			
                    });
                    this.pullUp.init({"curPage":1,"maxPage":res.data.list.length/6+1,"offsetBottom":100},(page)=>{
                        this.getReviewsPage({productID:this.productID,page:page,
            			success:(res)=>{
            				this.$nextTick(()=> {
            				    this.$utils.lazyImg();
            					
            				});
            			}
            			});
                    });
                }});
        }
    }
</script>

<style scoped>
    .page{margin-top:1.2rem;}
    .reviews-main{width:100%;background-color: #FFFFFF;margin-top:0.5rem;overflow:hidden;padding-bottom: 0.5rem}
    .reviews-main .reviews-title{
		color:#000000;font-size:0.32rem;
		width:100%;margin:0 auto;
		margin-top:0.2rem;
		padding: 0 0.2rem;
		box-sizing: border-box;
		}
	.reviews-main .reviews-start .reviews-div{
		margin-top: 0.2rem;
	}
	.reviews-main .reviews-text{
		color:#7b7f82;
		font-size:0.32rem;
		margin-right:0.4rem;
	}
    .reviews-main .reviews-start{
		border-bottom:0.28rem solid #F5F4F9;
		margin-top:0.2rem;
		width:100%;
		padding: 0 0.8rem;
		box-sizing: border-box;
	}
	.reviews-main .reviews-wrap{width:90%;margin:0 auto;}
    .reviews-main .reviews-wrap .reviews-list{
		width:100%;margin-top:0.4rem;
		border-top: #CCCCCC 1px solid;
		padding:0.1rem 0 0.2rem 0;
		box-sizing: border-box;
	}
    .reviews-main .reviews-list .uinfo{width:100%;display:flex;display:-webkit-flex;height:0.6rem;align-items: center;-webkit-align-items: center;}
    .reviews-main .reviews-list .uinfo .head{width:0.6rem;height:0.6rem;margin-right:0.2rem;}
    .reviews-main .reviews-list .uinfo .head img{width:100%;height:100%;border-radius: 100%;}
    .reviews-main .reviews-list .uinfo .nickname{width:auto;font-size:0.28rem;}
    .reviews-main .reviews-list .reviews-content{width:100%;margin:0 auto;font-size:0.28rem;margin-top:0.2rem;}
    .reviews-main .reviews-list .reviews-date{
		width:auto;font-size:0.28rem;
		color:#7b7f82;}
    .reviews-main .reviews-more{width:2.44rem;height:0.56rem;border:solid 1px #D50A17;line-height:0.56rem;text-align:center;font-size:0.28rem;margin:0 auto;margin-top:0.5rem;border-radius: 0.1rem;}
</style>
