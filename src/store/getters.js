const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  isLoad: state => state.isLoad,
  playList: state => state.playList,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {};
  },
  songInfo: state => state.songInfo,
};

export default getters;
