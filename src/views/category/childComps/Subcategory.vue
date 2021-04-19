<template>
  <div>
      <div class="subcategory">
        <div v-for="(item, index) in subcategoryInfo" class="item">
          <a :href="item.link">
            <img class="item-img" :src="item.image" alt="">
            <span>{{item.title}}</span>
          </a>
        </div>
      </div>
      <slot name="tabControl"></slot>
      <goods-list :goods="showGoods"/>
  </div>

</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: "Subcategory",
    components: {
      Scroll,
      TabControl,
      GoodsList
    },
    props: {
      subcategoryInfo: {
        type: Array,
        default() {
          return []
        }
      },
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
      currentIndex: {
        type: String,
        default: 'pop'
      }
    },
    data() {
      return {
        // currentIndex: 'pop',
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentIndex]
      }
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentIndex = 'pop'
            break
          case 1:
            this.currentIndex = 'new'
            break
          case 2:
            this.currentIndex = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

    }
  }
</script>

<style scoped>

  .subcategory {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .item {
    width: 26%;
    padding: 5px;
    margin-left: 7%;
    font-size: 14px;
    text-align: center;
  }

  .item-img {
    width: 100%;
  }


</style>

