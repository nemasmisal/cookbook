<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">E-mail</label>
    <BasicInput
      :inputObj="{
        type: 'email',
        name: 'email',
        placeholder: 'email@example.com',
      }"
      @onInput="v$.emailField.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.emailField.$silentErrors"
      v-if="v$.emailField.$dirty"
    />
    <label for="password">Password</label>
    <BasicInput
      :inputObj="{ type: 'password', name: 'password', placeholder: '' }"
      @onInput="v$.password.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.password.$silentErrors"
      v-if="v$.password.$dirty"
    />
    <button type="submit" :disabled="v$.$invalid">Login</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import InputErrMsgTemp from '@/components/Input-err-msg-temp.vue';
import BasicInput from '@/components/BasicInput.vue';
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
} from '@vuelidate/validators';
export default {
  components: { InputErrMsgTemp, BasicInput },
  setup() {
    const store = useStore();
    const emailField = ref('');
    const password = ref('');
    const passPattern = helpers.withMessage(
      'Allowed characters: A-Z,0-9',
      (value) => /^[a-zA-Z0-9]+$/.test(value)
    );
    const rules = computed(() => ({
      emailField: { required, email, $autoDirty: true },
      password: {
        required,
        maxLength: maxLength(21),
        minLength: minLength(4),
        passPattern,
      },
    }));
    const v$ = useVuelidate(rules, { emailField, password });
    const handleSubmit = () => {
      if (v$.value.$invalid) return;
      const credentials = {
        email: emailField.value,
        password: password.value,
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
