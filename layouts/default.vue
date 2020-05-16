<template>
  <div class="bg-white font-display">
    <section class="bg-hero flex flex-col justify-between text-white is-bold">
      <div class="flex-shrink-0 flex-grow-0">
        <Navbar/>
      </div>
      <div class="container">
        <h1 class="custom-title text-3xl">
          vehikeling
        </h1>
        <h2>
          Die Vehikel-Servecing App für deine Fahrzeuge.
        </h2>
      </div>
    </section>
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
    import Navbar from '~/components/gui-components/Navbar.vue'
    import Footer from "../components/gui-components/Footer";

    require("typeface-roboto");

    export default {
        components: {
            Footer,
            Navbar
        }
    }
</script>

<style>
  html {
    background-color: #fafafa;
  }

  body {
    background-color: white;
  }

  .bg-hero {
    background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);;
  }
</style>
