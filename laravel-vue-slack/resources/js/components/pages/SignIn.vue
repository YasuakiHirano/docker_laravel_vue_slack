<template>
  <div class="w-10/12 m-auto text-center">
    <form>
      <app-title class="pt-8 pb-8 pr-10" />
      <sign-in-text>Sign in to laravel-vue-slack.</sign-in-text>
      <div class="w-96 m-auto text-left pt-8 pr-3">
        <form-label class="mb-2" forText="email" showText="Email address" />
        <form-text class="mb-2" type="text" v-model="emailAddress" name="email" id="email" placeholder="name@example.com" />
        <form-label class="mb-2" forText="password" showText="Password" />
        <form-text type="password" v-model="password" name="password" id="password" placeholder="Your password" autocomplete="on" />
        <sign-in-button class="mt-5" @click="signIn" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '../../router/index.js'

export default {
  setup() {
    const emailAddress = ref('')
    const password = ref('')

   /**
    * サインインする
    */
    const signIn = () => {
      console.log(emailAddress.value, password.value)
      router.push({ path: 'chat' })
    }

    return {
      emailAddress,
      password,
      signIn,
    }
  }
}
</script>