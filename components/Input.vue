<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div v-if="secondline != null" id="secondline">
        {{secondline}}
      </div>
    <div class="control">
      <input v-model="value" class="input" v-bind:type="number ? 'number' : 'text'" v-if="!isBig && !image" v-bind:required="required ? true : false" v-bind:disabled="disabled">
      <textarea v-model="value" class="textarea" v-if="isBig && !image" lines="5" v-bind:required="required ? true : false" v-bind:disabled="disabled"></textarea>
      <div class="file is-fullwidth" v-if="image">
        <label class="file-label">
          <input type="file" data-tooltip="Tooltip Text" class="file-input" @change="loadImage" accept="image/*" v-if="image" v-bind:required="required" v-bind:disabled="disabled"/>
          <span class="file-cta">
            <span class="file-label" >
              Choose a file…
            </span>
          </span>
          <span class="file-name">
              {{fileTitle.replace("C:\\fakepath\\", "")}}
            </span>
        </label>
      </div>
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
