<template>
  <div class="loading">
    <div>加载中</div>
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .loading{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    z-index: 3;
    border-radius: 0.5rem;
    color: #ffffff;
    background: rgba(7,17,27,0.8);
    transform: translate3d(-50%, -50%, 0);
  }
</style>
