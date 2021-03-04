<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">What is the name of your recipe?</label>
    <BasicInput
      :inputObj="{
        type: 'text',
        name: 'name',
        placeholder: 'Milkshakre',
      }"
      @onInput="v$.recipe.name.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.recipe.name.$silentErrors"
      v-if="v$.recipe.name.$dirty"
    />
    <label for="description">Short description</label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      placeholder="Yammy mmm"
      v-model="v$.recipe.description.$model"
    ></textarea>
    <InputErrMsgTemp
      :errorsObj="v$.recipe.description.$silentErrors"
      v-if="v$.recipe.description.$dirty"
    />
    <label for="imgUrl">Cover link</label>
    <BasicInput
      :inputObj="{
        type: 'text',
        name: 'imgUrl',
        id: 'imgUrl',
        placeholder: 'https://image-from-another-page.jpeg',
      }"
      @onInput="v$.recipe.imgUrl.$model = $event"
    />
    <InputErrMsgTemp
      :errorsObj="v$.recipe.imgUrl.$silentErrors"
      v-if="v$.recipe.imgUrl.$dirty"
    />
    <div class="ingrediants">
      <form @submit.prevent="handleIngrediant">
        <label for="ingrediants">Ingrediants</label>
        <BasicInput
          :inputObj="{
            type: 'number',
            name: 'quantity',
            id: 'quantity',
            placeholder: 'Quantity',
          }"
          @onInput="v$.ingredsForm.quantity.$model = $event"
        />
        <InputErrMsgTemp
          :errorsObj="v$.ingredsForm.quantity.$silentErrors"
          v-if="v$.ingredsForm.quantity.$dirty"
        />
        <div class="radio">
          <input
            type="radio"
            value="gr"
            v-model="v$.ingredsForm.picked.$model"
          />gr
          <input
            type="radio"
            value="kg"
            v-model="v$.ingredsForm.picked.$model"
          />kg
          <input
            type="radio"
            value="ml"
            v-model="v$.ingredsForm.picked.$model"
          />ml
        </div>
        <InputErrMsgTemp
          :errorsObj="v$.ingredsForm.picked.$silentErrors"
          v-if="v$.ingredsForm.picked.$dirty"
        />
        <BasicInput
          :inputObj="{
            type: 'text',
            name: 'productName',
            id: 'productName',
            placeholder: 'Eggs',
          }"
          @onInput="v$.ingredsForm.productName.$model = $event"
        />
        <InputErrMsgTemp
          :errorsObj="v$.ingredsForm.productName.$silentErrors"
          v-if="v$.ingredsForm.productName.$dirty"
        />
        <button type="submit">
          Add new ingrediant
        </button>
      </form>
      <div>
        <ul>
          <li v-for="ing in recipe.ingrediants" :key="ing.id">
            {{ ing.quantity }} : {{ ing.productName }}
            <button @click="removeIngr(ing.id)">x</button>
          </li>
        </ul>
      </div>
    </div>
    <InputErrMsgTemp
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
import BasicInput from '@/components/BasicInput.vue';
import InputErrMsgTemp from '@/components/Input-err-msg-temp.vue';
import {
  required,
  minLength,
  maxLength,
  numeric,
  url,
  helpers,
} from '@vuelidate/validators';
export default {
  props: {
    existingRecipe: {
      type: Object,
    },
  },
  components: { InputErrMsgTemp, BasicInput },
  emits: ['handleSubmit'],
  setup(props, { emit }) {
    const store = useStore();
    const namePattern = helpers.withMessage(
      'Allowed characters: A-Z,0-9,space',
      (value) => /^[a-zA-Z0-9\s]+$/.test(value)
    );
    const notEmptyArray = helpers.withMessage(
      'Atleast 1 ingrediant should be added',
      (array) => array.length > 0
    );
    const ingredsForm = ref({
      quantity: '',
      productName: '',
      picked: '',
    });

    const recipe = props.existingRecipe
      ? ref(props.existingRecipe)
      : ref({
          name: '',
          description: '',
          type: 'Public',
          imgUrl: '',
          author: '',
          ingrediants: [],
        });

    const rules = computed(() => ({
      ingredsForm: {
        quantity: { required, numeric },
        productName: { required, namePattern },
        picked: { required },
      },
      recipe: {
        name: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20),
          namePattern,
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

    const v$ = useVuelidate(rules, { ingredsForm, recipe });

    const handleSubmit = async () => {
      v$.value.recipe.$touch();
      if (v$.value.recipe.$invalid) return;
      const { id } = store.state.auth;
      const credentials = {
        name: recipe.value.name,
        description: recipe.value.description,
        type: recipe.value.type,
        imgUrl: recipe.value.imgUrl,
        ingrediants: recipe.value.ingrediants.$model,
        author: id,
      };
      emit('handleSubmit', credentials);
    };
    const handleIngrediant = () => {
      v$.value.ingredsForm.$touch();
      if (v$.value.ingredsForm.$invalid) return;
      const current = {
        id: recipe.value.ingrediants.length,
        quantity: ingredsForm.value.quantity + ingredsForm.value.picked,
        productName: ingredsForm.value.productName,
      };
      recipe.value.ingrediants.push(current);
      ingredsForm.value.quantity = '';
      ingredsForm.value.productName = '';
      ingredsForm.value.picked = '';
      v$.value.ingredsForm.$reset();
      v$.value.recipe.$reset();
    };
    const removeIngr = (id) => {
      recipe.value.ingrediants = recipe.value.ingrediants.filter(
        (ing) => Number(ing.id) !== Number(id)
      );
    };
    return {
      v$,
      recipe,
      ingredsForm,
      handleSubmit,
      handleIngrediant,
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
