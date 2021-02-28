<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <input
      type="email"
      name="email"
      placeholder="email@example.com"
      v-model="v$.emailField.$model"
      @blur="v$.emailField.$touch"
    />
    <template v-if="v$.emailField.$dirty">
      <div
        class="error"
        v-for="error of v$.emailField.$silentErrors"
        :key="error.$message"
      >
        {{ error.$message }}
      </div>
    </template>
    <label for="password">Password</label>
    <input type="password" name="password" v-model="v$.password.$model" />
    <template v-if="v$.password.$dirty">
      <div
        class="error"
        v-for="error of v$.password.$silentErrors"
        :key="error.$message"
      >
        {{ error.$message }}
      </div>
    </template>
    <button type="submit">Login</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
} from '@vuelidate/validators';
export default {
  setup() {
    const store = useStore();
    const emailField = ref('');
    const password = ref('');
    const passPattern = helpers.withMessage(
      'Allowed characters: A-Z,0-9',
      (value) => /^[a-zA-Z0-9]+$/.test(value)
    );
    const rules = computed(() => ({
      emailField: { required, email },
      password: {
        required,
        maxLength: maxLength(21),
        minLength: minLength(4),
        passPattern,
      },
    }));
    const v$ = useVuelidate(rules, { emailField, password });
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
    return { handleSubmit, v$, emailField, password };
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
