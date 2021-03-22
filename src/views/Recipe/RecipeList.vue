<template>
  <transition-group appear tag="div" name="list" v-if="recipes.length">
    <div class="card" v-for="recipe in recipes" :key="recipe._id">
      <div class="card-title">{{ recipe.name }}</div>
      <div class="card-image">
        <img :src="recipe.imgUrl" loading="lazy" />
      </div>
      <div class="card-content">
        <p>Author: {{ recipe.author.username }}</p>
        <ShareboxComponent :recipeId="recipe._id" />
        <RevealComponent :recipe="recipe" />
        <template v-if="username === recipe.author.username">
          <router-link :to="{ name: 'EditRecipe', params: { id: recipe._id } }">
            <i class="material-icons">mode_edit</i>
          </router-link>
          <button class="iconBtn" @click="removeRecipe(recipe._id)">
            <i class="material-icons">cancel</i>
          </button>
        </template>
        <template v-else>
          <ReviewComponent :recipeId="recipe._id" />
        </template>
      </div>
    </div>
  </transition-group>
  <template v-else><h1>No recipes yet..</h1></template>
  <Pagination />
</template>
<script>
import ShareboxComponent from './Sharebox.vue';
import RevealComponent from './Reveal.vue';
import ReviewComponent from './Review.vue';
import Pagination from './Pagination.vue';
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {
    ShareboxComponent,
    RevealComponent,
    ReviewComponent,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    watch(
      () => route.query,
      ({ page }) =>
        page ? store.dispatch('recipe/getRecipes', { page, limit: 5 }) : null
    );

    store.dispatch('recipe/getRecipes', { page: 1, limit: 5 });
    const recipes = computed(() => store.getters['recipe/recipes']);
    const removeRecipe = (id) => {
      store.dispatch('recipe/remove', { id });
    };
    const username = computed(() => store.getters['auth/username']);

    return { recipes, username, removeRecipe };
  },
};
</script>

<style lang="stylus">
.material-icons
  color #ff6347
.card
  width 100%
  max-width 450px
  margin 0 auto
  position relative
  overflow-x hidden
  overflow-y hidden
  background #e5e4e2
.card img
  width 100%
.card-title
  display block
  line-height 32px
  padding 10px
  color black
  background white
  font-weight bolder
  font-size 30px
  filter blur(1px)
.card-content
  padding 10px
.iconBtn
  background none
  margin 0
  outline none
  border none
  color none
  :hover
    cursor pointer
.list-enter-from
  opacity 0
  transform scale(0.6)
.list-enter-to
  opacity 1
  transform scale(1)
.list-enter-active
  transition all 1s ease
</style>
