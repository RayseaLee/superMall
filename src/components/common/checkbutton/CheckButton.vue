<template>
  <span class="item-selector">
      <span v-if="!isChecked" class="unchecked"></span>
      <svg v-else class="checked" aria-hidden="true">
        <use xlink:href="#icon-checkbox-circle-line"></use>
      </svg>
  </span>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
  }
</script>

<style scoped>
  .item-selector {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .unchecked {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(102, 102, 102, 0.9);
    border-radius: 50%;
    margin: 1.5px;
  }
  .checked {
    width: 1.5em;
    height: 1.5em;
    fill: currentColor;
    overflow: hidden;
    /*color: rgba(102, 102, 102, 0.9);*/
    color: orangered;
  }
</style>
