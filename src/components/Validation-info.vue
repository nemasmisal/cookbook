<template>
  <div class="activator">
    <button @click="toggleReveal">
      Need help?
      <i class="large material-icons">mode_comment</i>
    </button>
  </div>
  <div class="reveal" v-if="reveal">
    <template v-for="field in fields" :key="field">
      <h2>{{ field.name }}</h2>
      <ol>
        <li v-for="req in field.reqs" :key="req">{{ req }}</li>
      </ol>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import ValidationFields from "@/core/models/validation-fields";
class Props {
  props!: ValidationFields;
}
export default class ValidationInfo extends Vue.with(Props) {
  fields = this.props;
  reveal = false;
  toggleReveal() {
    this.reveal = !this.reveal;
  }
}
</script>
<style lang="stylus" scoped>
h2,h3
  margin 5px
  padding 5px
li
  list-style circle
  margin 0 auto
  max-width 300px
  text-align start
  font-size 15px
.activator
  display flex
  justify-content flex-end
  margin-top 20px
  margin-right 20px
  align-items center
  > button
      margin 0
      background none
      border none
      color #2c3e50
      padding 0
</style>
