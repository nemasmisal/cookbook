import { createStore, Store } from "vuex";
import RecipeService from "@/core/services/recipe-service";
import AuthService from "@/core/services/auth-service";
import ReviewService from "@/core/services/review-service";
import Router from "@/router/index";
import { Recipe } from "@/core/models";

interface Auth {
  username: string;
  id: string;
  email: string;
}

interface Review {
  recipeId : string;
  reviews: [];
}

interface State {
  auth: Auth;
  recipes: Recipe[];
  reviews: Review[];
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
  reviews: [],
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
      state.msg = "Successfully logged in";
      Router.push("/");
    },
    logout: async state => {
      await AuthService.logout();
      state.msg = "Successfully logged out";
      state.auth = { username: "", email: "", id: "" };
      Router.push("/");
    },
    register: async (state, payload) => {
      const res = await AuthService.register(payload);
      if (!res) {
        return;
      }
      state.msg = "Successfully registered!";
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
      Router.push("/");
    },
    update: async (state, payload) => {
      const res = await RecipeService.update(payload);
      if (!res) {
        return;
      }
      state.msg = "Recipe updated!";
      state.recipes = [...state.recipes, res];
      Router.push("/");
    },
    remove: async (state, payload) => {
      const res = await RecipeService.remove(payload);
      if (!res) {
        return;
      }
      state.msg = "Recipe removed!";
      state.recipes = state.recipes.filter(r => r._id !== payload.id);
    },
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
    },
    getReviews: async (state, payload) => {
      const existing = state.reviews.find(r => r.recipeId === payload.recipeId);
      if(existing) { return }
      const reviews = await ReviewService.getReviews(payload);
      state.reviews = [...state.reviews,reviews];
    },
    addReview: async (state, payload) => {
      const res = await ReviewService.addReview(payload);
      if(!res) { return }
      state.msg = "Review added";
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
    update({ commit }, payload) {
      commit("update", payload);
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
    },
    getReviews({ commit }, payload) {
      commit("getReviews", payload);
    },
    addReview({ commit }, payload) {
      commit("addReview", payload);
    }
  },
  modules: {}
});
