<template>
  <div>
    <section>
      <div class="container">
        <div class="flex flex-col-reverse md:flex-row">
          <div class="md:w-1/3 w-full mb-4 md:mb-0">
            <Car class="mb-4" v-bind:car="car" v-bind:details="true" v-if="!isMobileDevice && Object.entries(car).length !== 0" ></Car>
            <ServicesSideBar v-on:newSearch="updateSearchTerm" v-bind:services="services"
                             v-on:clicked="Object.entries(car).length !== 0 ? addService = true: ''"/>

          </div>
          <div class="md:w-2/3 w-full">
            <nuxt-link to="/cars" class="custom-button w-full block mb-4" v-if="isMobileDevice" >Zurück zu Übersicht</nuxt-link>
            <Car class="mb-4" v-bind:car="car" v-bind:details="true" v-if="isMobileDevice && Object.entries(car).length !== 0" ></Car>

            <ServiceCollumn v-if="services !== []" v-bind:services="servicesSearch" v-on:delete="deleteService"
                            v-on:edit="editService"></ServiceCollumn>
            <Loading v-if="loading"/>
            <Error v-if="error !== ''" v-bind:error="error"/>
          </div>
        </div>
      </div>
    </section>

    <Spenden v-bind:array="services"></Spenden>
    <AddService v-on:close="closedAddSearch" v-bind:service="currentService" v-bind:car="car" v-if="addService"/>
  </div>
</template>

<script>
    import {auth, db} from '~/services/firebase.js'
    import Car from "../../components/car-list/CarElement";
    import Error from "../../components/gui-components/Error";
    import Loading from "../../components/gui-components/Loading";
    import ServiceCollumn from "../../components/service-list/ServiceCollumn";
    import ServicesSideBar from "../../components/service-list/ServicesSideBar";
    import AddService from "../../components/popups/AddService";
    import Spenden from "../../components/Spenden";
    import {isMobile} from "../../assets/pwa-check";

    export default {
        name: 'details',
        components: {ServicesSideBar, ServiceCollumn, Loading, Error, Car, AddService, Spenden},
        props: ['id'],
        data() {
            return {
                car: {},
                services: [],
                servicesSearch: [],
                currentService: {},
                user: {},
                error: "",
                addService: false,
                loading: true,
                searchTerm: "",
                isMobileDevice: isMobile()
            }
        },
        created() {
            let self = this;

            auth.onAuthStateChanged(function (user) {
                self.user = user;
            });
        },
        methods: {
            deleteService(e) {
                let self = this;
                let uid = self.user.uid;
                let id = self.$route.params.id;

                db.collection("user").doc(uid).collection("cars").doc(id).collection("services").doc(e).delete().then(() => {
                    self.updateSearchTerm(self.searchTerm);
                }).catch((err) => {
                    console.log(err);
                    self.error = "Element konnte nicht gelöscht werden. ";
                });
            },
            editService(e) {
                let self = this;

                self.currentService = e;
                self.addService = true;

                setTimeout(() => {
                    self.currentService = {};
                }, 1000);
            },
            closedAddSearch: function () {
                this.addService = false;
                if (this.services.length !== 0)
                    this.error = "";
            },
            updateSearchTerm: function (e) {
                this.searchTerm = e;

                e = e.toUpperCase();

                let self = this;
                let uid = self.user.uid;
                let id = self.$route.params.id;

                if (Object.entries(auth).length === 0)
                    return;

                let services = db.collection("user").doc(uid).collection("cars").doc(id).collection("services").orderBy("date", "desc");
                services.onSnapshot(querySnapshot => {
                    if (!querySnapshot.empty) {
                        self.servicesSearch = [];
                        self.error = "";

                        querySnapshot.forEach(doc => {
                            let data = doc.data();
                            data.id = doc.id;

                            if (data.title.toUpperCase().includes(e) || data.description.toUpperCase().includes(e))
                                self.servicesSearch.push(data);

                            self.loading = false;
                        })
                    } else {
                        self.servicesSearch = [];
                        self.error = "Zu diesem Auto gibt es leider noch keine Services. Aber du kannst direkt anfangen, welche hinzu zu fügen. :)";
                        self.loading = false;
                    }
                }, err => {
                    self.loading = false;
                    self.error = "Es gab leider ein Fehler beim Abrufen der Daten. Wenn sich der Fehler nicht behebt, schreib mir doch bitte einfach eine E-Mail. :) \n Enschuldige bitte die Unannehmlichkeit. ";
                    console.log('Error.vue getting document', err);
                });
            }
        },
        watch: {
            user: function (val) {
                if (val != null) {

                    let self = this;
                    let uid = val.uid;
                    let id = self.$route.params.id;

                    db.collection("user").doc(uid).collection("cars").doc(id).onSnapshot(querySnapshot => {
                        if (querySnapshot.exists) {

                            let data = querySnapshot.data();
                            self.car = data;

                            self.error = "";
                            self.loading = false;
                        } else {
                            self.error = "Zu diesem Auto finden wir leider nichts. :/";
                            self.loading = false;
                        }
                    }, err => {
                        self.loading = false;
                        self.error = "Es gab leider ein Fehler beim Abrufen der Daten. Wenn sich der Fehler nicht behebt, schreib mir doch bitte einfach eine E-Mail. :) \n Enschuldige bitte die Unannehmlichkeit. ";
                        console.log('Error.vue getting document', err);
                    });

                    this.updateSearchTerm("");
                    this.services = this.servicesSearch;

                }
            }
        }
    }
</script>
