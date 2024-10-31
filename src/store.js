// I store temporary image urls uploaded from image_upload.vue in here

// src/store.js
import { reactive } from "vue";

// Create a global store using reactive
export const store = reactive({
  uploadedUrls: [],

  addUploadedUrl(url) {
    this.uploadedUrls.push(url);
    console.log(this.uploadedUrls);
  },

  clearUrls() {
    this.uploadedUrls = [];
  },
});
