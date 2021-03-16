<template>
  <div>
    <InputReqs :fields="requarements" />
    <h3>Provide some info about you so we know you too !</h3>
    <RegisterForm />
  </div>
</template>
<script>
import RegisterForm from './RegisterForm.vue';
import InputReqs from '@/components/InputReqs.vue';
export default {
  components: { RegisterForm, InputReqs },
  setup() {
    const requarements = [
      {
        name: 'Name',
        reqs: [
          'min 4 characters',
          'max 20 characters',
          'Only english letters and/or numbers',
          'No spaces,special characters allowed',
        ],
      },
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
h3
  padding 10px
form
  margin-top 10px
</style>
