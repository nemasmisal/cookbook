<template>
  <div class="login">
    <ValidationInfo :fields="props" />
    <h1>Please provide your credentials.</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "@/components/Login-form.vue";
import ValidationInfo from "@/components/Validation-info.vue";

@Options({
  components: {
    LoginForm,
    ValidationInfo
  }
})
export default class Login extends Vue {
  private requarements = [
    {
      name: "Email",
      reqs: [
        "Must be a valid e-mail like john@website.com",
        "Only english letters and/or numbers"
      ]
    },
    {
      name: "Password",
      reqs: [
        "min 4 characters",
        "max 20 characters",
        "Only english letters and/or numbers",
        "No spaces,special characters allowed"
      ]
    }
  ];
  public get props() {
    return this.requarements;
  }
}
</script>
<style lang="stylus" scoped>
form
  margin-top 15px
</style>
