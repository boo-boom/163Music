<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'base/m_header'
  import Tab from 'base/tab'

  export default {
    name: 'app',
    components: {MHeader, Tab}
  }
</script>

<style>

</style>
