<template>
    <swiper>
      <swiper-item v-for="item in topImages"
                   class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {SwiperItem, Swiper} from "@/components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-item {
    height: 55vh;
    overflow: hidden;
  }
</style>
