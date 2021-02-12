<template>
  <div class="home">
    <div class="jumbotron">
      <img src="../assets/home-title-365x252.jpg" />
      <h1>Open your Cookbook and turn your wishes true</h1>
      <h2>Top Recipes</h2>
    </div>
    <ShareboxComponent @toggleSharebox="toggleSharebox" :id="recipeId"/>
    <RecipeListComponent @toggleSharebox="toggleSharebox"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeListComponent from "@/components/Recipe-list.vue";
import ShareboxComponent from "@/components/Sharebox.vue";
@Options({
  components: {
    RecipeListComponent,
    ShareboxComponent
  }
})
export default class Home extends Vue {
  recipeId = "";
  toggleSharebox(id:string) {
    this.recipeId = id || "";
  }
}
</script>
<style lang="stylus" scoped>
h1,
h2
  margin 10px auto
</style>
