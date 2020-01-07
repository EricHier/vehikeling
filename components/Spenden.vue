<template>
  <section class="section" id="spendensection" v-if="array.length >= 2">
    <div class="container">
      <div class="card roundBorders"><h1 class="content is-5 title has-text-centered">
        Ich sehe, du benutzt den Service schon richtig aktiv, das
        freut mich!
      </h1>

        <div class="columns">
          <div class="column is-10">
            <p class="content justify-content">
              Ich hoffe das deine Erfahrung mit meinem Service bis jetzt gut war und du keine größeren Probleme hattest.
              Falls doch, schreib mir doch einfach eine E-Mail -
              <nuxt-link to="/kontakt">hier findest du meine Kontaktdaten.</nuxt-link>
              Wenn du überzeugt bist, würde ich mich unglaublich drüber freuen, wenn du mir eine kleine Spende da lässt
              - diese hilft mir, die Kosten fur Server zu bezahlen. Vielen Dank im vorraus!
            </p>
          </div>
          <div class="column is-2 is-vertical-center">
            <div class="is-fullwidth">
              <a href="https://paypal.me/erichier" target="_blank" class="button is-vertical-center is-light">Zu PayPal</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
