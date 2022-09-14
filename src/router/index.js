import {createRouter, createWebHistory} from 'vue-router'

import user from '../components/user.vue'
import home from '../components/home.vue'
import skintest from '../components/skintest.vue'
import Name404 from '../components/404.vue'

const routes = [
    {path: '/', name: 'Home', component: home},
    {path: '/user/:username', name: 'User', component: user},
    {path: '/skintest', name: 'skintest', component: skintest},
    {path: '/:pathMatch(.*)*', name: '404', component: Name404}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router