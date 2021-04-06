<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">

      <div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user-5-line"></use>
          </svg>
        </div>
        <span class="text">客服</span>
      </div>

      <div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-store-line"></use>
          </svg>
        </div>
        <span class="text">店铺</span>
      </div>

      <div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-star-smile-line"></use>
          </svg>
        </div>
        <span class="text">收藏</span>
      </div>

    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
    text-align: center;
  }
  .bar-left .text {
    font-size: 13px;
  }

  .icon {
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin: 3px 0;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>
