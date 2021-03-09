import RecipeService from '@/core/services/recipe-service';
import Router from '@/router/index';
import rootState from '../index';

const state = {
  recipes: [],
  recipesByAuthor: [],
  totalRecipes: null,
  totalPages: null,
};
const getters = {
  recipes: (state) => state.recipes,
  totalRecipes: (state) => state.totalRecipes,
  totalPages: (state) => state.totalPages,
  recipesByAuthor: (state) => state.recipesByAuthor
};
const actions = {
  getRecipes({ commit }, payload) {
    commit('getRecipes', payload);
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
  recipesByAuthor({ commit }, payload) {
    commit('recipesByAuthor', payload);
  },
};

const mutations = {
  getRecipes: async (state, payload) => {
    const res = await RecipeService.getAllRecipes(payload);
    state.recipes = [...res.recipes];
    state.totalPages = res.totalPages;
    state.totalRecipes = res.totalRecipes;
  },
  create: async (state, payload) => {
    const res = await RecipeService.create(payload);
    rootState.commit('msg/globalMsg', { msg: 'Recipe created!' });
    state.recipes = [...state.recipes, res];
    Router.push('/');
  },
  update: async (state, payload) => {
    const res = await RecipeService.update(payload);
    if (!res) {
      return;
    }
    state.recipes = [...state.recipes, res];
    rootState.commit('msg/globalMsg', { msg: 'Recipe updated!' });
    Router.push('/');
  },
  remove: async (state, payload) => {
    const res = await RecipeService.remove(payload);
    if (!res) return;
    rootState.commit('msg/globalMsg', { msg: 'Recipe removed!' });
    state.recipes = state.recipes.filter((r) => r._id !== payload.id);
  },
  recipesByAuthor: async (state, payload) => {
    const res = await RecipeService.recipesByAuthor(payload);
    if(!res) return;
    state.recipesByAuthor = [...res];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
