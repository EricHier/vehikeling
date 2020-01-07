<template>
  <div class="content">
    <p class="justify-content" v-if="cars.length === 0 || !isMobile">
      Hier findest Du die Übersicht alle deiner Fahrzeuge. Mit dem Knopf hier kannst du diese hinzufügen. Wenn du ein Fahrzeug
      auswählst, kommst du auf eine Detail-Seite, auf der du die Services einsehen und Daten ändern kannst.
    </p>
    <hr v-if="cars.length === 0 || !isMobile"/>
    <button class="button is-primary is-fullwidth" v-on:click="onClick">Fahrzeug hinzufügen</button>
    <hr/>
    <p class="justify-content">
      Wenn es Probleme irgendeiner Art gibt,
      <nuxt-link to="/kontakt"> melden Sie sich bitte bei mir</nuxt-link>
      . Die Platform ist noch ziemlich neu und bedarf deshalb höchstwahrscheinlich noch einiger Fehlerbehebungen.
      Bei Vorschlägen für neue Features zöger bitte nicht, mir eine E-Mail zu schreiben - ich bin gerne bereit, die
      Platform noch weiter zu verbessern. :)
    </p>
  </div>
</template>

<script>
  import {isMobile} from "../assets/pwa-check";

  export default {
        name: 'CarsSideBar',
        props: ["searchTerm", "cars"],
        data() {
            return {
                isMobile: false
            }
        },
        methods: {
            onClick: function () {
                this.$emit('clicked');
            }
        },
        created: function e () {
            this.isMobile = isMobile();
        }

    }
</script>

<style scoped>
  .justify-content {
    text-align: justify;
  }
</style>
