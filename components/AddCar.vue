<template>
  <div id="allesGrau" v-on:click="onPopupClick">
    <div id="popup" v-on:click="onPopupClick">
      <div id="formContainer" v-on:click="onFormClick" v-on:keydown="onFormKeydown">

        <Loading v-if="disabled && loading" v-bind:percent="uploadValue"/>
        <Error v-if="error !== ''" v-bind:error="error"/>

        <form v-on:submit="pushNewCar" v-if="!disabled">
          <h1 class="title is-4" v-if="Object.entries(car).length === 0">Fahrzeug hinzufügen</h1>
          <h1 class="title is-4" v-if="Object.entries(car).length !== 0">Fahrzeug bearbeiten</h1>

          <Input v-on:newValue="newName" v-bind:default="name" v-bind:label="'Spitzname des Fahrzeugs'" v-bind:is-big="false"
                 v-bind:required="false" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newHersteller" v-bind:default="hersteller" v-bind:label="'Hersteller des Fahrzeugs*'" v-bind:is-big="false"
                 v-bind:required="true" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newModel" v-bind:default="model" v-bind:label="'Model des Fahrzeugs*'" v-bind:is-big="false"
                 v-bind:required="true" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newColor" v-bind:default="color" v-bind:label="'Farbe des Fahrzeugs'" v-bind:is-big="false"
                 v-bind:required="false" v-bind:image="false " v-bind:disabled="disabled"/>

          <Input v-on:newValue="newFahrgestellnummer" v-bind:default="fahrgestellnummer" v-bind:label="'Fahrgestellnummer des Fahrzeugs'"
                 v-bind:is-big="false" v-bind:required="false" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newKennzeichen" v-bind:default="kennzeichen" v-bind:label="'Kennzeichen des Fahrzeugs'"
                 v-bind:is-big="false" v-bind:required="false" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newSpecs" v-bind:default="specs" v-bind:label="'Technische Details des Fahrzeugs'"
                 v-bind:is-big="true" v-bind:required="false" v-bind:image="false" v-bind:disabled="disabled"/>

          <Input v-on:newValue="newBaujahr" v-bind:default="baujahr" v-bind:label="'Baujahr des Fahrzeugs'"
                 v-bind:is-big="false" v-bind:required="false" v-bind:image="false" v-bind:disabled="disabled" v-bind:number="true"/>

          <Input v-bind:label="'Bild deines Fahrzeugs (max. 2 MB)*'" v-bind:secondline="tagUpload" v-on:loadImage="loadImage"
                 v-bind:is-big="false" v-bind:required="true" v-bind:image="true" v-bind:disabled="disabled"
                 v-if="images === null"/>

          <input v-bind:disabled="disabled" id="submitform" class="button is-primary is-fullwidth" type="submit" name="Speichern"/>
          <button v-bind:disabled="disabled" class="button is-fullwidth" v-on:click="closeAddCar">Schließen</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
    import Input from "./Input";
    import Loading from "./Loading"
    import {storage, auth, db} from '../services/firebase.js'
    import {v4 as uuid} from 'uuid'
    import VueScrollTo from 'vue-scrollto'
    import Error from "./Error";

    export default {
        name: 'AddCar',
        components: {Error, Input, Loading},
        props: ["car"],
        data() {
            return {
                name: "",
                baujahr: "",
                color: "",
                hersteller: "",
                fahrgestellnummer: "",
                kennzeichen: "",
                model: "",
                specs: "",
                id: "",
                images: null,
                imageData: null,
                picureUrl: "",
                uploadValue: -1,
                disabled: false,
                error: "",
                loading: true,
                tagUpload: "Es wird empfohlen, Bilder mit einem Seitenverhältnis von 16:9 zu verwenden die eine Auflösung von zwischen 500 und 1000 Pixeln breit sind. Bilder die von Apple Smartphones aufgenommen wurden, werden womöglich falschherum dargestellt. Wenn es zu diesem Fehler kommt, rotiere Sie das Bild einfach mit einem anderen Programm und probiere es erneut. "
            }
        },
        methods: {
            newName(e) {
                this.name = e;
            },
            newModel(e) {
                this.model = e;
            },
            newColor(e) {
                this.color = e;
            },
            newFahrgestellnummer(e) {
                this.fahrgestellnummer = e;
            },
            newKennzeichen(e) {
                this.kennzeichen = e;
            },
            newSpecs(e) {
                this.specs = e;
            },
            newHersteller(e) {
                this.hersteller = e;
            },
            newBaujahr(e) {
                this.baujahr = e;
            },
            loadImage(event) {
                this.imageData = event.target.files[0];
            },
            onPopupClick: function () {
                this.$emit("close");
            },
            onFormClick: function (e) {
                e.stopPropagation();
            },
            onFormKeydown: function (e) {
                if (e.key === "Escape")
                    this.$emit("close");
            },
            closeAddCar: function () {
                this.$emit("close");
            },
            pushToDB: function (uid, car) {
                if (car.id === "")
                    return;

                let self = this;
                let ref = db.collection("user").doc(uid).collection("cars").doc(car.id);

                ref.set(car).then(function () {
                    VueScrollTo.scrollTo({container: "#navbar"});
                    self.disabled = false;
                    self.$emit("setCurrentCar", {});
                    self.$emit("close");
                })
                    .catch(err => {
                        self.error = "Die Daten konnten nicht in der Datenbank gespeichert werden. \nProbeire es bitte noch einmal. ";
                        self.loading = false;
                        console.log('Addcar.vue setting document', err);
                    });
            },
            uploadImage: function (uid, car) {
                const storageRef = storage.ref().child(uid).child(car.id).child(uuid());
                const img = storageRef.put(this.imageData);

                let self = this;

                img.on(`state_changed`,
                    snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    error => {
                        self.error = "Das Bild konnte nicht hochgeladen werde. \nIst es vielleicht zu groß? ";
                        self.loading = false;
                        self.disabled = false;
                        console.log(error.message)
                    },
                    () => {

                        let newMetadata = {
                            cacheControl: 'private,max-age=15552000'
                        };

                        storageRef.updateMetadata(newMetadata).then(e => {
                            console.log(e);
                        }).catch(e => {
                            console.log("Updating Storage Metadata Error", e);
                        });

                        this.uploadValue = 100;
                        img.snapshot.ref.getDownloadURL().then((url) => {

                            self.picureUrl = url;
                            car.images = [this.picureUrl];
                            this.pushToDB(uid, car);

                        });

                    });
            },
            async pushNewCar(e) {
                e.preventDefault();
                let self = this;
                let car = {
                    "baujahr": self.baujahr,
                    "color": self.color,
                    "fahrgestellnummer": self.fahrgestellnummer,
                    "kennzeichen": self.kennzeichen,
                    "hersteller": self.hersteller,
                    "model": self.model,
                    "name": self.name,
                    "specs": self.specs,
                    "images": self.images,
                    "id": self.id
                };

                console.log(car);

                if (auth.currentUser !== null) {
                    let uid = auth.currentUser.uid;

                    self.disabled = true;

                    if (car.id === "") {
                        car.id = db.collection("user").doc(uid).collection("cars").doc().id;
                        this.uploadImage (uid, car);
                    } else {
                        this.pushToDB(uid, car);

                    }

                }

            }
        },
        created() {
            let e = this.car;

            VueScrollTo.scrollTo({container: "#navbar"});

            console.log(e);
            if (Object.entries(e).length === 0)
                return;

            this.name = e.name;
            this.baujahr = e.baujahr;
            this.color = e.color;
            this.fahrgestellnummer = e.fahrgestellnummer;
            this.kennzeichen = e.kennzeichen;
            this.model = e.model;
            this.hersteller = e.hersteller;
            this.specs = e.specs;
            this.images = e.images;
            this.id = e.id;
        }

    }

</script>

<style scoped>

  #popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    overflow: auto;
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

  @media only screen and (min-height: 1200px) {
    #formContainer {
      overflow-y: scroll;
      top: 50%;
      left: 50%;
      transform: translate(calc(-50% - 15px), calc(-50% - 15px));
    }
  }

  #allesGrau {
    width: 100%;
    height: 1000%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 127;
  }

  #submitform {
    margin-bottom: 0.75rem;
  }

</style>
