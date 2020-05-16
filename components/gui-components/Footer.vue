<template>
  <footer class="pt-12 pb-24 px-6 bg-footer print-disable">
    <div class="container text-center">
      <p class="mb-4">
        <strong>vehikeling</strong> by EricHier.
      </p>
      <p>
        Icons von <a class="text-link" href="https://icons8.com">Icons8</a>.
      </p>
      <p>
        <nuxt-link class="text-link" to="/datenschutz">Datenschutzhinweise</nuxt-link> |
        <nuxt-link class="text-link" to="/impressum">Impressum</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>
