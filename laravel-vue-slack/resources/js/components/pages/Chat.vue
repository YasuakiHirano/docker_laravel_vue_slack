<template>
  <div>
    Hello, {{ text }}
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