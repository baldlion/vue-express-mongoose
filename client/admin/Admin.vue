<template>
  <div>
    <a href="/auth/logout">Logout</a>
    <router-link to="/">Dashboard</router-link>
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