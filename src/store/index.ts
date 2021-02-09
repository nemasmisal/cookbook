import { createStore } from 'vuex';
import RecipeService from '@/core/services/recipe-service';
import AuthService from '@/core/services/auth-service';
import Router from '@/router/index';
interface Auth {
  username: string;
  id: string;
  email: string;
}
interface Recipe {
  _id: string;
  name: string;
  type: string;
  description: string;
  author: string;
  imgUrl: string;
  ingrediants: [];
}

interface State {
  auth: Auth;
  recipes: Recipe[];
  msg: string
}
const state: State = {
  auth: {
    username: '',
    id: '',
    email: ''
  },
  recipes: [],
  msg: ''
}
export default createStore({
  state,
  mutations: {
   login: async (state, payload) => {
    const res = await AuthService.login(payload);
    if(!res) { return }
    state.auth = { ...res };
    Router.push('/');
   },
   logout: async state => {
    const res = await AuthService.logout(); 
    state.auth = { username: '', email:'', id: '' };
   },
   register: async (state, payload) => {
    const res = await AuthService.register(payload);
    state.auth = { ...res };
   },
   getAllRecipes: async state => {
     const res:[] = await RecipeService.getAllRecipes();
    state.recipes = [ ...res ];
   },
   create: async (state, payload) => {
     const res = await RecipeService.create(payload);
     state.recipes = [...state.recipes, res];
   },
   update: async (state, payload) => {
     const res = await RecipeService.update(payload);
     state.recipes = [...state.recipes, res];
   },
   remove: async (state, payload) => {
     const res = await RecipeService.remove(payload);
     state.recipes = state.recipes.filter(r => r._id !== payload.id)
   },
   globalMsg: (state, { msg }) => {
     state.msg = msg;
     setTimeout(() => {
       state.msg = ''
     },1500)
   }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
    register({ commit }, payload) {
      commit('register', payload);
    },
    getAllRecipes({ commit }) {
      commit('getAllRecipes');
    },
    create({ commit }, payload) {
      commit('create', payload);
    },
    update({ commit }, payload) {
      commit('update', payload);
    },
    remove({ commit }, payload) {
      commit('remove', payload);
    },
    globalError({ commit }, payload) {
      commit('globalMsg', payload)
    }
  },
  modules: {}
});
