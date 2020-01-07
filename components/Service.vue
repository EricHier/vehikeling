<template>
  <div class="content card roundBorders left-border-service serviceContainer" v-on:mouseover="mouseover = true" v-on:mouseout="mouseover = false">
    <h4 class="subheading is-4">{{service.title}}</h4>
    <p class="no-bottom-margin" v-if="service.description !== ''">{{service.description}}</p>
    <img class="delete-img" src="../static/delete.png" alt="Delete Service" v-on:click="deleteService" v-bind:class="{'del-active' : deleteActive}"/>
    <img class="edit-img" src="../static/edit.png" alt="Edit Service" v-on:click="editService" />
  </div>
</template>

<script>
    export default {
        name: 'Service',
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
                    }, 2000);
                }
            },
            editService () {
              this.$emit("edit", this.service);
            }
        }
    }
</script>


<style scoped>

  .content {
    padding: 15px;
  }

  .roundBorders {
    border: 1px solid #ffffff00;
    border-radius: 5px;
  }

  .del-active {
    background-color: #BF1F2F;
    border-radius: 2px;
    filter: invert(1);
  }

  .delete-img {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    width: 20px;
  }

  .edit-img {
    position: absolute;
    top: 40px;
    right: 10px;
    height: 20px;
    width: 20px;
  }

  .no-bottom-margin {
    margin-bottom: 0 !important;
  }

  .left-border-service {
    border-left: 1px solid gray;
  }

</style>
