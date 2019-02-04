<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import navBar from './components/NavBar'

  export default {
    data () {
      return {

      }
    },
    components: {
      'nav-bar': navBar
    }
  }
</script>

<style>
  @import "assets/css/nav.css";
  @import "assets/css/main.css";
</style>
