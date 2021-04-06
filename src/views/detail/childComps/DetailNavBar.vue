<template>
  <nav-bar>
    <div slot="left" class="left" @click="backClick">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrow-left-s-line"></use>
      </svg>
    </div>
    <div slot="center" class="center">
      <span v-for="(item, index) in title"
            @click="titleClick(index)"
            :class="{active: currentIndex === index}">
        {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .left{
    padding-top: 7px;
  }
  .center{
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;
  }
  .icon{
    width: 1em;
    height: 1em;
    font-size: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
