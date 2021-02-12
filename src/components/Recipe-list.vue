<template>
  <div class="card" v-for="recipe in recipes" :key="recipe._id">
    <div class="card-title">{{ recipe.name }}</div>
    <div class="card-image">
      <img :src="recipe.imgUrl" />
    </div>
    <div class="card-content">
      <p>Author: {{ recipe.author.username }}</p>
      <button class="iconBtn">
        <i class="large material-icons" @click="toggleReveal(recipe._id)"
          >more_vert</i
        >
      </button>
      <div class="card-reveal hidden" :ref="recipe._id">
        <h3>Description:</h3>
        <p>{{ recipe.description }}</p>
        <h3>Ingrediants:</h3>
        <ul v-if="recipe.ingrediants?.length > 0">
          <li v-for="ing in recipe.ingrediants" :key="ing.id">
            <span class="quantity">{{ ing.quantity }}</span> :
            {{ ing.productName }}
          </li>
        </ul>
        <button class="iconBtn">
          <i class="material-icons" @click="toggleReveal(recipe._id)">close</i>
        </button>
      </div>
      <template v-if="username === recipe.author.username">
        <router-link :to="{ name: 'Edit-recipe', params: { id: recipe._id } }">
          <i class="large material-icons">mode_edit</i>
        </router-link>
        <button class="iconBtn" @click="removeRecipe(recipe._id)">
          <i class="large material-icons">cancel</i>
        </button>
      </template>
      <template v-else>
        <button class="iconBtn">
          <i class="large material-icons">star_border</i>
        </button>
      </template>
      <button class="iconBtn" @click="toggleSharebox(recipe._id)">
        <i class="large material-icons">share</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Options, Vue } from "vue-class-component";
import store from "@/store";
@Options({
  emits: ["toggleSharebox"],
  watch: {
    recipes: (oldV, newV) => {
      return;
    }
  }
})
export default class RecipeList extends Vue {
  created() {
    store.dispatch("getAllRecipes");
  }
  removeRecipe(id: string) {
    store.dispatch("remove", { id });
  }
  toggleReveal(id: string) {
    const el: HTMLDivElement = this.$refs[id] as HTMLDivElement;
    el.classList.contains("hidden")
      ? el.classList.replace("hidden", "vissible")
      : el.classList.replace("vissible", "hidden");
  }
  toggleSharebox(id: string) {
    this.$emit("toggleSharebox", id)
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
  max-width 450px
  margin 0 auto
  position relative
  background #e5e4e2
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
.iconBtn
  background none
  margin 0
  outline none
  border none
  color none
  :hover
    cursor pointer
.card-reveal
  position absolute
  top 0
  left 0
  padding 26px
  width 86%
  background-color #fff
  height 90%
  display grid
.quantity
  color red
.hidden
  left -100%
  opacity 0
.vissible
  opacity 1
  transition opacity 0.5s linear
</style>
