<template>
    <scroll class="wrapper"
            :bounce-top="false"
            :bounce-bottom="false"
            :pull-up-load="true">
        <div v-for="(item, index) in SideNavBarInfo"
             class="nav-bar-item"
             @click="itemClick(item, index)"
             :class="{active: index === currentIndex}">
          <span>
            {{item.title}}
          </span>
        </div>
    </scroll>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: "SideNavBar",
    components: {
      Scroll
    },
    props: {
      SideNavBarInfo: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(item, index) {
        this.currentIndex = index
        // console.log(item.maitKey, item.miniWallkey)
        this.$emit('itemClick', item)
      }
    }
  }
</script>

<style scoped>

  .wrapper {
    position: absolute;
    width: 26%;
    top: 44px;
    left: 0;
    bottom: 49px;
    overflow: hidden;
    background-color: #f6f6f6;
    z-index: 1;
  }

  .nav-bar-item {
    box-sizing: content-box;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }

  .active {
    background-color: #fff;
    color: var(--color-high-text);
    border-left: 2px solid var(--color-high-text);
  }
</style>
