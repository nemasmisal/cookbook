<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <input
      type="email"
      name="email"
      placeholder="email@example.com"
      v-model="v$.form.email.$model"
      :class="{ valid: v$.form.email.$dirty && !v$.form.email.$invalid }"
    />
    <ErrorMsg
      :errorsObj="v$.form.email.$silentErrors"
      v-if="v$.form.email.$dirty"
    />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      v-model="v$.form.password.$model"
      :class="{ valid: v$.form.password.$dirty && !v$.form.password.$invalid }"
    />
    <ErrorMsg
      :errorsObj="v$.form.password.$silentErrors"
      v-if="v$.form.password.$dirty"
    />
    <button type="submit" :disabled="v$.$invalid">Login</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import ErrorMsg from '@/components/ErrorMsg.vue';
import { oneWordPattern } from '@/core/validators/custom-validators.js';
import { required, email, maxLength, minLength } from '@vuelidate/validators';
export default {
  components: { ErrorMsg },
  setup() {
    const store = useStore();
    const form = ref({ email: '', password: '' });
    const rules = computed(() => ({
      form: {
        email: { required, email },
        password: {
          required,
          maxLength: maxLength(21),
          minLength: minLength(4),
          oneWordPattern,
        },
      },
    }));
    const v$ = useVuelidate(rules, { form });
    const handleSubmit = () => {
      if (v$.value.$invalid) return;
      const credentials = {
        email: form.value.email,
        password: form.value.password,
      };
      store.dispatch('auth/login', credentials);
    };
    return { handleSubmit, form, v$ };
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
