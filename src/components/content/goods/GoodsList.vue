<template>
  <div>
    {{goods}}
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
