<template>
  <button class="iconBtn" @click="toggleSharebox()">
    <i class="large material-icons">share</i>
  </button>
  <transition name="share">
    <div v-if="isVissible" class="share">
      <h2>Share your favorite recipe !</h2>
      <ul>
        <li>
          <a
            :href="
              'https://www.facebook.com/sharer.php?u=http://localhost:8080/recipe/details/' +
                recipeId
            "
          >
            <i class="material-icons">facebook</i>Facebook</a
          >
        </li>
        <li>
          <a
            :href="
              'https://twitter.com/intent/tweet?url=http://localhost:8080/recipe/details/' +
                recipeId +
                '&text='
            "
            >Twitter</a
          >
        </li>
        <li>
          <a
            :href="
              'https://pinterest.com/pin/create/button/?url=http://localhost:8080/recipe/details/' +
                recipeId +
                '&media=&description='
            "
            >Pinterest</a
          >
        </li>
      </ul>
      <button @click="toggleSharebox()">Close</button>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';
export default {
  props: { recipeId: { type: String } },
  setup() {
    const isVissible = ref(false);
    const toggleSharebox = () => {
      isVissible.value = !isVissible.value;
    };
    return { isVissible, toggleSharebox };
  },
};
</script>

<style lang="stylus" scoped>
.share-enter-from
  transform translateX(100%)
.share-enter-to
  transform translateX(0%)
.share-enter-active
  transition all 1s ease
.share-leave-from
  transform translateX(0%)
.share-leave-to
  transform translateX(-100%)
.share-leave-active
  transition all 1s ease
.share
  position absolute
  bottom 80px
  left 0
  width 94%
  background #e5e4e2
  margin 0 auto
  padding 11px
a
  color black
</style>
