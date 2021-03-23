<template>
  <template v-if="recipe">
    <div class="card">
      <div class="card-title">{{ recipe.name }}</div>
      <div class="card-image">
        <img :src="recipe.imgUrl" loading="lazy" />
      </div>
      <div class="card-content">
        <p>Author: {{ recipe.author.username }}</p>
        <div class="share">
          <h2>Share your favorite recipe !</h2>
          <ul>
            <li>
              <a :href="hrefs.fb"> Facebook</a>
            </li>
            <li>
              <a :href="hrefs.twit">Twitter</a>
            </li>
            <li>
              <a :href="hrefs.pint">Pinterest</a>
            </li>
          </ul>
        </div>
        <div class="card-reveal">
          <h3>Description:</h3>
          <p>{{ recipe.description }}</p>
          <h3>Ingrediants:</h3>
          <ol>
            <li v-for="ing in recipe.ingrediants" :key="ing.id">
              <span class="quantity">{{ ing.quantity }}</span>
              {{ ing.productName }}
            </li>
          </ol>
        </div>
        <template v-if="username === recipe.author.username">
          <router-link :to="{ name: 'EditRecipe', params: { id: recipe._id } }">
            <i class="material-icons">mode_edit</i>
          </router-link>
          <button class="iconBtn" @click="removeRecipe(recipe._id)">
            <i class="material-icons">cancel</i>
          </button>
        </template>
        <template v-else>
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
          </div>
        </template>
      </div>
    </div>
  </template>
  <template v-else><h3>Invalid recipe id</h3> </template>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import {
  useRemoveRecipe,
  useAddReview,
  useCanWriteReview,
  useSymbolsLeft,
  useHrefs,
} from '@/composables';
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const username = computed(() => store.getters['auth/username']);
    const userId = computed(() => store.getters['auth/id']);
    const textArea = ref('');
    const { id } = route.params;
    store.dispatch('recipe/recipeById', { id });
    store.dispatch('reviews/getReviews', { id });
    const recipe = computed(
      () => store.getters['recipe/recipeById'](id) || null
    );
    const reviews = computed(
      () => store.getters['reviews/recipeReviews'](id) || []
    );
    const { removeRecipe } = useRemoveRecipe();
    const { addReview } = useAddReview(store, textArea, id, userId);
    const { canWriteReview } = useCanWriteReview(reviews, userId);
    const { symbolsLeft } = useSymbolsLeft(textArea);
    const { hrefs } = useHrefs(id);

    return {
      recipe,
      userId,
      addReview,
      symbolsLeft,
      reviews,
      canWriteReview,
      textArea,
      username,
      removeRecipe,
      hrefs,
    };
  },
};
</script>

<style lang="stylus" scoped>
.card
  max-width 650px
  margin-bottom 40px
h2,
h3
  margin 5px
.share
  > ul
      margin 10px
      > li
          display inline
          > a
              color #ff6347
.card-reveal
  > ol
      margin 10px
      > li
          text-align start
          list-style decimal
          padding-left 10px
          margin-left 10px
.quantity
  color red
</style>
