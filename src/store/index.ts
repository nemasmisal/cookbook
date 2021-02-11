import { createStore } from "vuex";
import RecipeService from "@/core/services/recipe-service";
import AuthService from "@/core/services/auth-service";
import Router from "@/router/index";
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
  msg: string;
  err: string;
}
const state: State = {
  auth: {
    username: "",
    id: "",
    email: ""
  },
  recipes: [],
  msg: "",
  err: ""
};
export default createStore({
  state,
  mutations: {
    login: async (state, payload) => {
      const res = await AuthService.login(payload);
      if (!res) {
        return;
      }
      state.auth = { ...res };
      state.msg = "successfully logged in";
      Router.push("/");
    },
    logout: async state => {
      await AuthService.logout();
      state.msg = "Successfully logged out";
      state.auth = { username: "", email: "", id: "" };
    },
    register: async (state, payload) => {
      const res = await AuthService.register(payload);
      if (!res) {
        return;
      }
      state.msg = "Successfully loged in";
      state.auth = { ...res };
      Router.push("/");
    },
    getAllRecipes: async state => {
      const res: [] = await RecipeService.getAllRecipes();
      state.recipes = [...res];
    },
    create: async (state, payload) => {
      const res = await RecipeService.create(payload);
      state.msg = "Recipe created!";
      state.recipes = [...state.recipes, res];
    },
    updateRecipe: async (state, payload) => {
      const res = await RecipeService.updateRecipe(payload);
      if (!res) {
        return;
      }
      state.msg = "Recipe updated!";
      state.recipes = [...state.recipes, res];
    },
    remove: async (state, payload) => {
      const res = await RecipeService.remove(payload);
      state.msg = "Recipe removed!";
      state.recipes = state.recipes.filter(r => r._id !== payload.id);
    },
    globalMsg: (state, { msg }) => {
      state.msg = msg;
      setTimeout(() => {
        state.msg = "";
      }, 1500);
    },
    globalError: (state, { msg }) => {
      state.err = msg;
      setTimeout(() => {
        state.err = "";
      }, 1500);
    },
    clearMsg: state => {
      state.msg = "";
    }
  },
  actions: {
    login({ commit }, payload) {
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
    register({ commit }, payload) {
      commit("register", payload);
    },
    getAllRecipes({ commit }) {
      commit("getAllRecipes");
    },
    create({ commit }, payload) {
      commit("create", payload);
    },
    updateRecipe({ commit }, payload) {
      commit("updateRecipe", payload);
    },
    remove({ commit }, payload) {
      commit("remove", payload);
    },
    globalMsg({ commit }, payload) {
      commit("globalMsg", payload);
    },
    globalError({ commit }, payload) {
      commit("globalError", payload);
    },
    clearMsg({ commit }) {
      commit("clearMsg");
    }
  },
  modules: {}
});
