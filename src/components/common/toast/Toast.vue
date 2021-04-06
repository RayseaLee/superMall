<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=2000) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    /*display: inline;*/
    position: fixed;
    height: 26px;
    line-height: 26px;
    top: 80%;
    left: 50%;
    color: #fff;
    transform: translate(-50%);
    /*animation:fadeout 2s 2s;*/
    padding: 0 10px;
    z-index: 999;
    border-radius: 15px;
    background-color: rgba(0,0,0,.45);
  }
  /*@keyframes fadeout {*/
  /*  from {*/
  /*    display: inline;*/
  /*  }*/
  /*  to {*/
  /*    display: none;*/
  /*  }*/
  /*}*/
</style>
