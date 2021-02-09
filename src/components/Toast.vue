<template>
  <div v-if="message" class="msg toast">
    {{message}}
  </div>
  <div v-if="err" class="err toast">
    {{err}}
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import store from "@/store/";

class Props {
  msg!: string;
}
export default class Toast extends Vue.with(Props) {
  get message() {
    setTimeout(() => {
      store.dispatch('clearMsg');
    },1500)
    return store.state.msg;
  }
  get err() {
    return store.state.err;
  }
}
</script>
<style lang="stylus" scoped>
.toast
  width 150px
  border-radius 8px
  margin 10px
  z-index 99999
  position absolute
  padding 8px
  font-weight bold
  color white
.msg
  background green
.err
  background #ff6347
</style>