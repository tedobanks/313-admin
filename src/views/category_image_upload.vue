<script setup>
// Vue Imports
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

// Import FilePond plugins
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import FilePond plugins (optional)
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { uploadCatergoryImageToStorage } from "@/firebase/firebaseConfig";

// Vue Router import
const router = useRouter();

// Register FilePond plugins
const FilePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType
);

// Reactive state
const loading = ref(false);
const selectedFile = ref("");
const fileUrls = ref([]);
const uploadProgress = ref(0);
const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
];

// Inject the global store
const store = inject("catstore");

// Handle FilePond Initialization
const handleFilePondInit = () => {
    console.log("FilePond has initialized");
};

// Handle File Selection in FilePond
// Handle File Selection in FilePond
const handleFileSelection = (error, file) => {
    if (error) {
        console.error("File selection failed:", error);
        return;
    }
    selectedFile.value = file.file; // Push the selected file to the files array
    console.log(selectedFile);
};

// Upload all selected files to Firebase
const uploadAllFiles = async () => {
    if (selectedFile.value == "") {
        alert("Please select a file to upload!");
        return;
    }

    loading.value = true; // Set loading to true

    // Clear previous progress
    uploadProgress.value = 0;

    // Upload files asynchronously and wait for completion
    await new Promise((resolve) => {
        uploadCatergoryImageToStorage(
            selectedFile.value,
            (progress) => {
                uploadProgress.value = progress.toFixed(2);
            },
            (downloadURL) => {
                store.addUploadedCategoryUrl(downloadURL); // Add URL to global store
                // Check if all files are uploaded
                if (store.uploadedUrl != "") {
                    resolve(); // Resolve the promise when all files are uploaded
                }
                router.push("/categoryinfo");
            },
            (error) => {
                console.error(`Upload failed for file:`, error);
                alert(`Upload failed for file. Please try again.`);
                resolve(); // Resolve the promise even if there's an error
            }
        );
    });

    loading.value = false; // Set loading to false after upload is complete
};
</script>

<template>
    <div class="upload-container-wrapper">
        <div class="upload-container">
            <h2>Category Image Upload</h2>
            <div class="filepond-wrapper-313">
                <FilePond
                    ref="pond"
                    :allow-multiple="true"
                    :accepted-file-types="acceptedFileTypes"
                    :max-files="10"
                    @init="handleFilePondInit"
                    @addfile="handleFileSelection"
                />
            </div>

            <div v-if="loading" class="loading-indicator">
                <p>Uploading files, please wait...</p>
            </div>
            <button
                class="upload-btn"
                @click="uploadAllFiles"
                :disabled="loading"
            >
                Upload Files
            </button>
            <div v-if="uploadProgress.length > 0">
                <div v-for="(progress, index) in uploadProgress" :key="index">
                    File {{ index + 1 }}: {{ progress }}%
                </div>
            </div>
            <div v-if="fileUrls.length > 0">
                <h3>Uploaded Files:</h3>
                <ul>
                    <li v-for="(url, index) in fileUrls" :key="index">
                        <a :href="url" target="_blank"
                            >View File {{ index + 1 }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.upload-container-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.upload-container {
    max-width: fit-content;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    border: 1px dashed #d3d3d3;
    border-radius: 8px;
    background-color: #f7f7f7;
}
.upload-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: black;
}
.upload-container .upload-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #7a57d1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.upload-container .upload-btn:hover {
    background-color: #6a47c1;
}

.loading-indicator p {
    color: black;
}

.filepond-wrapper-313 {
    height: 300px;
    width: 500px;
    overflow-y: scroll;
}
</style>
