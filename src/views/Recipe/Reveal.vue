<template>
  <button class="iconBtn">
    <i class="material-icons" @click="toggleReveal()">more_vert</i>
  </button>
  <transition name="reveal">
    <div class="card-reveal" v-if="isVissible">
      <h3>Description:</h3>
      <p>{{ recipe.description }}</p>
      <h3>Ingrediants:</h3>
      <ol>
        <li
          v-for="ing in recipe.ingrediants"
          :key="ing.id"
          :class="{ green: isMarked(ing.id) }"
          @click="addToMarked(ing.id)"
        >
          <span class="quantity">{{ ing.quantity }}</span>
          {{ ing.productName }}
        </li>
      </ol>
      <button class="iconBtn" @click="toggleReveal()">
        <i class="material-icons">close</i>
      </button>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';
export default {
  props: { recipe: { type: Object } },
  setup() {
    const isVissible = ref(false);
    const marked = ref(new Set());
    const addToMarked = (id) => {
      marked.value.has(id) ? marked.value.delete(id) : marked.value.add(id);
    };
    const isMarked = (id) => marked.value.has(id);
    const toggleReveal = () => {
      isVissible.value = !isVissible.value;
      !isVissible.value ? marked.value.clear() : null;
    };
    return { isVissible, toggleReveal, addToMarked, isMarked };
  },
};
</script>
<style lang="stylus" scoped>
li
  cursor pointer
  text-align start
  list-style decimal
  padding-left 10px
  margin-left 10px
.reveal-enter-from
  transform translateY(100%)
.reveal-enter-to
  transform translateY(0%)
.reveal-enter-active
  transition all 1s ease
.reveal-leave-from
  transform translateY(0%)
.reveal-leave-to
  transform translateY(100%)
.reveal-leave-active
  transition all 1s ease
.card-reveal
  position absolute
  top 0
  left 0
  overflow-y auto
  width 86%
  height 90%
  max-width 450px
  margin 0 auto
  padding 26px
  background-color #e5e4e2
  display grid
.quantity
  color red
.green
  background  darkseagreen
</style>
