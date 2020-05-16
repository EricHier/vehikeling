<template>
  <div class="custom-card shadow rounded container mx-auto p-4 mt-4" v-if="array.length >= 2">
    <h1 class="text-centered text-xl md:text-2xl font-semibold mb-4">
      Ich sehe, du benutzt den Service schon richtig aktiv, das
      freut mich!
    </h1>

    <div class="md:flex justify-center items-center">
      <div class="md:w-5/6 md:mr-4 mb-4 md:mb-0">
        <p class="text-justify">
          Ich hoffe das deine Erfahrung mit meinem Service bis jetzt gut war und du keine größeren Probleme hattest.
          Falls doch, schreib mir doch einfach eine E-Mail -
          <nuxt-link to="/kontakt">hier findest du meine Kontaktdaten.</nuxt-link>
          Wenn du überzeugt bist, würde ich mich unglaublich drüber freuen, wenn du mir eine kleine Spende da lässt
          - diese hilft mir, die Kosten fur Server zu bezahlen. Vielen Dank im vorraus!
        </p>
      </div>
      <div class="md:w-1/6">
        <a href="https://paypal.me/erichier" target="_blank" class="custom-button">Zu PayPal</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Spenden',
        props: ['array']
    }
</script>

<style scoped>
  .card {
    padding: 15px;
  }

  .justify-content {
    text-align: justify;
  }

  .is-vertical-center {
    display: flex;
    align-items: center;
  }

  .title {
    line-height: 1.75em;
    text-align: justify;
  }

  .is-fullwidth {
    width: 100%;
  }

  #spendensection {
    padding-top: 0px;
  }
</style>
