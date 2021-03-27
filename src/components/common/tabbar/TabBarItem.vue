<!--
  TabBarItem时TabBar中单个item
-->
<template>
  <div class="tab-bar-item" :style="activeStyle" @click="itemClick()">
    <svg class="icon" aria-hidden="true">
      <slot name="item-icon"></slot>
    </svg>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    /*
     父传子通信
      1.路由信息
      2.活跃状态颜色信息
     */
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'hotpink'
      }
    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      //活跃(点击)状态
      isActive() {
        // return this.$route.path == this.path
        return this.$route.path.includes(this.path)
      },
      //动态样式
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        if(this.path != this.$route.path){
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .icon {
    width: 1em;
    height: 1em;
    font-size: 1.4em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-top: 3px;
  }
</style>
