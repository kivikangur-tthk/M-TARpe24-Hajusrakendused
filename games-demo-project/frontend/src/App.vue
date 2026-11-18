<script setup lang="ts">
import { ref } from "vue"
import GamesList from './components/GamesList.vue';
import GameDetails from './components/GameDetails.vue';
import GameForm from './components/GameForm.vue'
import { gamesServices } from "./services/gamesServices.ts";

const selectedGameId = ref<string | null>(null)
const editing = ref(false)
const listVersion = ref(0)
const detailsVersion = ref(0)
const error = ref("")

function selectGame(id: string) {
  selectedGameId.value = id
  editing.value = false
}

function createGame() {
  selectedGameId.value = null
  editing.value = true
  
}

function gameSaved() {
  editing.value = false
  listVersion.value++
  detailsVersion.value++
}

async function deleteGame() {
  if (!selectedGameId.value) return
  if (!confirm("Delete this game?")) return

  error.value = ""

  try {
    await gamesServices.delete(selectedGameId.value)
    selectedGameId.value = null
    editing.value = false
    listVersion.value++
  } catch (err) {
  
    error.value = "Cannot delete this game"
    console.error(err)
  }
}

</script>

<template>
  <main>
    <h1>Videogames!</h1>
    <button @click="createGame">Add game</button>
    <p v-if="error">{{ error }}</p>
    <p>
      <GamesList 
      :key="listVersion"
      @select="selectGame" />

      <section v-if="selectedGameId && !editing" >
        <GameDetails 
        :key="`${selectedGameId}-${detailsVersion}`"
        :game-id="selectedGameId"/>
        <button @click="editing = true">Edit</button>
        <button @click="deleteGame">Delete</button>
      </section>
      
      <section v-if="editing">
        <button @click="editing = false">Cancel edit</button>
        <GameForm 
        :game-id="selectedGameId"
        @saved="gameSaved"/>
      </section>
      <hr/>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
  </main>
</template>

<style scoped></style>
