<template>
  <div class="card" v-for="recipe in recipes" :key="recipe._id">
    <div class="card-title">{{ recipe.name }}</div>
    <div class="card-image">
      <img :src="recipe.imgUrl" />
    </div>
    <div class="card-content">
      <p>Description: {{ recipe.description }} <span class="large material-icons" @click="toggleReveal(recipe._id)">more_vert</span></p>
      <p>Ingrediants:</p>
      <ul v-if="recipe.ingrediants?.length > 0">
        <li v-for="ing in recipe.ingrediants" :key="ing.id">{{ ing.quantity }} : {{ ing.productName }}</li>
      </ul>
      <p>Author: {{ recipe.author.username }}</p>
      <template v-if="username === recipe.author.username">
        <router-link :to="{name: 'Edit-recipe', params: { id: recipe._id }}">
          <i class="large material-icons">mode_edit</i>
        </router-link>
        <button class="removeBtn" @click="removeRecipe(recipe._id)">
          <i class="large material-icons">cancel</i>
        </button>
      </template>
      <template v-else>
        <i class="large material-icons">star_border</i>
      </template>
      <i class="large material-icons">share</i>
      <div class="card-reveal hidden" :ref="recipe._id">
      <span>Card Title<i class="material-icons" @click="toggleReveal(recipe._id)">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Options, Vue } from "vue-class-component";
import store from "@/store";
@Options({
  watch: {
    recipes: value => { return value }
  }
})
export default class RecipeList extends Vue {
  
  created() {
    store.dispatch("getAllRecipes");
  }
  removeRecipe(id: string) {
    store.dispatch('remove', { id });
  }
  toggleReveal(id:string) {
    const el: HTMLDivElement = this.$refs[id] as HTMLDivElement;
    el.classList.contains('hidden')? el.classList.replace('hidden', 'vissible'):el.classList.replace('vissible', 'hidden');
  }
  get recipes() {
    return store.state.recipes;
  }
  get username() {
    return store.state.auth.username;
  }
}
</script>
<style scoped lang="stylus">
.material-icons
  color #ff6347
.card 
  width 100%
  position relative
  background #e5e4e2
  z-index 1
.card img 
  width 100%
.card-title 
  display block
  line-height 32px
  padding 10px
  color black
  background white
  font-weight bolder
  font-size 30px
  filter blur(1px)
.card-content
  padding 10px
.removeBtn
  background none
  margin 0
  border none
  color none
.card-reveal
  position absolute
  top 0
  left 0
  padding 26px
  width 86%
  background-color #fff
  height 90%
.hidden
  left -100%
  opacity 0
  transition opacity 0.5s linear
.vissible
  opacity 1
  transition opacity 0.5s linear
</style>