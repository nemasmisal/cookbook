import ReviewService from '@/core/services/review-service';
import rootState from '../index';

const state = {};

const getters = {
  recipeReviews: (state) => (recipeId) => state[recipeId] || [],
};
const mutations = {
  getReviews: (state, { recipeId, reviews }) => {
    state[recipeId] = [...reviews];
  },
  addReview: (state, { recipeId, reviews }) => {
    state[recipeId] = [...reviews];
  },
};
const actions = {
  async getReviews({ commit }, { id }) {
    const reviews = await ReviewService.getReviews({ id });
    if (!reviews) return;
    commit('getReviews', { recipeId: id, reviews });
  },
  async addReview({ commit }, payload) {
    const reviews = await ReviewService.addReview(payload);
    if (!reviews) return;
    commit('addReview', { recipeId: payload.recipeId, reviews });
    rootState.dispatch('msg/globalMsg', { msg: 'Review added' });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
