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
      },
      bounceTop :{
        type: Boolean,
        default: true
      },
      bounceBottom :{
        type: Boolean,
        default: true
      },
      bounceLeft :{
        type: Boolean,
        default: true
      },
      bounceRight :{
        type: Boolean,
        default: true
      },

    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        //动态重新计算BetterScroll的容器大小
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        scrollY: true,
        scrollbar: true,
        momentum: true,
        observeDOM: true,
        observeImage: true,
        resizePolling: 60,
        HWCompositing: true,
        bounce: {
          top: this.bounceTop,
          bottom: this.bounceBottom,
          left: this.bounceLeft,
          right: this.bounceRight,
        }
      })
      //监听滚动事件
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
      //监听上拉加载事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
        console.log('完成上拉')
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
