import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import ImageUploadView from '../views/image_upload.vue'
import ProductInfoView from '../views/product_info.vue'
import Home from '@/views/home.vue'
import EditProduct from '@/views/edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/gsd',
      name: 'home',
      component: Home
    },
    {
      path: '/edit-product/:id',
      name: 'EditProduct',
      component: EditProduct,
      props: true, // This allows the route params to be passed as props
    },
    {
      path: '/imageupload',
      name: 'upload',
      component: ImageUploadView
    },
    {
      path: '/productinfo',
      name: 'info',
      component: ProductInfoView
    }
  ]
})

export default router
