<template>
    <div class='search-component' v-show="show.show">
        <div class='search-header'>
            <div class='close' @click="show.show=false"></div>
            <div class='search-wrap'>
                <div class='search-input-wrap'>
                    <input type="text" 
					class='search' 
					placeholder="请输入宝贝名称"
					v-model="keyword" @keyup.enter="goSearch()" />
                </div>
                <button type="button" class='search-btn' @click="goSearch()">搜索</button>
            </div>
        </div>
        <div class='search-main' v-if="historyKeywords.length>0">
            <div class='search-title-wrap'>
                <div class='search-title'>最近搜索</div>
                <div class='bin' @click="clearHistoryKeywords()"></div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item,index) in historyKeywords" :key="index" @click="goSearch(item)">{{item}}</div>
            </div>
        </div>
        <div class='search-main'>
            <div class='search-title-wrap'>
                <div class='search-title'>热门搜索</div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item,index) in hotKeywords" :key="index" 
				@click="goSearch(item.categoryName)">{{item.categoryName}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations,mapState,mapActions} from 'vuex';
    import { Dialog } from 'vant';
    export default {
        name: "my-search",
        data(){
            return {
                keyword:""
            }
        },
        props:{
            show:{
                type:Object,
				default:{}
            },
            isLocal:{
                type:Boolean,
                default: false
            },
			istypetolive:{
			    type:Boolean,
			    default: false
			}
        },
        created(){
            this.keywords=this.historyKeywords?this.historyKeywords:[];
            this.getHotKeyword();
			
        },
        computed:{
            ...mapState({
                historyKeywords:state=>state.search.historyKeywords,
                hotKeywords:state=>state.search.hotKeywords
            })
        },
        methods:{
            ...mapMutations({
                "SET_KEYWORDS":"search/SET_KEYWORDS",
                "CLEAR_KEYWORDS":"search/CLEAR_KEYWORDS"
            }),
            ...mapActions({
                "getHotKeyword":"search/getHotKeyword"
            }),
            goSearch(keyword){
                let tmpKeyword=keyword || this.keyword || "";
                if(tmpKeyword){
                    if(this.keywords.length>0){
                        for(let i=0;i<this.keywords.length;i++){
                            if(this.keywords[i]===tmpKeyword){
                                this.keywords.splice(i--,1);
                            }
                        }
                    }
                    this.keywords.unshift(tmpKeyword);
                    this.SET_KEYWORDS({historyKeywords:this.keywords})
                }
                this.show.show=false;
				
				
				
				
				// console.log(this.istypetolive)
				if(this.istypetolive === true){
					console.log(this.$route.query.livetitle)
					this.$router.push("/goods/search?keyword=" + tmpKeyword+'&livetitle='+this.$route.query.livetitle);
				}else if(this.isLocal){
                    this.$router.replace("/goods/search?keyword=" + tmpKeyword);
                }else {
                    this.$router.push("/goods/search?keyword=" + tmpKeyword);
                }
				
				
				
 			
				
            },
            clearHistoryKeywords(){
                if(this.historyKeywords.length>0){
                    Dialog.confirm({
                        title: '',
                        message: '确认要删除吗？'
                    }).then(() => {
                        this.CLEAR_KEYWORDS();
                    }).catch(()=>{

                    })
                }
            }
        }
    }
</script>

<style scoped>
    .search-component{width:100%;height:100%;position: fixed;z-index:99;left:0px;top:0px;background-color:#ffffff;}
    .search-component .search-header{
		width:100%;height:1rem;
		border-bottom:#EFEFEF solid 1px;
		display:flex;display:-webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		padding-left:0.3rem;
		padding-right:0.3rem;
		box-sizing: border-box;
		}
    .search-component .search-header .close{
		width:0.4rem;
		height: 0.7rem;
		background-image:url('../../assets/images/home/goods/back.png');
		background-size:45%;
		background-repeat: no-repeat;
		background-position: center;
		margin-right: 0.1rem;
		}
    .search-component .search-header .search-wrap{
		width:100%;
		height:0.6rem;
		border-radius: 0.1rem;
		display:flex;display:-webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		
		}
    .search-component .search-header .search-wrap .search-input-wrap{
		width:85%;
		height:100%;
		border-radius: 0.5rem;
		background: #F2F2F2;
	}
	.search-component .search-header .search-wrap .search-input-wrap input{
		background: #F2F2F2; 
	}
    .search-component .search-header .search-wrap .search{
		width:80%;height:93%;margin-left:0.2rem;font-size:0.28rem;}
    .search-component .search-header .search-wrap .search-btn{
		/* width:auto;
		height:0.5rem; */
		min-width:1rem;
		font-size: 0.32rem;
		background-color: #FFFFFF;
		border:0px none;outline: none;
		}

    .search-component .search-main{width:100%;margin-top:0.2rem;}
    .search-component .search-main .search-title-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;padding-left:0.4rem;padding-right:0.4rem;}
    .search-component .search-main .search-title-wrap .search-title{width:auto;font-size:0.28rem;}
    .search-component .search-main .search-title-wrap .bin{width:0.4rem;height:0.4rem;background-image:url('../../assets/images/common/bin.png');background-size:100%;background-repeat: no-repeat;background-position: center;}
    .search-component .search-main .search-keywords-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: flex-start;-webkit-justify-content: flex-start;padding-left:0.4rem;padding-right:0.4rem;margin-top:0.3rem;flex-wrap: wrap;-webkit-flex-wrap: wrap;}
    .search-component .search-main .search-keywords-wrap .keywords{width:26%;height:0.6rem;color:#717376;border:#EFEFEF solid 1px;border-radius: 0.64rem;font-size:0.28rem;text-align: center;overflow:hidden;line-height:0.6rem;margin-right:1.3%;margin-left:1.3%;margin-bottom:0.2rem;padding-left:0.1rem;padding-right:0.1rem;}

</style>
