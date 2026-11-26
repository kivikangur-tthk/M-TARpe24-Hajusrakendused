
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
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/games">Games</RouterLink><!--  admin access only -->
          <RouterLink class="nav-link" to="/users">Users</RouterLink><!-- admin has access to /users routerlink -->
          <!-- user has access to /catalog routerlink which is /games without edit, delete or create -->
        </div>


        <div class="ml-auto d-flex align-items-center" v-if="user">
          <span class="text-primary mr-3">Hello, {{ user.UserName }} </span>
          <button class="btn btn-primary" type="button" @click="logout">Log out</button>
        </div>
        <div class="navbar-nav ml-auto" v-else>
          <RouterLink class="nav-link" to="/register">Sign up</RouterLink><!-- guest only -->        
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
