<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/hot">
      <span class="tab-link">热歌榜</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tab'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .tab{
    display: flex;
    height: 4rem;
    background: #fff;
    .border_1px();
    .tab-item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .tab-link{
        font-size: @font-size-medium;
      }
      &.router-link-active{
        position: relative;
        .tab-link{
          color: @color-theme;
        }
        &:after{
          content: '';
          position: absolute;
          left: 30%;
          bottom: 0;
          width: 40%;
          height: 0.2rem;
          z-index: 2;
          background: @color-theme;
        }
      }
    }
  }
</style>
