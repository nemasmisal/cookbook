<template>
  <h2>Top Recipes</h2>
  <div class="card" v-for="recipe in recipes" :key="recipe._id">
    <div class="card-image">
      <img :src="recipe.imgUrl" />
      <span class="card-title">{{ recipe.name }}</span>
    </div>
    <div class="card-content">
      <p>Description: {{ recipe.description }}</p>
      <p>Ingrediants:</p>
      <ul v-if="recipe.ingrediants?.length > 0">
        <li v-for="ing in recipe.ingrediants" :key="ing.id">{{ ing.quantity }}: {{ ing.productName }}</li>
      </ul>
      <p>Author: {{ recipe.author.username }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
@Options({
  watch: {
    recipes: function(_, newValue) {
      console.log(newValue)
    }
  }
})
export default class Recipe extends Vue {
  allRecipes = () => store.state.recipes;
  
  created() {
    store.dispatch("getAllRecipes");
  }

  get recipes() {
    return this.allRecipes();
  }
}
</script>
<style scoped lang="stylus">
.card 
  width 100%
  position relative
  padding 10px 0
.card img 
  width 100%
.card-title 
  position absolute
  top 8px
  left 0
  max-width 100%
  padding 10px
  color black
  background white
  font-weight bolder
  font-size 30px
  filter blur(1px)
.card-content
  padding 10px 0
</style>