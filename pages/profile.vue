<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Profil</h1>
      <h4 class="subtitle">Hier kannst du die Daten deines Profils einsehen und bearbeiten. </h4>

      <Error v-bind:error="error" v-if="error !== ''"></Error>

      <div class="columns">
        <div class="column content" v-if="user != null">
          <h2 class="title is-4">Profil</h2>

          <p>Name: <b>{{user.displayName}}</b></p>
          <p>E-Mail: <b>{{user.email}}</b></p>
          <p>Registrierung: Über Google</p>
          <p>Bei Fragen oder Kontakt: <br><a href="mailto:developer.erichier@gmail.com">Mail an developer.erichier@gmail.com</a></p>
        </div>
        <div class="is-divider-vertical" ></div>
        <div class="column content">
          <h2 class="title is-4">Benachrichtigungs-Einstellungen</h2>
          <p>
            Hier kannst du automatisierte Benachrichtigungen für anstehenden TÜV oder HU/AU aktivieren.
          </p>
          <p>
            Für die Hauptuntersuchung und einen Ölwechsel wirst du jeweils ungefährt 23 Monate nach der letzten
            Untersuchung benachrichtigt, damit du die 2 Jahres-Pflicht einhalten kannst.
          </p>

          <input class="input" type="text" v-model="notification.hu" placeholder="Monate bis zur HU/AU Erinnerung">

          <input class="input" type="text" v-model="notification.oil" placeholder="Monate bis zur Ölwechsel Erinnerung">

        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {auth, db} from '~/services/firebase.js';
  import Error from "../components/Error";

  export default {
    components: {
      Error
    },
    data() {
      return {
        user: null,
        error: "",
        recieved: false,
        notification: {
          hu: 22,
          oil: 12
        }
      }
    },
    methods: {
      uploadNewData(data) {
        let uid = this.user.uid;
        let self = this;

        let ref = db.collection("user").doc(uid);

        let dbdata = {
          notification_hu: data.hu,
          notification_oil: data.oil
        };

        ref.set(dbdata).catch(err => {
          self.error = "Konnte kein Verbindung zur Datenbank herstellen. "
        });
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

          db.collection("user").doc(uid).get().then(doc => {
            if (doc.exists) {
              let data = doc.data();

              self.notification.hu = data.notification_hu;
              self.notification.oil = data.notification_oil;
            } else {
              self.notification.hu = false;
              self.notification.oil = false;
            }

            self.recieved = true;
          }, err => {
            self.error = err;
            console.log(`Encountered error: ${err}`);
          });
        }
      },
      notification: {
        handler(val) {
          this.uploadNewData(val);
        },
        deep: true
      }
    }
  }

</script>
<style>

</style>
