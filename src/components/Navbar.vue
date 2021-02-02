<template>
 <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String
  }
})
export default class Navbar extends Vue {
  msg!: string;
}
</script>

<style scoped lang="stylus">
#nav
 background #ff6347
 padding 0.5em
</style>
