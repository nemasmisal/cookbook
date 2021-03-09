<template>
  <h3>Public Recipes</h3>
  <ul>
    <li v-for="recipe in publicRecipes" :key="recipe._id">{{ recipe.name }}</li>
  </ul>
  <h3>Private Recipes</h3>
  <li v-for="recipe in privateRecipes" :key="recipe._id">{{ recipe.name }}</li>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const author = ref(store.state.auth.id);
    store.dispatch('recipe/recipesByAuthor', { author: author.value });
    const recipes = computed(() => store.getters['recipe/recipesByAuthor']);
    const publicRecipes = ref([]);
    const privateRecipes = ref([]);
    const splitRecipes = (recipes) => {
      const separatedRecipes = recipes.reduce(
        (agg, curr) => {
          curr.type.toLowerCase() === 'public'
            ? agg.publicRecipes.push(curr)
            : agg.privateRecipes.push(curr);
          return agg;
        },
        { publicRecipes: [], privateRecipes: [] }
      );
      publicRecipes.value = [...separatedRecipes.publicRecipes];
      privateRecipes.value = [...separatedRecipes.privateRecipes];
    };
    watch(recipes, splitRecipes);
    return { publicRecipes, privateRecipes };
  },
};
</script>

<style lang="stylus" scoped>
h3
  margin 5px
  padding 5px
li
  list-style decimal
  color #2c3e50
  text-align start
  padding 5px 20px
  margin 0 auto
  font-size 15px
  max-width 70%
li:nth-child(even)
  background #e5e4e2
</style>
