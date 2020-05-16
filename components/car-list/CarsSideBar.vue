<template>
  <div>
    <p class="text-justify mb-4" v-if="cars.length === 0 || !isMobile">
      Hier findest Du die Übersicht alle deiner Fahrzeuge. Mit dem Knopf hier kannst du diese hinzufügen. Wenn du ein Fahrzeug
      auswählst, kommst du auf eine Detail-Seite, auf der du die Services einsehen und Daten ändern kannst.
    </p>
    <hr v-if="cars.length === 0 || !isMobile" class="mb-4"/>
    <button class="custom-button mb-4" v-on:click="onClick">Fahrzeug hinzufügen</button>
    <hr class="mb-4"/>
    <p class="text-justify">
      Wenn es Probleme irgendeiner Art gibt,
      <nuxt-link to="/kontakt"> melden Sie sich bitte bei mir</nuxt-link>.
      Die Platform ist noch ziemlich neu und bedarf deshalb höchstwahrscheinlich noch einiger Fehlerbehebungen.
      Bei Vorschlägen für neue Features zöger bitte nicht, mir eine E-Mail zu schreiben - ich bin gerne bereit, die
      Platform noch weiter zu verbessern. :)
    </p>
  </div>
</template>

<script>
  import {isMobile} from "../../assets/pwa-check";

  export default {
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
<style scoped lang="scss">

</style>
