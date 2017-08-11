<template>
  <div class="player" v-show="playList.length>0">
    <transition name="full">
      <div class="full" v-show="fullScreen">
        <div class="bg" :style="getPic(songInfo.pic)"></div>
        <div class="header">
          <div class="back iconfont icon-arrow-down" @click="back"></div>
          <p class="title">{{songInfo.name}}</p>
        </div>
        <div class="cd">
          <div class="cd-wrapper" :class="rotateCls">
            <img v-lazy="songInfo.pic" alt="">
          </div>
        </div>
        <div class="btn">
          <span class="iconfont icon-liebiaoxunhuan"></span>
          <span class="iconfont icon-kuaitui"></span>
          <span class="iconfont play-icon" :class="iconPlay" @click="togglePlay"></span>
          <span class="iconfont icon-kuaijin"></span>
          <span class="iconfont icon-liebiao list-icon"></span>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="mini" v-show="!fullScreen" @click="open">
        <div class="img">
          <img v-lazy="songInfo.pic" class="play">
        </div>
        <div class="mini-btn">
          <span class="iconfont mini-play-icon" :class="iconPlay"></span>
          <span class="iconfont icon-liebiao mini-list-icon"></span>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'player',
    methods: {
      back() {
        this.setFullScreen(false);
      },
      getPic(pic){
        return `background-image: url(${pic});`
      },
      open() {
        this.setFullScreen(true);
      },
      togglePlay() {
        this.setPlaying(!this.playing);
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAYING'
      })
    },
    computed: {
      iconPlay() {
        return this.playing ? 'icon-zanting' : 'icon-bofang';
      },
      rotateCls() {
        return this.playing ? 'play' : 'play pause';
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'songInfo'])
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      },
      playing(newVal){
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newVal ? audio.play() : audio.pause();
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";

  .player{
    .full{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      //background-image: url(./../common/image/test.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: blur(20px);
      transform: scale(1.5);
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        background: rgba(7,17,27,0.5);
      }
    }
    .header{
      position: relative;
      width: 100%;
      height: 4.4rem;
      display: flex;
      .back{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 4.4rem;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: @font-size-large;
        color: @color-theme;
      }
      .title{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 4.4rem;
        font-size: @font-size-large;
        color: @color-theme;
      }
    }

      width: 100%;
      .cd{
        position: relative;
        padding-top: 80%;
        width: 80%;
        margin: 4rem auto 0;
        .cd-wrapper{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1rem solid rgba(7,17,27,0.2);
          box-sizing: border-box;
          border-radius: 50%;
          overflow: hidden;
          & > img{
            display: block;
            width: 100%;
            height: 100%;
          }
          &.play{
            animation: rotate 20s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
        }
      }
      .btn{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 90%;
        display: flex;
        align-items: center;
        margin: 0 5% 5rem;
        font-size: 0;
        & > span{
          flex: 1;
          text-align: center;
          font-size: 4rem;
          color: @color-theme;
        }
        .play-icon{
          font-size: 5rem;
        }
      }
      &.full-enter-active, &.full-leave-active{
        transition: all 0.3s;
        opacity: 1;
      }
      &.full-enter, &.full-leave-to{
        opacity: 0;
      }
    }
    .mini{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      background: #fff;
      height: 5rem;
      padding: 0 1.5rem;
      border-top: 1px solid #ddd;
      .img{
        flex: 1;
        & > img{
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          overflow: auto;
          display: block;
          &.play{
            animation: rotate 20s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
        }
      }
      .mini-btn{
        color: @color-theme;
        & > span{
          font-size: 2.5rem;
          margin-left: 1rem;
        }
      }
      &.slide-enter-active, &.slide-leave-active{
        transition: all 0.3s;
        opacity: 1;
      }
      &.slide-enter, &.slide-leave-to{
        opacity: 0;
        transform: translateY(100%);
      }
    }
    @keyframes rotate{
      0%{
        transform: rotate(0);
      }
      100%{
        transform: rotate(360deg);
      }
    }
  }
</style>
