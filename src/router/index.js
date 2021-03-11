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
    name: 'CreateRecipe',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next();
      next({ path: '/login' });
    },
    component: () => import('../views/Recipe/CreateRecipe.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/edit/:id',
    name: 'EditRecipe',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next();
      next({ path: '/login' });
    },
    component: () => import('../views/Recipe/EditRecipe.vue'),
  },
  ,
  {
    path: '/profile/:category?',
    name: 'Profile',
    beforeEnter: (to, from, next) => {
      if (store.state.auth.id) return next();
      next({ path: '/login' });
    },
    component: () => import('../views/User/Profile.vue'),
    children: [
      {
        path: 'public',
        component: () => import('../views/User/UserRecipes.vue'),
      },
      {
        path: 'private',
        component: () => import('../views/User/UserRecipes.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
