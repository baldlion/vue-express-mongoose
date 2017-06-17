<template>
  <div class="admin">

    <header class="admin__header">
      {{title}} <a href="/admin/auth/logout">Logout</a>
    </header>

    <main role="main" class="admin__main">
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
      ...mapGetters('admin', [
        'title'
      ])
    },

    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>

  .admin {

    &__header {

    }

    &__main {

    }
  }

</style>
