<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>

<script>
export default {
  props: {
    inputObj: {
      type: Object,
      required: true,
    },
  },
  emits: ['onInput'],
  setup(props, { emit }) {
    const { type, name, placeholder, model } = props.inputObj;
    const onInput = (event) => {
      emit('onInput', event.target.value);
    };
    return { type, name, placeholder, onInput };
  },
};
</script>

<style></style>
