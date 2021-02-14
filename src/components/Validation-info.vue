<template>
  <div class="activator">
    <button @click="toggleReveal">
      Need help?
      <i class="large material-icons">mode_comment</i>
    </button>
  </div>
  <transition name="validation-info">
  <div class="info" v-if="reveal">
    <template v-for="field in fields" :key="field">
      <h2>{{ field.name }}</h2>
      <ol>
        <li v-for="req in field.reqs" :key="req">{{ req }}</li>
      </ol>
    </template>
  </div>
  </transition>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { ValidationFields } from "@/core/models/";
class Props {
  fields!: ValidationFields;
}
export default class ValidationInfo extends Vue.with(Props) {
  reveal = false;
  toggleReveal() {
    this.reveal = !this.reveal;
  }
}
</script>
<style lang="stylus" scoped>
.validation-info-enter-from
  transform translateY(-100%)
.validation-info-enter-to
  transform translateY(0%)
.validation-info-enter-active
  transition all 1s ease
.validation-info-leave-from
  transform translateY(0%)
.validation-info-leave-to
  transform translateY(-100%)
.validation-info-leave-active
  transition all 1s ease
.info
  position relative
  top 0
  background #f8f8f8
  padding 10px
  z-index -1
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
  background #f8f8f8
  width 94%
  display flex
  justify-content flex-end
  padding-top 20px
  padding-right 20px
  align-items center
  > button
      background none
      margin 0
      border none
      color #2c3e50
      padding 0
</style>
