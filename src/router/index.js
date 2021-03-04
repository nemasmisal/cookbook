import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Auth/Register.vue")
  },
  {
    path: "/create",
    name: "Create-recipe",
    component: () => import("../views/Recipe/Create-recipe.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit-recipe",
    component: () => import("../views/Recipe/Edit-recipe.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
