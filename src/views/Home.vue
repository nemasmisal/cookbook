<template>
  <div class="home">
    <img src="../assets/home-title-365x252.jpg" />
    <h1>Open your Cookbook and turn your wishes true</h1>
    <recipe-component :recipes="recipes"></recipe-component>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeService from "../core/services/recipe-service";
import RecipeComponent from "@/components/Recipe.vue";
@Options({
  components: {
    RecipeComponent,
  },
})
export default class Home extends Vue {
  recipes = [];
  async created() {
    const res = await RecipeService.getAllRecipes();
    this.recipes = res;
  }
}
</script>
