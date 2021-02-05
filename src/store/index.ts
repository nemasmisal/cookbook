import { createStore } from 'vuex';
import RecipeService from '@/core/services/recipe-service';
import AuthService from '@/core/services/auth-service';
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
  recipes: Recipe[]
}
const state: State = {
  auth: {
    username: '',
    id: '',
    email: ''
  },
  recipes: []
}
export default createStore({
  state,
  mutations: {
   login: async (state, payload) => {
    const res = await AuthService.login(payload);
    state.auth = { ...res };
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
    }
  },
  modules: {}
});
