// type Router = TypesConfig extends Record<"Router", infer T> ? T : _RouterClassic;

import {createRouter, createWebHistory} from "vue-router"

import GamesView from "../views/GamesView.vue"
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
    }
  ]
})

export default router