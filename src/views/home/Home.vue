<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 v-show="isTabFixed"
                 class="tab-control1"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

<!-- @click.native可监听组件的点击事件   -->
    <back-top @click.native="backClick" v-show="backBtnIsShow"/>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import HomeFeatureView from "@/views/home/childComps/HomeFeatureView";
  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import {backTopMixin, itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Home",
    //混入
    mixins: [itemListenerMixin, backTopMixin],
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        currentIndex: 0,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //活跃状态
    activated() {
      //进行图片加载完成的监听，防止高度计算错误导致不能滑动
      this.$bus.$on('itemImageLoad', this.imageListener)
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    //不活跃状态
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImageLoad', this.imageListener)
    },
    methods: {
      /**
       *事件监听相关的方法
       */
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      //监听滚动,显示和隐藏backTop图标
      contentScroll(position) {
        this.backBtnIsShow = position.y < -2000
        this.isTabFixed = -position.y > this.tabOffsetTop
        console.log(this.tabOffsetTop)
      },
      //上拉加载更多
      pullingUp() {
        this.getHomeGoods(this.currentType)
        console.log('上拉加载更多')
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      //根据索引返回商品信息列表
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    /*viewport height视口高度 100vh就是100%视口高度*/
    height: 100vh;
    /*padding-top: 44px;*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  .tab-control1 {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
