<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc"
            class="discount-desc"
            :style="{backgroundColor: goods.discountBgColor}">
        {{goods.discountDesc}}
      </span>
    </div>
    <div class="info-columns">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .base-info {
    color: #999;
    padding: 10px 8px 0 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color:#222;
  }
  .info-price {
    padding: 10px 0;
    margin-bottom: 5px;
  }
  .new-price {
    color: var(--color-high-text);
    font-size: 25px;
  }
  .old-price {
    font-size: 14px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .discount-desc {
    position: relative;
    top: -5px;
    height: 20px;
    display: inline-block;
    padding: 1px 5px 1px 4px;
    margin-top: -20px;
    margin-left: 3px;
    color: #fff;
    border-radius:10px;
  }
  .info-columns {
    font-size: 12px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .info-services {
    display: flex;
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
  }
  .info-services img {
    position: relative;
    top: 2px;
    margin-right: 1px;
    width: 13px;
  }
  .info-services span {
    font-size: 13px;
    color: #333333;
  }
</style>
