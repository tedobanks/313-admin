import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'; // Import the global store
import { catstore } from './category_store'; // Import the global category store

const app = createApp(App)

app.use(router)

// Provide the store globally to all components
app.provide('store', store)
app.provide('catstore', catstore)

app.mount('#app')
