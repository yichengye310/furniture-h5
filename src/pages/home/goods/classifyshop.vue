<template>
    <div class="page">
        <div class='search-header'>
            <div @click="$router.go(-1)" class='search back'>
                {{name}}
            </div>
        </div>
        <div class='paixu'>
            <div :key='index' class="paixusty" v-for="(item,index) in paixuheader">
                <div :class="{
				active:item.active,
				}" @click="getpaixu(item,index)">{{item.name}}
                </div>
                <div :class="{
				active0:item.active0,
				active1:item.active1,
				active2:item.active2}" @click="getpaixujiage(item,index)"
                     style="width:0.3rem;height: 100%;
				z-index: 99;" v-show="item.active0 === true"></div>
            </div>
        </div>
        <div class='goods-main'>
            <div :key="index" @click="$router.push('/goods/details?productID='+item.productID)" class='goods-list'
                 v-for="(item,index) in searchData">
                <div class='image'>
                    <img :src="item.titleImg"/>
                </div>
                <div class='goods-content'>
                    <div class='goods-title'>{{item.productName}}</div>
                    <div class='price'>¥{{userType === '3'? (item.productStandards[0].tradePrice *.01).toFixed(2):(item.lowPrice*0.01).toFixed(2)}}</div>
                    <div class='xiaoliang'>已售{{item.browseNum}}</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import UpRefresh from '../../../assets/js/libs/uprefresh.js'
    import {mapActions, mapState} from 'vuex';
    import Vue from 'vue';
    import {DropdownItem, DropdownMenu} from 'vant';

    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    export default {
        data() {
            return {
                paixuheader: [{
                    name: '默认',
                    active: true, //字体加粗
                    active0: false,
                    active1: false,
                    active2: false
                },
                    {
                        name: '销量',
                        active: false, //字体加粗
                        active0: false, //默认箭头图片
                        active1: false, //向下箭头图片
                        active2: false
                    }, //向上箭头图片
                    {
                        name: '价格',
                        active: false, //字体加粗
                        active0: false, //默认箭头图片
                        active1: false, //向下箭头图片
                        active2: false
                    } //向上箭头图片
                ],
                value: 0,
                switch1: false,
                name: this.$route.query.categoryName ? this.$route.query.categoryName : '',
                pricepaixu: '',
                xiaoliangpaixu: ''
            }
        },
        created() {
            // console.log(this.searchData)
            if (this.$route.query.index === "1") {
                this.name = this.$route.query.name ? this.$route.query.name : '';
            }
            this.pullUp = new UpRefresh();
            this.initfor()
        },
        computed: {
            ...mapState({
                searchData: state => state.search.searchData,
                userType: state => state.user.userType
            })
        },
        methods: {
            ...mapActions({
                getSearch: "search/getSearch",
                getSearchPage: "search/getSearchPage",
            }),

            //单选
            getpaixu(item, index) {

                for (let i = 0; i < this.paixuheader.length; i++) {
                    if (this.paixuheader[i].active) {
                        this.paixuheader[i].active = false
                        this.paixuheader[i].active0 = false
                        break;
                    }
                }
                this.paixuheader[index].active = true;
                if (index === 0) {
                    this.paixuheader[0].active0 = false;
                } else {
                    this.paixuheader[index].active0 = true;
                }

            },
            getpaixujiage(item, index) {
                this.paixuheader[index].active1 = !this.paixuheader[index].active1;
                this.paixuheader[index].active2 = !this.paixuheader[index].active1;
                if (index === 0) {
                    //Toast('默认就是默认不准点')
                }
                if (index === 1) {
                    //销量排序
                    if (this.paixuheader[index].active2) {
                        this.xiaoliangpaixu = 1
                    }
                    if (this.paixuheader[index].active1) {
                        this.xiaoliangpaixu = 2
                    }
                    this.initfor()
                }
                if (index === 2) {
                    //价格排序
                    if (this.paixuheader[index].active2) {
                        this.pricepaixu = 1
                    }
                    if (this.paixuheader[index].active1) {
                        this.pricepaixu = 2
                    }
                    this.initfor()
                }

            },
            initfor() {

                let jsonParams = {
                    keyword: this.name,
                    pricepaixu: this.pricepaixu,
                    xiaoliangpaixu: this.xiaoliangpaixu,
                    levelThreeCategoryID: this.$route.query.levelThreeCategoryID,
                };
                let jsonParams2 = {
                    keyword: this.name,
                    pricepaixu: this.pricepaixu,
                    xiaoliangpaixu: this.xiaoliangpaixu,
                    levelTwoCategoryID: this.$route.query.levelTwoCategoryID,
                }

                //console.log(jsonParams2);
                if (this.$route.query.index === "0") {
                    this.foreth(jsonParams)
                }
                if (this.$route.query.index === "1") {
                    this.foreth(jsonParams2)
                }
            },
            foreth(jsonParams) {

                this.getSearch({
                    ...jsonParams,
                    success: (res) => {
                        var pages = res.data.pages;
                        this.pullUp.init({"curPage": 1, "maxPage": pages, "offsetBottom": 100},
                            (page) => {
                                jsonParams.page = page
                                this.getSearchPage({
                                    ...jsonParams,
                                    success: () => {
                                        this.$nextTick(() => {
                                            this.$utils.lazyImg();
                                        });
                                    }
                                })
                            })

                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                    }
                });
            },

        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        beforeRouteUpdate(to, from, next) {
            this.initfor()
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
    }

    .page .paixu {
        height: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.2rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
    }

    .page .paixu .paixusty {
        height: 100%;
        text-align: center;
        flex: 1;
        display: flex;
        align-items: center;
        line-height: 0.8rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
    }

    .page .paixu .paixusty div:nth-child(1) {
        height: 100%;
        text-align: center;
        flex: 1;
    }

    .page .paixu .active {
        color: #000000;
        font-weight: 600;
    }

    .page .paixu .active0 {
        background-image: url('../../../assets/images/home/paixu/tobottom.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 60%;
    }

    .page .paixu .active1 {
        background-image: url('../../../assets/images/home/paixu/tobottom1.png');
        background-repeat: no-repeat;
        background-position: right;
        background-size: 60%;
    }

    .page .paixu .active2 {
        background-image: url('../../../assets/images/home/paixu/tobottom2.png');
        background-repeat: no-repeat;
        background-position: right;
        background-size: 60%;
    }


    .search-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #F7F6F6;
        padding: 0 0.3rem;
        box-sizing: border-box;
    }

    .search-header .back {
        width: 100%;
        height: 1rem;
        text-align: center;
        /* width:0.4rem;
        height:0.6rem; */
        line-height: 1rem;
        background-image: url('../../../assets/images/home/goods/back.png');
        background-repeat: no-repeat;
        background-position: left;
        background-size: 2.5%;
    }

    .search {
        /* line-height: 1rem;
        text-align: center;
        height: 1rem;
        width:100%;
        z-index:1; */
    }

    .van-dropdown-menu {
        height: 0.6rem;
    }

    .goods-main {
        width: 100%;
        height: auto;
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.24rem;
        box-sizing: border-box;
    }

    .goods-main .goods-list {
        background: #FFFFFF;
        width: 48%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        margin: 0 0.07rem;
        box-sizing: border-box;
        margin-bottom: 0.14rem;
        border: solid 1px #F6F6F6;
        border-radius: 0.2rem;
        /* border-bottom: solid 1px #cccccc; */
    }

    .goods-main .goods-list .image {
        width: 3.5rem;
        height: 3.5rem;
        /* margin-left: 0.1rem; */
        overflow: hidden;
        text-align: center;

    }

    .goods-main .goods-list .image img {
        width: 100%;
        height: 100%;
        /* max-height: 100%;
        max-height: 100%; */
    }

    .goods-main .goods-list .goods-content {
        width: 100%;
        height: auto;
    }

    .goods-main .goods-list .goods-title {
        width: 100%;
        height: auto;
        font-size: 0.28rem;
        overflow: hidden;
        padding: 0 0.1rem;
        box-sizing: border-box;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

    }


    .goods-main .goods-list .price {
        padding: 0 0.1rem;
        box-sizing: border-box;
        font-size: 0.32rem;
        color: #F93036;
        margin-top: 0.1rem;
    }

    .goods-main .goods-list .xiaoliang {
        font-size: 0.16rem;
        color: #7B7B7B;
        background: #F6F6F6;
        text-align: center;
    }
</style>
