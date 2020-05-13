<template>
  <div class="custom-card print-disable p-6">
    <p class="text-justify mb-4" v-if="services.length === 0">
      Die Services deiner Fahrzeuge kannst du auf dieser Seite inspizieren oder hinzufügen. :) Die Services werden dann
      automatisch chronologisch sortiert, damit du möglichst schnell und auf einen Blick alles wichtige siehst.
    </p>
    <hr v-if="services.length === 0" class="mb-4"/>
    <button class="custom-button mb-4" v-on:click="onClick">Service hinzufügen</button>
    <hr class="mb-4"/>
    <input class="mb-4 custom-input" type="text" v-model="searchTerm" placeholder="Suche...">
    <hr class="mb-4"/>
    <p class="text-justify">
      Wenn es Probleme irgendeiner Art gibt,
      <nuxt-link class="text-link" to="/kontakt"> melde dich bitte bei mir</nuxt-link>. Die Platform ist noch ziemlich neu und bedarf deshalb höchstwahrscheinlich noch einiger Fehlerbehebungen.
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
