<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const clickEvent = () => {
    if (username.value == "admin" && password.value == "admin") {
        console.log("Access Granted");
        router.replace("/gsd");
    } else {
        console.log("Access Denied");
    }
};
</script>

<template>
    <div class="login-container">
        <div class="image-container"></div>
        <div class="input-containers">
            <input
                v-model="username"
                placeholder="username"
                name="username"
                type="text"
                class="input-container"
            />
            <input
                v-model="password"
                placeholder="password"
                name="password"
                type="password"
                class="input-container"
            />
        </div>

        <button @click="clickEvent">Submit</button>
    </div>
</template>

<style scoped>
.login-container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.image-container {
    width: 200px;
    aspect-ratio: 1;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/images/313.jpeg");
    border-radius: 50%;
    margin-bottom: 2.5rem;
}

.input-containers {
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
}

.input-container {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    outline: none;
    flex-grow: 1;
    resize: none;
    border: 2px solid var(--color-border);
    background-color: transparent;
    border-radius: 0.625rem;
    padding-inline: 0.9375rem;
    padding-block: 0.625rem;
    overflow: hidden;
    font-weight: 600;
    font-size: 1.125rem;
    color: white;
}

button {
    height: 2.5rem;
    width: 12.5rem;
    font-size: 1.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.625rem;
    background-color: transparent;
    border: 3px solid var(--color-border);
    color: white;
}
</style>
