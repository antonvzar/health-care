import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Calculator from '../views/Calculator.vue'
import Charts from '../views/Charts.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/calculator', component: Calculator },
  { path: '/charts', component: Charts },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router