<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <input type="email" name="email" placeholder="email@example.com" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import store from '@/store';
import { Vue } from 'vue-class-component';
export default class LoginForm extends Vue {
  email = '';
  password = '';

  handleSubmit() {
    const credentials = { email: this.email, password: this.password };
    store.dispatch('login', credentials)
    this.$router.push('/');
  }
}
</script>

<style scoped lang="stylus">
form 
  margin-top 2em
input
  display block
  margin 5px auto
  padding 5px
</style>