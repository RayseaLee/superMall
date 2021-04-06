<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button :is-checked="isSelectAll"
                    @click.native="checkAllClick"/>
      <span class="check-all-text">全选</span>
    </div>
    <div class="total">
      <span class="total-price">合计：
        <span>￥{{totalPrice}}</span>
      </span>
      <div class="total-button">
        <span v-if="amount === 0">结 算</span>
        <span v-else>结 算({{amount}})</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/common/checkbutton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      amount() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0){
          return false
        }
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkAllClick() {
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    display: flex;
    position: fixed;
    font-size: 13px;
    bottom: 50px;
    left: 0;
    right: 0;
    height: 50px;
    padding: 0 10px;
    background-color: #fff;
    border-top: 1px solid rgba(238, 238, 238, 0.99);
    justify-content: space-between;
    align-items: center;
  }

  .check-all {
    display: flex;
    align-items: center;
  }

  .check-all-text {
    margin-left: 2px;
  }
  .total {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .total-price{
    color: #333;
    margin-right: 5px;
  }
  .total-price span {
    color: orangered;
    margin-left: -8px;
  }
  .total-button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 36px;
    font-size: 14px;
    color: #fff;
    background-color: orangered;
    border-radius: 18px;
  }
</style>
