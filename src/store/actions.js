import * as types from './mutations_types'

const actions = {
  selectPlay({commit}, {list, index}) {
    commit(types.SET_PLAY_LIST, list);
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING, true);
  }
};

export default actions;
