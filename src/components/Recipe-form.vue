<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">What is the name of your recipe?</label>
    <input
      type="text"
      name="name"
      placeholder="Milkshake"
      v-model="recipe.name"
      :class="{ error: formErrors.name() }"
    />
    <label for="description">Short description</label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      placeholder="Yammy mmm"
      v-model="recipe.description"
      :class="{ error: formErrors.description() }"
    ></textarea>
    <label for="imgUrl">Cover link</label>
    <input
      type="text"
      name="imgUrl"
      id="imgUrl"
      placeholder="https://image-from-another-page.jpeg"
      v-model="recipe.imgUrl"
      :class="{ error: formErrors.imgUrl() }"
    />
    <div class="ingrediants">
      <form @submit.prevent="handleIngrediant">
        <label for="ingrediants">Ingrediants</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Quantity"
          v-model="quantity"
          :class="{ error: formErrors.ingrediants() }"
        />
        <div class="radio">
          <input type="radio" value="gr" v-model="picked" />gr
          <input type="radio" value="kg" v-model="picked" />kg
          <input type="radio" value="ml" v-model="picked" />ml
        </div>
        <input
          type="text"
          name="productName"
          id="productName"
          placeholder="Eggs"
          v-model="productName"
          :class="{ error: formErrors.ingrediants() }"
        />
        <button type="submit">Add new ingrediant</button>
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
    <div class="type">
      <label for="type">Type</label>
      <select name="type" id="type" size="2" v-model="recipe.type">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  props: {
    existingRecipe: {
      type: Object,
    },
  },
  emits: ['handleSubmit'],
  setup(props, { emit }) {
    const store = useStore();
    const patterns = {
      oneWord: new RegExp(/^[a-zA-Z0-9]{4,20}$/),
      email: new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z1-9]+\.{1}[a-zA-Z]+$/),
      description: new RegExp(/^(.{20,200})$/),
      imgUrl: new RegExp(/^https?:\/\/.*/),
      productName: new RegExp(/^[a-zA-Z0-9\s]{4,20}$/),
    };
    const quantity = ref(null);
    const productName = ref(null);
    const picked = ref(null);
    const recipe =
      props.existingRecipe ||
      ref({
        name: '',
        description: '',
        type: 'Public',
        imgUrl: '',
        author: '',
        ingrediants: [],
        _id: '',
      });
    const formErrors = {
      name: () => !patterns.oneWord.test(recipe.value.name),
      description: () => !patterns.description.test(recipe.value.description),
      imgUrl: () => !patterns.imgUrl.test(recipe.value.imgUrl),
      ingrediants: () => recipe.value.ingrediants.length === 0,
    };

    const handleSubmit = async () => {
      const isInvalid = Object.values(formErrors).find((f) => f());
      if (isInvalid) {
        return;
      }
      const { id } = store.state.auth;
      const credentials = {
        name: recipe.value.name,
        description: recipe.value.description,
        type: recipe.value.type,
        imgUrl: recipe.value.imgUrl,
        ingrediants: recipe.value.ingrediants,
        author: id,
        _id: recipe.value._id,
      };
      emit('handleSubmit', credentials);
    };
    const handleIngrediant = () => {
      if (
        !Number(quantity.value) ||
        !patterns.productName.test(productName.value)
      ) {
        return;
      }
      const current = {
        id: recipe.value.ingrediants.length,
        quantity: quantity.value + picked.value,
        productName: productName.value,
      };
      recipe.value.ingrediants.push(current);
      quantity.value = '';
      productName.value = '';
      picked.value = '';
    };
    const removeIngr = (id) => {
      recipe.value.ingrediants = recipe.value.ingrediants.filter(
        (ing) => Number(ing.id) !== Number(id)
      );
    };
    return {
      recipe,
      formErrors,
      handleSubmit,
      handleIngrediant,
      removeIngr,
      quantity,
      picked,
      productName,
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
