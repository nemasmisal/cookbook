<template>
  <div class="home">
    <img src="../assets/home-title-365x252.jpg" />
    <h1>Open your Cookbook and turn your wishes true</h1>
    <RecipeComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeComponent from "@/components/Recipe.vue";
@Options({
  components: {
    RecipeComponent
  }
})
export default class Home extends Vue {}
</script>
