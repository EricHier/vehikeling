<template>
  <div>
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-head">
        <Navbar/>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2" id="title">
            vehikeling
          </h1>
          <h2 class="subtitle is-4">
            Die Vehikel-Servecing App für deine Fahrzeuge.
          </h2>
        </div>
      </div>
    </section>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
    import Navbar from '~/components/Navbar.vue'
    import Footer from "../components/Footer";

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
