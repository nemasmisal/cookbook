import { ActionTree, GetterTree, MutationTree } from "vuex";
import ReviewService from "@/core/services/review-service";
import rootState from "../index";
interface Author {
  username: string;
  _id: string;
}
interface Review {
  author: Author;
  review: string;
}
interface State {
  [key: string]: Review[];
}
const state: State = {};

const getters: GetterTree<State, any> = {
  recipeReviews(state) {
    console.log(state)
    return (recipeId: string) => state[recipeId];
  }
}
const mutations: MutationTree<Review> = {
  getReviews: async (state, { recipeId }) => {
    if (state.hasOwnProperty(recipeId)) {
      console.log(state)
      return;
    }
    console.log(state)
    const reviews: Review = await ReviewService.getReviews({ recipeId });
    Object.assign(state, { ...reviews });
    console.log(state)
  },
  addReview: async (state, { recipeId }) => {
    const res: Review = await ReviewService.addReview({ recipeId });
    if (!res) { return }
    console.log(state)
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