<template>
    <div class="bg-red-500 is-warning text-center p-8 m-2 text-white rounded shadow">
      <h1 class="custom-title mb-4">
        Es ist ein Fehler aufgereten
      </h1>
      <p class="font-semibold">
        {{error}}
      </p>
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
