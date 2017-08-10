<template>
  <div class="songs-list">
    <ul class="list-wrapper">
      <li class="item" v-for="(item,index) in songsList">
        <div class="left" :class="rankCls(index)" v-show="isRank">{{index + 1}}</div>
        <div class="middle">
          <p class="name ellipsis">{{item.name}}<span v-show="item.alias">{{item.alias}}</span></p>
          <p class="disc">
            <span class="iconfont icon-sq" v-show="item.sq"></span>
            <span class="text ellipsis">{{item.artistsName}} - {{item.albumName}}</span>
          </p>
        </div>
        <div class="right">
          <span class="iconfont icon-play"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'songList',
    props: {
      songsList: {
        type: Array,
        default: []
      },
      isRank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      rankCls(index) {
        return index <= 2 ? 'active' : '';
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";
  .songs-list {
    .list-wrapper {
      .item {
        display: flex;
        align-items: center;
        height: 5.5rem;
        margin-left: 1rem;
        padding-right: 1rem;
        .border_1px();
        .left {
          flex: 0 0 3rem;
          width: 3rem;
          font-size: @font-size-medium-x;
          color: @color-text-l;
          &.active {
            color: @color-theme;
          }
        }
        .middle {
          flex: 1;
          .name {
            color: @color-text;
            font-size: @font-size-medium-x;
            & > span {
              padding-left: 0.5rem;
              color: @color-text-l;
            }
          }
          .disc {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
            font-size: @font-size-small-ss;
            .iconfont {
              margin-right: 0.5rem;
              font-weight: bold;
              font-size: @font-size-small;
              color: @color-theme;
            }
            .text {
              color: @color-text-l;
            }
          }
        }
        .right {
          .iconfont {
            font-size: @font-size-large-x;
            color: @color-text-l;
          }
        }
      }
    }
  }
</style>
