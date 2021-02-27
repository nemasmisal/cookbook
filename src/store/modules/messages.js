const msgState = {
  msg: '',
  err: '',
};

const getters = {};
const mutations = {
  globalMsg: (state, { msg }) => {
    state.msg = msg;
    setTimeout(() => {
      state.msg = '';
    }, 2000);
  },
  globalError: (state, { msg }) => {
    state.err = msg;
    setTimeout(() => {
      state.err = '';
    }, 2000);
  },
  clearMsg: (state) => {
    state.msg = '';
  },
};
const actions = {
  globalMsg({ commit }, payload) {
    commit('globalMsg', payload);
  },
  globalError({ commit }, payload) {
    commit('globalError', payload);
  },
  clearMsg({ commit }) {
    commit('clearMsg');
  },
};

export default {
  namespaced: true,
  state: msgState,
  getters,
  actions,
  mutations,
};
