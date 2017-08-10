<template>
  <transition name="slide">
    <div class="play-list" v-if="playObj" @touchmove.stop>
      <div class="header">
        <div class="icon" @click="back"><span class="iconfont icon-back"></span></div>
      </div>
      <div class="top">
        <div class="bg" :style="bgStyle"></div>
        <div class="left">
          <img v-lazy="playObj.picUrl" alt="">
        </div>
        <div class="right">
          <p class="name">{{playObj.name}}</p>
          <div class="disc">
            <img v-lazy="playObj.creator.avatarUrl" alt="">
            <p class="text">倒叙年华</p>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="tag">
          <p class="label">标签</p>
          <ul>
            <li>华语</li>
            <li>华语</li>
            <li>华语</li>
          </ul>
        </div>
        <div class="list">
          <p class="label">歌曲列表</p>
        </div>
      </div>
      <div content="songs-list">
        <songs-list :songsList="songsList"></songs-list>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import SongsList from 'base/songs_list'
  import {filterSinger} from 'common/js/common'

  export default {
    name: 'playList',
    components: {SongsList},
    created() {
      this.id = this.$route.query.id;
      this._getSongDetail();
    },
    data() {
      return {
        id: 0,
        playObj: null,
        songsList: []
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      _getSongDetail(){
        axios.get('/api/playlist/detail',{
          params: {
            id: this.id
          }
        }).then((res) => {
          if(res.status === 200){
            this.playObj = res.data.playlist;
            this.songsList = this._normalSong(res.data.playlist.tracks);
          }
        })
      },
      _normalSong(list) {
        let ret = [];
        list.forEach((item) => {
          let music = {};
          music.id = item.id;
          music.name = item.name;
          music.alias = item.alia.length ? item.alia[0] : '';
          music.artistsName = item.name;
          music.albumName = filterSinger(item.ar);
          music.sq = false;
          ret.push(music);
        });
        return ret;
      }
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.playObj.creator.backgroundUrl});`
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
  .play-list {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    .header{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3rem;
      z-index: 3;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      .iconfont{
        font-weight: bold;
        color: @color-theme;
      }
    }
    .top {
      display: flex;
      position: relative;
      width: 100%;
      height: 19rem;
      overflow: hidden;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        filter: blur(20px);
        transform: scale(1.5);
        &:after{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.25);
        }
      }
      .left {
        flex: 0 0 12.6rem;
        width: 12.6rem;
        height: 12.6rem;
        margin: 4rem 1.5rem 0 1.5rem;
        border-radius: 0.2rem;
        overflow: hidden;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin: 4rem 1.5rem 0 0;
        .name{
          line-height: 2rem;
          color: @color-background;
          font-size: @font-size-medium-x;
        }
        .disc {
          display: flex;
          align-items: center;
          padding-top: 2rem;
          & > img {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
          }
          .text{
            padding-left: 0.5rem;
            font-size: @font-size-small;
            color: @color-background;
          }
        }
      }
    }
    .info{
      .tag{
        display: flex;
        padding: 1.5rem;
        font-size: 0;
        .label{
          margin-top: 1.5rem;
          margin-right: 1rem;
          white-space: nowrap;
          font-size: @font-size-small;
        }
        & > ul{
          display: flex;
          flex-wrap: wrap;
          & > li{
            margin: 1rem 0.5rem 1rem;
            padding: 0.4rem 1rem;
            box-sizing: border-box;
            font-size: @font-size-small-ss;
            color: @color-text-d;
            border: 1px solid @color-text-ll;
            border-radius: 1rem;
          }
        }
      }
      .list{
        .label{
          line-height: 2rem;
          padding: 0 1.5rem;
          font-size: @font-size-small-ss;
          color: @color-text-l;
          background: @color-text-lll;
        }
      }
    }
  }
</style>
