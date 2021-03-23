<template>
  <ul v-if="totalPages">
    <li @click="pageAction.first"><i class="material-icons">first_page</i></li>
    <li @click="pageAction.previous">
      <i class="material-icons">chevron_left</i>
    </li>
    <li v-for="page in totalPages" :key="page">
      <button @click="setPage(page)">{{ page }}</button>
    </li>
    <li @click="pageAction.next">
      <i class="material-icons">chevron_right</i>
    </li>
    <li @click="pageAction.last"><i class="material-icons">last_page</i></li>
  </ul>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const totalPages = computed(() => store.getters['recipe/totalPages']);
    const currentPage = ref(1);
    watch(
      () => route.query,
      ({ page }) => {
        if (!page || isNaN(page) || page > totalPages.value) return;
        currentPage.value = Number(page);
      }
    );
    const pageAction = {
      next() {
        if (currentPage.value === totalPages.value) return;
        currentPage.value += 1;
      },
      previous() {
        if (currentPage.value === 1) return;
        currentPage.value -= 1;
      },
      first() {
        currentPage.value = 1;
      },
      last() {
        currentPage.value = totalPages.value;
      },
    };
    const goToPage = () => {
      router.push({ query: { page: currentPage.value } });
    };
    const setPage = (page) => {
      if (!page || isNaN(page) || Number(page) > Number(totalPages.value)) return;
      currentPage.value = Number(page);
    };
    watch(currentPage, goToPage);
    return { setPage, totalPages, pageAction };
  },
};
</script>

<style lang="stylus" scoped>
li
  display inline
  padding 10px 5px 0 5px
  &:hover
    cursor pointer
button
  &:hover
    cursor pointer
    color #2c3e50
ul
  margin 20px auto
  max-width 450px
</style>
