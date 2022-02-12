<template>
  <div>
    Hello, {{ text }}
    <router-link to="/">サインイン画面へ</router-link>
  </div>
</template>
<script>
export default {
  setup() {
    const text = 'World'

    return {
      text
    }
  }
}
</script>