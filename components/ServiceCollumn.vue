<template>
  <div>
    <div v-bind:key="service.id" v-for="service in services">
      <div class="columns is-fullwidth mehr-abstand fade-in-quick">
        <div class="column is-2 kein-innenabstand">
          <p class="centered">{{service.date.split("-").reverse().join(".") }}</p>
        </div>

        <div class="column is-10">
          <Service v-bind:service="service" v-on:delete="deleteService" v-on:edit="editService"></Service>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from "./Service";

    export default {
        name: 'ServiceCollumn',
        components: { Service },
        props: [ "services"],
        methods: {
            deleteService (e) {
                this.$emit("delete", e);
            },
            editService (e) {
                this.$emit("edit", e);
            }
        }
    }
</script>

<style scoped>
  @media only screen and (min-width: 800px) {
    .centered {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: right;
    }
  }

  .centered {
    min-width: 80px;
  }

  .mehr-abstand {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 1000px) {
    .kein-innenabstand {
      padding-bottom: 0px;
    }
    .centered {
      width: 100%;
      padding-left: 15px;
    }
  }
</style>
