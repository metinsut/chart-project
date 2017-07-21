<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <div class="home">
          <h1>{{ msg }}</h1>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
