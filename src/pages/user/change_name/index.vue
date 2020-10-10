<template>
    <div class="page">
        <SubHeader title="修改昵称"></SubHeader>
        <div class="main">
            <div class="cellphone-wrap">
                <div class="cellphone tubiaoz">
                    <input placeholder="请输入昵称" type="text" maxlength="12" v-model="nickname"/>
                </div>
            </div>

            <div @click="submit()" class='sure-btn'>完成</div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {Switch, Toast} from "vant";
    import SubHeader from "../../../components/sub_header";
    import axios from "axios";

    Vue.use(Toast);
    Vue.use(Switch);
    export default {
        data() {
            return {
                nickname: localStorage['nickname'] ? localStorage['nickname'] : "",
            };
        },
        components: {
            SubHeader
        },
        created() {

        },
        methods: {
            submit() {
                axios({
                    url: this.$config.baseApi + "/user/changeName",
                    methods: "get",
                    params: {userID: localStorage['uid'], changedName: this.nickname}
                }).then(res => {

                    if (res.status === 200) {
                        Toast(res.data.message);
                        // console.log(res)
                        localStorage['nickname'] = res.data.data.userName
                        this.nickname = res.data.data.userName
                        this.$router.go(-2);
                    } else {
                        Toast(res.data.message);
                        this.$router.go(-1);
                    }

                })
            }
        },
        beforeDestroy() {

        }
    };
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
    }

    .main {
        width: 100%;
        padding: 1.4rem 0.6rem;
        box-sizing: border-box;
    }

    .tubiaoz {
        display: flex;
        align-items: center;
    }

    .tubiaoz .tubiao {
        width: 0.32rem;
        height: 0.38rem;
    }

    .tubiaoz .tubiao img {
        width: 100%;
        height: 100%;
    }

    .member-img {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.74rem;
    }

    .member-img .img {
        width: 1rem;
        height: 1rem;
    }

    .member-img .img img {
        width: 100%;
        height: 100%;
    }

    .cellphone-wrap {
        width: 90%;
        height: 0.84rem;
        margin: 0 auto;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        margin-top: 0.4rem;
    }

    .cellphone-wrap .cellphone {
        width: 100%;
        height: 100%;
        border-bottom: #efefef solid 1px;
        border-radius: 2px;
    }

    .cellphone-wrap .cellphone input,
    .code-wrap input,
    .password-wrap .password input {
        width: 92%;
        height: 95%;
        font-size: 0.28rem;
        padding-left: 0.2rem;
    }

    .cellphone-wrap .code-btn {
        width: 35%;
        height: 0.34rem;
        color: #717376;
        border: #eaeaea solid 1px;
        /* border-radius: 1rem; */
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        padding: 0.14rem 0.22rem;
    }

    .cellphone-wrap .code-btn.success {
        background: #ffffff;
        border: 1px solid #000000;
        color: #000000;
    }

    .cellphone-wrap2 {
        display: flex;
        align-items: center;
    }

    .code-wrap {
        width: 90%;
        height: 0.84rem;
        margin: 0 auto;
        border-radius: 2px;
        border-bottom: #efefef solid 1px;
        margin-top: 0.4rem;
    }

    .password-wrap {
        width: 90%;
        height: 0.84rem;
        margin: 0 auto;
        border-radius: 2px;
        border-bottom: #efefef solid 1px;
        margin-top: 0.4rem;
        display: flex;
        display: -webkit-flex;
    }

    .password-wrap .password {
        width: 80%;
        height: 100%;
    }

    .password-wrap .switch-wrap {
        width: 20%;
    }

    .sure-btn {
        width: 85%;
        height: 0.8rem;
        margin: 0 auto;
        background: #000000;
        font-size: 0.36rem;
        color: #ffffff;
        line-height: 0.8rem;
        text-align: center;
        margin-top: 0.4rem;
        border-radius: 0.5rem;
    }

    .fastreg-wrap {
        width: 85%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size: 0.24rem;
        margin: 0 auto;
        margin-top: 0.3rem;
    }

    .fastreg-wrap img {
        width: 0.32rem;
        height: 0.32rem;
        vertical-align: middle;
    }
</style>
