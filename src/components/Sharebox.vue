<template>
  <div v-if="id" class="share">
    <h2>Share your favorite recipe !</h2>
    <ul >
      <li><a href="https://www.facebook.com/sharer.php?u=http://localhost:8080/recipe/details/{{ id }}" class="fa fa-facebook"><i></i></a></li>
      <li><a href="https://twitter.com/intent/tweet?url=http://localhost:8080/recipe/details/{{ id }}&text=" class="fa fa-twitter"><i></i></a></li>
      <li><a href="https://pinterest.com/pin/create/button/?url=http://localhost:8080/recipe/details/{{ id }}&media=&description="
          class="fa fa-pinterest"><i></i></a></li>
    </ul>
    <button @click="close()">Close</button>
  </div>
</template>
<script lang="ts">
import { Options,Vue } from "vue-class-component";
class Props {
  id!: string;
}
@Options({
  emits: ["toggleSharebox"]
})
export default class Sharebox extends Vue.with(Props) {
  close() {
    this.$emit("toggleSharebox")
  }
}
</script>
<style lang="stylus" scoped>
.share
  background white
  margin 0 auto
  position absolute
  top 200px
  border 1px solid #ff6347
  border-radius 20px
  padding 10px
  
</style>