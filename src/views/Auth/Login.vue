<template>
  <div>
    <InputReqs :fields="requarements" />
    <h1>Please provide your credentials.</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import InputReqs from '@/components/InputReqs.vue';
export default {
  components: { LoginForm, InputReqs },
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
