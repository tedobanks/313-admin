<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
    getProductFromFirestore,
    updateProductInFirestore,
} from "@/firebase/firebaseConfig";

// Get the router and route instances
const router = useRouter();
const route = useRoute();

const productName = ref("");
const productDescription = ref("");
const productPrice = ref("");
const productQuantity = ref("");

// Reactive variable for loading state
const isLoading = ref(false);

// Get the product ID from the route parameters
const productId = route.params.id;

// Reactive product object
const product = ref({
    name: "",
    price: 0,
    // Add other fields as needed
});

// Function to fetch the product data
const fetchProduct = async () => {
    try {
        isLoading.value = true; // Start loading
        const fetchedProduct = await getProductFromFirestore(productId);
        productName.value = fetchedProduct.name || "";
        productDescription.value = fetchedProduct.description || "";
        productPrice.value = fetchedProduct.price || 0;
        productQuantity.value = fetchedProduct.quantity || 0;
    } catch (error) {
        console.error(error.message);
    } finally {
        isLoading.value = false; // End loading
    }
};

// Function to update the product
const updateProduct = async () => {
    try {
        const updatedData = {
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
            quantity: productQuantity.value,
        };
        await updateProductInFirestore(productId, updatedData);
        console.log("Product updated successfully.");
        router.push("/"); // Navigate to another route if needed
    } catch (error) {
        console.error(error.message);
    }
};

// Fetch the product data when the component is mounted
onMounted(() => {
    fetchProduct();
    console.log("Product Id is: ", productId);
});
</script>

<template>
    <div class="edit-info-container">
        <div v-if="isLoading" class="edit-info-form">
            <h2 class="heading">Edit Product Info</h2>
            <p class="loading-indicator">Loading...</p>
        </div>
        <div v-else class="edit-info-form">
            <h2 class="heading">Edit Product Info</h2>
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
            <button @click="updateProduct">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.edit-info-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.edit-info-form {
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

.loading-indicator {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
