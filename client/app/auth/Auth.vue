<template>
  <div class="auth">
    <form method="post" @submit.prevent="handleSubmit">
      <p>
        {{error}}
      </p>
      <p>
        <input class="form__control" type="text" name="email" v-model="email" ref="email">
      </p>
      <p>
        <input class="form__control" type="password" name="password" v-model="password">
      </p>
      <p>
        <button type="submit" :disabled="!enableSubmit">Login</button>
      </p>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    mounted () {
      this.$refs.email.focus()
    },

    data () {
      return {
        email: '',
        password: '',
        error: ''
      }
    },

    computed: {
      enableSubmit () {
        return this.email.length && this.password.length
      }
    },

    methods: {
      handleSubmit () {
        axios
          .post('/auth/authenticate', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.data.success) {
              /* global URLSearchParams window */
              let params = new URLSearchParams(window.location.search.slice(1))
              let from = params.get('from') || ''

              window.location = `/admin${from}`
            } else {
              this.error = res.data.error
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~shared/styles/base";

  .auth {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    input,
    input:-webkit-autofill {
      width: 25vw;
      padding: 1rem 2rem;
      font-size: 2rem;
      border: none;
      background: #f1f1f1;
      border-radius: 2px;
      -webkit-text-fill-color: black;
      -webkit-box-shadow: 0 0 0 1000px #f1f1f1 inset;
    }

    button {
      background: $color-primary;
      box-shadow: none;
      border: none;
      padding: 1rem 2rem;
      font-size: 2rem;
      color: white;
      border-radius: 2px;
    }
  }

</style>
