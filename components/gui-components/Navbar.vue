<template>
  <nav class="navbar print-disable text-white" role="navigation" aria-label="main navigation">
    <div class="container p-0 md:flex justify-between md:px-2">
      <div class="flex justify-between">
        <nuxt-link class="p-4 hover:bg-navbar-hover" to="/">vehikeling</nuxt-link>
        <button @click="active = !active">
          <img class="block md:hidden p-4" src="/hamburger.svg"/>
        </button>
      </div>

      <div class="bg-popup md:bg-transparent" v-bind:class="{'block': active, 'hidden md:block' : !active}" v-show="user !== null">
        <a class="p-4 py-3 md:py-4 block md:inline-block hover:bg-navbar-hover" v-on:click="openRoute('/cars')">Meine Autos</a>
        <a class="p-4 py-3 md:py-4 block md:inline-block hover:bg-navbar-hover" v-on:click="openRoute('/kontakt')">Kontakt</a>
        <a class="p-4 py-3 md:py-4 block md:inline-block hover:bg-navbar-hover" v-on:click="openRoute('/profile')">{{userName}}</a>
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

<style scoped lang="scss">

  a.navbar-item:focus {
    background-color: inherit;
  }

  .navbar-burger span {
    background-color: white;
  }

  .non-hover {
    background-color: inherit;
  }

</style>
