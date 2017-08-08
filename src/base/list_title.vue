<template>
  <div class="list-title">
    <p class="title ellipsis">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'listTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .list-title{
    margin: 1.8rem 0;
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0.2rem;
      height: 100%;
      background: @color-theme;
    }
    .title{
      margin-left: 1rem;
      line-height: 1.8rem;
      font-size: @font-size-medium-x;
    }
  }
</style>
