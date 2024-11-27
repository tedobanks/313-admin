<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { addCategoryToFirestore } from "@/firebase/firebaseConfig";

const router = useRouter();

const categoryName = ref("");


// Inject the global store
const store = inject("catstore");

// Function to handle product info submission
const submitProductInfo = async () => {
    console.log(store.uploadedUrls);
    const category = {
        name: categoryName.value,
        imageUrls: store.uploadedUrl, // Include uploaded image URLs from the global store
        createdAt: new Date(),
    };

    try {
        await addCategoryToFirestore(category);
        alert("Category info submitted successfully!");
        store.clearCategoryUrl(); // Clear URLs after submission
        categoryName.value = "";
        router.replace("/gsd");
    } catch (error) {
        console.error("Error submitting catgeory info:", error);
        alert("Failed to submit category info. Please try again.");
    }
};
</script>

<template>
    <div class="product-info-container">
        <div class="product-info-form">
            <h2 class="heading">Category Info</h2>
            <input
                v-model="categoryName"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
            />
            <button @click="submitProductInfo">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.product-info-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.product-info-form {
    width: 80%;
    padding: 20px;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
}

.heading {
    font-weight: 700;
    text-align: start;
}

input {
    width: 100%;
    height: 50px;
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 7.5px;
    padding-inline: 5px;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-size: 15px;
    color: white;
    margin-bottom: 20px;
}
</style>
