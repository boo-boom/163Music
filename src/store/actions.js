import * as types from './mutations_types'

const actions = {
  selectPlay({commit}, {list, index}) {
    commit(types.SET_PLAY_LIST, list);
  }
};

export default actions;
