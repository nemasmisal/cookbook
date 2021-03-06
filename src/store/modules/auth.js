import AuthService from '@/core/services/auth-service';
import Router from '@/router/index';
import rootState from '../index';

const initialState = {
  username: '',
  id: '',
  email: '',
};
const state = initialState;

// getters
const getters = {
  auth: (state) => state,
};

// actions
const actions = {
  login({ commit }, payload) {
    commit('login', payload);
  },
  logout({ commit }) {
    commit('logout');
  },
  register({ commit }, payload) {
    commit('register', payload);
  },
  isAvailable({ commit }, payload) {
    commit('isAvailable', payload);
  },
};

// mutations
const mutations = {
  login: async (state, payload) => {
    const res = await AuthService.login(payload);
    if (!res) {
      return;
    }
    state.username = res.username;
    state.id = res.id;
    state.email = res.email;
    rootState.dispatch('msg/globalMsg', { msg: 'Logged in.' });
    Router.push('/');
  },
  logout: async (state) => {
    await AuthService.logout();
    state = { ...initialState };
  },
  register: async (state, payload) => {
    const res = await AuthService.register(payload);
    if (!res) return;
    state = { ...res };
    rootState.dispatch('msg/globalMsg', { msg: 'Welcome' });
    Router.push('/');
  },
  isAvailable: async (_, payload) => {
    const res = await AuthService.isAvailable(payload);
    if (!res) return;
    return res;
  },
};

export default {
  namespaced: true,
  state: state,
  getters,
  actions,
  mutations,
};
