<template>
  <Navbar />
  <Toast />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Toast from '@/components/Toast.vue';
export default {
  components: { Navbar, Toast },
};
</script>
<style lang="stylus">
primary = #2c3e50
secondary = #ff6347
html
  background #f8f8f8
*
  margin 0
  padding 0
  color primary
  text-decoration none
  list-style: none;
a
  color white
  font-weight  bold
  margin 0.2em
  &:hover
    cursor pointer
button
  background secondary
  margin 5px auto
  padding 8px 10px
  border 2px solid white
  border-radius 7px
  color white
  font-weight bold
  outline none
input, textarea, select
  border 1px solid secondary
  padding 5px 10px
  margin 5px 0
  border-radius 3px
  text-align center
  width 80%
  max-width 400px
label
  max-width 450px
  margin 0 auto
  padding 5px 10px
form
  width 100%
  margin-top 2em
  display inline-block
.material-icons
  vertical-align middle
.error
  border 2px solid red
  display block
  margin 5px auto
  padding 5px
  border-radius 3px
  text-align center
  width 80%
  max-width 400px
.valid
  border 2px solid green
.route-enter-from
  opacity 0
  transition translateY(-100px)
.route-enter-active
  transition  all 0.6s ease-out
.route-leave-to
  opacity  0
  transform  translateY(100px)
.route-leave-active
  transition all 0.6s ease-in
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin 0 auto
  max-width 960px
</style>
