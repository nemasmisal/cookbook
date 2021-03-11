<template>
  <h1>Select Recipes Type</h1>
  <h3 @click="showRecipes('public')">Public Recipes</h3>
  <h3 @click="showRecipes('private')">Private Recipes</h3>
  <UserRecipes :recipes="recipes" />
</template>

<script>
import { computed, ref, watch } from 'vue';
import UserRecipes from './UserRecipes.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: { UserRecipes },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const author = ref(store.state.auth.id);
    store.dispatch('recipe/recipesByAuthor', { author: author.value });

    const allRecipes = computed(() => store.getters['recipe/recipesByAuthor']);
    const recipes = ref([]);
    watch(
      () => route.params,
      ({ category }) => {
        category === 'private'
          ? splitRecipes('private')
          : splitRecipes('public');
      }
    );
    const splitRecipes = (type) => {
      recipes.value = allRecipes.value.filter(
        (r) => r.type == type
      );
    };
    const showRecipes = (type) => {
      router.push({ params: { category: type } });
    };
    return { recipes, showRecipes };
  },
};
</script>

<style lang="stylus" scoped>
h1
  margin 20px
h3
  margin 10px
  padding 5px
  display inline-block
  &:hover
    cursor pointer
    color #ff6347
</style>
