<template>
  <div ref="wrapper" class="wrapper">
    <div class="tags-wrap cont" ref="cont">
      <div
        :class="{tags:true, active:status==='all'?true:false}"
        @click="$router.replace('/user/order?status=all')"
      >全部订单</div>
      <div
        :class="{tags:true, active:status==='0'?true:false}"
        @click="$router.replace('/user/order?status=0')"
      >待付款</div>
      <div
        :class="{tags:true, active:status==='1'?true:false}"
        @click="$router.replace('/user/order?status=1')"
      >待发货</div>
      <div
        :class="{tags:true, active:status==='2'?true:false}"
        @click="$router.replace('/user/order?status=2')"
      >待收货</div>
      <!-- <div
        :class="{tags:true, active:status==='3'?true:false}"
        @click="$router.replace('/user/order?status=3')"
      >待评价</div> -->
      <div
        :class="{tags:true, active:status==='3'?true:false}"
        @click="$router.replace('/user/order?status=3')"
      >已完成</div>
      <div
        :class="{tags:true, active:status==='4'?true:false}"
        @click="$router.replace('/user/order?status=4')"
      >退款/售后</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "order-tags",

  methods: {
    verScroll() {
      let width = 6 * 100; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.cont.style.width = (width * 2) / 100 + "rem"; // 修改滚动区域的宽度
      this.$refs.cont.style.top = 1 + "rem";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
  },
  props: {
    status: {
      type: String,
      default: "all"
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  overflow: hidden;
  height: 0.8rem;
}
.tags-wrap {
  width: 100vw;
  height: 0.8rem;
  background-color: #ffffff;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 2rem;
  /* border-bottom:#DCDCDC solid 1px; */
  display: flex;
  display: -webkit-flex;
}
.tags-wrap .tags {
  width: 25%;
  height: 100%;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.8rem;
}
.tags-wrap .tags.active {
  border-bottom: #000000 1px solid;
}
</style>