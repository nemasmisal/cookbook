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
  recipesByAuthor: (state) => state.recipesByAuthor,
  recipeById: (state) => (id) => state.recipes.find((r) => r._id === id),
};
const actions = {
  async getRecipes({ commit }, payload) {
    const res = await RecipeService.getAllRecipes(payload);
    if (!res) return;
    commit('getRecipes', res);
  },
  async create({ commit }, payload) {
    const res = await RecipeService.create(payload);
    if (!res) return;
    commit('create', res);
    rootState.dispatch('msg/globalMsg', { msg: 'Recipe created!' });
    Router.push('/');
  },
  async update({ commit }, payload) {
    const res = await RecipeService.update(payload);
    if (!res) return;
    commit('update', res);
    rootState.dispatch('msg/globalMsg', { msg: 'Recipe updated!' });
    Router.push('/');
  },
  async remove({ commit }, payload) {
    const res = await RecipeService.remove(payload);
    if (!res) return;
    commit('remove', res);
    rootState.dispatch('msg/globalMsg', { msg: 'Recipe removed!' });
    Router.push('/');
  },
  async recipesByAuthor({ commit }, payload) {
    const res = await RecipeService.recipesByAuthor(payload);
    if (!res) return;
    commit('recipesByAuthor', res);
  },
  async recipeById({ commit }, payload) {
    const res = await RecipeService.recipeById(payload);
    if (!res) return;
    commit('recipeById', res);
  },
};

const mutations = {
  getRecipes: (state, payload) => {
    state.recipes = [...payload.recipes];
    state.totalPages = payload.totalPages;
    state.totalRecipes = payload.totalRecipes;
  },
  create: (state, payload) => {
    state.recipes = [...state.recipes, payload];
  },
  update: (state, payload) => {
    state.recipes = [...state.recipes, payload];
  },
  remove: (state, payload) => {
    state.recipes = state.recipes.filter((r) => r._id !== payload._id);
  },
  recipesByAuthor: (state, payload) => {
    state.recipesByAuthor = [...payload];
  },
  recipeById: (state, payload) => {
    state.recipes = [...state.recipes, payload];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
