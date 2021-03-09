<template>
  <ul v-if="totalPages">
    <li @click="pageAction.first"><i class="material-icons">first_page</i></li>
    <li @click="pageAction.previous">
      <i class="material-icons">chevron_left</i>
    </li>
    <li v-for="pageNumber in pagesNumbers" :key="pageNumber">
      <button @click="setPageNumber(pageNumber)">{{ pageNumber }}</button>
    </li>
    <li @click="pageAction.next">
      <i class="material-icons">chevron_right</i>
    </li>
    <li @click="pageAction.last"><i class="material-icons">last_page</i></li>
  </ul>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const totalPages = computed(() => store.getters['recipe/totalPages']);
    const pagesNumbers = ref([]);
    const currentPage = ref(1);
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
    const setPageNumber = (pageNumber) => {
      if (!pageNumber || pageNumber > Number(totalPages.value)) return;
      currentPage.value = Number(pageNumber);
    };
    const createPagesNumbers = () => {
      pagesNumbers.value = Array(Number(totalPages.value))
        .fill()
        .map((_, i) => Number(totalPages.value) - i)
        .reverse();
    };
    watch(totalPages, createPagesNumbers);
    watch(currentPage, goToPage);
    return { pagesNumbers, setPageNumber, totalPages, pageAction };
  },
};
</script>

<style lang="stylus">
li
  display inline
  padding 10px 5px 0 5px
ul
  margin 20px auto
  max-width 450px
</style>
