<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
<!--    <div class="info-desc clear-fix">-->
<!--      <div class="start"></div>-->
<!--      <div class="desc">{{detailInfo.desc}}</div>-->
<!--      <div class="end"></div>-->
<!--    </div>-->
<!--    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>-->
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :key="index"
           @load="imgLoad"
           :src="item" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        //判断,所有的图片都加载完成后,那么进行一次回调就可以了
        if(++this.counter === this.imagesLength){
          this.$emit('imageLoad')
        }
      }
    },
    //watch监听某一个属性的变化
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .info-list img {
    width: 100%;
  }
</style>
