<template>
 <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/login" v-if="!auth.id">Login</router-link>
    <router-link to="/register" v-if="!auth.id">Register</router-link>
    <router-link to="/register" v-if="auth.id">Logout</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Navbar extends Vue {
  get auth() {
    console.log(store.state.auth.id)
    return store.state.auth
  }
}
</script>

<style scoped lang="stylus">
#nav
 background #ff6347
 padding 0.5em
</style>
