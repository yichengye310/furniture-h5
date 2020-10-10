<template>
    <div class="page">
        <SubHeader :title="headerTitle" class='heardertitle'></SubHeader>
        <!-- <Scroll class="content"> -->
        <OrderTags :status="status" class='heardertitle'></OrderTags>
        <!-- </Scroll> -->

        <div class='main'>
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    import SubHeader from "../../../components/sub_header";
    import OrderTags from "../../../components/order_tags";
    // import Scroll from "../../../components/Scroll/Scroll.vue"
    export default {
        name: "my-order",
        data() {
            return {
                status: this.$route.query.status ? this.$route.query.status : "all",
                headerTitle: "全部订单"
            }
        },
        components: {
            SubHeader,
            OrderTags,
            // Scroll
        },
        methods: {
            getTitle() {
                switch (this.status) {
                    case "all":
                        this.headerTitle = "全部订单";
                        document.title = this.headerTitle;
                        break;
                    case "0":
                        this.headerTitle = "待付款";
                        document.title = this.headerTitle;
                        break;
                    case "1":
                        this.headerTitle = "待发货";
                        document.title = this.headerTitle;
                        break;
                    case "2":
                        this.headerTitle = "待收货";
                        document.title = this.headerTitle;
                        break;
                    case "3":
                        this.headerTitle = "待评价";
                        document.title = this.headerTitle;
                        break;
                    case "4":
                        this.headerTitle = "退款/售后";
                        document.title = this.headerTitle;
                        break;
                    default:
                        this.headerTitle = "全部订单";
                        document.title = this.headerTitle;
                        break;
                }
            }
        },
        mounted() {
            this.getTitle();
        },
        beforeRouteUpdate(to, from, next) {
            this.status = to.query.status;
            this.getTitle();
            next();
        },
        created() {
            this.$utils.safeUser(this);
        }
    }
</script>

<style scoped>

    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #FFFFFF;
    }

    .main {
        width: 100%;
        padding-top: 1rem;
    }

    .content {
        height: 100vh;
        overflow: hidden;
    }

</style>
