// I store temporary image urls uploaded from image_upload.vue in here

// src/store.js
import { reactive } from "vue";

// Create a global store using reactive
export const catstore = reactive({
  uploadedUrl: "",

  addUploadedCategoryUrl(url) {
    this.uploadedUrl = url;
    console.log(this.uploadedUrl);
  },

  clearCategoryUrl() {
    this.uploadedUrl = "";
  },
});
