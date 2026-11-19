<script setup lang="ts">
import {ref, watch} from "vue"
import { gamesServices } from "../../services/gamesServices";
import type { Game } from "../../types/Game";

const props = defineProps<{
    gameId: string
}>()

const game = ref<Game | null>(null)
const error = ref("")
const loading = ref(false)

async function loadGame(id: string) {
    game.value = null
    loading.value = true
    error.value = ""

    try {
        game.value = await gamesServices.getById(id)
    } catch (err) {
        error.value = "Cannot get game."
        console.error(err)
    } finally {
        loading.value = false
    }
}

watch( () => props.gameId, loadGame, {immediate: true})
</script>

<template>
    <section>
        <h2>Game Details</h2>

        <p v-if="loading">Loading game info...</p>
        <p v-else-if="error">{{error}}</p>
        <div v-else-if="game">
            <h3>{{ game.GameName }}</h3>
            <p>{{ game.GameDescription }}</p>
            <p>{{ game.ReleaseDate }}</p>
            <!-- <p><img src="{{ game.ImageURL }}"></p> -->
            <p>{{ game.CategoryID }}</p>
            <p>{{ game.IsOwnedBy }}</p>
            <!-- <p>{{ game.Review }}</p>
            <p>{{ game.Comments }}</p> -->
        </div>
    </section>
</template>