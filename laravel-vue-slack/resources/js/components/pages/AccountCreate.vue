<template>
  <div class="w-10/12 m-auto text-center">
    <app-title class="pt-8 pb-8 pr-10" />
    <sign-in-text>Join laravel-vue-slack.</sign-in-text>
    <div class="w-96 m-auto text-left pt-8 pr-3">
      <div>Email address</div>
      <div class="mb-5">{{ sendEmail }}</div>
      <form-label class="mb-2" forText="name" showText="User Name" />
      <form-text  class="mb-2" type="text" v-model="inputName" name="user_name" id="user_name" placeholder="User name" />
      <form-label class="mb-2" forText="password" showText="Password" />
      <form-text  class="mb-2" type="password" v-model="inputPassword" name="password" id="password" placeholder="Your password" />
      <account-create-button class="mt-5" :disabled="isDisableCreateButton" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['sendEmail'],
  setup(props) {
    const inputName = ref('')
    const inputPassword = ref('')
    const isDisableCreateButton = ref(false)

    return {
      inputName,
      inputPassword,
      isDisableCreateButton,
    }
  }
}
</script>