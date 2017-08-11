<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      isRefresh: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, this.refreshDelay);
    },
    methods: {
      _initScroll(){
        if(!this.$refs.wrapper){
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        });
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
    },
    watch: {
      isRefresh() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
