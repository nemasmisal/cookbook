<template>
  <div>
    <InputReqs :fields="requarements" />
    <h1>Share your tasty ideas with others!</h1>
    <RecipeForm @handleSubmit="registerRecipe" />
  </div>
</template>
<script>
import RecipeForm from './RecipeForm.vue';
import InputReqs from '@/components/InputReqs.vue';
import { useStore } from 'vuex';
export default {
  components: { RecipeForm, InputReqs },
  setup() {
    const store = useStore();
    const requarements = [
      {
        name: 'Name',
        reqs: [
          'min 4 characters',
          'max 20 characters',
          'Only english letters and/or numbers',
          'No spaces,special characters allowed',
        ],
      },
      {
        name: 'Description',
        reqs: ['min 20 characters', 'max 200 characters'],
      },
      { name: 'Cover link', reqs: ['starting with http:// or https://'] },
      {
        name: 'Ingrediants',
        reqs: ['Quantity - only numbers', 'gr/kg/ml or empty for pieces'],
      },
      {
        name: 'Type',
        reqs: [
          'Public - everyone can read it',
          'Private - only for you',
        ],
      },
    ];

    const registerRecipe = (payload) => {
      store.dispatch('recipe/create', payload);
    };
    return { requarements, registerRecipe };
  },
};
</script>

<style lang="stylus" scoped>
h1
  margin-top 20px
form
  margin-top 10px
</style>
