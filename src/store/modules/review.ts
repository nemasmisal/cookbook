import { ActionTree, GetterTree, MutationTree } from "vuex";
import ReviewService from "@/core/services/review-service";
import rootState from "../index";
interface Author {
  username: string;
  _id: string;
}
export interface Rev {
  author: Author;
  review: string;
}
interface Review {
  recipeId: string;
  reviews: Rev[];
}
interface State {
  reviews: Review[];
}
const state: State = {
  reviews: []
}

const getters: GetterTree<State, any> = {
  recipeReviews(state) {
    return (recipeId: string) => state.reviews.find((r: Review) => r.recipeId === recipeId);
  }
}
const mutations: MutationTree<Review> = {
  getReviews: async (state, payload) => {
    const reviews = await ReviewService.getReviews(payload);
    state.reviews = [...state.reviews, reviews];
  },
  addReview: async (state, payload) => {
    const res = await ReviewService.addReview(payload);
    if (!res) { return }
    rootState.dispatch("msg/globalMsg", { msg: "Review added" });
  }
}
const actions: ActionTree<Review, any> = {
  getReviews({ commit }, payload) {
    commit("getReviews", payload);
  },
  addReview({ commit }, payload) {
    commit("addReview", payload);
  }
}

export default {
  namespaced: true,
  state: state,
  getters,
  actions,
  mutations
}