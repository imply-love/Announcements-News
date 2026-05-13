import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Wall from '@/views/Wall.vue';
import Tools from '@/views/Tools.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/wall', component: Wall },
  { path: '/tools', component: Tools },
  { path: '/login', component: () => import('@/views/Login.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
