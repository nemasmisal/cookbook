<template>
  <transition name="msg">
    <div v-if="message" class="msg toast">
      {{ message }}
    </div>
  </transition>
  <transition name="err">
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
      store.dispatch("msg/clearMsg");
    }, 1500);
    return store.state.msg.msg;
  }
  get err() {
    return store.state.msg.err;
  }
}
</script>
<style lang="stylus" scoped>
.err-leave-to
  opacity 0
  transform translateY(-50px)
.err-leave-active
  transition all 0.3s ease
.err-enter-active
  animation wobble 0.5s ease
.msg-enter-to
  opacity 1
  transform translateY(0)
.msg-enter-from
  opacity 0
  transform translateY(-50px)
.msg-enter-active
  transition all 0.3s ease
.msg-leave-to
  opacity 0
  transform translateY(-50px)  
.msg-leave-active
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
@keyframes wobble 
  0% { 
    transform translateY(-20px)
    opacity 0
  } 
  50% {
    transform translateY(0)
    opacity 1
  }
  60% {
    transform translateX(8px)
  }
  70% {
    transform translateX(-8px)
  }
  80% {
    transform translateX(4px)
  }
  90% {
    transform translateX(-4px)
  }
  100% {
    transform translateX(0)
  }

</style>
