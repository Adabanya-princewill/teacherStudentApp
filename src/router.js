import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
const Teachers = () => import(/* webpackChubkName: 'Teachers' */'./views/Teachers.vue');
const Students = () => import('./views/Students.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/teachers', component: Teachers },
  { path: '/students', component: Students },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
