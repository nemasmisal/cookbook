<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <template v-if="id">
      <router-link to="/create">Create</router-link>
      <router-link to="/" @click="handleLogout">Logout</router-link>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </template>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Navbar extends Vue {
  
  handleLogout() {
    store.dispatch("auth/logout");
  }
  get id() {
    return store.state.auth.id;
  }
}
</script>

<style scoped lang="stylus">
#nav
 background #ff6347
 padding 0.5em
</style>
