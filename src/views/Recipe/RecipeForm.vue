<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">What is the name of your recipe?</label>
    <input
      type="text"
      name="name"
      placeholder="Milkshakre"
      v-model="v$.recipe.name.$model"
    />
    <ErrorMsg
      :errorsObj="v$.recipe.name.$silentErrors"
      v-if="v$.recipe.name.$dirty"
    />
    <label for="description">Short description</label>
    <textarea
      name="description"
      cols="30"
      rows="10"
      placeholder="Yammy mmm"
      v-model="v$.recipe.description.$model"
    ></textarea>
    <ErrorMsg
      :errorsObj="v$.recipe.description.$silentErrors"
      v-if="v$.recipe.description.$dirty"
    />
    <label for="imgUrl">Cover link</label>
    <input
      type="text"
      name="imgUrl"
      placeholder="https://image-from-another-page.jpeg"
      v-model="v$.recipe.imgUrl.$model"
    />
    <ErrorMsg
      :errorsObj="v$.recipe.imgUrl.$silentErrors"
      v-if="v$.recipe.imgUrl.$dirty"
    />
    <IngrediantsForm
      :ingrediants="v$.recipe.ingrediants.$model"
      @addIngrediant="addIngrediant"
    />
    <div>
      <ul>
        <li v-for="ing in recipe.ingrediants" :key="ing.id">
          {{ ing.quantity }} {{ ing.productName }}
          <button @click="removeIngr(ing.id)">x</button>
        </li>
      </ul>
    </div>
    <ErrorMsg
      :errorsObj="v$.recipe.ingrediants.$silentErrors"
      v-if="v$.recipe.ingrediants.$dirty"
    />
    <div class="type">
      <label for="type">Type</label>
      <select name="type" id="type" size="2" v-model="v$.recipe.type.$model">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import {
  notEmptyArray,
  twoWordPattern,
} from '@/core/validators/custom-validators';
import ErrorMsg from '@/components/ErrorMsg.vue';
import IngrediantsForm from './IngrediantsForm.vue';
import { required, minLength, maxLength, url } from '@vuelidate/validators';
export default {
  props: {
    existingRecipe: {
      type: Object,
    },
  },
  components: { ErrorMsg, IngrediantsForm },
  emits: ['handleSubmit'],
  setup(props, { emit }) {
    const store = useStore();

    const recipe = props.existingRecipe
      ? ref(props.existingRecipe)
      : ref({
          name: '',
          description: '',
          type: 'public',
          imgUrl: '',
          author: '',
          ingrediants: [],
          _id: '',
        });

    const rules = computed(() => ({
      recipe: {
        name: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20),
          twoWordPattern,
        },
        description: {
          required,
          minLength: minLength(20),
          maxLength: maxLength(200),
        },
        type: { required },
        imgUrl: { required, url },
        ingrediants: { required, notEmptyArray },
      },
    }));

    const v$ = useVuelidate(rules, { recipe });

    const handleSubmit = async () => {
      v$.value.recipe.$touch();
      if (v$.value.recipe.$invalid) return;
      const id = computed(() => store.getters['auth/id']);
      const credentials = {
        name: recipe.value.name,
        description: recipe.value.description,
        type: recipe.value.type,
        imgUrl: recipe.value.imgUrl,
        ingrediants: recipe.value.ingrediants,
        author: id.value,
        _id: recipe.value._id,
      };
      emit('handleSubmit', credentials);
    };
    const addIngrediant = (ingrediant) => {
      v$.value.recipe.ingrediants.$reset();
      v$.value.recipe.ingrediants.$touch();
      recipe.value.ingrediants.push(ingrediant);
    };
    const removeIngr = (id) => {
      recipe.value.ingrediants = recipe.value.ingrediants.filter(
        (ing) => Number(ing.id) !== Number(id)
      );
    };
    return {
      v$,
      recipe,
      handleSubmit,
      addIngrediant,
      removeIngr,
    };
  },
};
</script>

<style lang="stylus" scoped>
.ingrediants
  margin 0
  display block
  > form
    > button
        display block
.radio
  input
    width 30px
li
  border 1px solid #ff6347
  width 85%
  max-width 400px
  margin 5px auto
  border-radius 4px
textarea
  text-align left
select
  margin 10px auto
  text-align center
  justify-content center
  width 100px
  display block
label
  display block
  margin-top 5px
.type
  width 80%
  margin 10px auto
  > label
      width 100%
  > select
      margin 5px auto
      padding 5px
      width 130px
      text-align left
      > option
          padding 5px
</style>
