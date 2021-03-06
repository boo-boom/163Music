const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  isLoad: state => state.isLoad,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {};
  },
  mode: state => state.mode,
};

export default getters;
