<template>
  <div class="img-list clearfix">
    <ul class="list-wrapper">
      <li class="item" v-for="item in 6">
        <div class="img">
          <img src="./../common/image/default.png" alt="">
        </div>
        <p class="disc">谁在倾听，一叶知秋的美丽？</p>
        <div class="pos">
          <span class="iconfont icon-logo"></span>
          <p class="text">91万</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'imgList'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .img-list {
    width: 100%;
    overflow: hidden;
    .list-wrapper {
      font-size: 0;
      .item{
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
        display: block;
        float: left;
        width: 33.3%;
        padding-left: 1px;
        padding-right: 1px;
        box-sizing: border-box;
        .img{
          position: relative;
          padding-top: 100%;
          & > img{
            background: #ccc;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        &:first-child {
          padding-left: 0;
          padding-right: 2px;
        }
        &:last-child {
          padding-left: 2px;
          padding-right: 0;
        }
      }
    }
  }
</style>
