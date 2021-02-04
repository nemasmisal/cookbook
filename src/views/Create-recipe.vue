<template>
    <h1>Share your tasty ideas with others!</h1>
    <RecipeForm />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeForm from "@/components/Recipe-form.vue";
@Options({
  components: {
    RecipeForm
  }
})
export default class CreateRecipe extends Vue {}
</script>
<style lang="stylus" scoped>

</style>