<template>
    <div class="cart-main">
		
		<div class="shoucang-header">
			<div class="shoucang-header1" @click="$router.go(-1)"></div>
			<div class="shoucang-header2">我的收藏</div>
			<div class="shoucang-header3" @click="bianjixianshito()">编辑</div>
		</div>
		<div style="margin-top:1.2rem;">
			<div class='cart-list'
			v-for="(item,index) in favs" :key="index">
			   <div 
			    v-show="bianjixianshi === true"
				:class="{'select-btn':true,'active':item.istochoose}" 
				@click="selectItem(index)"></div>
			    <div class='image-wrap'>
			        <div class='image'
					@click="selectItem(index)"
					><img :src="item.product.titleImg"/></div>
			    </div>
			    <div class='goods-wrap' @click="selectItem(index)">
			        <div class='goods-title'
					@click="$router.push('/goods/details?productID='+item.productID)"
					>{{item.product.productName}}</div>
			        <div class='goods-attr'>
			            <span>
							<div>
								{{item.productStandard}} {{item.productColour}}
							</div>
			            </span>
			        </div>
			        <div class='buy-wrap' v-for="(item3,index3) in item.product.productStandards.slice(0,1)" :key="index3">
			            <div class='price'>¥{{(item3.bandPrice*0.01).toFixed(2)}}</div>
			        </div>
			    </div>
			</div>
		</div>
       
		
        <div class='orderend-wrap'>
            <div class='select-area'>
                <div class='select-wrap' @click="allSelect()" v-show="bianjixianshi === true">
                    <div :class="{'select-btn':true, active:isAllSelect}"></div>
                    <div class='select-text'>全选</div>
                </div>
                <div class='total'></div>
            </div>
            <div 
			:class="bianjixianshi===true?'orderend-btn':'orderend-btn disable'"
			@click="statement()">删除
			</div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState, mapGetters,mapActions} from "vuex";
    import SubHeader from "../../../components/sub_header";
	import UpRefresh from '../../../assets/js/libs/uprefresh.js'
	import axios from 'axios'
    export default {
        data(){
            return {
                isAllSelect:"",
				bianjixianshi:false,
            }
        },
        created(){
			this.pullUp = new UpRefresh();
			this.getFav({
				success:(res)=>{
					this.pullUp.init({"curPage":1,"maxPage":res.data.pages,"offsetBottom":100},
					(page) => {
						// console.log(page)
						this.getFavPage({page:page})
					})
					this.$nextTick(()=> {
						this.$utils.lazyImg();
					})
				}

			});
			this.checkAllSelect()
        },
		beforeRouteUpdate(to,from,next) {
			this.getFav({
				success:(res)=>{
					this.pullUp.init({"curPage":1,"maxPage":res.data.pages,"offsetBottom":100},
					(page) => {
						// console.log(page)
						this.getFavPage({page:page})
					})
					this.$nextTick(()=> {
						this.$utils.lazyImg();
					})
				}

			});
		},
        mounted() {
            document.title = this.$route.meta.title
        },
        computed: {
            ...mapState({
				favs: state => state.user.favs
            }),
            ...mapGetters({
                total:"cart/total",
                // freight: "cart/freight"
            })
        },
        components: {
            SubHeader,
        },
        methods: {
			...mapActions({
				"getFav":"user/getFav",
				"getFavPage":"user/getFavPage",
				}),
            ...mapMutations({
				ADD_ORDER:"cart/ADD_ORDER",
            }),
			
			bianjixianshito(){
				this.bianjixianshi = !this.bianjixianshi
				for(let i=0;i<this.favs.length;i++){
					this.favs[i].istochoose = false
				}
			},

            //选择商品
            selectItem(index) {
				//单选多选
				if(this.favs.length>0){
					this.favs[index].istochoose = !this.favs[index].istochoose
					this.checkAllSelect()
				}
				
				
            },
            //全选
            allSelect(){
                if(this.favs.length>0){
                    this.isAllSelect = !this.isAllSelect;
                    for(let i=0;i<this.favs.length;i++){
						this.favs[i]
						this.favs[i].istochoose = this.isAllSelect
					
					}
                }
            },
            //检测是否全选
            checkAllSelect(){
                if(this.favs.length>0){
                    let isChecked=true;
                    for(let i=0;i<this.favs.length;i++){
                        if(!this.favs[i].istochoose){
                            isChecked=false;
                            break;
                        }
                    }
                    this.isAllSelect=isChecked;
                }
            },
            //去结算
            statement(){
				let shoucangdata = []
				var params = new URLSearchParams();
				for(let i=0;i<this.favs.length;i++){
					if(this.favs[i].istochoose === true){
						shoucangdata.push(this.favs[i].collectedProductID)
					} 
				}
				
				params.append('jsonStr',JSON.stringify(shoucangdata));
				// console.log("数据"+JSON.stringify(shoucangdata));
				
				
				axios({
					method:"post",
					url:this.$config.baseApi+"/product/deleteProductCollection",
					headers: {
						// "Content-Type": "application/json;"
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data:params,
					}).then((res)=>{ 
						if(res.data.status === 1){
							this.getFav({
								success:(res)=>{
									this.$nextTick(()=> {
										this.$utils.lazyImg();
									})
							},
							})
						}
						
				})
				
				//console.log(shoucangdata)
				
				// console.log(JSON.stringify(shoucangdata))
			}
				
			
            
        },
    }
</script>

<style scoped>

    .cart-main {
        width: 100%;
        margin-bottom: 2.2rem;
    }
	.content{
			/* height: 100vh; */
			overflow: hidden;
			position: absolute;
			top: 1rem;
			bottom: 2.5rem;
			left: 0;
			right: 0;
		}
		
		
	.shoucang-header{
		border-bottom: 1px solid #E5E5E5;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		width: 100%;
		height: 1rem;
		display: flex;
		padding:0 0.3rem;
		box-sizing: border-box;
	}
	.shoucang-header1{
		flex: 1;
		height: 100%;
		line-height: 1rem;
 		background-image: url("../../../assets/images/home/goods/back.png");
		background-size: 7%;
		background-repeat: no-repeat;
		background-position: left;
	}
	.shoucang-header2{
		flex: 1;
		height: 100%;
		line-height: 1rem;
		text-align: center;
		
	}
	.shoucang-header3{
		flex: 1;
		height: 100%;
		line-height: 1rem;
		text-align: right;
		font-size: 0.24rem;
	}
    .cart-main .cart-list {
        width: 100%;
        height: 2.2rem;
        background-color: #FFFFFF;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin-top: 0.1rem;
		border-bottom: 1px solid #E5E5E5;
		padding: 0 0.32rem;
		box-sizing: border-box;
		/* box-align: unset; */
    }

    .cart-main .cart-list .select-btn {
        width: 0.4rem;
        height: 0.4rem;
        border: #EFEFEF solid 1px;
        border-radius: 100%;
        margin-left: 0.2rem;
        margin-right: 0.3rem;
    }

    .cart-main .cart-list .select-btn.active {
        background-image: url("../../../assets/images/home/cart/checkmark.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        border: #FFFFFF solid 1px;
    }

    .cart-main .cart-list .image-wrap {
        width: 1.2rem;
        margin-right: 0.3rem;
    }

    .cart-main .cart-list .image-wrap .image {
        width: 100%;
        height: 1.2rem;
    }

    .cart-main .cart-list .image-wrap .image img {
        width: 100%;
        height: 100%;
    }

    .cart-main .cart-list .image-wrap .del {
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        color: #B5B5B5;
        margin-top: 0.2rem;
    }

    .cart-main .cart-list .goods-wrap {
        width: 64%;
        font-size: 0.24rem;
    }

    .cart-main .cart-list .goods-wrap .goods-title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
        width: 100%;
    }

    .cart-main .cart-list .goods-wrap .goods-attr {
		color: #999999;
        width: 100%;
        margin-top: 0.1rem;
    }

    .cart-main .cart-list .goods-wrap .goods-attr span {
        padding-right: 0.3rem;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap {
        width: 100%;
        height: 0.8rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .price {
        font-size: 0.28rem;
        color: #000000;
        margin-top: 0.2rem;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap {
        width: 1.2rem;
        height: 0.4rem;
        border: 1px solid #CCCCCC;
        margin-right: 0.2rem;
        /* border-radius: 0.08rem; */
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn {
        width: 0.6rem;
        height: 0.4rem;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.4rem;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn.active {
        color: #B5B5B5;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .dec {
        border-right: 1px solid #CCCCCC;
		
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .amount-input {
        width: 0.76rem;
        height: 100%;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .amount-input input {
        width: 100%;
        height: 92%;
        text-align: center;
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .inc {
        border-left: 1px solid #CCCCCC;
    }

    .orderend-wrap {
        width: 100%;
        height: 1rem;
        background: #FFFFFF;
        position: fixed;
        z-index: 10;
        left: 0;
        bottom: 0;
        border-top: 1px solid #EFEFEF;
        display: flex;
        display: -webkit-flex;
    }

    .orderend-wrap .select-area {
        width: auto;
        height: 100%;
        flex: 2;
        -webkit-flex: 2;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
    }

    .orderend-wrap .select-area .select-wrap {
        width: auto;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .orderend-wrap .select-area .select-wrap .select-text {
        font-size: 0.24rem;
    }

    .orderend-wrap .select-area .select-wrap .select-btn {
        width: 0.4rem;
        height: 0.4rem;
        border: #EFEFEF solid 1px;
        border-radius: 100%;
        margin-left: 0.2rem;
        margin-right: 0.1rem;
    }

    .orderend-wrap .select-area .select-wrap .select-btn.active {
        background-image: url("../../../assets/images/home/cart/checkmark.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        border: #FFFFFF solid 1px;
    }

    .orderend-wrap .orderend-btn {
        width: auto;
        height: 100%;
        flex: 1;
        -webkit-flex: 1;
        background: #000000;
        font-size: 0.32rem;
        color: #FFFFFF;
        text-align: center;
        line-height: 1rem;
    }

    .orderend-wrap .orderend-btn.disable {
        background: #BFBFBF;
    }

    .orderend-wrap .total {
        font-size: 0.24rem;
        margin-right: 0.2rem;
    }

    .orderend-wrap .total span {
        color: #CC0004
    }
</style>
