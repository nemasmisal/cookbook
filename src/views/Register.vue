<template>
  <div class="register">
    <ValidationInfo :props="props" />
    <h3>Provide some info about you so we know you too !</h3>
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegisterForm from "../components/Register-form.vue";
import ValidationInfo from "@/components/Validation-info.vue";

@Options({
  components: {
    RegisterForm,
    ValidationInfo
  }
})
export default class Register extends Vue {
  private requarements = [
    {
      name: "Name",
      reqs: [
        "min 4 characters",
        "max 20 characters",
        "Only english letters and/or numbers",
        "No spaces,special characters allowed"
      ]
    },
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
h3
  padding 10px
form
  margin-top 10px
</style>
