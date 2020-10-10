<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      startX: 0,
      scrollY: true,
      scrollX: false,
      click: true,
      probeType: this.probeType, //设置实时监听
      pullUpLoad: this.pullUpLoad
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>

<style>
</style>
