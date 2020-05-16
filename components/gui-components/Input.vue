<template>
  <div class="mt-2">
    <label>{{label}}</label>
    <div v-if="secondline != null" class="my-2 text-justify">
        {{secondline}}
      </div>
    <div class="mt-1">
      <input v-model="value" class="custom-input" :type="number ? 'number' : 'text'" v-if="!isBig && !image" :required="required ? true : false" :disabled="disabled">
      <textarea v-model="value" class="custom-input" v-if="isBig && !image" lines="5" :required="required ? true : false" :disabled="disabled"></textarea>
      <input type="file" v-if="image" data-tooltip="Tooltip Text" class="mb-2" @change="loadImage" accept="image/*" :required="required" :disabled="disabled">
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Input',
        props: ["label", "isBig", "required", "image", "disabled", "secondline", "default", "number"],
        data() {
            return {
                fileTitle: "",
                value: ""
            }
        },
        methods: {
            loadImage: function (event) {
                this.fileTitle = event.target.value;
                this.$emit("loadImage", event);
            }
        },
        watch:  {
            value: function (value) {
                this.$emit("newValue", value);
            }
        },
        created() {
            this.value = this.default;
        }
    }
</script>

<style scoped>
  .textarea {
    resize: none;
  }

  #secondline {
    margin-bottom: 10px
  }
</style>
