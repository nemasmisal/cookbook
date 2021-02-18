<template>
  <RecipeForm :existingRecipe="recipe" @handleSubmit="updateRecipe" />
</template>

<script lang="ts">
import { Recipe } from "@/core/models/recipe";
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import RecipeForm from "@/components/Recipe-form.vue";
import Store from "@/store";
@Options({
  components: {
    RecipeForm
  }
})
export default class Edit extends Vue {
  recipe: Recipe | undefined;
  get recipeId() {
    const { id } = this.$router.currentRoute.value.params;
    return id;
  }
  created() {
    this.recipe = store.state.recipe.recipes.find((r:any) => r._id === this.recipeId);
  }
  updateRecipe(payload: Recipe) {
    Store.dispatch("recipe/update", payload);
  }
}
</script>
<style></style>
