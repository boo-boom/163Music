import * as types from './mutations_types'

const mutations = {
  [types.SET_FULL_SCREEN](state,flag){
    state.fullScreen = flag;
  },
  [types.SET_PLAYING](state, flag){
    state.playing = flag;
  },
  [types.SET_IS_LOAD](state, is){
    state.isLoad = is;
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_CURRENT_INDEX](state, index){
    state.currentIndex = index;
  },
  [types.SET_PLAY_MODE](state, mode){
    state.mode = mode;
  }
};

export default mutations;
