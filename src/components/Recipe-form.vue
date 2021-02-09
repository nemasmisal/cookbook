<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">What is the name of your recipe?</label>
    <input type="text" name="name" placeholder="Milkshake" v-model="recipe.name"/>
    <label for="description">Short description</label>
    <textarea name="description" id="description" cols="30" rows="10" placeholder="Yammy mmm" v-model="recipe.description"></textarea>
    <label for="imgUrl">Cover link</label>
    <input type="text" name="imgUrl" id="imgUrl" placeholder="https://image-from-another-page.jpeg" v-model="recipe.imgUrl"/>
    <div class="ingrediants">
      <form @submit.prevent="handleIngrediant">
        <label for="ingrediants">Ingrediants</label>
        <input type="number" name="quantity" id="quantity" placeholder="Quantity" v-model="quantity"/>
        <div class="radio">
        <input type="radio" name="index" value="gr" v-model="picked">gr
        <input type="radio" name="index" value="kg" v-model="picked">kg
        <input type="radio" name="index" value="ml" v-model="picked">ml
        </div>
        <input type="text" name="productName" id="productName" placeholder="Eggs" v-model="productName"/>
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
        <option value="public" selected="selected">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
    <button type="submit">Create new recipe</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Store from '@/store';
import { IRecipe } from '@/core/models';

class Props {
  existingRecipe!: IRecipe
}

@Options({
  emits: ['handleSubmit']
})
export default class RecipeForm extends Vue.with(Props) {
  quantity = '';
  productName = '';
  picked = '';
  recipe: IRecipe = this.existingRecipe || {
    name: '',
    description: '',
    type: 'Public',
    imgUrl: '',
    author: '',
    ingrediants: [],
    _id: ''
  }

  async handleSubmit() {
    const { id } = Store.state.auth;
    const credentials = {
      name: this.recipe.name,
      description: this.recipe.description,
      type: this.recipe.type,
      imgUrl: this.recipe.imgUrl,
      ingrediants: this.recipe.ingrediants,
      author: id,
      _id: this.recipe._id
    };

    this.$emit('handleSubmit', credentials);
  }
  handleIngrediant() {
    const current = {
      id: this.recipe.ingrediants.length,
      quantity: (this.quantity + this.picked),
      productName: this.productName
    }
    this.recipe.ingrediants.push(current);
    this.quantity = '';
    this.productName = '';
    this.picked = '';
  }
  removeIngr(id: string) {
    this.recipe.ingrediants = this.recipe.ingrediants.filter(ing => Number(ing.id) !== Number(id));
  }
}
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