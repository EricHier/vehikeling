<template>
  <section class="section">
    <div class="container">
      <progress class="progress is-small is-primary" max="100">{{percent}}</progress>
    </div>
  </section>
</template>

<script>
    export default {
        name: 'Loading',
        props: ["percent"]
    }
</script>

<style scoped>
  progress {
    max-width: 40vw;
    margin: auto;
  }
</style>
