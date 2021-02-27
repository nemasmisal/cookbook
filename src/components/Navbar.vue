<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <template v-if="id()">
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
<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const handleLogout = () => {
      store.dispatch('auth/logout');
    };
    const id = () => store.state.auth.id;
    return { handleLogout, id };
  },
};
</script>

<style scoped lang="stylus">
#nav
 background #ff6347
 padding 0.5em
</style>
