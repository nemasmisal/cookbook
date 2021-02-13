<template>
  <RecipeForm :existingRecipe="recipe" @handleSubmit="updateRecipe" />
</template>

<script lang="ts">
import { IRecipe } from "@/core/models/recipe";
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
  recipe: IRecipe | undefined;
  get recipeId() {
    const { id } = this.$router.currentRoute.value.params;
    return id;
  }
  created() {
    this.recipe = store.state.recipes.find(r => r._id === this.recipeId);
  }
  updateRecipe(payload: IRecipe) {
    Store.dispatch("update", payload);
  }
}
</script>
<style></style>
