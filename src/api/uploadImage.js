import axios from "axios";

import endpoint from "./endpoint";

export default {
  upload(payload) {
    let formData = new FormData();
    Object.keys(payload.data).forEach((key) => {
      formData.append(key, payload.data[key]);
    });

    return new Promise((resolve, reject) => {
      axios
        .post(endpoint.uploadImage, formData, { headers: {"Content-Type": "multipart/form-data"} })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  download(payload) {
      return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: endpoint.downloadImage + '/' + payload.data,
            responseType: 'arraybuffer'
          }).then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
    
      })
  }
};
