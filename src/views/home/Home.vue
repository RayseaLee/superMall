<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
<!-- @click.native可监听组件的点击事件   -->
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import HomeFeatureView from "@/views/home/childComps/HomeFeatureView";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import {debounce} from "@/common/utils";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backtop/BackTop";

  export default {
    name: "Home",
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
        isShow: false,
        isPullUpLoad: false
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
      BackTop
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //better-scroll中的bug，现可用observeImage
      //3. 监听item中图片加载完成
      let refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       *事件监听相关的方法
       */
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
      },
      //点击backTop图标回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, -610)
      },
      //监听滚动,显示和隐藏backTop图标
      contentScroll(position) {
        position.y >= -1600 ? this.isShow = false : this.isShow = true
      },
      //上拉加载更多
      async pullingUp() {
        await this.getHomeGoods(this.currentType)
        console.log('上拉加载更多')
        this.$refs.scroll.finishPullUp()
        console.log('完成加载')
        // this.$refs.scroll.scroll.refresh()
        console.log('完成更新')
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
    padding-top: 44px;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
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
  /*  margin-top: 44px;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
