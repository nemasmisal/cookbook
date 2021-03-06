<template>
  <RecipeForm :existingRecipe="recipe" @handleSubmit="updateRecipe" />
</template>
<script>
import RecipeForm from './RecipeForm.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components: { RecipeForm },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { id } = router.currentRoute.value.params;
    const recipe = store.state.recipe.recipes.find((r) => r._id === id);
    const updateRecipe = (payload) => {
      store.dispatch('recipe/update', payload);
    };
    return { recipe, updateRecipe };
  },
};
</script>
<style></style>
