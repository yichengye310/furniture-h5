<template>
    <div ref="goods-classify-content" class="goods-content-main">
        <div v-show="goods.length>0">
            <div class='classify-name'>{{this.$route.query.categoryName}}</div>
            <div class='goods-wrap'>
                <div class='goods-items-wrap'
                     v-for="(item,index) in goods" :key="index"
                     @click="gotodetailshop($route.query.indexnumber,$route.query.categoryName,item.categoryID,item.categoryName,item)">
                    <ul>
                        <li>
                            <img src="../../../assets/images/common/lazyImg.jpg"
                                 :data-echo="item.categoryImg" alt=""/></li>
                        <li>{{item.categoryName}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-show="goods.length<=0" class="no-data">没有相关商品！</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import IScroll from '../../../assets/js/libs/iscroll';

    export default {
        data() {
            return {
                categoryTheName: '',
                leavendex: '',
            }
        },
        methods: {
            ...mapActions({
                getGoods: "goods/getGoods"
            }),
            scrollPreventDefault(e) {
                e.preventDefault();
            },
            init(indexnumber) {
                this.getGoods({
                    indexnumber: indexnumber, success: () => {
                        this.$nextTick(() => {
                            this.myScroll.refresh();
                            this.$utils.lazyImg();
                        })
                    }
                });
            },
            gotodetailshop(levelTwoCategoryID, name, isSpecialGoods, categoryName, item) {
                this.$router.push('/itemshop?levelTwoCategoryID=' +
                    levelTwoCategoryID + '&name=' + name +
                    '&isSpecialGoods=' + isSpecialGoods + '&categoryName=' + categoryName + '&levelThreeCategoryID=' + item.categoryID + '&index=0')
            }
        },
        computed: {
            ...mapState({
                goods: state => state.goods.goods
            })
        },
        created() {
            console.log("classify_item - created: " + JSON.stringify(this.$route.query));
            this.indexnumber = this.$route.query.indexnumber ? this.$route.query.indexnumber : "";
            this.leavendex = this.indexnumber
            this.init(this.indexnumber);
        },
        mounted() {
            this.$refs['goods-classify-content'].addEventListener("touchmove", this.scrollPreventDefault);
            this.myScroll = new IScroll(this.$refs['goods-classify-content'], {
                scrollX: false,
                scrollY: true,
                preventDefault: false
            });

            this.myScroll.on("scrollEnd", () => {
                this.$utils.lazyImg();
            })
        },
        beforeRouteUpdate(to, from, next) {
            // console.log(to.query.cid);
            this.init(to.query.indexnumber);
            next();
        },
        beforeDestroy() {
            this.$refs['goods-classify-content'].removeEventListener("touchmove", this.scrollPreventDefault);
        }
    }
</script>

<style scoped>
    .goods-content-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }

    .goods-wrap {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .classify-name {
        text-align: center;
        background: rgb(240, 240, 240);
        font-size: 0.28rem;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
    }

    .goods-wrap .goods-items-wrap {
        width: 33.3333%;
        height: auto;
        background-color: #FFFFFF;
        padding-top: 0.2rem;
        overflow: hidden;
    }

    .goods-wrap .goods-items-wrap ul {
        width: 100%;
        height: auto;
        float: left;
        margin-left: 0.5%;
        margin-right: 0.5%;
        margin-bottom: 0.2rem;
    }

    .goods-wrap .goods-items-wrap ul li:nth-child(1) {
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
        margin: 0 auto;
        text-align: center
    }

    .goods-wrap .goods-items-wrap ul li:nth-child(1) img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .goods-wrap .goods-items-wrap ul li:nth-child(2) {
        width: 90%;
        height: 0.8rem;
        font-size: 0.24rem;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 0.2rem;
    }
</style>
