<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <MTN />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MTN from '@/components/Mtn.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MTN
  }
}
</script>
