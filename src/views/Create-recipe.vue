<template>
    <h1>Share your tasty ideas with others!</h1>
    <RecipeForm @handleSubmit="registerRecipe"/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeForm from "@/components/Recipe-form.vue";
import { IRecipe } from "@/core/models";
import Store from "@/store";
@Options({
  components: {
    RecipeForm
  }
})
export default class CreateRecipe extends Vue {
  registerRecipe(payload:IRecipe) {
    Store.dispatch('create', payload);
    this.$router.push('/');
  }
}
</script>
<style lang="stylus" scoped>

</style>