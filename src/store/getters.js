const getters = {
  playList: state => state.playList,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {};
  },
};

export default getters;
