<template>
  <div>
    <section class="bg-footer">
      <div class="container mx-auto">
        <div class="md:flex w-full justify-center items-center">
          <div class="md:w-2/5 p-4 w-full">
            <Car v-bind:car="car"/>
          </div>
          <div class="md:w-3/5 w-full text-center p-4 py-8">
            <h2 class="text-2xl font-semibold mb-3">
              Füge deine Motorräder, Oldtimer und Sportwagen hinzu
            </h2>
            <p class="text-justify md:text-center">
              Du kannst all deine Fahrzeuge mit Bildern, technischen Daten und weiten Detais in der App speichern und
              verwalten. Dabei ist es egal, ob es sich um Sportwagen, Oldtimer, Motorräder oder Traktoren handelt.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white">
      <div class="container mx-auto">
        <div class="md:flex w-full justify-center items-center">
          <div class="md:w-3/5 w-full p-4 py-8">
            <h2 class="text-2xl font-semibold mb-3 text-center">
              Speichere die Wartungsarbeiten und Services für deine Fahrzeuge
            </h2>
            <p class="text-justify md:text-center">
              Damit du immer mit wenigen Clicks sehen kannst, wan zuletzt das Öl gewechselt oder der TÜV gemacht
              wurde, kannst du alle deine Services
              hier eintragen und in einer übersichtlichen Timeline anzeigen und durchsuchen. Wir machen das verwalten
              deiner Services kinderleicht.
            </p>
          </div>
          <div class="md:w-2/5 w-full p-4 text-center">
            <ServiceCollumn v-bind:services="services"/>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-footer" v-show="uid == ''">
      <div class="container mx-auto">
        <div class="md:flex w-full justify-center items-center">
          <div class="md:w-2/5 w-full p-4 py-8 text-center">
            <button class="custom-button text-xl font-semibold w-fit mx-auto px-4 mb-2" v-on:click="googleSignIn">Google Sign-In</button>
            <p>Mit der Anmeldung akzeptieren Sie die <nuxt-link to="/datenschutz" class="text-blue-800">Datenschutzbestimmungen</nuxt-link>.</p>
          </div>
          <div class="md:w-3/5 w-full p-4 text-center">
            <h3 class="text-2xl font-semibold mb-3 text-center">
              Bereit es auszuprobieren?
            </h3>
            <p>
              Probier es einfach aus! Es ist kostenlos und super einfach. :)
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white" v-show="uid == ''">
      <div class="container mx-auto">
        <div class="md:flex w-full justify-center items-center">
          <div class="md:w-2/5 w-full p-4 py-8 text-center">
            <h3 class="text-2xl font-semibold mb-3 text-center">
              Noch Fragen?
            </h3>
          </div>
          <div class="md:w-3/5 w-full p-4 text-center">
            <p>
              Schreib mir einfach! Ich als Hobby-Entwickler würde mich über Verbesserungsvorscläge oder Fehler-Reports
              jederzeit freuen. ^^
              <nuxt-link class="text-blue-800 block mt-2" to="/kontakt">Kontakt</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
    import Car from "../components/car-list/CarElement";
    import ServiceCollumn from "../components/service-list/ServiceCollumn";
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
