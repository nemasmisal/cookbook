<template>
  <ValidationInfo :fields="props" />
  <h1>Share your tasty ideas with others!</h1>
  <RecipeForm @handleSubmit="registerRecipe" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeForm from "@/components/Recipe-form.vue";
import ValidationInfo from "@/components/Validation-info.vue";
import { IRecipe } from "@/core/models";
import Store from "@/store";
@Options({
  components: {
    RecipeForm,
    ValidationInfo
  }
})
export default class CreateRecipe extends Vue {
  private requarements = [
    {
      name: "Name",
      reqs: [
        "min 4 characters",
        "max 20 characters",
        "Only english letters and/or numbers",
        "No spaces,special characters allowed"
      ]
    },
    { name: "Description", reqs: ["min 20 characters", "max 200 characters"] },
    { name: "Cover link", reqs: ["starting with http:// or https://"] },
    {
      name: "Ingrediants",
      reqs: ["Quantity - only numbers", "gr/kg/ml or empty for pieces"]
    },
    {
      name: "Type",
      reqs: ["Public - everyone can read it", "Private - only you can see it"]
    }
  ];
  public get props() {
    return this.requarements;
  }
  registerRecipe(payload: IRecipe) {
    Store.dispatch("create", payload);
    this.$router.push("/");
  }
}
</script>
<style lang="stylus" scoped>
h1
  margin-top 20px
form
  margin-top 10px
</style>
