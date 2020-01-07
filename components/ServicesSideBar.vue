<template>
  <div class="content">
    <p class="justify-content" v-if="services.length === 0">
      Die Services deiner Fahrzeuge kannst du auf dieser Seite inspizieren oder hinzufügen. :) Die Services werden dann
      automatisch chronologisch sortiert, damit du möglichst schnell und auf einen Blick alles wichtige siehst.
    </p>
    <hr v-if="services.length === 0"/>
    <button class="button is-primary is-fullwidth" v-on:click="onClick">Service hinzufügen</button>
    <hr/>
    <input class="input" type="text" v-model="searchTerm" placeholder="Suche...">
    <hr/>
    <p class="justify-content">
      Wenn es Probleme irgendeiner Art gibt,
      <nuxt-link to="/kontakt"> melde dich bitte bei mir</nuxt-link>
      . Die Platform ist noch ziemlich neu und bedarf deshalb höchstwahrscheinlich noch einiger Fehlerbehebungen.
      Bei Vorschlägen für neue Features zöger bitte nicht, mir eine E-Mail zu schreiben, ich bin gerne bereit, die
      Platform noch weiter zu verbessern. :)
    </p>
  </div>
</template>

<script>
    export default {
        name: 'ServicesSideBar',
        props: ['services'],
        data() {
            return {
                searchTerm: ""
            }
        },
        methods: {
            onClick: function () {
                console.log("clicked");
                this.$emit('clicked');
            }
        },
        watch: {
            searchTerm: function (e) {
                this.$emit("newSearch", e);
            }
        }
    }
</script>

<style scoped>
  .justify-content {
    text-align: justify;
  }
</style>
