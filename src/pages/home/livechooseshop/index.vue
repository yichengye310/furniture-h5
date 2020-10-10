<template>
    <div class='page'>
        <div class='search-top'>
            <div class='search-header'>
                <div @click="gotolivezheshop()" class='back'></div>
                <div @click="searchShow.show=true" class='search-wrap'>
                    <div class='search-icon'></div>
                    <div class='search-text'>
                        <input class='search'
                               placeholder="请输入宝贝名称"
                               type="text"
                               v-model="keyword"/>
                    </div>
                </div>
                <div @click="gotolivezheshop()" class='screen-btn'>选择</div>
            </div>

        </div>
        <div class='goods-main'>
            <div :key="index" @click="liveto(index)"
                 class='goods-list'
                 v-for="(item,index) in searchData">
                <div :class="{'select-btn':true,'active':item.istochoose}"></div>
                <div class='image'>
                    <img
                            :data-echo="item.titleImg"
                            src="../../../assets/images/common/lazyImg.jpg"/>
                </div>
                <div class='goods-content'>
                    <div class='goods-title'>{{item.productName}}</div>
                    <div class='price'>¥{{(item.lowPrice*0.01).toFixed(2)}}</div>

                </div>
            </div>
            <div class="no-data" v-show="searchData.length<=0">没有相关商品！</div>
        </div>
        <my-search :isLocal="true" :istypetolive='true' :show="searchShow"></my-search>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import MySearch from '../../../components/search';
    import UpRefresh from '../../../assets/js/libs/uprefresh';

    export default {
        name: "goods-search",
        data() {
            return {
                keyword: this.$route.query.keyword ? this.$route.query.keyword : "",
                searchShow: {show: false},
                isPriceOrder: false,
                isSalesOrder: false,
                isScreen: false,
                isClassify: false,

            }
        },
        components: {
            MySearch
        },
        computed: {
            ...mapState({
                searchData: state => state.search.searchData,

            })
        },
        created() {
            this.otype = "all";
            this.pullUp = new UpRefresh();
            this.init();
            let jsonParams = {keyword: this.keyword};
            this.getSearch({
                ...jsonParams, success: (res) => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                    // console.log(res)
                    this.pullUp.init({"curPage": 1, "maxPage": res.data.pages, "offsetBottom": 100}, (page) => {
                        let jsonParams = {keyword: this.keyword, page: page};
                        this.getSearchPage({
                            ...jsonParams,
                            success: (res) => {
                                this.$nextTick(() => {
                                    this.$utils.lazyImg();
                                });
                            }
                        })
                    });
                }
            });

        },
        mounted() {
            // this.$refs['screen'].addEventListener("touchmove",this.disableScreenTochmove);
            // this.myScroll=new IScroll(this.$refs['screen'], {
            //     scrollX : false,
            //     scrollY : true,
            //     preventDefault : false
            // });
        },
        methods: {
            ...mapActions({
                getSearch: "search/getSearch",
                getSearchPage: "search/getSearchPage",
            }),
            ...mapMutations({
                SET_PARAMS: "search/SET_PARAMS",
                "SET_LIVE_SHOP": "live/SET_LIVE_SHOP",
            }),

            liveto(w) {
                this.searchData[w].istochoose = !this.searchData[w].istochoose
            },
            gotolivezheshop() {
                let livetheshop = []
                for (let i = 0; i < this.searchData.length; i++) {
                    if (this.searchData[i].istochoose === true) {
                        livetheshop.push(this.searchData[i])
                    }
                }
                // console.log(this.$route.query.livetitle)
                this.SET_LIVE_SHOP({livetheshop: livetheshop});
                localStorage['liveshoplength'] = livetheshop.length;
                // this.$router.go(-1)
                this.$router.push('/live?active=3')
            },
            init() {
                let jsonParams = {keyword: this.keyword};
                this.getSearch({
                    ...jsonParams, success: (res) => {
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                        this.pullUp.init({"curPage": 1, "maxPage": res.data.pages, "offsetBottom": 100}, (page) => {
                            let jsonParams = {keyword: this.keyword, page: page};
                            this.getSearchPage({
                                ...jsonParams,
                                success: (res) => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                    });
                                }
                            })
                        });
                    }
                });
            },
            //确认搜索
            sureSubmit() {
                this.isScreen = false;
                this.SET_PARAMS();
                this.init();
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.keyword = to.query.keyword;
            this.isPriceOrder = false;
            this.otype = "all";
            this.isSalesOrder = false;
            this.init();
            next();
        },
        beforeDestroy() {
            this.pullUp.uneventSrcoll();
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
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }

    .search-header .back {
        width: 0.4rem;
        height: 0.7rem;
        background-image: url('../../../assets/images/home/goods/back.png');
        background-size: 45%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .search-header .search-wrap {
        width: 4.8rem;
        background: #F2F2F2;
        height: 0.6rem;
        border-radius: 0.5rem;
        margin-left: 0.2rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .search-header .search-wrap .search-icon {
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("../../../assets/images/common/search.png");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        margin-left: 0.1rem;
        margin-right: 0.2rem;
    }

    .search-header .search-wrap .search-text {
        width: 100%;
        height: auto;
        font-size: 0.32rem;
    }

    .search-header .search-wrap .search-text input {
        width: 85%;
        height: 100%;
        border-radius: 0.5rem;
        background: #F2F2F2;
    }


    .search-header .screen-btn {
        width: 0.8rem;
        height: 0.4rem;
        color: #333333;
        margin-left: 0.2rem;
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
        margin-top: 1rem;
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
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        overflow: hidden;
        margin-bottom: 0.4rem;

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
        padding: 0.5rem 0;
        width: 67%;
        height: 98%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        box-sizing: border-box;
        /* line-height: 1rem; */
        border-bottom: solid 1px rgb(154, 154, 154, 0.1);
    }

    .goods-main .goods-list .goods-title {
        width: 95%;
        height: 0.8rem;
        font-size: 0.28rem;
        overflow: hidden;
    }

    .goods-main .goods-list .price {
        font-size: 0.32rem;
        color: #F93036;
        margin-top: 0.1rem;
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
