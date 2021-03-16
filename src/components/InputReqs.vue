<template>
  <div class="activator">
    <button @click="toggleReveal">
      Need help?
      <i class="material-icons">mode_comment</i>
    </button>
  </div>
  <transition name="drop">
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
<script>
import { ref } from 'vue';
export default {
  props: { fields: { type: Object } },
  setup() {
    const reveal = ref(false);
    const toggleReveal = () => {
      reveal.value = !reveal.value;
    };
    return { reveal, toggleReveal };
  },
};
</script>
<style lang="stylus" scoped>
.drop-enter-from
  transform translateY(-100%)
.drop-enter-to
  transform translateY(0%)
.drop-enter-active
  transition all 1s ease
.drop-leave-from
  transform translateY(0%)
.drop-leave-to
  transform translateY(-100%)
.drop-leave-active
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
      &:hover
        cursor pointer
</style>
