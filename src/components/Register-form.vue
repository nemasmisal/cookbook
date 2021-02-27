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
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const patterns = {
      oneWorld: new RegExp(/^[a-zA-Z0-9]{4,20}$/),
      email: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.{1}[a-zA-Z]+$/),
    };
    const form = ref({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: {
        name: () => !patterns.oneWorld.test(form.value.name),
        email: () => !patterns.email.test(form.value.email),
        password: () => !patterns.oneWorld.test(form.value.password),
        repeatPassword: () =>
          form.value.password !== form.value.repeatPassword ||
          form.value.repeatPassword.length === 0,
      },
    });

    const handleSubmit = async () => {
      const isInvalid = Object.values(form.value.errors).find((f) => f());
      if (isInvalid) {
        return;
      }
      const credentials = {
        username: form.value.name,
        email: form.value.email,
        password: form.value.password,
      };
      store.dispatch('register', credentials);
    };
    return { handleSubmit, form };
  },
};
</script>

<style scoped lang="stylus">
input
  display block
  margin 5px auto
  padding 5px
</style>
