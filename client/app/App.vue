<template>
  <div class="app">

    <header class="app__header">
      {{title}}
    </header>

    <main role="main" class="app__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    mounted () {},

    data () {
      return {}
    },

    computed: {
      ...mapGetters('app', [
        'title'
      ])
    },

    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>

  .app {

    &__header {

    }

    &__main {

    }
  }

</style>
