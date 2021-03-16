<template>
  <button class="iconBtn" @click="toggleReview()">
    <i class="material-icons">star_border</i>
  </button>
  <transition name="reviews">
    <template v-if="isVissible">
      <div class="review">
        <h4>Reviews</h4>
        <ul v-if="reviews.length">
          <li v-for="review in reviews" :key="review._id">
            {{ review.author.username }} : {{ review.review }}
          </li>
        </ul>
        <p v-else>No reviews yet</p>
        <template v-if="userId && canWriteReview">
          <form @keypress.enter="addReview()">
            <label>Short review, symbols left: {{ symbolsLeft() }}</label>
            <textarea maxlength="60" v-model="textArea"></textarea>
            <p>Press ENTER to SUBMIT</p>
          </form>
        </template>
        <button class="iconBtn" @click="toggleReview">
          <i class="material-icons">close</i>
        </button>
      </div>
    </template>
  </transition>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  props: { recipeId: { type: String, required: true } },
  setup(props) {
    const store = useStore();
    store.dispatch('reviews/getReviews', { recipeId: props.recipeId });
    const reviews = computed(() => store.getters['reviews/recipeReviews'](props.recipeId));
    const userId = computed(() => store.getters['auth/id']); 
    const isVissible = ref(false);
    const textArea = ref('');
    const canWriteReview = computed(
      () => !reviews.value.find((r) => r.author._id === userId.value)
    );
    const addReview = () => {
      store.dispatch('reviews/addReview', {
        review: textArea.value,
        recipeId: props.recipeId,
        author: userId.value,
      });
    };
    const symbolsLeft = () => {
      return 60 - textArea.value.length;
    };

    const toggleReview = () => {
      isVissible.value = !isVissible.value;
    };
    return {
      reviews,
      textArea,
      userId,
      isVissible,
      canWriteReview,
      addReview,
      symbolsLeft,
      toggleReview,
    };
  },
};
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
