<!--
  TabBar和TabBarItem的父组件，
  最后使用的组件
-->
<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <use slot="item-icon" xlink:href="#icon-zhuye"></use>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <use slot="item-icon" xlink:href="#icon-fenlei"></use>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shoppingcart">
      <use slot="item-icon" xlink:href="#icon-gouwuche"></use>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <use slot="item-icon" xlink:href="#icon-geren"></use>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
