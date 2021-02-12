<template>
  <div class="home">
    <div class="jumbotron">
      <img src="../assets/home-title-365x252.jpg" />
      <h1>Open your Cookbook and turn your wishes true</h1>
      <h2>Top Recipes</h2>
    </div>
    <ShareboxComponent @toggleSharebox="toggleSharebox" :id="shareBoxId"/>
    <RevealComponent :recipeId="revealId" @toggleReveal="toggleReveal" />
    <RecipeListComponent @toggleSharebox="toggleSharebox" @toggleReveal="toggleReveal"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RecipeListComponent from "@/components/Recipe-list.vue";
import ShareboxComponent from "@/components/Sharebox.vue";
import RevealComponent from "@/components/Reveal.vue"

@Options({
  components: {
    RecipeListComponent,
    ShareboxComponent,
    RevealComponent
  }
})
export default class Home extends Vue {
  shareBoxId = "";
  revealId = "";
  toggleSharebox(id:string) {
    this.shareBoxId = id || "";
  }
  toggleReveal(id: string) {
    this.revealId = id || "";
  }
}
</script>
<style lang="stylus" scoped>
h1,
h2
  margin 10px auto
</style>
