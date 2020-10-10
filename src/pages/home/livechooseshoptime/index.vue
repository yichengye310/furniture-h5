<template>
    <div class='page'>
        <div class='search-top'>
            <div class='search-header'>
                <div class='back' @click="gotolivezheshop()"></div>
                <div class='search-wrap' @click="searchShow.show=true">限时抢购商品</div>
				<div class='screen-btn' @click="gotolivezheshop()">确认</div>
            </div>

        </div>


        <div class='goods-main'>
            <div class='goods-list' v-for="(item,index) in timeshop"
			:key="index"
			@click="liveto(index)">
				<div :class="{'select-btn':true,'active':item.istochoose}"></div>
                <div class='image'>
					<img
					:src="item.activityImg" />
				</div>
                <div class='goods-content'>
                    <div class='goods-title'>{{item.productDescription}}</div>
                    <div class='price'><!--  -->
						<div
						v-if="item.full !== null">
							<div
							class="ksakdo">
							满{{(item.full*0.01).toFixed(2)}}减{{(item.reduce * 0.01).toFixed(2)}}
							</div>

							<div>

							¥{{((item.full - item.reduce)*0.01).toFixed(2)}}
							</div>
						</div>



						<div v-if="item.full === null" 	v-for="(item2,index2) in (item.productLimitedTimeStandardsDTOS || '').slice(0,1)" :key="index2">
							<span
							style="
							font-size:0.2585rem;
							font-family:Hiragino Sans GB;
							font-weight:normal;
							color:rgba(255,34,91,1);
							">
								折后:¥{{(item2.discountPrice*0.01).toFixed(2)}}
							</span>
							<span
							style="
							font-size:0.2115rem;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(255,34,91,0.8);
							margin-left: 0.329rem;
							">
								原价:¥{{(item2.originalPrice*0.01).toFixed(2)}}
							</span>
						</div>

					</div>
                </div>
            </div>
            <div class="no-data" v-show="timeshop.length<=0">没有相关商品！</div>
        </div>
        <my-search :show="searchShow" :isLocal="true"></my-search>

    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex';
    import MySearch from '../../../components/search';
    import IScroll from '../../../assets/js/libs/iscroll';
    import UpRefresh from '../../../assets/js/libs/uprefresh';
    export default {
        name: "goods-search",
        data() {
            return {
                keyword: this.$route.query.keyword ? this.$route.query.keyword : "",
                searchShow:{show:false},





            }
        },
        components:{
            MySearch
        },
        computed:{
            ...mapState({
				timeshop: (state) => state.live.timeshop,
            })
        },
        created(){

            this.getlivetimedata()

        },
        mounted(){

        },
        methods:{
            ...mapActions({
               getlivetimedata:"live/getlivetimedata"
            }),
            ...mapMutations({
              "SET_TIME_SHOP":"live/SET_TIME_SHOP"
            }),

			liveto(w){
				this.timeshop[w].istochoose = !this.timeshop[w].istochoose
			},
			gotolivezheshop(){
				let timeshop1=[]
				console.log(this.timeshop)
				for(let i=0;i<this.timeshop.length;i++){
					if(this.timeshop[i].istochoose === true){
						timeshop1.push(this.timeshop[i])
					}
				}

				//
				this.SET_TIME_SHOP({timeshop1:timeshop1})
				// localStorage['liveshoplength'] = livetheshop.length
				this.$router.push('/live?active=3')
			},



        },
        beforeRouteUpdate(to,from,next){

        },
        beforeDestroy(){

        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: auto;
        background-color: #FFFFFF;
        overflow: hidden;
    }

    .search-top {
        width: 100%;
        position: fixed;
        z-index: 10;
        left: 0px;
        top: 0px;
        background-color: #FFFFFF;
    }

    .search-header {
        width: 100%;
        height: 1rem;
        display: flex;
		justify-content: center;
        align-items: center;
        padding: 0 0.329rem;
		box-sizing: border-box;
		border-bottom:0.06rem solid #F6F5F8;
    }

    .search-header .back {
        width: 0.4rem;
        height: 0.7rem;
        background-image:url('../../../assets/images/home/goods/back.png');
        background-size: 45%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .search-header .search-wrap {
		flex: 1;
		text-align: center;
        height: 0.6rem;
		font-size:15px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		display: flex;
		align-items: center;
		justify-content: center;
    }






    .search-header .screen-btn {
        width: 0.8rem;
        height:  0.4rem;
		color: #333333;

    }

    .search-top .order-main {
        width: 100%;
        height: 0.8rem;
        border-bottom: 1px solid #EFEFEF;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .search-top .order-main .order-item {
        width: auto;
        height: auto;
        display: flex;
        display: -webkit-flex;
        margin-left: 0.4rem;
        position: relative;
        z-index: 1;
    }

    .search-top .order-main .order-item .order-text {
        font-size: 0.32rem;
    }

    .search-top .order-main .order-item.active .order-text {
        color: #FDA208
    }

    .search-top .order-main .order-item .order-icon {
        width: 0.35rem;
        height: 0.35rem;
        background-image: url("../../../assets/images/home/goods/down.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        margin-left: 0.1rem;
    }

    .search-top .order-main .order-item.active .order-icon {
        background-image: url("../../../assets/images/home/goods/up.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .search-top .order-main .order-item .order-menu {
        width: 688%;
        height: auto;
        background-color: #FFFFFF;
        position: absolute;
        z-index: 1;
        left: -35%;
        top: 0.63rem;
    }

    .search-top .order-main .order-item .order-menu li {
        width: 95%;
        height: 0.8rem;
        border-bottom: 1px solid #EFEFEF;
        font-size: 0.28rem;
        line-height: 0.8rem;
        padding-left: 0.4rem;
    }

    .search-top .order-main .order-item .order-menu li.active {
        color: #FDA208
    }

    .goods-main {
        width: 100%;
        height: auto;
        margin-top: 1.235rem;
    }
.goods-main .goods-list .select-btn {
        width: 0.4rem;
        height: 0.4rem;
        border: #EFEFEF solid 1px;
        border-radius: 100%;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    .goods-main .goods-list .select-btn.active {
        background-image: url("../../../assets/images/home/cart/checkmark.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        border: #FFFFFF solid 1px;
    }
    .goods-main .goods-list {
		border-bottom:0.06rem solid #F6F5F8;
		margin-top: 0.235rem;
		padding-bottom:0.235rem ;
        width: 100%;
        height: auto;
        display: flex;
		align-items: center;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        overflow: hidden;

    }

    .goods-main .goods-list .image {
        width: 2rem;
        height: 2rem;
        margin-left: 0.1rem;
        overflow: hidden;
        text-align: center;
    }

    .goods-main .goods-list .image img {
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-height: 100%;
    }

    .goods-main .goods-list .goods-content {
		margin-left: 0.2rem;
		padding: 0.235rem 0;
        width: 67%;
        height: 98%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		box-sizing: border-box;
    }

    .goods-main .goods-list .goods-title {
        width: 95%;
        height: 0.8rem;
        font-size: 0.28rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
    }

    .goods-main .goods-list .price {
        font-size: 0.32rem;
        color: #F93036;
        margin-top: 0.1rem;
    }
	.goods-main .goods-list .price .ksakdo{
	   background:rgba(163,89,103,0.3);
	   	padding: 0.0235rem;
	   	font-size:0.188rem;
	   	font-family:PingFang SC;
	   	font-weight:400;
	   	color:rgba(255,34,91,1);
	   	border-radius:1px;
		margin-bottom:4px;
	}
    .goods-main .goods-list .sales {
        font-size: 0.24rem;
        color: #969696;
        margin-top: 0.1rem;
    }

    .goods-main .goods-list .sales span {
        color: #FDA208
    }

    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99;
        left: 0px;
        top: 0px;
        background-color: rgba(0, 0, 0, 0.3)
    }

    .screen {
        width: 80%;
        height: 100%;
        position: fixed;
        z-index: 100;
        right: 0px;
        top: 0px;
        background-color: #FFFFFF;
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
        overflow: hidden;
    }

    .screen.move {
        transition: transform 0.3s;
        -webkit-transition: transform 0.3s;
        transform: translateX(0%);
        -webkit-transform: translateX(0%)
    }

    .screen.unmove {
        transition: transform 0.3s;
        -webkit-transition: transform 0.3s;
        transform: translateX(100%);
        -webkit-transform: translateX(100%)
    }

    .screen .attr-wrap {
        width: 100%;
    }

    .screen .attr-wrap .attr-title-wrap {
        width: 94%;
        height: 0.8rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }

    .screen .attr-wrap .attr-title-wrap .attr-name {
        font-size: 0.32rem;
    }

    .screen .attr-wrap .attr-title-wrap .attr-icon {
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("../../../assets/images/home/goods/down.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .screen .attr-wrap .attr-title-wrap .attr-icon.up {
        background-image: url("../../../assets/images/home/goods/up.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .screen .attr-wrap .attr-title-wrap .price-wrap {
        width: auto;
        height: auto;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin-left: 18%;
    }

    .screen .attr-wrap .attr-title-wrap .price-wrap .price-input {
        width: 1rem;
        height: 0.4rem;
        border: 1px solid #EFEFEF
    }

    .screen .attr-wrap .attr-title-wrap .price-wrap .price-input input {
        width: 100%;
        height: 89%;
        font-size: 0.28rem;
    }

    .screen .attr-wrap .attr-title-wrap .price-wrap .price-line {
        width: 0.4rem;
        height: 1px;
        background-color: #EFEFEF;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    .screen .attr-wrap .item-wrap {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
    }

    .screen .attr-wrap .item-wrap .item {
        width: 30%;
        height: 0.64rem;
        background-color: #EFEFEF;
        text-align: center;
        line-height: 0.64rem;
        overflow: hidden;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        margin-left: 2%;
        margin-right: 1%;
        margin-bottom: 0.2rem;
    }

    .screen .attr-wrap .item-wrap .item.active {
        color: #FFFFFF;
        background-color: #FDA208;
    }

    .screen .handel-wrap {
        width: 100%;
        height: 1rem;
        background-color: #FFFFFF;
        border-top: 1px solid #EFEFEF;
        position: absolute;
        z-index: 1;
        left: 0px;
        bottom: 0px;
        display: flex;
        display: -webkit-flex;
    }

    .screen .handel-wrap .item {
        width: auto;
        height: 100%;
        font-size: 0.28rem;
        text-align: center;
        line-height: 1rem;
        flex: 1;
        -webkit-flex: 1
    }

    .screen .handel-wrap .item span {
        color: #FDA208
    }

    .screen .handel-wrap .item.reset {
        background-color: #EFEFEF
    }

    .screen .handel-wrap .item.sure {
        background-color: #FDA208;
        color: #FFFFFF
    }
</style>
