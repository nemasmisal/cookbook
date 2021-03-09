<template>
  <div class="login">
    <ValidationInfo :fields="requarements" />
    <h1>Please provide your credentials.</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import ValidationInfo from '@/components/Validation-info.vue';
export default {
  components: { LoginForm, ValidationInfo },
  setup() {
    const requarements = [
      {
        name: 'Email',
        reqs: [
          'Must be a valid e-mail like john@website.com',
          'Only english letters and/or numbers',
        ],
      },
      {
        name: 'Password',
        reqs: [
          'min 4 characters',
          'max 20 characters',
          'Only english letters and/or numbers',
          'No spaces,special characters allowed',
        ],
      },
    ];

    return { requarements };
  },
};
</script>

<style lang="stylus" scoped>
form
  margin-top 15px
</style>
