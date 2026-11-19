// type Router = TypesConfig extends Record<"Router", infer T> ? T : _RouterClassic;

import {createRouter, createWebHistory} from "vue-router"

import GamesView from "../views/GamesView.vue"
import RegisterView from "../views/RegisterView.vue"
/*teiste vaadete impordid käivad siia ka*/
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/games"
    },
    {
      path: "/games",
      name: "games",
      component: GamesView
    },
    {
      path: "/register",
      name: "users",
      component: RegisterView
    }
  ]
})

export default router