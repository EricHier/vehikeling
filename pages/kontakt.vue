<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-third">
          <h1 class="title is-3 content">Hi! Ich bin Eric :)</h1>
          <br/>
          <h2 class="content" v-bind:class="{'subtitle' : !isMobile}">Diese Platform habe ich erstellt um damit dich & Gleichgesinnte dabei zu unterstützen,
            die Services deiner Autos zu verwalten. </h2>
          <h2 class="content" v-bind:class="{'subtitle' : !isMobile}">
            Da ich wenig Erfahrung im Bereich Autos habe aber ein interessierter Programmierer bin, würde ich
            mich sehr darüber freuen, wenn Du mir bei Verbesserungsvorschlägen oder
            Fehlern eine E-Mail schreiben - dann kann ich mich dem Vorschlag annehmen. ^^
          </h2>
          <h2 class="content" v-bind:class="{'subtitle' : !isMobile}">
            Falls du den Service noch nicht ausprobiert hast, kann ich nur empfehlen, dies zu tun, auf der Startseite findest du den Anmelde-Button:
            <nuxt-link to="/">Startseite</nuxt-link>
          </h2>
        </div>
        <div class="column is-one-third is-vertical-center">
          <div class="has-text-centered is-fullwidth">
              <a href="mailto:developer.erichier@gmail.com" target="_blank" class="button is-medium is-light">developer.erichier@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

    export default {
        name: "kontakt",
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
<style scoped>
  .title, .subtitle, .content {
    line-height: 1.75em;
    text-align: justify;
  }

  .is-vertical-center {
    display: flex;
    align-items: center;
  }

  .is-fullwidth {
    width: 100%;
    margin: 10px;
  }
</style>
