<template>
  <div id="hy-swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="swiper">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      //轮播的时延
      interval: {
        type: Number,
        default: 3000
      },
      //动画时间
      animDuration: {
        type: Number,
        default: 300
      },
      //展示小白圆点
      showIndicator: {
        type: Boolean,
        default: true
      },
      //滑动的距离
      moveRatio: {
        type: Number,
        default: 0.1
      },
    },
    data() {
      return {
        slideCount: 0,
        currentIndex: 1,
        showIndictor: true,
        totalWidth: 0,
        swiperStyle: {},
        scrolling: false,
      }
    },
    mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.handleDom()
          this.startTimer()
        })
      }, 1000)
    },
    methods: {
      /**
       * 操作DOM, 在DOM前后添加Slide
       */
      handleDom() {
        //1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper')
        let slidersEls = document.getElementsByClassName('slide')
        //2.保存个数
        this.slideCount = slidersEls.length
        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          //在最前面添加一张和最后一张同样的图片
          //在最后面添加一张与第一张同样的图片
          let cloneFirst = slidersEls[0].cloneNode(true)
          let cloneLast = slidersEls[this.slideCount - 1].cloneNode(true)
          swiperEl.insertBefore(cloneLast, slidersEls[0])
          swiperEl.appendChild(cloneFirst)
          this.totalWidth = swiperEl.offsetWidth
          this.swiperStyle = swiperEl.style
        }
        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },
      /**
       * 定时器操作
       */
      /**
       * 开始计时
       */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++
          this.scrollContent(-this.currentIndex * this.totalWidth)
        }, this.interval)
      },
      /**
       * 停止计时
       */
      stopTimer() {
        window.clearInterval(this.playTimer)
      },
      /**
       * 滚动到正确的位置
       */
      scrollContent(currentPosition) {
        //1.设置正在滚动
        this.scrolling = true
        //2.开始滚动动画
        this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
        //3.设置滚动位置
        this.setTransform(currentPosition)
        //4.判断滚动到的位置
        this.checkPosition()
        //5.滚动完成
        this.scrolling = false
      },
      /**
       * 设置滚动的位置
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
      },
      /**
       * 校验正确的位置
       */
      checkPosition() {
        //使用定时器this.animDuration时间后执行判断
        //可让最后一张转至第一张时有动画效果
        window.setTimeout(() => {
          if(this.currentIndex >= this.slideCount+1){
            //到达最后一张时，将index设为第一张的index
            this.currentIndex = 1
            //设置无动画
            this.swiperStyle.transition = '0ms'
            this.setTransform(-this.currentIndex * this.totalWidth)
          }else if(this.currentIndex <= 0){
            //在第一张往右滑动时，将index设置为最后一张的index
            this.currentIndex = this.slideCount
            //设置无动画
            this.swiperStyle.transition = '0ms'
            this.setTransform(-this.currentIndex * this.totalWidth)
          }
        }, this.animDuration)
      },
      /**
       * 滑动事件处理
       */
      touchStart(event) {
        //如果正在滚动不可以滑动
        if(this.scrolling){
          return
        }
        //暂停计时器
        this.stopTimer()
        //记录开始滑动的位置
        this.startX = event.touches[0].pageX
      },
      touchMove(event) {
        //计算出滑动的距离
        this.currentX = event.touches[0].pageX
        this.distance = this.currentX - this.startX
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;
        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },
      touchEnd() {
        //获取滑动的距离
        let currentMove = Math.abs(this.distance)
        if(this.distance === 0){
          return
        }else if(this.distance > 0 && currentMove > this.totalWidth*this.moveRatio){
          //往右滑
          this.currentIndex--
        }else if(this.distance < 0 && currentMove > this.totalWidth*this.moveRatio){
          //往左滑
          this.currentIndex++
        }
        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);
        //开启计时器
        this.startTimer()
      }
    },
  }

</script>

<style scoped>
  #hy-swiper{
    position: relative;
    overflow: hidden;
  }
  .swiper {
    display: flex;
  }
  .indicator{
    position: absolute;
    display: flex;
    width: 100%;
    height: 8px;
    bottom: 8px;
    justify-content: center;
  }
  .indi-item{
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    /*text-align: center;*/
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }

</style>
