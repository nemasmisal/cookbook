<template>
  <div v-if="msg" class="toast">
    {{msg}}
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';

class Props {
  msg!: string;
}
export default class Toast extends Vue.with(Props) {}
</script>
<style lang="stylus" scoped>
.toast
  width 150px
  background #ff6347
  border-radius 8px
  margin 10px
  z-index 99999
  position absolute
  padding 8px
  font-weight bold
  color white
</style>