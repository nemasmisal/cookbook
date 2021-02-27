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
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const patterns = {
      oneWord: new RegExp(/^[a-zA-Z0-9]{4,20}$/),
      email: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.{1}[a-zA-Z]+$/),
    };
    const form = ref({
      email: '',
      password: '',
      errors: {
        email: () => !patterns.email.test(form.value.email),
        password: () => !patterns.oneWord.test(form.value.password),
      },
    });

    const handleSubmit = () => {
      const isInvalid = Object.values(form.value.errors).find((f) => f());
      if (isInvalid) {
        return;
      }
      const credentials = {
        email: form.value.email,
        password: form.value.password,
      };
      store.dispatch('auth/login', credentials);
    };
    return { form, handleSubmit };
  },
};
</script>

<style scoped lang="stylus">
form
  margin-top 2em
input
  display block
  margin 5px auto
  padding 5px
</style>
