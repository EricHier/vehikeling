<template>
    <div class="notification is-warning">
      <div>
        <h1 class="title has-text-centered">
          Es ist ein Fehler aufgereten
        </h1>
        <p class="paragraph has-text-centered">
          {{error}}
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Error',
        props: [ "error" ]
    }
</script>

<style scoped>
  .content {
    margin: 20px;
    height: 100%;
  }
</style>
