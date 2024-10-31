<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { addProductToFirestore } from "@/firebase/firebaseConfig";

const router = useRouter();

const productName = ref("");
const productDescription = ref("");
const productPrice = ref("");
const productQuantity = ref("");

// Inject the global store
const store = inject("store");

// Function to handle product info submission
const submitProductInfo = async () => {
    console.log(store.uploadedUrls);
    const product = {
        name: productName.value,
        description: productDescription.value,
        price: productPrice.value,
        quantity: productQuantity.value,
        imageUrls: store.uploadedUrls, // Include uploaded image URLs from the global store
        createdAt: new Date(),
    };

    try {
        await addProductToFirestore(product);
        alert("Product info submitted successfully!");
        store.clearUrls(); // Clear URLs after submission
        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";
        productQuantity.value = "";
        router.replace("/gsd");
    } catch (error) {
        console.error("Error submitting product info:", error);
        alert("Failed to submit product info. Please try again.");
    }
};
</script>

<template>
    <div class="product-info-container">
        <div class="product-info-form">
            <h2 class="heading">Product Info</h2>
            <input
                v-model="productName"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
            />
            <input
                v-model="productDescription"
                type="text"
                name="desc"
                id="desc"
                placeholder="Description"
            />
            <input
                v-model="productPrice"
                type="text"
                name="price"
                id="price"
                placeholder="Price(₦)"
            />
            <input
                v-model="productQuantity"
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Stock Quantity"
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
