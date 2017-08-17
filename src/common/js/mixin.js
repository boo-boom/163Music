import {mapGetters} from 'vuex'

export const playMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  watch: {
    playList(newVal) {
      this.refreshScroll(newVal);
    }
  }
};
