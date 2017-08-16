<template>
  <div>
    <scroll class="recommend" v-show="songSheet.length" :isRefresh="isRefresh">
      <div>
        <div>
          <list-title title="推荐歌单"></list-title>
          <img-list :songSheet="songSheet" @select="selectItem"></img-list>
        </div>
        <div>
          <list-title title="最新音乐"></list-title>
          <songs-list :songsList="songsList" @clickCurrent="checkedSong"></songs-list>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import ImgList from 'base/img_list'
  import ListTitle from 'base/list_title'
  import SongsList from 'base/songs_list'
  import Scroll from 'base/scroll'
  import axios from 'axios'
  import {createdSong} from 'common/js/base'
  import {getSongsId} from 'common/js/common'

  export default {
    name: 'recommend',
    components: {ListTitle, ImgList, SongsList, Scroll},
    created() {
      this._getSongSheet();
      this._getSongsList();
    },
    data() {
      return {
        songSheet: [],
        songsList: [],
        songsId: '',
        isClick: true
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
        console.log(item);
        this.setIsLoad(true);
        if(!this.isClick){
          return
        }
        this.setIsLoad(false);
        this.selectPlay({
          list: this.songsList,
          index: index
        });
        this.isClick = true;
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
            //this.songsId = getSongsId(this.songsList);
          }
        })
      },
      ...mapMutations({
        setIsLoad: 'SET_IS_LOAD'
      }),
      ...mapActions(['selectPlay'])
    },
    computed: {
      isRefresh() {
        return this.songSheet.length && this.songsList.length ? true : false;
      },
      ...mapGetters(['playList','currentSong'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .recommend{
    box-sizing: border-box;
    position: fixed;
    top: 10.4rem;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
</style>
