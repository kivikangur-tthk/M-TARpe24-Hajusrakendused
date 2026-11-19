
<script setup lang="ts">
import { ref } from "vue"

import GamesView from "./views/GamesView.vue"
/*teiste vaadete impordid käivad siia ka*/

</script>

<template>
  <div>
    <!-- päis -->
    <header>
      
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand text-light ">PlayOrSlay</a>
        <!-- validate that user is logged in here, block off any routerlinks that unlogged in user shouldnt have access to -->
        <RouterLink class="nav-link" to="/games">Games</RouterLink><!--  admin access only -->
        <!-- user has access to /catalog routerlink which is /games without edit, delete or create -->
        <RouterLink to="/register">Users</RouterLink>
        <!-- admin has access to /users routerlink -->
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
