<template>
  <div id="app">
    <v-home/>
  </div>
</template>

<script>
import Home from './views/Home'

export default {
  name: 'app',
  components: {
    'v-home': Home
  }
}
</script>

<style>
</style>
