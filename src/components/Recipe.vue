<template>
  <div class="card" v-for="recipe in recipes" :key="recipe.id">
    <div class="card-image">
      <img :src="recipe.imgUrl" />
      <span class="card-title">{{ recipe.name }}</span>
    </div>
    <div class="card-content">
      <p>Description: {{ recipe.description }}</p>
      <p>Ingrediants:</p>
      <ul>
        <li v-for="ing in recipe.ingrediants" :key="ing">{{ ing }}</li>
      </ul>
      <p>Author: {{ recipe.author.username }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    recipes: {
      type: Array,
      required: true,
      default: [],
      validator: (v: []) => Array.isArray(v),
    },
  },
})
export default class Recipe extends Vue {}
</script>
<style scoped lang="stylus">
.card 
  width: 100%
  position: relative
  padding 10px 0
.card img 
  width: 100%
.card-title 
  position: absolute;
  bottom: 100px
  left: 0
  max-width: 100%
  padding: 24px
  color: #fff
  font-weight: bolder
  font-size: 30px
  filter: blur(1px)
.card-content
  padding 10px 0
</style>