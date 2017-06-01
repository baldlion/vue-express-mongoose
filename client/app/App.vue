<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/contact">Contact</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    mounted() {

    },

    data() {
      return {

      }
    },

    methods: {}
  }
</script>

<style lang="scss">
  @import "~assets/styles/base";

</style>