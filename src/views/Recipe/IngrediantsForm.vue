<template>
  <div class="ingrediants">
    <form @submit.prevent="addIngrediant">
      <label for="ingrediants">Ingrediants</label>
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        v-model="v$.form.quantity.$model"
      />
      <InputErrMsgTemp
        :errorsObj="v$.form.quantity.$silentErrors"
        v-if="v$.form.quantity.$dirty"
      />
      <div class="radio">
        <input type="radio" value="gr" v-model="v$.form.unit.$model" />gr
        <input type="radio" value="kg" v-model="v$.form.unit.$model" />kg
        <input type="radio" value="ml" v-model="v$.form.unit.$model" />ml
      </div>
      <input
        type="text"
        name="prodtName"
        placeholder="Eggs"
        v-model="v$.form.productName.$model"
      />
      <InputErrMsgTemp
        :errorsObj="v$.form.productName.$silentErrors"
        v-if="v$.form.productName.$dirty"
      />
      <button type="submit">
        Add new ingrediant
      </button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { twoWordPattern } from '@/core/validators/custom-validators';
import { required, numeric } from '@vuelidate/validators';
import InputErrMsgTemp from '@/components/Input-err-msg-temp.vue';

export default {
  props: {
    ingrediants: {
      type: Array,
      required: true,
    },
  },
  components: { InputErrMsgTemp },
  emits: ['addIngrediant'],
  setup(props, { emit }) {
    const form = ref({ quantity: '', productName: '', unit: '' });
    const rules = computed(() => ({
      form: {
        quantity: { numeric },
        unit: {},
        productName: { required, twoWordPattern },
      },
    }));
    const addIngrediant = () => {
      v$.value.form.$touch();
      if (v$.value.form.$invalid) return;
      const ingrediant = {
        id: props.ingrediants.length,
        quantity: form.value.quantity + form.value.unit,
        productName: form.value.productName,
      };
      emit('addIngrediant', ingrediant);
      v$.value.form.$reset();
      form.value.quantity = '';
      form.value.productName = '';
      form.value.unit = '';
    };

    const v$ = useVuelidate(rules, { form });
    return { addIngrediant, form, v$ };
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
label
  display block
  margin-top 5px
.ingrediants
  margin 0
  display block
  > form
    > button
        display block
</style>
