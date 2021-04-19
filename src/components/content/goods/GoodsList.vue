<template>
  <div class="goods">
    <goods-list-item v-for="goodsItem in goods"
                     :goods-item="goodsItem"/>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      },
      // backgroundColor: {
      //   type: String,
      //   default() {
      //     return [];
      //   }
      // }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    background-color: #eee;
    justify-content: space-evenly;
    /*column-count: 2;*/
    /*column-gap: 10px;*/
    /*padding: 0 10px 0 10px;*/
  }
</style>
