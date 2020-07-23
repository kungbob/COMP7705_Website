<template>
  <div>
    <b-card>
      <b-card-text><h4>Image Conversion</h4></b-card-text>
      <div>
        <b-row class="mt-3">
          <b-col>
            <div ><strong>Please Select a Mode:</strong></div>
            <b-form-select v-model="modeSelect" :options="options"></b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div v-if="previewImage">
              <img :src="previewImage" class="uploading-image" />
            </div>
            <div v-else>
              Uploaded Image will be displayed here
            </div>
          </b-col>
          <b-col>
            <div v-if="blob">
              <img v-bind:src="blob" />
            </div>
            <div v-else>
              Converted Image will be displayed here
            </div>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-form-file type="file" accept="image/jpeg" @change="uploadImage" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-button type="submit" @click.prevent="submit">Submit</b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import { uploadImage } from "@/api";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      options: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: 1, text: 'Cat to Anime' },
        { value: 2, text: 'Anime to Cat' },
      ],
      modeSelect: 1,
      previewImage: null,
      imagePath: null,
      data: {
        file: null
      },
      blob: null
    };
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      this.data.file = e.target.files[0];
      this.data.mode = this.modeSelect;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    submit() {
      return new Promise((resolve, reject) => {
        uploadImage
          .upload({ data: this.data })
          .then(res => {
            console.log(res);
            this.getImage(res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getImage(filename) {
      return new Promise((resolve, reject) => {
        uploadImage
          .download({ data: filename })
          .then(res => {
            console.log(res);
            let b = new Blob([res]);
            let a = window.URL.createObjectURL(b);
            this.blob = a;
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.griddy {
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "one"
    "two"
    "three"
    "four"
    "five"
    "six"
    "seven"
    "eight"
    "nine";
}

@media (min-width: 600px) {
  .griddy {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "one two"
      "three four"
      "five six"
      "seven eight"
      "nine ten";
  }
}

@media (min-width: 800px) {
  .griddy {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "one two three"
      "four five six"
      "seven eight nine";
   }
}


</style>
