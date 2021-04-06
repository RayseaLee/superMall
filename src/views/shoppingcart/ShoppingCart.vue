<template>
  <div class="cart">
<!--  导航  -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
<!--  商品列表  -->
    <cart-list/>
<!--  底部汇总  -->
    <cart-bottom-bar/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import { mapGetters } from 'vuex'
  import cartList from "./childComps/CartList";
  import CartBottomBar from "@/views/shoppingcart/childComps/CartBottomBar";

  export default {
    name: "ShoppingCart",
    components: {
      NavBar,
      cartList,
      CartBottomBar
    },
    computed: {
      //数组形式
      // ...mapGetters(['cartLength']),

      //对象形式
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
