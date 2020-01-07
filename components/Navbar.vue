<template>
  <nav class="navbar print-disable" id="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">vehikeling</nuxt-link>
        <a class="navbar-burger" v-on:click="active = !active" v-on:focusin="active = !active" v-bind:class="{'is-active': active}" role="button"
           aria-label="menu" aria-expanded="false">
          <span class="is-below" ></span>
          <span class="is-below" ></span>
          <span class="is-below" ></span>
        </a>

      </div>
      <div class="navbar-menu" v-bind:class="{'is-active': active}" v-show="user !== null">
        <div class="navbar-end">
          <a class="navbar-item" v-on:click="openRoute('/cars')">Meine Autos</a>
          <a class="navbar-item" v-on:click="openRoute('/kontakt')">Kontakt</a>
          <a class="navbar-item non-hover">{{userName}}</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
    import {auth} from '~/services/firebase.js'

    export default {
        data() {
            return {
                user: auth.currentUser,
                userName: "",
                active: false
            }
        },
        methods: {
            openRoute(site) {
                this.active = false;
                this.$router.push(site);
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
        }
    }
</script>

<style scoped>

  a.navbar-item:focus {
    background-color: inherit;
  }

  .navbar-burger span {
    background-color: white;
  }

  .is-below {
    z-index: -2;
  }

  .non-hover {
    background-color: inherit;
  }

  .mobile-disable {
    pointer-events: none;
  }

</style>
