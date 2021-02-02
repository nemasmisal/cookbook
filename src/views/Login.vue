<template>
  <div class="login">
    <h1>Please provide your credentials.</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "../components/Login-form.vue";

@Options({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
