<template>
  <Navbar />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navbar from "@/components/Navbar.vue";

@Options({
  components: {
    Navbar
  }
})
export default class App extends Vue{}
</script>

<style lang="stylus">
primary = #2c3e50
secondary = #ff6347
html
  background #f8f8f8
*
  margin 0
  padding 0
  color primary
  text-decoration none
  list-style: none;
a
  margin 0.2em
  &:hover
    cursor pointer
button
  background secondary
  padding 5px 10px
  border 2px solid primary
  border-radius 7px
  color primary
  font-weight bold
input
  border 1px solid secondary
  padding 5px 10px
  border-radius 3px
  text-align center

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin 0 auto
</style>
