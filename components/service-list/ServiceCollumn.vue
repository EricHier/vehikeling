<template>
  <div>
    <div v-bind:key="service.id" v-for="service in services">
      <div class="md:flex w-full mb-6">
        <div class="md:w-1/4 p-4 flex flex-row justify-end items-center">
          <p>{{service.date.split("-").reverse().join(".") }}</p>
        </div>

        <div class="md:w-3/4">
          <Service v-bind:service="service" v-on:delete="deleteService" v-on:edit="editService"></Service>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from "./ServiceElement";

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
