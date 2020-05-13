<template>
  <section class="section">
    <div class="container">
      <Error v-bind:error="error" v-if="error !== ''" />

      <p class="title content" v-if="user === null" style="margin-top: 1rem;">
        Es scheint so als bist du nicht angemeldet.
        <nuxt-link to="/" class="text-link" title="Startseite">Hier</nuxt-link> geht es zum Login.
      </p>

      <div class="md:flex mt-6" v-if="user !== null">
        <div class="md:w-1/2 md:pr-4 w-full" v-if="user != null">
          <h2 class="custom-title mb-4">Profil</h2>

          <p>Name: <b>{{user.displayName}}</b></p>
          <p>E-Mail: <b>{{user.email}}</b></p>
          <p>Registrierung: Über Google</p>
          <p>Bei Fragen oder Kontakt: <br><a class="text-link" href="mailto:developer.erichier@gmail.com">Mail an developer.erichier@gmail.com</a></p>
        </div>
        <div class="w-px self-stretch bg-gray-400 mb-4"></div>
        <div class="md:w-1/2 w-full md:pl-4">
          <h2 class="custom-title mb-4">Benachrichtigungs-Einstellungen</h2>
          <p>
            Hier kannst du automatisierte Benachrichtigungen für einen anstehenden Ölwechsel oder eine HU/AU aktivieren.
          </p>
          <p>
            Wenn du Benachrichtigungen aktivieren möchtest, musst du unten nur die Anzahl der Monate eingeben, nach denen du erinnert werden möchtest.
            Die Benachrichtigung gelten für alle Autos und auch für alle bereits eingetragenen Services.
          </p>
          <p>
            Benachrichtigungen sind deaktiviert, wenn du eine negative Zahl eingibst.
          </p>

          <div class="field">
            <label>Monate bis zur HU / AU Erinnerung</label>
            <input class="custom-input" type="number" v-model="notification.hu">
          </div>

          <div class="my-4">
            <label>Monate bis zum Ölwechsel</label>
            <input class="custom-input" type="number" v-model="notification.oil">
          </div>

          <p>Deine Einstellung wird automatisch gespeichert.</p>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {auth, db} from '~/services/firebase.js';
  import Error from "../components/gui-components/Error";

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
          hu: "-1",
          oil: "-1"
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

        ref.set(dbdata).catch(() => {
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
              self.notification.hu = -1;
              self.notification.oil = -1;
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
          val.hu = typeof val.hu === "undefined" ? "-1" : val.hu;
          val.oil = typeof val.oil === "undefined" ? "-1" : val.oil;
          console.log(val)
          this.uploadNewData(val);
        },
        deep: true
      }
    }
  }

</script>
<style scoped lang="scss">
  p {
    @apply mb-4;
  }
</style>
