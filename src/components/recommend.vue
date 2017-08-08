<template>
  <div class="recommend">
    <list-title title="推荐歌单"></list-title>
    <img-list></img-list>
  </div>
</template>

<script>
  import ImgList from 'base/img_list'
  import ListTitle from 'base/list_title'

  export default {
    name: 'recommend',
    components: {ListTitle, ImgList}
  }
</script>

<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
