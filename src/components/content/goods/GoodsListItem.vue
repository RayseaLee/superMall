<template>
  <div class="goods-item">
    <div class="goods-info">
      <img :src="goodsItem.show.img" alt="" @load="ImageLoad">
      <p class="title">{{goodsItem.title}}</p>
      <div>
        <span class="price"><span class="icon">￥</span>{{goodsItem.price}}</span>
        <span class="cfav">★{{goodsItem.cfav}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      //better-scroll中的bug，现可用observe-image
      ImageLoad() {
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    margin-top: 10px;
    background-color: #fff;
    width: 45%;
    border-radius: 5px;
    font-size: 13px;
  }

  .goods-info img{
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .goods-info div{
    margin-bottom: 5px;
  }
  .title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px 0 5px 5px;
  }
  .price{
    color: var(--color-high-text);
    padding-left: 3px;
    margin-top: 10px;
  }
  .icon{
    font-size: 12px;
  }
  .cfav{
    font-size: 12px;
    padding-left: 10px;
  }

</style>
