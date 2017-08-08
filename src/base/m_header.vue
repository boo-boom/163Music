<template>
  <div class="m-header">
    <div class="left">
      <span class="iconfont icon-logo"></span>
      <p class="name">网易云音乐</p>
    </div>
    <div class="right">下载APP</div>
  </div>
</template>

<script>
  export default {
    name: 'mHeader'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .m-header{
    display: flex;
    align-items: center;
    height: 6.4rem;
    padding: 0 1rem;
    background: @color-theme;
    color: @color-background;
    .left{
      flex: 1;
      display: flex;
      font-size: 0;
      .iconfont{
        font-size: 2.4rem;
        padding-right: 0.5rem;
      }
      .name{
        font-size: 2rem;
        margin-top: 0.2rem;
      }
    }
    .right{
      box-sizing: border-box;
      font-size: 1.5rem;
      padding: 0.7rem 1rem;
      .border_full_1px(@color-background,1.75rem,after);
    }
  }
</style>
