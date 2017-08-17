import {playMode} from "common/js/config"

const state = {
  playing: false,
  fullScreen: false,
  isLoad: false,
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  mode: playMode.sequence
};

export default state;
