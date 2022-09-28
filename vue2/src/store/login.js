const state = () => ({
  isLogin: false,
  userToken: null,
});

const mutations = {
  setUserToken(state, payload) {
    state.userToken = payload;
  },

  setIsLogin(state, payload) {
    state.isLogin = payload;
  },
};

const actions = {
  login({ commit }, payload) {
    commit('setUserToken', payload);
    commit('setIsLogin', true);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
