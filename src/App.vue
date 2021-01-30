<template>
  <Navbar />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';

@Options({
  components: {
    Navbar
  }
})
export default class App extends Vue{}
</script>

<style lang="stylus">
*
  margin 0
  padding 0
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin 0 auto
</style>
