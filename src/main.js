import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'; // Import the global store

const app = createApp(App)

app.use(router)

// Provide the store globally to all components
app.provide('store', store)

app.mount('#app')
