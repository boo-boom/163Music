<template>
  <div class="recommend" v-show="songSheet.length">
    <div>
      <list-title title="推荐歌单"></list-title>
      <img-list :songSheet="songSheet" @select="selectItem"></img-list>
    </div>
    <div>
      <list-title title="最新音乐"></list-title>
      <songs-list :songsList="songsList"></songs-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ImgList from 'base/img_list'
  import ListTitle from 'base/list_title'
  import SongsList from 'base/songs_list'
  import axios from 'axios'
  import {createdSong} from 'common/js/base'

  export default {
    name: 'recommend',
    components: {ListTitle, ImgList, SongsList},
    created() {
      this._getSongSheet();
      this._getSongsList();
    },
    data() {
      return {
        songSheet: [],
        songsList: []
      }
    },
    methods: {
      selectItem(item) {
        if (item.id) {
          this.$router.push({
            path: '/recommend'
          });
        }
        this.$router.push({
          path: `/recommend/list`,
          query: {
            id: item.id
          }
        });
      },
      _getSongSheet() {
        axios.get('/api/personalized').then((res) => {
          if (res.status === 200) {
            this.songSheet = res.data.result;
          }
        })
      },
      _getSongsList() {
        axios.get('/api/personalized/newsong').then((res) => {
          if (res.status === 200) {
            this.songsList = createdSong(res.data.result);
            //console.log(JSON.stringify(this.songsList))
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
