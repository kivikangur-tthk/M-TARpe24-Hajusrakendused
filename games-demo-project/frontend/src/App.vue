<script setup lang="ts">
import { ref } from "vue"

import GamesView from "./views/GamesView.vue"
/*teiste vaadete impordid käivad siia ka*/

</script>

<template>
  <div>
    <!-- päis -->
    <header>
      <h1>GAMEAPP</h1>
      <nav>
        <!-- validate that user is logged in here, block off any routerlinks that unlogged in user shouldnt have access to -->
        <RouterLink to="/games">Games</RouterLink>
        <RouterLink to="/register">Users</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
