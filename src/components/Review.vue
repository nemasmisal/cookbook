<template>
  <button class="iconBtn" @click="toggleReview()">
     <i class="large material-icons">star_border</i>
  </button>
    <template v-if="isVissible">
      <h4>Reviews</h4>
      <ul v-if="reviews.reviews.length">
        <li v-for="review in reviews.reviews" :key="review._id">{{review.author.username}} : {{review.review}}</li>
      </ul>
      <p v-else>No reviews yet</p>
    </template>
</template>
<script lang="ts">
import store from "@/store";
import { Vue } from "vue-class-component";
class Props {
  recipeId!: string;
}
export default class Review extends Vue.with(Props) {
  created() {
    store.dispatch("getReviews", { recipeId: this.recipeId });
  }
  isVissible = false;
  get reviews() {
    const reviews = store.state.reviews.find(r => r.recipeId === this.recipeId);
    console.log(reviews)
    return reviews;
  }
  toggleReview() {
    this.isVissible = !this.isVissible;
  }
}
</script>
<style lang="stylus" scoped>

</style>