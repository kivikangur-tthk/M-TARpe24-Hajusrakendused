<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gamesServices } from '../services/gamesServices';
import type { GameSummary } from '../types/Game'

const games = ref<GameSummary[]>([])
const loading = ref(false)
const error = ref("")

async function loadGames() {
    loading.value = true
    error.value = ""

    try {
        games.value = await gamesServices.getAll()
    } catch (err) {
        error.value = "Cannot load games, womp womp :c"
        console.log(err)
    } finally {
        loading.value = false
    }
}

onMounted(loadGames)
</script>

<template>
    <section>
        <h2>Games</h2>
        <button @click="loadGames">Refresh</button>
        <p v-if="loading">Loading games...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="games.length === 0">No games have been found</p>
        <ul v-else>
            <li v-for="game in games" :key="game.id">
                {{ game.GameName }} ( {{ game.id }} )
            </li>
        </ul>
    </section>
</template>