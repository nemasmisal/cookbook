<template>
  <transition name="reveal">
    <div class="card-reveal" v-if="recipeId">
      <h3>Description:</h3>

      <p>{{ recipe.description }}</p>
      <h3>Ingrediants:</h3>
      <ul>
        <li v-for="ing in recipe.ingrediants" :key="ing.id">
          <span class="quantity">{{ ing.quantity }}</span> :
          {{ ing.productName }}
        </li>
      </ul>
      <button class="iconBtn">
        <i class="material-icons" @click="toggleReveal()">close</i>
      </button>
    </div>
  </transition>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
class Props {
  recipeId!: string;
}
@Options({
  emits: ["toggleReveal"],
  data() {
    const recipe = store.state.recipes.find(r => r._id === this.recipeId) || {}
    return { recipe }
  },
  watch: {
 
    recipeId: function(newV) {
      this.recipe = store.state.recipes.find(r => r._id === newV);
    }
  }
})
export default class Reveal extends Vue.with(Props) {

  toggleReveal() {
    this.$emit("toggleReveal")
  }
}
</script>
<style lang="stylus" scoped>
.reveal-enter-from 
  opacity 0
.reveal-enter-to
  opacity 1
.reveal-enter-active
  transition all 1s ease
.reveal-leave-from
  opacity 1
.reveal-leave-to
  opacity 0
.reveal-leave-active
  transition all 1s ease
.card-reveal
  position fixed
  width 100%
  max-width 450px
  top 20%
  left 10%
  padding 26px
  background-color #fff
  display grid
  z-index 10
  border 2px solid #ff6347
  border-radius 20px
.quantity
  color red
</style>