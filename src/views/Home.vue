<template>
  <div>
    <div>
      <img src="../assets/home-title-365x252.jpg" />
      <h2>Open your Cookbook and turn your wishes true</h2>
      <h3>Top Recipes</h3>
    </div>
    <RecipeListComponent />
  </div>
</template>

<script>
import RecipeListComponent from '@/views/Recipe/RecipeList.vue';
export default {
  components: { RecipeListComponent },
};
</script>

<style lang="stylus" scoped>
h1,
h2
  margin 10px auto
</style>
