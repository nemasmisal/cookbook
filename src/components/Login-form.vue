<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <input type="email" name="email" placeholder="email@example.com" v-model="email" :class="{ 'error' : form.errors.email }">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" :class="{ 'error' : form.errors.password }">
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import store from '@/store';
import { Vue } from 'vue-class-component';
export default class LoginForm extends Vue {
  email = '';
  password = '';
  form = {
    errors: {
      email: false,
      password: false
    }
  }
  validateInput() {
    const reqs = {
      emailPattern: new RegExp(/^[a-zA-Z1-9_-]+@[a-zA-Z1-9]+\.{1}[a-zA-Z]+$/),
      emailMaxLength: 40,
      passwordPattern: new RegExp(/^[a-zA-Z1-9]{4,20}$/)
    }
    this.form.errors.email = !reqs.emailPattern.test(this.email) || reqs.emailMaxLength < this.email.length;
    this.form.errors.password = !reqs.passwordPattern.test(this.password);
    return this.form.errors.email || this.form.errors.password
  }
  handleSubmit() {
    if (this.validateInput()) { return };
    const credentials = { email: this.email, password: this.password };
    store.dispatch('login', credentials);
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