import AuthService from '@/core/services/auth-service';
import Router from '@/router/index';
import rootState from '../index';

const state = {
  username: null,
  id: null,
  email: null,
};

const getters = {
  auth: (state) => state,
  id: (state) => state.id,
  email: (state) => state.email,
  username: (state) => state.username,
};

const actions = {
  async login({ commit }, payload) {
    const res = await AuthService.login(payload);
    if (!res) return;
    commit('login', res);
    rootState.dispatch('msg/globalMsg', { msg: 'Logged in.' });
    Router.push('/');
  },
  async logout({ commit }) {
    await AuthService.logout();
    commit('logout');
    rootState.dispatch('msg/globalMsg', { msg: 'Logged out.' });
    Router.push('/');
  },
  async register({ commit }, payload) {
    const res = await AuthService.register(payload);
    if (!res) return;
    commit('register', res);
    rootState.dispatch('msg/globalMsg', { msg: 'Welcome' });
    Router.push('/');
  },
};

const mutations = {
  login: (state, payload) => {
    state.username = payload.username;
    state.id = payload.id;
    state.email = payload.email;
  },
  register: (state, payload) => {
    state.username = payload.username;
    state.id = payload.id;
    state.email = payload.email;
  },
  logout: (state) => {
    state.username = null;
    state.id = null;
    state.email = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
