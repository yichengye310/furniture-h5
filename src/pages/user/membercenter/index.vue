<template>
  <div id="membercenter">
    <div class="m-header">
      <div class="m-back" @click="$router.go(-1)">
        <img src="../../../assets/images/home/goods/back-baise.png" alt />
      </div>
      <div class="m-title">会员中心</div>
    </div>

    <div v-show="!ismember" style="width: 100%;height: 100%;">
      <img
        style="width: 100%;height: 90%;margin-bottom: 0.66rem;"
        src="../../../assets/images/user/member/huiyuan.png"
        alt
      />
      <div style="width: 100%;height:auto;display: flex;justify-content: center;" @click="goPage('/index')">
        <img
          style="width: 90%;height: 10%;margin-bottom: 0.66rem;"
          src="../../../assets/images/user/member/chongqian.png"
          alt
        />
      </div>

      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block">
            <div class="text">立即查看</div>
          </div>
        </div>
      </van-overlay>
    </div>

    <div v-show="ismember">
      <!--会员页标签 -->
      <div class="member-news">
        <div class="member-t">
          <div class="m-namenews">
            <div class="m-touxiang">
              <img src="../../../assets/images/common/qiaoli.png" alt />
            </div>
            <div class="m-username">nickname</div>
          </div>
        </div>

        <div class="member-icon">
          <div class="member-iconmain">
            <div class="member-iconmain-img">
              <img src="../../../assets/images/user/member/liwu.png" alt />
            </div>
            <div class="member-iconmain-text">专享好物</div>
          </div>
          <div class="member-iconmain">
            <div class="member-iconmain-img">
              <img src="../../../assets/images/user/member/99.png" alt />
            </div>
            <div class="member-iconmain-text">99元专区</div>
          </div>
          <div class="member-iconmain">
            <div class="member-iconmain-img">
              <img src="../../../assets/images/user/member/coupon.png" alt />
            </div>
            <div class="member-iconmain-text">优惠券</div>
          </div>
          <div class="member-iconmain">
            <div class="member-iconmain-img">
              <img src="../../../assets/images/user/member/kefu.png" alt />
            </div>
            <div class="member-iconmain-text">专属客服</div>
          </div>
        </div>
      </div>

      <!-- 会员页商品标题 -->
      <div class="m-tabar">
        <div :class="{Mtabar1:true,active:active}" @click="zhuanxiang()">专享好物</div>
        <div :class="{Mtabar2:true,active:!active}" @click="jiujiu()">99元专区</div>
      </div>
      <!-- 商品信息 -->
      <div class="m-shopthemain">
        <div class="m-shop">
          <div class="m-img">
            <img src="../../../assets/images/common/qiaoli.png" alt />
          </div>
          <div class="m-shopname">陶瓷陶瓷曹禺陶瓷陶瓷掏出</div>
          <div class="m-shopprice">
            <div>￥99</div>
          </div>
        </div>

        <div class="m-shop">
          <div class="m-img">
            <img src="../../../assets/images/common/qiaoli.png" alt />
          </div>
          <div class="m-shopname">陶瓷陶瓷曹禺陶瓷陶瓷掏出</div>
          <div class="m-shopprice">
            <div>￥99</div>
          </div>
        </div>

        <div class="m-shop">
          <div class="m-img">
            <img src="../../../assets/images/common/qiaoli.png" alt />
          </div>
          <div class="m-shopname">陶瓷陶瓷曹禺陶瓷陶瓷掏出</div>
          <div class="m-shopprice">
            <div>￥99</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { Overlay } from "vant";

Vue.use(Overlay);
export default {
  data() {
    return {
      active: false,
      ismember: false,
      show: true
    };
  },
  created() {},
  methods: {
    goPage(url) {
      this.$router.push(url);
    },
    zhuanxiang() {
      this.active = true;
      console.log("专享");
    },
    jiujiu() {
      this.active = false;
      console.log("99");
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      nickname: state => state.user.nickname
    })
  }
};
</script>

<style scoped>
#membercenter {
  width: 100%;
  height: 100%;
}
#membercenter .wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#membercenter .wrapper .block {
  width: 5.4rem;
  height: 6.8rem;
  background-image: url("../../../assets/images/user/member/chengweihuiyuan.png");
  background-size: 100% 100%;
  position: relative;
}
#membercenter .wrapper .block .text {
  width: 2.2rem;
  height: .68rem;
  position: absolute;
  left: 30%;
  bottom: 12%;
  text-align: center;
  line-height: .68rem;
  font-size: 0.26rem;
  letter-spacing: 0.05rem;
  color: #6d5e4c;
  background-color: rgba(255, 244, 236, 1);
  border-radius: 0.32rem;
  font-weight: bold;
  cursor: pointer;
}
/* 头部css */
.m-header {
  height: 1rem;
  width: 100%;
  background-color: #333333;
  display: flex;
  align-items: center;
  padding: 0 0.28rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.m-back {
  width: 0.14rem;
  height: 0.24rem;
}
.m-back img {
  width: 100%;
  height: 100%;
}
.m-title {
  width: 100%;
  color: #ffffff;
  text-align: center;
}
/* 信息部分css */
.member-news {
  margin-top: 1rem;
  width: 100%;
  height: 4.371rem;
  /* height:0.0235rem; */
  background-color: #333333;
}
.member-news .member-t {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
.member-news .member-t .m-namenews {
  width: 100%;
  margin: 0.3rem 0.282rem 0.22rem 0.282rem;
  height: 2.209rem;
  background-image: url("../../../assets/images/user/member/membercart.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.376rem;
}
.member-news .member-t .m-namenews .m-touxiang {
  width: 1.081rem;
  height: 1.081rem;
  margin-right: 0.376rem;
}
.member-news .member-t .m-namenews .m-touxiang img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.member-news .member-t .m-namenews .m-username {
  color: #664630;
  font-size: 0.3525rem;
}

.member-icon {
  width: 100%;
  height: auto;
  display: flex;
  text-align: center;
  align-items: center;
}
.member-icon .member-iconmain {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.member-icon .member-iconmain .member-iconmain-img {
  width: 100%;
  /* width:0.7755rem; */
  height: 0.7755rem;
}
.member-icon .member-iconmain .member-iconmain-img img {
  width: 0.7755rem;
  height: 100%;
}
.member-icon .member-iconmain .member-iconmain-text {
  width: 100%;
  color: #fef1c6;
  font-size: 0.235rem;
  margin-top: 0.235rem;
}

.m-tabar {
  background-color: #f7e5bb;
  width: 100%;
  height: 0.987rem;
  display: flex;
  text-align: center;
  margin-bottom: 0.2585rem;
}
.active {
  background-color: #ffffff;
}
.m-tabar div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.Mtabar1 {
  height: 100%;
  border-radius: 0 0.5rem 0 0;
}
.Mtabar2 {
  height: 100%;
  border-radius: 0.5rem 0 0 0;
}
.m-shopthemain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.3995rem 0.658rem 0.3995rem;
  box-sizing: border-box;
}
.m-shopthemain .m-shop {
  border: 0.3px solid rgba(204, 204, 204, 1);
  border-radius: 0.0705rem;
  width: 3.196rem;
  height: 4.23rem;
  margin: 0.1645rem 0.0705rem 0 0.0705rem;
}
.m-shopthemain .m-shop .m-img {
  width: 100%;
  height: 3.196rem;
}
.m-shopthemain .m-shop .m-img img {
  width: 100%;
  height: 100%;
}
.m-shopthemain .m-shop .m-shopname {
  margin: 0.141rem 0.141rem 0.1rem 0.141rem;
  width: auto;
  height: auto;
  color: #333333;
  font-size: 0.2585rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.m-shopthemain .m-shop .m-shopprice {
  width: auto;
  height: auto;
  color: #d7a762;
  font-size: 0.2585rem;
  background-image: url("../../../assets/images/home/main/cart1.png");
  background-position: right;
  background-repeat: no-repeat;
  background-size: 10%;
  margin: 0 0.3rem 0 0.1645rem;
  box-sizing: border-box;
}
</style>
