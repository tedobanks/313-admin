<script setup>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    addProductToFirestore,
    getAllCategoriesFromFirestore,
} from "@/firebase/firebaseConfig";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

const router = useRouter();

const isLoading = ref(false);
const categories = ref([]);
const allSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
const colorInput = ref(""); // Raw input from the admin

const productName = ref("");
const productDescription = ref("");
const productPrice = ref("");
const productQuantity = ref("");
const productCategory = ref("");
const productSizes = ref([]);
const productColors = ref([]);

// Inject the global store
const store = inject("store");

const saveColors = () => {
    if (colorInput.value.trim()) {
        // Split the input into a list, trim whitespace, and store it
        productColors.value = colorInput.value
            .split(",")
            .map((color) => color.trim());
    }
};

const fetchCategories = async () => {
    try {
        isLoading.value = true;
        console.log("isLoading:", isLoading.value);
        categories.value = await getAllCategoriesFromFirestore();
        console.log("catgegories", categories.value);
        isLoading.value = categories.value.length != 0;
        console.log("isLoading:", isLoading.value);
    } catch (error) {
        errorMessage.value = error;
    }
};

// Function to handle product info submission
const submitProductInfo = async () => {
    // Save colors before proceeding
    saveColors();

    // Replace line breaks with explicit characters when saving
    const formattedDescription = productDescription.value.replace(/\n/g, "\\n");

    const product = {
        name: productName.value,
        description: formattedDescription,
        price: productPrice.value,
        quantity: productQuantity.value,
        imageUrls: store.uploadedUrls, // Include uploaded image URLs from the global store
        category: productCategory.value,
        sizes: productSizes.value,
        colors: productColors.value,
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
        productCategory.value = "";
        productSizes.value = [];
        productColors.value = [];
        colorInput.value = "";
        router.replace("/gsd");
    } catch (error) {
        console.error("Error submitting product info:", error);
        alert("Failed to submit product info. Please try again.");
    }
};

onMounted(() => {
    fetchCategories();
});
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
            <textarea
                v-model="productDescription"
                name="desc"
                id="desc"
                placeholder="Description"
                rows="4"
            ></textarea>
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
            <input
                v-model="colorInput"
                type="text"
                name="colors"
                id="colors"
                placeholder="Type colors separated by commas (e.g., Red, Primary Blue)"
            />
            <select v-model="productCategory">
                <option value="" disabled selected>Select a Category</option>
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>
            <div class="size-selection-container">
                <div class="checkbox-group">
                    <label class="label">Select Sizes:</label>
                    <div
                        v-for="size in allSizes"
                        :key="size"
                        class="checkbox-item"
                    >
                        <input
                            type="checkbox"
                            :id="size"
                            :value="size"
                            v-model="productSizes"
                        />
                        <label :for="size">{{ size }}</label>
                    </div>
                </div>
            </div>
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

input,
select,
textarea {
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

textarea {
    height: auto;
}

/* Styling the dropdown options */
select option {
    background-color: #333; /* White background for options */
    color: white; /* Dark text color */
}

/* Hover effect for options */
select option:hover {
    background-color: black; /* Light gray hover state */
}

/* Container for the size selection */
.size-selection-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: transparent;
    padding-inline: 5px;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-size: 15px;
    color: white;
    margin-bottom: 20px;
}

/* Label styling */
.label {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
}

/* Checkbox group container with flex styling */
.checkbox-group {
    display: flex;
    align-items: baseline;
    justify-content: start;
    flex-wrap: wrap;
    gap: 30px;
}

/* Each checkbox item */
.checkbox-item {
    display: flex;
    align-items: first baseline;
    gap: 5px;
}

.checkbox-item input {
    accent-color: #555; /* Customize checkbox color */
    height: fit-content;
    transform: scale(1.5);
}
</style>
