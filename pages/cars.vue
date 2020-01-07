<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-bind:class="{'columns' : true, 'columns-reverse' : cars1.length !== 0}">
          <div class="column is-one-third card content roundBorders print-disable" id="sidebar">
            <CarsSideBar v-on:clicked="addcar = true" v-bind:cars="cars0.concat(cars1)"/>
          </div>
          <div v-if="loading || error !== ''" class="column is-two-third">
              <Loading v-if="loading"/>
              <Error v-if="error !== ''" v-bind:error="error"/>
          </div>
          <CarsCollumn v-bind:cars="cars0" ></CarsCollumn>
          <CarsCollumn v-bind:cars="cars1" ></CarsCollumn>
        </div>
      </div>
    </section>
    <Spenden v-bind:array="cars0.concat(cars1)" />
    <AddCar class="print-disable" v-on:close="addcar = false" v-bind:car="{}" v-if="addcar"/>
  </div>
</template>

<script>
    import Error from "../components/Error";
    import Loading from "../components/Loading";
    import AddCar from "../components/AddCar";
    import CarsSideBar from "../components/CarsSideBar";
    import {auth, db} from '~/services/firebase.js'
    import CarsCollumn from "../components/CarsCollumn";
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
                cars0: [],
                cars1: [],
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
                    let gerade = false;

                    cars.onSnapshot(querySnapshot => {
                        if (!querySnapshot.empty) {
                            self.cars0 = [];
                            self.cars1 = [];
                            self.error = "";

                            querySnapshot.forEach(doc => {
                                let data = doc.data();
                                data.id = doc.id;

                                if (!("hersteller" in data))
                                    data.hersteller = "";

                                if (gerade)
                                    self.cars0.push(data);
                                else
                                    self.cars1.push(data);

                                gerade = !gerade;

                                self.loading = false;
                            })
                        } else {
                            self.cars0 = [];
                            self.cars1 = [];
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

<style scoped>

  #sidebar {
    height: fit-content;
    margin: 15px;
  }

  .section {
    padding: 1.5rem 1.5rem;
  }

  .content {
    padding: 15px;
  }

  @media screen and (max-width: 768px) {
    .columns-reverse {
      flex-direction: column-reverse;
      display: flex;
    }
  }

</style>

<style>

  .roundBorders {
    border: 1px solid #ffffff00;
    border-radius: 5px;
  }

</style>
