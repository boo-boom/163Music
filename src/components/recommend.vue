<template>
  <div class="recommend" v-show="songSheet.length">
    <div>
      <list-title title="推荐歌单"></list-title>
      <img-list :songSheet="songSheet" @select="selectItem"></img-list>
    </div>
    <div>
      <list-title title="最新音乐"></list-title>
      <songs-list :songsList="songsList" @clickCurrent="checkedSong"></songs-list>
    </div>
    <loading v-show="!songsList.length"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import ImgList from 'base/img_list'
  import ListTitle from 'base/list_title'
  import SongsList from 'base/songs_list'
  import Loading from 'base/loading'
  import axios from 'axios'
  import {createdSong} from 'common/js/base'
  import {getSongsId} from 'common/js/common'

  export default {
    name: 'recommend',
    components: {ListTitle, ImgList, SongsList, Loading},
    created() {
      this._getSongSheet();
      this._getSongsList();
    },
    data() {
      return {
        songSheet: [],
        songsList: [],
        songsId: ''
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
          path: `/recommend/${item.id}`
        });
      },
      checkedSong(item, index) {
        this.setCurrentIndex(index);
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
            this.songsId = getSongsId(this.songsList);
            this._getSongUrl();
          }
        })
      },
      _getSongUrl() {
        axios.get('/api/music/url',{
          params: {
            id: this.songsId
          }
        }).then((res) => {
          if (res.status === 200) {
            this.setPlayList(res.data.data);
          }
        })
      },
      ...mapMutations({
        setPlayList: 'SET_PLAY_LIST',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
