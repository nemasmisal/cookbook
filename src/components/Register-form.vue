<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">How should we call you?</label>
    <input
      type="text"
      name="name"
      placeholder="Currly brocolli?"
      v-model.lazy="form.name"
      :class="{ error: form.errors.name() }"
    />
    <label for="email">E-Mail</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="email@example.com"
      v-model="form.email"
      :class="{ error: form.errors.email() }"
    />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="form.password"
      :class="{ error: form.errors.password() }"
    />
    <label for="repeatPassword">Repeat password</label>
    <input
      type="password"
      name="repeatPassword"
      id="repeatPassword"
      v-model="form.repeatPassword"
      :class="{ error: form.errors.repeatPassword() }"
    />
    <button type="submit">Create an Account</button>
  </form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import Store from "@/store";
export default class RegisterForm extends Vue {
  patterns = {
    oneWorld: new RegExp(/^[a-zA-Z0-9]{4,20}$/),
    email: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.{1}[a-zA-Z]+$/)
  };
  form = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: {
      name: () => !this.patterns.oneWorld.test(this.form.name),
      email: () => !this.patterns.email.test(this.form.email),
      password: () => !this.patterns.oneWorld.test(this.form.password),
      repeatPassword: () =>
        this.form.password !== this.form.repeatPassword ||
        this.form.repeatPassword.length === 0
    }
  };

  async handleSubmit() {
    const isInvalid = Object.values(this.form.errors).find(f => f());
    if (isInvalid) {
      return;
    }
    const credentials = {
      username: this.form.name,
      email: this.form.email,
      password: this.form.password
    };
    Store.dispatch("register", credentials);
  }
}
</script>

<style scoped lang="stylus">
input
  display block
  margin 5px auto
  padding 5px
</style>
