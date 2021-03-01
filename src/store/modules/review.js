import ReviewService from '@/core/services/review-service';
import rootState from '../index';

const state = {};

const getters = {
  recipeReviews(state) {
    return (recipeId) => state[recipeId];
  },
};
const mutations = {
  getReviews: async (state, { recipeId }) => {
    if (state.hasOwnProperty(recipeId)) {
      return;
    }
    const reviews = await ReviewService.getReviews({ recipeId });
    state[recipeId] = [...reviews];
  },
  addReview: async (state, payload) => {
    const reviews = await ReviewService.addReview(payload);
    if (!reviews) {
      return;
    }
    state[payload.recipeId] = [...reviews];
    rootState.dispatch('msg/globalMsg', { msg: 'Review added' });
  },
};
const actions = {
  getReviews({ commit }, payload) {
    commit('getReviews', payload);
  },
  addReview({ commit }, payload) {
    commit('addReview', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
