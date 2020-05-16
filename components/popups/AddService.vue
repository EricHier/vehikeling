<template>
  <PopupContainer :onFormClick="onFormClick" :onFormKeydown="onFormKeydown">
    <div>

        <form v-on:submit="pushNewService" v-if="!disabled">
          <h1 class="custom-title">Service hinzufügen</h1>
          <Input v-on:newValue="newTitle" v-bind:default="title" v-bind:label="'Was wurde gemacht? * '" v-bind:is-big="false" v-bind:required="true"
                 v-bind:image="false" v-bind:disabled="disabled"/>
          <Input v-on:newValue="newDescription" v-bind:default="description" v-bind:label="'Details'" v-bind:is-big="true" v-bind:required="false"
                 v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newKilometerstand" v-bind:default="kilometerstand" v-bind:label="'Kilometerstand'" v-bind:is-big="false" v-bind:required="false"
                 v-bind:image="false" v-bind:disabled="disabled" v-bind:number="true"/>

          <label class="block mt-2">Datum</label>
          <input type="date" class="block mt-1 w-full border border-black p-2 outline-none rounded" v-model="date" required/>

          <label class="block mt-2">Kategorie *</label>
          <div class="block mt-1 w-full">
            <select required v-model="category" class="w-full outline-none p-2 rounded">
              <option>Kauf</option>
              <option>HU / AU</option>
              <option>Ölwechsel</option>
              <option>Wartung / Inspektion</option>
              <option>Sonstiges</option>
            </select>
          </div>

          <input v-bind:disabled="disabled" class="custom-button mt-4" type="submit"
                 name="Speichern" />

          <button v-bind:disabled="disabled"  class="custom-button mt-2" v-on:click="$emit('close')">Schließen</button>
        </form>
        <Loading v-if="disabled" />
    </div>
  </PopupContainer>
</template>
<script>
    import Input from "../gui-components/Input";
    import Loading from "../gui-components/Loading"
    import {auth, db} from '../../services/firebase.js'
    import VueScrollTo from 'vue-scrollto'
    import PopupContainer from "../gui-components/PopupContainer"

    export default {
        name: 'AddService',
        components: {Input, Loading, PopupContainer},
        props: ["car", "service"],
        data() {
            return {
                category: "",
                date: "",
                titel: "",
                description: "",
                id: "",
                kilometerstand: "",
                disabled: false,
            }
        },
        methods: {
            newTitle: function (e) {
                this.title = e;
            },
            newDescription: function (e) {
                this.description = e;
            },
            onPopupClick: function () {
                this.$emit("close");
            },
            newKilometerstand: function (e) {
                this.kilometerstand = e;
            },
            onFormClick: function (e) {
                e.stopPropagation();
            },
            onFormKeydown: function (e) {
                if (e.key === "Escape")
                    this.$emit("close");
            },
            pushToDB: function(uid, cid, service) {
                let self = this;
                let ref = db.collection("user").doc(uid).collection("cars").doc(cid).collection("services").doc(service.id);

                ref.set(service).then(function () {
                    self.$emit("error", "");
                    self.disabled = false;
                    self.$emit("close");
                }).catch(err => {
                    self.$emit("error", "Die Daten konnten nicht in der Datenbank gespeichert werden. ");
                    console.log('Addcar.vue setting document' + err);
                });
            },
            async pushNewService(e) {
                e.preventDefault();

                let self = this;
                let service = {
                    "title": self.title,
                    "description": self.description,
                    "category": self.category,
                    "date": self.date,
                    "kilometerstand": self.kilometerstand,
                    "id": self.id
                };

                if (auth.currentUser !== null) {
                    let uid = auth.currentUser.uid;
                    this.disabled = true;

                    let ref = db.collection("user").doc(uid).collection("cars").doc(self.car.id).collection("services").doc();

                    if (service.id === "")
                        service.id = ref.id;

                    self.pushToDB(uid, self.car.id, service);

                }
            }
        },
        created() {
            let d = new Date().toJSON().slice(0, 10);
            this.date = d;

            let e = this.service;
            VueScrollTo.scrollTo({container: "#navbar"});

            console.log(e);
            if (Object.entries(e).length === 0)
                return;

            this.title = e.title;
            this.description = e.description;
            this.date = e.date;
            this.category = e.category;
            this.kilometerstand = e.kilometerstand;
            this.id = e.id;
        }
    }
</script>
