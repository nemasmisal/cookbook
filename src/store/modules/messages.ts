import { ActionTree, GetterTree, MutationTree } from "vuex";
interface MessagesState {
  msg: string;
  err: string;
}
const msgState = {
  msg: "",
  err: ""
}

const getters: GetterTree<MessagesState, any> = {}
const mutations: MutationTree<MessagesState> = {
  globalMsg: (state, { msg }) => {
    state.msg = msg;
    setTimeout(() => {
      state.msg = "";
    }, 2000);
  },
  globalError: (state, { msg }) => {
    state.err = msg;
    setTimeout(() => {
      state.err = "";
    }, 2000);
  },
  clearMsg: state => {
    state.msg = "";
  }
}
const actions: ActionTree<MessagesState, any> = {
  globalMsg({ commit }, payload) {
    commit("globalMsg", payload);
  },
  globalError({ commit }, payload) {
    commit("globalError", payload);
  },
  clearMsg({ commit }) {
    commit("clearMsg");
  }
}

export default {
  namespaced: true,
  state: msgState,
  getters,
  actions,
  mutations
}