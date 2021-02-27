import { createStore } from "vuex";
import AuthState from "./modules/auth";
import RecipeState from "./modules/recipe";
import MessagesState from "./modules/messages";
import ReviewState from "./modules/review.js";

export default createStore({
  modules: {
    auth:AuthState,
    recipe:RecipeState,
    reviews:ReviewState,
    msg:MessagesState
  }
});
