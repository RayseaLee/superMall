<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar>
    </main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  import Detail from "@/views/detail/Detail";
  require('common/iconfont.js');

  export default {
    name: 'App',
    components: {
      MainTabBar,
      Detail
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
