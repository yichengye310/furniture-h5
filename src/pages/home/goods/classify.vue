<template>
    <div class="page">
        <div class='search-header'>
            <div class='back'></div>
            <div class='search'>分类</div>
            <div class='back2'></div>
        </div>
        <div class='goods-main'>
            <div ref="scroll-classify" class='classify-wrap'>
                <div>
                    <div ref="item" :class="{'classify-item':true,active:item.active}"
                         v-for="(item,index) in classifys" :key="index"
                         @click="replacePage('/goods/classify/item?indexnumber='+index+'&categoryName='+item.categoryName,index)">
                        {{item.categoryName}}
                    </div>
                </div>
            </div>
            <div class='goods-content'>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapActions, mapState, mapMutations} from "vuex";
    import IScroll from '../../../assets/js/libs/iscroll';


    export default {
        data() {
            return {
                searchShow: {show: false},
            }
        },
        created() {
            console.log("classify.vue - created: " + JSON.stringify(this.$route.query));
            this.index = this.$route.query.indexnumber ? parseInt(this.$route.query.indexnumber || '0') : 0;
            this.getClassify({
                success: (res) => {
                    this.$nextTick(() => {
                        this.myScroll.refresh();
                        this.classifys && this.selectItem(this.index);
                        // yye
                        // if (this.classifys.length > 0 && this.index) {
                        //     //  let i = 0;
                        //     // for (i = 0; i < this.classifys.length; i++) {
                        //     //     this.index = i;
                        //     //     break;
                        //     // }
                        //     this.selectItem(this.index);
                        // } else {
                        //     this.selectItem(0);
                        // }
                    });
                }
            });

        },
        methods: {
            ...mapActions({
                getClassify: "goods/getClassify"
            }),
            ...mapMutations({
                SELECT_ITEM: "goods/SELECT_ITEM"
            }),
            goBack() {
                this.$router.go(-1);
            },
            scrollPreventDefault(e) {
                e.preventDefault();
            },
            selectItem(index) {
                let topHeight = this.$refs['item'][0].offsetHeight * index;
                let halfHeight = parseInt(this.$refs['scroll-classify'].offsetHeight / 3);
                let bottomHeight = parseInt(this.$refs['scroll-classify'].scrollHeight - topHeight);
                if (topHeight > halfHeight && bottomHeight > this.$refs['scroll-classify'].offsetHeight) {
                    this.myScroll.scrollTo(0, -topHeight, 1000, IScroll.utils.ease.elastic);
                }
                console.log("selectItem: " + 1);
                this.SELECT_ITEM({index: index})
                console.log("selectItem: " + 2);

            },
            replacePage(url, index) {
                //console.log("replacepage: " + 1);
                this.$router.replace(url);
                //console.log("replacepage: " + 2);
                this.selectItem(index);
            }
        },
        computed: {
            ...mapState({
                classifys: state => state.goods.classifys
            })
        },
        components: {},

        mounted() {
            console.log("mounted");
            document.title = this.$route.meta.title;
            this.$refs['scroll-classify'].addEventListener("touchmove", this.scrollPreventDefault);
            this.myScroll = new IScroll(this.$refs['scroll-classify'], {
                scrollX: false,
                scrollY: true,
                preventDefault: false
            });
        },
        beforeDestroy() {
            console.log("beforedestroy");
            this.$refs['scroll-classify'].removeEventListener("touchmove", this.scrollPreventDefault);
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .search-header {
        width: 100%;
        height: 1rem;
        background: #FFFFFF;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 1px solid #EFEFEF;
        padding: 0.28rem 0.68rem;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .search-header .search {
        width: 100%;
        text-align: center;
    }

    .goods-main {
        width: 100%;
        height: 92.5vh;
        display: flex;
        display: -webkit-flex;
    }

    .goods-main .classify-wrap {
        border-right: #F6F6F6 solid 1px;
        width: 2rem;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }

    .goods-main .classify-wrap .classify-item {
        color: rgb(154, 154, 154);
        width: 100%;
        min-height: 0.8rem;
        background-color: #FFFFFF;
        font-size: 0.28rem;
        text-align: center;
        /* line-height: 0.8rem; */
        overflow: hidden;
    }

    .goods-main .classify-wrap .classify-item.active {
        color: #000000;
        font-weight: 600;
    }

    .goods-main .goods-content {
        width: 80%;
        height: 100%;
    }
</style>
