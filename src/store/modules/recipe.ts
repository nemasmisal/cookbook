import RecipeService from "@/core/services/recipe-service";
import Router from "@/router/index";
import { Recipe } from "@/core/models";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import rootState from "../index";

interface RecipeState {
  recipes: Recipe[];
}
const state: RecipeState = {
  recipes: []
}
const getters: GetterTree<RecipeState, any> = {
  recipes: state => state.recipes
}
const actions: ActionTree<RecipeState, any> = {
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

const mutations: MutationTree<RecipeState> = {
  getAllRecipes: async state => {
    const res: [] = await RecipeService.getAllRecipes();
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