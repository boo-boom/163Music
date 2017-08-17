<template>
  <div class="player" v-show="playList.length>0">
    <transition name="full">
      <div class="full" v-show="fullScreen">
        <div class="bg">
          <img :src="currentSong.pic" alt="">
        </div>
        <div class="header">
          <div class="back iconfont icon-arrow-down" @click="back"></div>
          <p class="title">
            <span class="p-1">{{currentSong.name}}</span>
            <span class="p-2">{{currentSong.artistsName}}</span>
          </p>
        </div>
        <div class="cd">
          <div class="cd-wrapper" :class="rotateCls">
            <img v-lazy="currentSong.pic" alt="">
          </div>
        </div>
        <div class="progress-wrapper">
          <p class="cur-time">{{formatTime(currentTime)}}</p>
          <div class="progress-main">
            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <p class="total-time">{{formatTime(playTime)}}</p>
        </div>
        <div class="btn">
          <span class="iconfont" :class="iconMode" @click="changeMode"></span>
          <span class="iconfont icon-kuaitui" @click="prev" ref="ktBtn"></span>
          <span class="iconfont play-icon" :class="iconPlay" @click="togglePlay"></span>
          <span class="iconfont icon-kuaijin" @click="next" ref="kjBtn"></span>
          <span class="iconfont icon-liebiao list-icon"></span>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="mini" v-show="!fullScreen" @click="open">
        <div class="img">
          <img v-lazy="currentSong.pic" :class="rotateCls">
        </div>
        <div class="text ellipsis">
          <p class="title">{{currentSong.name}}</p>
          <p class="name">{{currentSong.artistsName}}</p>
        </div>
        <div class="mini-btn">
          <span class="iconfont mini-play-icon" :class="iconPlay" @click.stop="togglePlay"></span>
          <span class="iconfont icon-liebiao mini-list-icon"></span>
        </div>
      </div>
    </transition>
    <audio id="audioPlay" :src="songUrl" @timeupdate="updateTime" @play="ready" @error="error" @ended="end" ref="audio"></audio>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapMutations} from 'vuex'
  import ProgressBar from 'base/progress_bar'
  import {playMode} from 'common/js/config'
  import {randomArr} from 'common/js/common'

  export default {
    name: 'player',
    components: {ProgressBar},
    data() {
      return {
        currentTime: 0,
        playTime: 0,
        songUrl: '',
        isFirst: true,
        isReady: false,
      }
    },
    methods: {
      back() {
        this.setFullScreen(false);
      },
      /*getPic(pic) {
        return `background-image: url(${pic});`
      },*/
      open() {
        this.setFullScreen(true);
      },
      togglePlay() {
        this.setPlaying(!this.playing);
      },
      onProgressBarChange(percent) {
        this.$refs.audio.currentTime = this.playTime * percent;
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime;
        let myaudio = document.getElementById('audioPlay');
        this.playTime = parseInt(myaudio.duration);
      },
      formatTime(time) {
        let m = time / 60 | 0;
        let s = this._pad(time % 60 | 0);
        return `${m}:${s}`;
      },
      next() {
        if (!this.isReady) return;
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.setPlaying(!this.playing);
        }
        this.isReady = false;
      },
      prev() {
        if (!this.isReady) return;
        let index = this.currentIndex - 1;
        if (index <= 0) {
          index = this.playList.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.setPlaying(!this.playing);
        }
        this.isReady = false;
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      ready() {
        this.isReady = true;
      },
      error() {
        this.isReady = true;
      },
      changeMode() {
        let mode = (this.mode + 1) % 3;
        let list = [];
        if (mode === playMode.random) {
          list = randomArr(this.sequenceList);
        } else {
          list = this.sequenceList;
        }
        this.setPlayMode(mode);
        this.resetCurrentSong(list);
        this.setPlayList(list);
      },
      resetCurrentSong(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        this.setCurrentIndex(index);
      },
      _pad(str) {
        let len = str.toString().length;
        if (len < 2) {
          return '0' + str;
        }
        return str;
      },
      _getSongUrl() {
        axios.get('/api/music/url', {
          params: {
            id: this.currentSong.id
          }
        }).then((res) => {
          if (res.status === 200) {
            const audio = this.$refs.audio;
            this.songUrl = res.data.data[0].url;
            this.$nextTick(() => {
              this.playing ? audio.play() : audio.pause();
            });
          }
        })
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAY_LIST'
      })
    },
    computed: {
      iconPlay() {
        return this.playing ? 'icon-bofang' : 'icon-zanting';
      },
      rotateCls() {
        return this.playing ? 'play' : 'play pause';
      },
      percent() {
        return this.currentTime / this.playTime;
      },
      iconMode() {
        return this.mode === playMode.sequence ? 'icon-liebiaoxunhuan' : this.mode === playMode.loop ? 'icon-danquxunhuan' : this.mode === playMode.random ? 'icon-suiji' : '';
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex', 'mode', 'sequenceList'])
    },
    watch: {
      currentSong(newVal, oldVal) {
        if (newVal.id === oldVal.id) {
          return;
        }
        this._getSongUrl();
      },
      playing(newVal) {
        if (this.isFirst) {
          this.isFirst = false;
          return
        }
        const audio = this.$refs.audio;
        if (newVal) {
          this.$nextTick(() => {
            audio.play();
          });
        } else {
          audio.pause();
        }
      },
      isReady(newVal) {
        if (newVal) {
          this.$refs.kjBtn.style.opacity = '';
          this.$refs.ktBtn.style.opacity = '';
        } else {
          this.$refs.kjBtn.style.opacity = 0.5;
          this.$refs.ktBtn.style.opacity = 0.5;
        }
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  @import "~common/style/mixin";
  .player {
    .full {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      width: 100%;
      overflow: hidden;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        width: 100%;
        overflow: hidden;
        & > img {
          width: 100%;
          height: 100%;
          transform: scale(1.5);
          filter: blur(20px);
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 1;
          background: rgba(7, 17, 27, 0.5);
        }
      }
      .header {
        position: relative;
        width: 100%;
        height: 4.4rem;
        display: flex;
        .back {
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
        .title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 2rem;
          text-align: center;
          font-size: @font-size-large;
          color: @color-theme;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .p-1 {
            padding-top: 1rem;
            font-size: @font-size-medium;
          }
          .p-2 {
            font-size: @font-size-small-ss;
          }
        }
      }
      .cd {
        position: relative;
        padding-top: 80%;
        width: 80%;
        margin: 4rem auto 0;
        .cd-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1rem solid rgba(7, 17, 27, 0.2);
          box-sizing: border-box;
          border-radius: 50%;
          overflow: hidden;
          & > img {
            display: block;
            width: 100%;
            height: 100%;
          }
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .progress-wrapper {
        position: absolute;
        bottom: 12rem;
        left: 0;
        width: 90%;
        display: flex;
        margin: 0 5%;
        .progress-main {
          flex: 1;
        }
        & > p {
          width: 3.5rem;
          flex: 0 0 3.5rem;
          text-align: center;
          font-size: @font-size-small-ss;
          color: @color-theme;
        }
      }
      .btn {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 90%;
        display: flex;
        align-items: center;
        margin: 0 5% 5rem;
        font-size: 0;
        & > span {
          flex: 1;
          text-align: center;
          font-size: 4rem;
          color: @color-theme;
          transition: all 0.2s;
        }
        .play-icon {
          font-size: 5rem;
        }
      }
      &.full-enter-active, &.full-leave-active {
        transition: all 0.3s;
        opacity: 1;
      }
      &.full-enter, &.full-leave-to {
        opacity: 0;
      }
    }
    .mini {
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
      .img {
        & > img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          overflow: auto;
          display: block;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .text {
        flex: 1;
        margin-left: 2rem;
        .title {
          font-size: @font-size-medium;
          padding-bottom: 0.5rem;
        }
        .name {
          font-size: @font-size-small-ss;
          color: @color-text-d;
        }
      }
      .mini-btn {
        color: @color-theme;
        & > span {
          font-size: 2.5rem;
          margin-left: 1rem;
        }
      }
      &.slide-enter-active, &.slide-leave-active {
        transition: all 0.3s;
        opacity: 1;
      }
      &.slide-enter, &.slide-leave-to {
        opacity: 0;
        transform: translateY(100%);
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
