<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">How should we call you?</label>
    <input
      type="text"
      name="name"
      placeholder="Currly broccoli?"
      v-model.lazy="v$.form.name.$model"
      :class="{ valid: v$.form.name.$dirty && !v$.form.name.$invalid }"
    />
    <ErrorMsg
      :errorsObj="v$.form.name.$silentErrors"
      v-if="v$.form.name.$dirty && !v$.form.name.$pending"
    />
    <label for="email">E-Mail</label>
    <input
      type="email"
      name="email"
      placeholder="email@example.com"
      v-model.lazy="v$.form.email.$model"
      :class="{ valid: v$.form.email.$dirty && !v$.form.email.$invalid }"
    />
    <ErrorMsg
      :errorsObj="v$.form.email.$silentErrors"
      v-if="v$.form.email.$dirty && !v$.form.email.$pending"
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
    <label for="repeatPassword">Repeat password</label>
    <input
      type="password"
      name="repeatPassword"
      v-model="v$.form.repeatPassword.$model"
      :class="{
        valid:
          v$.form.repeatPassword.$dirty && !v$.form.repeatPassword.$invalid,
      }"
    />
    <ErrorMsg
      :errorsObj="v$.form.repeatPassword.$silentErrors"
      v-if="v$.form.repeatPassword.$dirty"
    />
    <button type="submit" :disabled="v$.invalid">Create an Account</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import ErrorMsg from '@/components/ErrorMsg.vue';
import {
  isAvailable,
  oneWordPattern,
} from '@/core/validators/custom-validators';
import {
  required,
  email,
  maxLength,
  minLength,
  sameAs,
} from '@vuelidate/validators';
export default {
  components: { ErrorMsg },
  setup() {
    const store = useStore();
    const form = ref({ name: '', email: '', password: '', repeatPassword: '' });
    const rules = computed(() => ({
      form: {
        name: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(20),
          oneWordPattern,
          isAvailable: isAvailable('username'),
        },
        email: { required, email, isAvailable: isAvailable('email') },
        password: {
          required,
          maxLength: maxLength(20),
          minLength: minLength(4),
          oneWordPattern,
        },
        repeatPassword: { sameAs: sameAs(form.value.password), required },
      },
    }));
    const v$ = useVuelidate(rules, { form });
    const handleSubmit = async () => {
      if (v$.value.$invalid) return;
      const credentials = {
        username: form.value.name,
        email: form.value.email,
        password: form.value.password,
      };
      store.dispatch('auth/register', credentials);
    };
    return { handleSubmit, form, v$ };
  },
};
</script>

<style scoped lang="stylus">
input
  display block
  margin 5px auto
  padding 5px
</style>
