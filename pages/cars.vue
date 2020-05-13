<template>
    <section>
      <div class="container">
        <div class="flex flex-col-reverse md:flex-row">
          <div class="w-full md:w-1/3 print-disable">
            <CarsSideBar class="custom-card rounded p-6" v-on:clicked="addcar = true" v-bind:cars="cars"/>
          </div>
          <div class="w-full md:w-2/3">
            <Loading v-if="loading"/>
            <Error v-if="error !== ''" v-bind:error="error"/>

            <CarsCollumn v-bind:cars="cars" class="md:ml-4 mb-4 md:mt-0"></CarsCollumn>
          </div>
        </div>

        <Spenden v-bind:array="cars" class="print-disable" />
        <AddCar class="print-disable" v-on:close="addcar = false" v-bind:car="{}" v-if="addcar"/>
      </div>
    </section>
</template>

<script>
    import Error from "../components/gui-components/Error";
    import Loading from "../components/gui-components/Loading";
    import AddCar from "../components/popups/AddCar";
    import CarsSideBar from "../components/car-list/CarsSideBar";
    import {auth, db} from '~/services/firebase.js'
    import CarsCollumn from "../components/car-list/CarsCollumn";
    import Spenden from "../components/Spenden";

    // TODO: Wenn nutzer nicht angemledet ist: meldung anzeigen, addCar ausblenden

    export default {
        name: 'cars',
        components: {
            Spenden,
            CarsCollumn,
            CarsSideBar,
            Error,
            Loading,
            AddCar
        },
        data() {
            return {
                cars: [],
                user: null,
                addcar: false,
                loading: true,
                error: ""
            }
        },
        created() {
            let self = this;
            auth.onAuthStateChanged(function (user) {

                if (user != null) {
                    self.userName = user.displayName;
                    self.user = user;
                } else {
                    self.userName = "";
                    self.user = null;
                }
            });
        },
        watch: {
            user: function (val) {
                if (val != null) {

                    let self = this;
                    let uid = val.uid;

                    let cars = db.collection("user").doc(uid).collection("cars");

                    cars.onSnapshot(querySnapshot => {
                        if (!querySnapshot.empty) {
                            self.cars = [];
                            self.error = "";

                            querySnapshot.forEach(doc => {
                                let data = doc.data();
                                data.id = doc.id;

                                if (!("hersteller" in data))
                                    data.hersteller = "";

                                self.cars.push(data);

                                self.loading = false;
                            })
                        } else {
                            self.cars = [];
                            self.error = "Du hast anscheinend keine Fahrzeuge hinzugefügt - aber fang doch direkt damit an! :)";
                            self.loading = false;
                        }
                    }, err => {
                        self.error = err;
                        console.log(`Encountered error: ${err}`);
                    });
                }
            }
        }
    }
</script>
