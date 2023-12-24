import { createRouter, createWebHistory } from "vue-router";

import todoList from "../pages/todoList.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: todoList,
  },
];


const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  //historyApiFallback: true,
  routes,
  linkActiveClass: "navActive",
  linkExactActiveClass: "navActive",

});

export default router;
