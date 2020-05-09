<template>
  <div id="allesGrau" v-on:click="onPopupClick">
    <div id="popup" v-on:click="onPopupClick">
      <div id="formContainer" v-on:click="onFormClick" v-on:keydown="onFormKeydown">
        <form v-on:submit="pushNewService" v-if="!disabled">
          <h1 class="title is-4">Service hinzufügen</h1>
          <Input v-on:newValue="newTitle" v-bind:default="title" v-bind:label="'Was wurde gemacht? * '" v-bind:is-big="false" v-bind:required="true"
                 v-bind:image="false" v-bind:disabled="disabled"/>
          <Input v-on:newValue="newDescription" v-bind:default="description" v-bind:label="'Details'" v-bind:is-big="true" v-bind:required="false"
                 v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newKilometerstand" v-bind:default="kilometerstand" v-bind:label="'Kilometerstand'" v-bind:is-big="false" v-bind:required="false"
                 v-bind:image="false" v-bind:disabled="disabled" v-bind:number="true"/>

          <label class="label">Datum</label>
          <input type="date" class="date input genug-margin" v-model="date" required/>

          <label class="label">Kategorie *</label>
          <div class="genug-margin select select-full-width">
            <select required v-model="category" class="select select-full-width">
              <option>Kauf</option>
              <option>HU / AU</option>
              <option>Ölwechsel</option>
              <option>Wartung / Inspektion</option>
              <option>Sonstiges</option>
            </select>
          </div>

          <input v-bind:disabled="disabled" class="button is-primary is-fullwidth" type="submit"
                 name="Speichern" />
        </form>
        <Loading v-if="disabled" />
      </div>
    </div>

  </div>
</template>

<script>
    import Input from "./Input";
    import Loading from "./Loading"
    import {auth, db} from '../services/firebase.js'
    import VueScrollTo from 'vue-scrollto'

    export default {
        name: 'AddService',
        components: {Input, Loading},
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

<style scoped>

  .select-full-width {
    width: 100%;
  }

  .genug-margin {
    margin-bottom: 0.75rem;
  }

  #popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 128;
  }

  #formContainer {
    min-width: 250px;
    max-width: 500px;
    width: calc(100% - 30px);
    margin: 15px;
    height: fit-content;
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(calc(-50% - 15px), 0px);
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }

  @media only screen and (min-height: 1000px) {
    #formContainer {
      top: 50%;
      left: 50%;
      transform: translate(calc(-50% - 15px), calc(-50% - 15px));
    }
  }


  #allesGrau {
    width: 100%;
    height: 1000%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 127;
  }

</style>
