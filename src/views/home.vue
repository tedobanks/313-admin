<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
    getAllProductsFromFirestore,
    deleteProductFromFirestore,
} from "@/firebase/firebaseConfig";

const defaultImageUrl = "/images/image-break.png";

const router = useRouter();
const products = ref([]);

const fetchProducts = async () => {
    try {
        products.value = await getAllProductsFromFirestore();
        console.log(products.value);
    } catch (error) {
        console.error(error.message);
    }
};

const createEvent = () => {
    router.push("/imageupload");
};

const createCategoryEvent = () => {
    router.push("/categoryimageupload");
};

const logoutEvent = () => {
    router.push({ name: "login" }).then(() => {
        history.pushState(null, null, location.href);
        window.addEventListener("popstate", function (event) {
            history.pushState(null, null, location.href);
        });
    });
};

const editEvent = (productId) => {
    router.push({ name: "EditProduct", params: { id: productId } });
};

// Method to get background image style for a product
const getBackgroundImageStyle = (product) => {
    const imageUrl =
        product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls[0]
            : defaultImageUrl;
    return {
        backgroundImage: `url(${imageUrl})`,
        // Add more styles if needed
    };
};

// Function to delete a product
const deleteProduct = async (productId) => {
    try {
        await deleteProductFromFirestore(productId);
        // Remove the deleted product from the products array
        products.value = products.value.filter(
            (product) => product.id !== productId
        );
        console.log(`Product with ID ${productId} has been deleted.`);
    } catch (error) {
        console.error(error.message);
    }
};

const confirmDelete = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
        deleteProduct(productId);
    }
};

const confirmLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
        logoutEvent();
    }
};

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <div class="home-container">
        <div class="header-section">
            <div class="logo-container"></div>
            <div class="header-second-section">
                <button @click="createCategoryEvent" id="new-prod">
                    Create New Category
                </button>
                <button @click="createEvent" id="new-prod">
                    Create New Product
                </button>
                <p @click="confirmLogout" class="logout">Logout</p>
            </div>
        </div>
        <div class="products-container" v-if="products.length">
            <div class="product" v-for="product in products" :key="product.id">
                <div id="product-info">
                    <div id="first-section">
                        <div
                            class="product-image"
                            :style="getBackgroundImageStyle(product)"
                        ></div>
                        <div class="product-meta-info">
                            <p class="prod-name">{{ product.name }}</p>
                            <p class="prod-quantity">
                                In Stock: {{ product.quantity }}
                            </p>
                        </div>
                    </div>
                    <div id="second-section">
                        <p class="prod-price">₦{{ product.price }}</p>
                    </div>
                </div>
                <div id="prod-button-container">
                    <button @click="editEvent(product.id)" id="edit-button">
                        Edit
                    </button>
                    <button
                        @click="confirmDelete(product.id)"
                        id="delete-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <p v-else>No products found.</p>
    </div>
</template>

<style scoped>
.home-container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    padding-inline: 3.125rem;
    padding-block: 1.25rem;
}

.header-section {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-container {
    width: 70px;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-image: url("/images/313.jpeg");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
}

.header-second-section {
    height: 100%;
    display: flex;
    align-items: center;
}

#new-prod {
    height: 70%;
    padding-inline: 1.25rem;
    margin-left: 0.625rem;
    border-radius: 8px;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-size: 15px;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

.logout {
    margin-left: 40px;
    cursor: pointer;
}

.products-container {
    width: 100%;
    margin-top: 1.875rem;
}

.product {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--vt-c-black-mute);
    margin-bottom: 1.25rem;
    border-radius: 10px;
    overflow: hidden;
}

#product-info {
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 5px;
}

#first-section {
    height: 100%;
    display: flex;
    align-items: center;
}

#second-section {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image {
    height: 90%;
    aspect-ratio: 1;
    border-radius: 7.5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
    margin-right: 20px;
}

.prod-name {
    font-weight: 600;
    font-size: 20px;
    color: white;
}

.prod-price {
    font-weight: 500;
    font-size: 18px;
    color: white;
}

#prod-button-container {
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

#prod-button-container button {
    width: 90%;
    height: 35%;
    border-radius: 7.5px;
    border: none;
    color: white;
}

#edit-button {
    background-color: transparent;
    border: 1px solid white !important;
}

#delete-button {
    background-color: red;
}
</style>
