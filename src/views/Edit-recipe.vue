<template>
 <RecipeForm :existingRecipe="recipe"/>
</template>

<script lang="ts">
import { IRecipe } from "@/core/models";
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import RecipeForm from "@/components/Recipe-form.vue";
@Options({
  components: {
    RecipeForm
  }
})
export default class Edit extends Vue {
 recipe: IRecipe | undefined;
created() {
    const { id } = this.$router.currentRoute.value.params
    this.recipe = store.state.recipes.find(r => r._id === id);
  }
}
</script>
<style></style>