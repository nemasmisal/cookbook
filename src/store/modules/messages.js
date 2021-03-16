const state = {
  msg: '',
  err: '',
};

const getters = {
  msg: (state) => state.msg,
  err: (state) => state.err,
};
const mutations = {
  globalMsg: (state, { msg }) => {
    state.msg = msg;
  },
  globalError: (state, { msg }) => {
    state.err = msg;
  },
  clearMsg: (state) => {
    state.msg = '';
    state.err = '';
  },
};
const actions = {
  globalMsg({ commit }, payload) {
    commit('globalMsg', payload);
    setTimeout(() => {
      commit('clearMsg');
    }, 2000);
  },
  globalError({ commit }, payload) {
    commit('globalError', payload);
    setTimeout(() => {
      commit('clearMsg');
    }, 2000);
  },
  clearMsg({ commit }) {
    commit('clearMsg');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
