import { createStore } from 'vuex';
import { auth, onAuthStateChanged } from '../utils/firebase';

export default createStore({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    reloadUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        commit('setUser', user);
      });
    },
  },
  modules: {
  },
});
