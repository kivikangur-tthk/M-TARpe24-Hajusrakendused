
<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
const { user, logout } = useAuth()
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

        <RouterLink class="nav-link" to="/users">Users</RouterLink><!-- admin has access to /users routerlink -->
        <div class="d-flex justify-content-between" v-if="user">
          <span class="text-primary">Hello, {{ user.UserName }} </span>
          <button class="btn btn-primary" type="button" @click="logout">Log out</button>
        </div>
        <RouterLink v-else class="nav-link" to="/register">Sign up</RouterLink><!-- guest only -->        
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
