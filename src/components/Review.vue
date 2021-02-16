<template>
  <button class="iconBtn" @click="toggleReview()">
     <i class="large material-icons">star_border</i>
  </button>
  <transition name="reviews">
    <template v-if="isVissible">
      <div class="review">
        <h4>Reviews</h4>
        <ul v-if="reviews.reviews.length">
          <li v-for="review in reviews.reviews" :key="review._id">{{review.author.username}} : {{review.review}}</li>
        </ul>
        <p v-else>No reviews yet</p>
        <button class="iconBtn" @click="toggleReview"><i class="material-icons">close</i></button>
      </div>
    </template>
  </transition>
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
    return reviews;
  }
  toggleReview() {
    this.isVissible = !this.isVissible;
  }
}
</script>
<style lang="stylus" scoped>
.reviews-enter-from
  transform translateX(100%)
.reviews-enter-to
  transform translateX(0%)
.reviews-enter-active
  transition  all 1s ease
.reviews-leave-from
  transform translateX(0%)
.reviews-leave-to
  transform translate(100%)
.reviews-leave-active
  transition all 1s ease
.review
  position absolute
  top 0
  right 0
  overflow-y auto
  width 60%
  height 90%
  max-width 450px
  margin 0 auto
  padding 26px
  background-color #e5e4e2
  display grid
</style>