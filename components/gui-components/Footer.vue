<template>
  <footer class="pt-12 pb-24 px-6 bg-footer print-disable">
    <div class="container mx-auto text-center">
      <p class="mb-4">
        <strong>vehikeling</strong> by EricHier.
      </p>
      <p>
        <nuxt-link class="text-red-500 font-semibold" to="/datenschutz">Datenschutzhinweise</nuxt-link> |
        <nuxt-link class="text-red-500 font-semibold" to="/impressum">Impressum</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>
