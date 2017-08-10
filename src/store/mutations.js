import * as types from './mutations_types'

const mutations = {
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.SET_CURRENT_INDEX](state, index){
    state.currentIndex = index;
  }
};

export default mutations;
