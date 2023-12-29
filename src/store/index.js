import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: "",
    lastUpdated: null,
    updatedInfo: {
      id: null,
      username: null,
      source: null,
    },
  },
  mutations: {
    login(state, username) {
      state.isLogin = true;
      state.username = username;
    },
    logout(state) {
      state.isLogin = false;
      state.username = "";
    },
    setLastUpdated(state, timestamp) {
      state.lastUpdated = timestamp;
    },
    setUpdatedInfo(state, { id, username, source }) {
      state.updatedInfo.id = id;
      state.updatedInfo.username = username;
      state.updatedInfo.source = source;
    },
  },
  actions: {},
  modules: {},
});
