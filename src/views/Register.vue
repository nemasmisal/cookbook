<template>
  <div class="register">
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegisterForm from "../components/Register-form.vue";

@Options({
  components: {
    RegisterForm
  }
})
export default class Home extends Vue {}
</script>
