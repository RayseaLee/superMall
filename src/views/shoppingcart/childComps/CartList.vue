<template>
    <scroll class="wrapper"
            :pull-up-load="true"
            ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"/>
    </scroll>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import {mapGetters} from "vuex";
  import CartListItem from "@/views/shoppingcart/childComps/CartListItem";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(["cartList"]),
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .wrapper{
    height: calc(100% - 44px - 50px);
    overflow: hidden;
  }
</style>
