<template>
  <transition name="fade">
    <div v-if="message" class="msg toast">
      {{ message }}
    </div>
  </transition>
  <transition name="fade">
    <div v-if="err" class="err toast">
      {{ err }}
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/";

class Props {
  msg!: string;
}
export default class Toast extends Vue.with(Props) {
  get message() {
    setTimeout(() => {
      store.dispatch("clearMsg");
    }, 1500);
    return store.state.msg;
  }
  get err() {
    return store.state.err;
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter-from
  opacity 0
  transform translateY(-50px)
.fade-enter-to
  opacity 1
  transform translateY(0)
.fade-enter-active
  transition all 0.3s ease
.fade-leave-from
  opacity 1
  transform translateY(0)
.fade-leave-to
  opacity 0
  transform translateY(-50px)
.fade-leave-active
  transition all 0.3s ease
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
