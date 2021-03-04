<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">How should we call you?</label>
    <BasicInput
      :inputObj="{
        type: 'text',
        name: 'name',
        placeholder: 'Currly broccoli?',
      }"
      @onInput="v$.form.name.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.form.name.$silentErrors"
      v-if="v$.form.name.$dirty"
    />
    <label for="email">E-Mail</label>
    <BasicInput
      :inputObj="{
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: 'email@example.com',
      }"
      @onInput="v$.form.email.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.form.email.$silentErrors"
      v-if="v$.form.email.$dirty"
    />
    <label for="password">Password</label>
    <BasicInput
      :inputObj="{
        type: 'password',
        name: 'password',
        id: 'password',
        placeholder: '',
      }"
      @onInput="v$.form.password.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.form.password.$silentErrors"
      v-if="v$.form.password.$dirty"
    />
    <label for="repeatPassword">Repeat password</label>
    <BasicInput
      :inputObj="{
        type: 'password',
        name: 'repeatPassword',
        id: 'repeatPassword',
      }"
      @onInput="v$.form.repeatPassword.$model = $event"
    />
    <InputErrMsgTemp
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
import InputErrMsgTemp from '@/components/Input-err-msg-temp.vue';
import BasicInput from '@/components/BasicInput.vue';
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
  sameAs,
} from '@vuelidate/validators';
export default {
  components: { InputErrMsgTemp, BasicInput },
  setup() {
    const store = useStore();
    const form = ref({ name: '', email: '', password: '', repeatPassword: '' });
    const oneWordPattern = helpers.withMessage(
      'Allowed characters: A-Z,0-9',
      (value) => /^[a-zA-Z0-9]+$/.test(value)
    );
    const rules = computed(() => ({
      form: {
        name: { required, oneWordPattern },
        email: { required, email },
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
      store.dispatch('register', credentials);
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
