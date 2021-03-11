<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <template v-if="id">
      <router-link :to="{ name: 'CreateRecipe' }">Create</router-link>
      <router-link :to="{ name: 'Profile' }"
        >Profile</router-link
      >
      <router-link to="/" @click="handleLogout">Logout</router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Register</router-link>
    </template>
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
</template>
<script>
import { computed } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const handleLogout = () => {
      store.dispatch('auth/logout');
    };
    const id = computed(() => store.state.auth.id);
    return { handleLogout, id };
  },
};
</script>

<style scoped lang="stylus">
#nav
 background #ff6347
 padding 0.5em
a:hover
    color #e5e4e2
</style>
