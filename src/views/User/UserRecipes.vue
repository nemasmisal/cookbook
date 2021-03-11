<template>
  <ol>
    <li v-for="recipe in recipes" :key="recipe._id">{{ recipe.name }}</li>
  </ol>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      requared: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
li
  list-style decimal
  color #2c3e50
  text-align start
  padding 5px 20px
  margin 5px auto
  font-size 15px
  max-width 70%
li:nth-child(odd)
  background #e5e4e2
</style>
