<template>
    <div>
        <div class='details-header'>
            <div class='back' @click="$router.go(-1)"></div>
            <div class='tab-wrap'>
                <div>商品详情</div>
            </div>
			<div class='tab-wrap2' style="width:0.8rem;height:0.8rem"></div>
        </div>
       <div class="sub-page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // productID:this.$route.query.productID?this.$route.query.productID:"",
            }
        },
        created(){
            // console.log()
        },
        methods:{
    
        },
        beforeRouteUpdate(to,from,next){
            next();
        }
    }
</script>

<style scoped>
    .details-header{
		width:100%;height:1rem;
		background-color:#FFFFFF;
		display:flex;display:-webkit-flex;align-items: center;
		-webkit-align-items: center;justify-content: space-between;
		-webkit-justify-content: space-between;position: fixed;
		z-index:10;left:0px;top:0px;
		padding: 0 0.3rem;
		}
    .details-header .back{
		width:0.4rem;
		height:0.6rem;
		background-image:url('../../../../assets/images/home/goods/back.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size:45%;
		}
   
    .details-header .tab-wrap .tab-name{
		width:auto;height:96%;overflow:hidden;line-height:1rem;text-align:center;
		margin-left:9%;margin-right:9%;font-size:0.36rem;}
    .details-header .tab-wrap .tab-name.active{border-bottom: solid 2px #FDA208;}
    .details-header .cart-icon{
		width:0.8rem;height:0.8rem;
		background-image:url('../../../../assets/images/home/goods/cart.png');
		background-repeat: no-repeat;background-position: center;
		background-size:100%;margin-right:0.2rem;position:relative;z-index:1;}
    .details-header .cart-icon .spot{
		
		width:0.2rem;height:0.2rem;background-color:#CC0004;border-radius: 100%;
		position:absolute;z-index:1;right:0px;top:0.15rem;}

    .sub-page{width:100%;}

</style>
