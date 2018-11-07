<template>
    <div class="hello">
      授权失败
      <a href="https://login.alibaba.com/">重新授权</a>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {}
    }
</script>
<style scoped>
  .hello{
   position: fixed;
    top: 0;
    left:0;
    width:100%;
    height:100%;
    background: #FFFFFF;
    z-index: 100000;
  }
</style>
