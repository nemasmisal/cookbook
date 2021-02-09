<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">How should we call you?</label>
    <input type="text" name="name" placeholder="Currly broccolli?" v-model="name">
    <label for="email">E-Mail</label>
    <input type="email" name="email" id="email" placeholder="email@example.com" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password">
    <label for="repeatPassword">Repeat password</label>
    <input type="password" name="repeatPassword" id="repeatPassword" v-model="repeatPassword">
    <button type="submit">Create an Account</button>
  </form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import Store from '@/store';
export default class RegisterForm extends Vue {
  name = '';
  email= '';
  password = '';
  repeatPassword = '';

  async handleSubmit() {
    const credentials = { username: this.name, email: this.email, password: this.password };
    Store.dispatch('register', credentials);
    this.$router.push('/');
  }
}
</script>

<style scoped lang="stylus">
input
  display block
  margin 5px auto
  padding 5px
</style>
