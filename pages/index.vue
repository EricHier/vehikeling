<template>
  <div>
    <section class="section has-gray-background content">
      <div class="container normaler-bottom-margin">
        <div class="columns is-fullwidth">
          <div class="column is-5">
            <Car v-bind:car="car"/>
          </div>
          <div class="column is-7 is-vertical-center">
            <div class="has-text-centered is-fullwidth">
              <h2 class="title is-3">
                Füge deine Motorräder, Oldtimer und Sportwagen hinzu
              </h2>
              <p class="smaller">
                Du kannst all deine Fahrzeuge mit Bildern, technischen Daten und weiten Detais in der App speichern und
                verwalten. Dabei ist es egal, ob es sich um Sportwagen, Oldtimer, Motorräder oder Traktoren handelt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section content">
      <div class="container normaler-bottom-margin">
        <div class="columns  is-fullwidth">
          <div class="column is-7 is-vertical-center">
            <div class="has-text-centered is-fullwidth">
              <h2 class="title is-3">
                Speichere die Wartungsarbeiten und Services für deine Fahrzeuge
              </h2>
              <p class="smaller">
                Damit du immer mit wenigen Clicks sehen kannst, wan zuletzt das Öl gewechselt oder der TÜV gemacht
                wurde, kannst du alle deine Services
                hier eintragen und in einer übersichtlichen Timeline anzeigen und durchsuchen. Wir machen das verwalten
                deiner Services kinderleicht.
              </p>
            </div>
          </div>
          <div class="column is-5">
            <ServiceCollumn v-bind:services="services"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section content has-gray-background" v-show="uid == ''">
      <div class="container normaler-bottom-margin">
        <div class="columns  is-fullwidth">
          <div class="column is-5 buttonContent">
            <div>
              <div class="is-vertical-center">
                <button class="button is-success margin-auto" v-on:click="googleSignIn">Google Sign-In</button>
                <br>
              </div>
              <div class="is-vertical-center">
                <p id="datenschutz">Mit der Anmeldung akzeptieren Sie die
                  <nuxt-link to="/datenschutz">Datenschutzbestimmungen</nuxt-link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div class="column is-7 is-vertical-center">
            <div class="has-text-centered is-fullwidth">
              <h3 class="title is-3">
                Bereit es auszuprobieren?
              </h3>
              <p class="smaller">
                Probier es einfach aus! Es ist kostenlos und super einfach. :)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section content" v-show="uid == ''">
      <div class="container normaler-bottom-margin">
        <div class="columns  is-fullwidth">
          <div class="column is-12">
            <div class="has-text-centered is-fullwidth">
              <h3 class="title is-3">
                Noch Fragen?
              </h3>
              <p class="smaller">
                Schreib mir einfach! Ich als Hobby-Entwickler würde mich über Verbesserungsvorscläge oder Fehler-Reports
                jederzeit freuen. ^^<br>
                <button class="button kontakt-button-margin">
                  <nuxt-link to="/kontakt">Kontakt</nuxt-link>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import Car from "../components/Car";
    import ServiceCollumn from "../components/ServiceCollumn";
    import {auth, db, GoogleProvider} from '../services/firebase.js'
    import VueScrollTo from 'vue-scrollto'

    export default {
        layout: "index",
        components: {
            ServiceCollumn,
            Car,
        },
        head() {
            return {
                title: 'vehikeling | Verwaltung für die Services deiner Fahrzeuge',
                meta: [
                    {name: 'robots', content: 'index'},
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Die Vehikel-Servecing App für deine Sportwagen, Oldtimer oder Motorräder - ' +
                            'ganz unkompliziert die Services wie Ölwechsel und HU verwalten. Probiere es aus! '
                    }
                ]
            }
        },
        data() {
            return {
                car: {
                    hersteller: "Citroën",
                    name: "Ente",
                    model: "Citroën 2CV",
                    kennzeichen: "K-GH072H",
                    color: "Weiß",
                    baujahr: "1956",
                    fahrgestellnummer: "W0L000051T2123456",
                    images: ["/ente_beispiel.jpg"],
                    specs: "0.7L Ottomotor mit 21 kW\nLeergewicht: 560 kg"
                },
                services: [
                    {
                        "category": "HauptUntersuchung",
                        "date": "2001-04-14",
                        "description": "Am heutigen Tag war ich bei der DEKA und habe mein Auto dem TÜV unterzogen. Leider wurden zwei Mängel festgestellt, der linke Querlenker muss ersetzt werden. Ich werde mich am Wochenende darum kümmern. ",
                        "title": "TÜV Untersuchung",
                        "id": "kTourr4G6zyrB5iZyslR"
                    },
                    {
                        "category": "Wartung / Inspektion",
                        "date": "2001-03-25",
                        "description": "Nach dem Winter habe ich an diesem Wochenende mit einem Freund einige Roststellen am Fahrzeugboden ausgebessert. ",
                        "title": "Schweißarbeiten",
                        "id": "uvSCl6JEQiZrSQ3oRDpY"
                    }
                ],
                uid: "",
                active: false
            }
        },
        methods: {
            async googleSignIn() {
                this.active = false;
                await auth.signInWithPopup(GoogleProvider).then(function () {
                    VueScrollTo.scrollTo({container: "#navbar"});
                }).catch(e => {
                    console.log(e)
                })
            }
        },
        created() {
            let self = this;
            auth.onAuthStateChanged(function (user) {
                if (user != null) {
                    self.uid = user.uid;

                    let ref = db.collection("user").doc(self.uid).collection("cars");
                    let id = ref.doc().id;

                    ref.where("id", ">=", id).orderBy("id", "asc").limit(1).get().then((doc) => {
                        if (!doc.empty) {
                            doc.forEach(car => {
                                self.car = car.data();
                            });
                        } else {
                            ref.where("id", "<=", id).orderBy("id", "asc").limit(1).then((doc) => {
                                if (!doc.empty) {
                                    doc.forEach(car => {
                                        self.car = car.data();
                                    });
                                }
                            });
                        }
                    })

                } else {
                    self.uid = "";
                }
            });
        }
    }
</script>

<style scoped>
  .is-vertical-center {
    display: flex;
    align-items: center;
  }

  #datenschutz {
    margin: 10px;
    text-align: center;
  }

  .is-fullwidth {
    width: 100%;
    margin: 0px;
  }

  .kontakt-button-margin {
    margin: 15px;
  }

  @media only screen and (min-width: 1000px) {
    .smaller {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  .has-gray-background {
    background-color: #fafafa;
  }

  .buttonContent {
    justify-content: center;
    display: flex;
  }

  .normaler-bottom-margin {
    margin-bottom: 0px;
  }

  .margin-auto {
    margin: auto;
  }

</style>
