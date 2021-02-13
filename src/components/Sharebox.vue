<template>
  <button class="iconBtn" @click="toggleSharebox()">
    <i class="large material-icons">share</i>
  </button>
  <div v-if="isVissible" class="share">
    <h2>Share your favorite recipe !</h2>
    <ul>
      <li>
        <a :href="'https://www.facebook.com/sharer.php?u=http://localhost:8080/recipe/details/' + recipeId">
          <i class="material-icons">facebook</i>Facebook</a>
      </li>
      <li>
        <a :href="'https://twitter.com/intent/tweet?url=http://localhost:8080/recipe/details/' + recipeId + '&text='">Twitter</a>
      </li>
      <li>
        <a :href="'https://pinterest.com/pin/create/button/?url=http://localhost:8080/recipe/details/' + recipeId + '&media=&description='">Pinterest</a>
      </li>
    </ul>
    <button @click="toggleSharebox()">Close</button>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
class Props {
  recipeId!: string;
}
export default class Sharebox extends Vue.with(Props) {
  isVissible = false;
  toggleSharebox() {
    this.isVissible = !this.isVissible;
  }
}
</script>
<style lang="stylus" scoped>
.share
  background white
  margin 0 auto
  position fixed
  top 200px
  border 1px solid #ff6347
  border-radius 20px
  padding 10px
  z-index 10
a
  color black
</style>
