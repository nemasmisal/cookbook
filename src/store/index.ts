import { createStore } from "vuex";
import RecipeService from '@/core/services/recipe-service';
import AuthService from "@/core/services/auth-service";
export default createStore({
  state: {
    auth: {
      username: '',
      id: '',
      email: ''
    },
    recipes: []
  },
  mutations: {
   login: async (state, payload) => {
    const res = await AuthService.login(payload);
    console.log(res);
    state.auth = { ...res };
   },
   logout: (state) => {
    state.auth = { username: '', email:'', id: '' }
   },
   register: async (state, payload) => {
    const res = await AuthService.register(payload);
    state.auth = { ...res }
   },
   getAllRecipes: async (state) => {
     const res:[] = await RecipeService.getAllRecipes();
    state.recipes = [ ...res ];
   }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
    getAllRecipes({ commit }) {
      commit('getAllRecipes');
    }
  },
  modules: {}
});
