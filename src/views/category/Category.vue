<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <side-nav-bar :side-nav-bar-info="this.sideNavBarInfo"
                  @itemClick="itemClick"/>
    <tab-control :titles="['综合', '销量', '新品']"
                 ref="tabControl1"
                 @tabClick="tabClick"
                 class="tab-control1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll">
      <subcategory :subcategory-info="this.subcategoryInfo"
                   :goods="this.goods"
                   :current-index="this.currentIndex">
        <tab-control :titles="['综合', '销量', '新品']"
                     ref="tabControl2"
                     @tabClick="tabClick"
                     slot="tabControl"/>
      </subcategory>

    </scroll>
  </div>
</template>

<script>
  import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";
  import NavBar from "@/components/common/navbar/NavBar";
  import SideNavBar from "@/views/category/childComps/SideNavBar";
  import Subcategory from "@/views/category/childComps/Subcategory";
  import TabControl from "@/components/content/tabControl/TabControl";
  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: "Category",
    components: {
      NavBar,
      SideNavBar,
      Subcategory,
      Scroll,
      TabControl
    },
    data() {
      return {
        sideNavBarInfo: [],
        subcategoryInfo: [],
        isTabFixed: false,
        currentIndex: 'pop',
        maitKey: 3627,
        miniWallkey: 10062603,
        goods: {
          pop: [],
          new: [],
          sell: [],
        }
      }
    },
    created() {
      getCategory().then(res => {
        this.sideNavBarInfo = res.data.category.list
        return getSubcategory(this.maitKey)
      }).then(res => {
        this.subcategoryInfo = res.data.list
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentIndex = 'pop'
            break
          case 1:
            this.currentIndex = 'new'
            break
          case 2:
            this.currentIndex = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      itemClick(item) {
        //获取对应的key值
        this.maitKey = item.maitKey
        this.miniWallkey = item.miniWallkey
        //请求不同key值的数据
        this.getSubcategory()
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
        this.$refs.scroll.scrollTo(0, 0, 50)

      },
      contentScroll(position) {
        console.log(position.y)
        this.isTabFixed = -position.y > this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl2.$el.offsetTop)
      },
      getSubcategory() {
        getSubcategory(this.maitKey).then(res => {
          this.subcategoryInfo = res.data.list
        })
      },
      getCategoryDetail(type) {
        getCategoryDetail(this.miniWallkey, type).then(res => {
          console.log(res)
          this.goods[type] = res
        })
      },
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    width: 74%;
    top: 44px;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    background-color: #fff;
  }
  .category {
    position: relative;
    height: 100vh;
  }
  .category-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control1 {
    width: 74%;
    position: fixed;
    top: 44px;
    right: 0;
    z-index: 1;
  }
</style>
