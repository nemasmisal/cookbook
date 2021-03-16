<template>
  <div class="error" v-for="error of errorsObj" :key="error.$message">
    {{ error.$message }}
  </div>
</template>

<script>
export default {
  name: 'InputErrMsgTemp',
  props: {
    errorsObj: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
