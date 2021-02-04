<template>
<form @submit.prevent="handleSubmit">
  <label for="name">What is the name of your recipe?</label>
  <input type="text" name="name" placeholder="Milkshake" v-model="name">
  <label for="description">Short description</label>
  <textarea name="description" id="description" cols="30" rows="10" placeholder="Yammy mmm" v-model="description"></textarea>
  <label for="imgUrl">Cover link</label>
  <input type="text" name="imgUrl" id="imgUrl" placeholder="https://image-from-another-page.jpeg" v-model="imgUrl">
  <div>
    <form @submit.prevent="handleIngrediant" class="ingrediants">
    <label for="ingrediants">Ingrediants</label>
    <input type="number" name="quantity" id="quantity" placeholder="Quantity or grams" v-model="quantity">
    <input type="text" name="productName" id="productName" placeholder="Eggs" v-model="productName">
    <button type="submit">Add new ingrediant</button>
    </form>
    <div>
      <ul>
        <li v-for="ing in ingrediants" :key="ing.id">{{ing.quantity}} : {{ing.productName}}<button @click="removeIngr(ing.id)">x</button></li>
      </ul>
    </div>
  </div>
  <div class="type">
  <label for="type">Type</label>
  <select name="type" id="type" size="2" v-model="type">
    <option value="public" selected="selected">Public</option>
    <option value="private">Private</option>
  </select>
  </div>
  <button type="submit">Create new recipe</button>
</form>

</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import Store from '@/store';
interface Ingrediant {
  id: number;
  quantity: number;
  productName: string;
}
export default class RecipeForm extends Vue {
name = '';
description ='';
type = 'public';
imgUrl = '';
quantity='';
productName = '';
ingrediants: Ingrediant[] = [];
async handleSubmit() {
  const { id } = Store.state.auth;
    const credentials = { name: this.name, description: this.description, type: this.type, imgUrl: this.imgUrl, ingrediants: this.ingrediants, author: id };
    Store.dispatch('create', credentials);
    this.$router.push('/');
  }
handleIngrediant() {
  const current = {
    id: this.ingrediants.length,
    quantity: Number(this.quantity),
    productName: this.productName
  }
  this.ingrediants.push(current);
  this.quantity = '';
  this.productName = '';
}
removeIngr(id: string) {
  this.ingrediants = this.ingrediants.filter(ing => Number(ing.id) !== Number(id))
}
}
</script>
<style lang="stylus">
.ingrediants
  margin 0
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
  display flex
  justify-content center
  width 80%
  margin 10px auto
  > label
      align-self center
  > select
      display flex
      margin 0
      margin-left 10px
      width 130px
</style>