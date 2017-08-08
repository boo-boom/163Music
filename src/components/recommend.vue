<template>
  <div class="recommend" v-show="songSheet.length">
    <div>
      <list-title title="推荐歌单"></list-title>
      <img-list :songSheet="songSheet"></img-list>
    </div>
    <div>
      <list-title title="最新音乐"></list-title>
    </div>
  </div>
</template>

<script>
  import ImgList from 'base/img_list'
  import ListTitle from 'base/list_title'
  import axios from 'axios'

  export default {
    name: 'recommend',
    components: {ListTitle, ImgList},
    created() {
      this._getSongSheet();
    },
    data() {
      return {
        songSheet: []
      }
    },
    methods: {
      _getSongSheet(){
        axios.get('/api/personalized').then((res) => {
          if(res.status === 200){
            this.songSheet = res.data.result;
            console.log(JSON.stringify(this.songSheet))
          }
        })
      }
    }
  }
</script>

<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
