import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backtop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      imageListener: null
    }
  },
  mounted() {
    //better-scroll中的bug，需要等图片全部加载完成再计算高度，否则会有bug
    //现可用observeImage

    //3. 监听item中图片加载完成
    //利用防抖函数提升性能
    let refresh = debounce(this.$refs.scroll.refresh, 50)
    this.imageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.imageListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      backBtnIsShow: false
    }
  },
  methods: {
    //点击backTop图标回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
