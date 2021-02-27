import RecipeService from "@/core/services/recipe-service";
import Router from "@/router/index";
import rootState from "../index";


const getters = {
  recipes: state => state.recipes
}
const actions = {
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
  }
}

const mutations = {
  getAllRecipes: async state => {
    const res = await RecipeService.getAllRecipes();
    state.recipes = [...res];
  },
  create: async (state, payload) => {
    const res = await RecipeService.create(payload);
    rootState.commit("msg/globalMsg", { msg: "Recipe created!" });
    state.recipes = [...state.recipes, res];
    Router.push("/");
  },
  update: async (state, payload) => {
    const res = await RecipeService.update(payload);
    if (!res) {
      return;
    }
    state.recipes = [...state.recipes, res];
    rootState.commit("msg/globalMsg", { msg: "Recipe updated!" });
    Router.push("/");
  },
  remove: async (state, payload) => {
    const res = await RecipeService.remove(payload);
    if (!res) {
      return;
    }
    rootState.commit("msg/globalMsg", { msg: "Recipe removed!" });
    state.recipes = state.recipes.filter(r => r._id !== payload.id);
  }
}

export default {
  namespaced: true,
  state: state,
  getters,
  actions,
  mutations
}