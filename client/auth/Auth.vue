<template>
  <div class="wrapper">
    <div class="auth">

      <h1>Login</h1>

      <form class="form" method="post" @submit.prevent="handleSubmit">
        <p class="form__errors">
          {{error}}
        </p>
        <div class="form__row">
          <label class="form__label">
            email
            <input class="form__control" type="text" name="email" v-model="email">
          </label>
        </div>

        <div class="form__row">
          <label class="form__label">
            password
            <input class="form__control" type="password" name="password" v-model="password">
          </label>
        </div>

        <div class="form__row">
          <button type="submit" :disabled="!enableSubmit">Submit</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {

    },

    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },

    computed: {
      enableSubmit() {
        return this.email.length && this.password.length
      }
    },

    methods: {
      handleSubmit() {
        axios
          .post('/auth/authenticate', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.data.success) {
              window.location = '/admin';
            } else {
              this.error = res.data.error;
            }
          })
          .catch(err => {
            console.log(err);
          });


        console.log(this.email, this.password);
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/styles/base";
  @import "~assets/styles/forms";

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .auth {
    padding: 2rem;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.03);
    border-radius: 12px;
  }

</style>