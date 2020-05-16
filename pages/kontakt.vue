<template>
  <section>
    <div class="container">
      <h1 class="text-2xl font-semibold mb-2">Hi! Ich bin Eric :)</h1>
      <h2 class="text-xl text-justify font-medium mb-3">
        Diese Platform habe ich erstellt um damit dich & Gleichgesinnte dabei zu unterstützen,
        die Services deiner Autos zu verwalten.
      </h2>
      <h2 class="text-justify mb-3">
        Da ich wenig Erfahrung im Bereich Autos habe aber ein interessierter Programmierer bin, würde ich
        mich sehr darüber freuen, wenn Du mir bei Verbesserungsvorschlägen oder
        Fehlern eine E-Mail schreiben - dann kann ich mich dem Vorschlag annehmen. ^^
      </h2>
      <h2 class="mb-3 text-justify">
        Falls du den Service noch nicht ausprobiert hast, kann ich nur empfehlen, dies zu tun, auf der Startseite findest du den Anmelde-Button:
        <nuxt-link to="/" class="text-blue-800 italic">Startseite</nuxt-link>
      </h2>

      <a href="mailto:developer.erichier@gmail.com" target="_blank" class="custom-button">developer.erichier@gmail.com</a>
    </div>
  </section>
</template>
<script>

    export default {
        data() {
            return {
                isMobile: false
            }
        },
        created: function e () {
            this.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        }
    }

    //TODO: INHALT KONTAKT SEITE
    //TODO: Ablehnung wenn nicht angemeldet

</script>
