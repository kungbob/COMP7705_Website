<template>
  <div>
    <b-card>
      <b-card-text><h4>Image Conversion</h4></b-card-text>
      <div>
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
            <input type="file" accept="image/jpeg" @change="uploadImage" />
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <button type="submit" @click.prevent="submit">Submit</button>
          </b-col>
        </b-row>
      </div>
      <div v-if="blob">
        <img v-bind:src="blob" />
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
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.uploading-image {
  display: flex;
}
</style>
