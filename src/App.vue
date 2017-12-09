<template>
  <div id="app">
    <div class="header">
      <m-header></m-header>
      <tab></tab>
    </div>
    <loading></loading>
    <player></player>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import MHeader from 'base/m_header'
  import Tab from 'base/tab'
  import Loading from 'base/loading'
  import Player from 'components/player'

  export default {
    name: 'app',
    components: {MHeader, Tab, Loading, Player},
    mounted () {
      //this.setIsLoad(false);
      console.log('%c 康木北鼻累死狗', 'background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;');
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    
  }
</style>
