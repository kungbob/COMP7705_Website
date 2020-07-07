<template>
  <div>
    <b-card>
      <b-card-text>Image Conversion</b-card-text>
      <div>
        <img :src="previewImage" class="uploading-image" />
        <input type="file" accept="image/jpeg" @change="uploadImage" />
        <button type="submit" @click.prevent="submit">Submit</button>
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
