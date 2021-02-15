<template>
  <button class="iconBtn">
    <i class="large material-icons" @click="toggleReveal()">more_vert</i>
  </button>
  <transition name="reveal">
    <div class="card-reveal" v-if="isVissible">
      <h3>Description:</h3>
      <p>{{ recipe.description }}</p>
      <h3>Ingrediants:</h3>
      <ul>
        <li v-for="ing in recipe.ingrediants" :key="ing.id">
          <span class="quantity">{{ ing.quantity }}</span> :
          {{ ing.productName }}
        </li>
      </ul>
      <button class="iconBtn" @click="toggleReveal()">
        <i class="material-icons">close</i>
      </button>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Recipe } from "@/core/models";

class Props {
  recipe!: Recipe;
}

export default class Reveal extends Vue.with(Props) {
  isVissible = false;
  toggleReveal() {
    this.isVissible = !this.isVissible;
  }
}
</script>
<style lang="stylus" scoped>
.reveal-enter-from
  transform translateY(100%)
.reveal-enter-to
  transform translateY(0%)
.reveal-enter-active
  transition all 1s ease
.reveal-leave-from
  transform translateY(0%)
.reveal-leave-to
  transform translateY(100%)
.reveal-leave-active
  transition all 1s ease
.card-reveal
  position absolute
  top 0
  left 0
  overflow-y auto
  width 86%
  height 90%
  max-width 450px
  margin 0 auto
  padding 26px
  background-color #e5e4e2
  display grid
.quantity
  color red
</style>
