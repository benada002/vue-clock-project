import Vue from 'vue';
import Vuex from 'vuex';
import Timer from './store-modules/timer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Timer,
  }
});
