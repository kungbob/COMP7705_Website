var apiHost = process.env.VUE_APP_API_HOST;

export default {
    uploadImage: apiHost + '/uploadImage',
    downloadImage: apiHost + '/downloadImage'
}