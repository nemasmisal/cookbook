import AuthService from "@/core/services/auth-service";
import Router from "@/router/index";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import rootState from "../index";

interface AuthState {
  username: string;
  id: string;
  email: string;
}

const initialState: AuthState = {
  username: "",
  id: "",
  email: ""
}
const state = initialState;

// getters
const getters: GetterTree<AuthState, any> = {
  auth: state => state
}

// actions
const actions: ActionTree<AuthState, any> = {
  login({ commit }, payload: any) {
    commit("login", payload);
  },
  logout({ commit }) {
    commit("logout");
  },
  register({ commit }, payload) {
    commit("register", payload);
  },
}

// mutations
const mutations: MutationTree<AuthState> = {
  login: async (state, payload) => {
    const res: any = await AuthService.login(payload);
    if (!res) { return; }
    state.username = res.username;
    state.id = res.id;
    state.email = res.email;
    rootState.dispatch("msg/globalMsg", { msg: "Logged in." })
    Router.push("/");
  },
  logout: async state => {
    await AuthService.logout();
    state = { ...initialState };
  },
  register: async (state, payload) => {
    const res = await AuthService.register(payload);
    if (!res) { return; }
    state = { ...res };
    rootState.dispatch("msg/globalMsg", { msg: "Welcome" })
    Router.push("/");
  },
}

export default {
  namespaced: true,
  state: state,
  getters,
  actions,
  mutations
}