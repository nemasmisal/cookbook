<template>
  <div class="home">
    <div class="jumbotron">
      <img src="../assets/home-title-365x252.jpg" />
      <h1>Open your Cookbook and turn your wishes true</h1>
      <h2>Top Recipes</h2>
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
