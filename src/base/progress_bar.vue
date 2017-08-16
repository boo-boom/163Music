<template>
  <div class="progress-bar">
    <div class="progress-box" ref="prbox">
      <div class="bg"></div>
      <div class="already" ref="already"></div>
      <div class="prbtn" ref="prbtn"
           @touchstart.prevent="touchStart"
           @touchmove.prevent="touchMove"
           @touchend="touchEnd"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      touchStart(e) {
        this.touch.isTouch = true;
        const touch = e.touches[0];
        this.touch.clientX = touch.clientX;
        this.touch.left = this.$refs.already.clientWidth;
      },
      touchMove(e) {
        if (!this.touch.isTouch) return;
        this.isTouch = false;
        const touch = e.touches[0];
        let differ = touch.clientX - this.touch.clientX;
        let barWidth = this.$refs.prbox.clientWidth - this.$refs.prbtn.clientWidth;
        let adWidth = Math.min(barWidth, Math.max(0, this.touch.left + differ));
        this.$refs.prbtn.style.left = `${adWidth}px`;
        this.$refs.already.style.width = `${adWidth}px`;
        this.touch.percent = adWidth / barWidth;
      },
      touchEnd() {
        this.$emit('percentChange', this.touch.percent);
        this.touch.isTouch = false;
      }
    },
    watch: {
      percent(newVal) {
        if(newVal >= 0 && !this.touch.isTouch){
          let barWidth = this.$refs.prbox.clientWidth - this.$refs.prbtn.clientWidth;
          this.$refs.prbtn.style.left = `${barWidth * newVal}px`;
          this.$refs.already.style.width = `${barWidth * newVal}px`;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/style/variable";
  .progress-bar {
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .progress-box {
      position: relative;
      flex: 1;
      height: 0.5rem;
      .bg {
        width: 100%;
        height: 0.5rem;
        background: rgba(7, 17, 27, 0.3);
      }
      .already {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0.5rem;
        background: @color-theme;
      }
      .prbtn {
        position: absolute;
        top: -0.5rem;
        left: 0;
        width: 1.5rem;
        height: 1.5rem;
        background: @color-theme;
        border: 0.2rem solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
      }
    }
  }
</style>
