<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <input
      type="email"
      name="email"
      placeholder="email@example.com"
      v-model="form.email"
      :class="{ error: form.errors.email() }"
    />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      v-model="form.password"
      :class="{ error: form.errors.password() }"
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import store from "@/store";
import { Vue } from "vue-class-component";

export default class LoginForm extends Vue {
  patterns = {
    oneWorld: new RegExp(/^[a-zA-Z0-9]{4,20}$/),
    email: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.{1}[a-zA-Z]+$/)
  };
  form = {
    email: "",
    password: "",
    errors: {
      email: () => !this.patterns.email.test(this.form.email),
      password: () => !this.patterns.oneWorld.test(this.form.password)
    }
  };

  handleSubmit() {
    const isInvalid = Object.values(this.form.errors).find(f => f());
    if (isInvalid) {
      return;
    }
    const credentials = {
      email: this.form.email,
      password: this.form.password
    };
    store.dispatch("auth/login", credentials);
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
