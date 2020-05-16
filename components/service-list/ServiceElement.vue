<template>
  <div class="bg-white rounded p-4 text-left shadow left-border-service relative" v-on:mouseover="mouseover = true" v-on:mouseout="mouseover = false">
    <h4 class="text-3xl mb-2 font-semibold">{{service.title}}</h4>
    <p v-if="service.kilometerstand !== '' && service.hasOwnProperty('kilometerstand')">{{service.kilometerstand + " Kilometer"}}</p>
    <p v-if="service.description !== ''">{{service.description}}</p>
    <img class="absolute h-5 w-5 top-3 right-3 print-disable" src="../../static/delete.png" alt="Delete Service" v-on:click="deleteService" v-bind:class="{'rounded-sm invert bg-green-600' : deleteActive}"/>
    <img class="absolute h-5 w-5 top-9 right-3 print-disable" src="../../static/edit.png" alt="Edit Service" v-on:click="editService" />
  </div>
</template>

<script>
    export default {
        props: [ "service"],
        data () {
            return {
                deleteActive: false,
                mouseover: false
            }
        },
        methods: {
            deleteService () {
                if (this.deleteActive)
                  this.$emit("delete", this.service.id);
                else {
                    this.deleteActive = true;
                    setTimeout( () => {
                        this.deleteActive = false;
                    }, 1000);
                }
            },
            editService () {
              this.$emit("edit", this.service);
            }
        }
    }
</script>
<style scoped lang="scss">
  .left-border-service {
    border-left: 1px solid gray;
  }
</style>
