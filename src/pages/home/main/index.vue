<template>
    <div>
        <router-view></router-view>
        <div class="bottom-nav">
            <ul :class="{home:true, active:homeStyle}" @click="goPage('/index')">
                <li></li>
                <li>首页</li>
            </ul>

			<ul :class="{fenlei:true, active:fenleiStyle}" @click="goPage('/goods/classify?indexnumber=0&categoryName=床垫')">
				<li></li>
				<li>分类</li>
			</ul>

			<ul :class="{live:true, active:liveStyle}" @click="goPage('/live')">
				<li></li>
				<li>直播</li>
			</ul>

            <ul :class="{cart:true, active:cartStyle}" @click="isLogin?goPage('/cart'):$router.push('/login')">
                <li></li>
                <li>购物车</li>
                <li class="spot" v-show="$store.state.cart.cartData.length>0"></li>
            </ul>
            <ul :class="{my:true, active:myStyle}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>

<script>
	import { mapState} from "vuex";
    export default {
        name: "home",
        data(){
            return {
                homeStyle:true,
                cartStyle:false,
                myStyle:false,
				fenleiStyle:false,
				liveStyle:false,
            }
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
            },
            changeStyleNav(name){
                switch (name) {
                    case "index":
                        this.homeStyle=true;
                        this.cartStyle=false;
                        this.myStyle=false;
						this.fenleiStyle=false;
						this.liveStyle=false;
                        break;
                    case "cart":
                        this.homeStyle=false;
                        this.cartStyle=true;
                        this.myStyle=false;
						this.fenleiStyle=false;
						this.liveStyle=false;
                        break;
					case "live":
						this.liveStyle=true;
					    this.homeStyle=false;
					    this.cartStyle=false;
					    this.myStyle=false;
						this.fenleiStyle=false;
					    break;
                    case "my":
                        this.homeStyle=false;
                        this.cartStyle=false;
                        this.myStyle=true;
						this.fenleiStyle=false;
						this.liveStyle=false;
                        break;
					case "goods-classify-item":
						this.homeStyle=false;
						this.cartStyle=false;
						this.myStyle=false;
						this.fenleiStyle=true;
						this.liveStyle=false;
						break;
                    default:
                        this.homeStyle=true;
                        this.cartStyle=false;
                        this.myStyle=false;
						this.fenleiStyle=false;
						this.liveStyle=false;
                        break;
                }
            }
        },
		computed: {
		  ...mapState({
		    isLogin: state => state.user.isLogin
		  })
		},
        created(){

            document.title=this.$route.meta.title;
            this.changeStyleNav(this.$route.name);

        },
        beforeRouteUpdate(to, from, next) {
            // console.log(to);
            document.title=to.meta.title;
            this.changeStyleNav(to.name);
            next();
        },
        activated(){
            document.title=this.$route.meta.title;
            this.changeStyleNav(this.$route.name);
        }
    }
</script>

<style scoped>
    .bottom-nav{width:100%;
	height:1.2rem;background-color:
	#FFFFFF;box-shadow: 0 0 10px #efefef;
	position: fixed;z-index:10;left:0px;bottom:0px;display: flex;justify-content: space-between;align-items: center;padding:0px 0.5rem;box-sizing: border-box;}
    .bottom-nav ul{width:1rem;}
    .bottom-nav ul li:nth-child(1){width:0.6rem;height:0.6rem;margin:0 auto;}
    .bottom-nav ul li:nth-child(2){font-size:0.2rem;text-align: center;width:1rem}
    .bottom-nav ul.active li:nth-child(2){color:#000000}

    .bottom-nav ul.home li:nth-child(1){
		background-image:url("../../../assets/images/home/main/home1.png");
		background-size:70%;background-repeat: no-repeat;background-position: center}
    .bottom-nav ul.home.active li:nth-child(1){
		background-image:url("../../../assets/images/home/main/home2.png");
		background-size:70%;
		background-repeat: no-repeat;
		background-position: center;
		}

    .bottom-nav ul.cart li:nth-child(1){
		background-image:url("../../../assets/images/home/main/cart1.png");
		background-size:75%;
		background-repeat: no-repeat;
		background-position: center;
	}
    .bottom-nav ul.cart.active li:nth-child(1){
		background-image:url("../../../assets/images/home/main/cart2.png");
		background-size:75%;background-repeat: no-repeat;
		background-position: center;
	}

	.bottom-nav ul.live li:nth-child(1){
		background-image:url("../../../assets/images/home/main/live.png");
		background-size:80%;
		background-repeat: no-repeat;
		background-position: center;
	}
	.bottom-nav ul.live.active li:nth-child(1){
		background-image:url("../../../assets/images/home/main/live2.png");
		background-size:80%;background-repeat: no-repeat;
		background-position: center;
	}


    .bottom-nav ul.my li:nth-child(1){
		background-image:url("../../../assets/images/home/main/my1.png");
		background-size:70%;
		background-repeat: no-repeat;
		background-position: center;
		}
    .bottom-nav ul.my.active li:nth-child(1){
		background-image:url("../../../assets/images/home/main/my2.png");
		background-size:70%;
		background-repeat: no-repeat;
		background-position: center;
		}

    .bottom-nav ul.fenlei li:nth-child(1){
		background-image:url("../../../assets/images/home/main/fenglei1.png");
		background-size:70%;
		background-repeat: no-repeat;
		background-position: center;
		}
    .bottom-nav ul.fenlei.active li:nth-child(1){
		background-image:url("../../../assets/images/home/main/fenglei2.png");
		background-size:70%;
		background-repeat: no-repeat;
		background-position: center;
		}
</style>
