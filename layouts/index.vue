<template>
  <div>
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
    <Footer/>
  </div>
</template>

<script>
    import Navbar from '~/components/gui-components/Navbar.vue'
    import Footer from "../components/gui-components/Footer";

    export default {
        layout: "index",
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

  #title {
    margin-bottom: 2rem;
  }

</style>
