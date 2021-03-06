import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next({ path: '/' });
      next();
    },
    component: () => import('../views/Auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next({ path: '/' });
      next();
    },
    component: () => import('../views/Auth/Register.vue'),
  },
  {
    path: '/create',
    name: 'Create-recipe',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next();
      next({ path: '/login' });
    },
    component: () => import('../views/Recipe/Create-recipe.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/edit/:id',
    name: 'Edit-recipe',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next();
      next({ path: '/login' });
    },
    component: () => import('../views/Recipe/EditRecipe.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
