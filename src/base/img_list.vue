<template>
  <div class="img-list clearfix">
    <ul class="list-wrapper">
      <li class="item" v-for="item in songSheet">
        <div class="img">
          <img v-lazy="item.picUrl">
          <span class="iconfont icon-crown" v-show="item.highQuality"></span>
        </div>
        <p class="disc ellipsis-2">{{item.name}}</p>
        <div class="pos">
          <span class="iconfont icon-headset"></span>
          <p class="text">{{retNumber(item.playCount)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {conversion} from 'common/js/common'

  export default {
    name: 'imgList',
    props: {
      songSheet: {
        type: Array,
        default: []
      }
    },
    methods: {
      retNumber(number) {
        return conversion(number);
      }
    }
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
        position: relative;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        display: block;
        float: left;
        width: 33.33%;
        padding-left: 1px;
        padding-right: 1px;
        box-sizing: border-box;
        .img{
          position: relative;
          padding-top: 100%;
          & > img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          & > .iconfont{
            position: absolute;
            top: 0.7rem;
            left: 0.5rem;
            z-index: 2;
            font-size: @font-size-small;
            color: #e1b538;
          }
        }
        &:nth-child(3n - 2) {
          padding-left: 0;
          padding-right: 2px;
        }
        &:nth-child(3n) {
          padding-left: 2px;
          padding-right: 0;
        }
        .disc{
          font-size: @font-size-small;
          margin: 0.6rem;
          height: 3rem;
          overflow: hidden;
          line-height: 1.6rem;
        }
        .pos{
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          display: flex;
          font-size: 0;
          color: @color-background;
          .iconfont{
            font-size: @font-size-small;
          }
          .text{
            padding-left: 0.5rem;
            font-size: @font-size-small;
          }
        }
      }
    }
  }
</style>
