<template>
  <button class="iconBtn">
    <i class="large material-icons" @click="toggleReveal()">more_vert</i>
  </button>
  <transition name="reveal">
    <div class="card-reveal" v-if="isVissible">
      <h3>Description:</h3>
      <h3>{{ recipe.description }}</h3>
      <h3>Ingrediants:</h3>
      <ul>
        <li v-for="ing in recipe.ingrediants" :key="ing.id">
          <span class="quantity">{{ ing.quantity }}</span> :
          {{ ing.productName }}
        </li>
      </ul>
      <button class="iconBtn" @click="toggleReveal()">
        <i class="material-icons" >close</i>
      </button>
    </div>
  </transition>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IRecipe } from "@/core/models";
class Props {
  recipe!: IRecipe;
}
@Options({})
export default class Reveal extends Vue.with(Props) {
  isVissible = false;
  toggleReveal() {
    this.isVissible = !this.isVissible;
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
  position absolute
  width 100%
  max-width 450px
  top 0
  margin 0 auto
  padding 26px
  background-color #fff
  display grid
  z-index 10
  border 2px solid #ff6347
  border-radius 20px
.quantity
  color red
.iconBtn
  background none
  margin 0
  outline none
  border none
  color none
  :hover
    cursor pointer
.material-icons
  color #ff6347
</style>