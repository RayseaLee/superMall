<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            :pull-up-load="true"
            :probe-type="3"
            @scroll="contentScroll"
            ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
<!--      由子组件emit过来的事件,需要在父组件中的对应子元素上进行监听-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendInfo"/>
    </scroll>
    <back-top @click.native="backClick" v-show="backBtnIsShow"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>
<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/detail";
  import {backTopMixin, itemListenerMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils";
  import {mapActions} from 'vuex'
  import Toast from "@/components/common/toast/Toast";

  export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        themeTopYs: [],
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.query.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取数据
        console.log(res)
        const data = res.result

        // 2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 5.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 6.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 7.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.获取推荐信息
      getRecommend().then(res => {
        console.log(res)
        this.recommendInfo = res.data.list
      })

      // 4.给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(44)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 50)
    },
    methods: {
      ...mapActions({
        addCart: 'addCart'
      }),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 200)
      },
      contentScroll(position) {
        //监听回到顶部按钮
        this.backBtnIsShow = position.y < -2000
        //监听滚动
        const positionY = -position.y + 44
        let length = this.themeTopYs.length
        for(let i = 0; i < length; i++) {
          if((this.currentIndex !== i) && ((i < length - 1 && positionY >= this. themeTopYs[i] &
            positionY < this. themeTopYs[i+1]) || (i === length - 1 && positionY >= this. themeTopYs[i]))){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2. 将商品添加到购物车里
        // this.$store.cartList.push(product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
      }

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.imageListener)
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    height: 100vh;
    z-index: 11;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
  .content {
    overflow: hidden;
    height: calc(100% - 44px);
  }
</style>
