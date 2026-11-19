<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { gamesServices } from "../../services/gamesServices";
import { type GameInput, type Category } from "../../types/Game";

const props = defineProps<{
    gameId?: string | null
}>()

const emit = defineEmits<{
    saved: []
}>()

const categories = ref<Category[]>([])
const error = ref("")
const saving = ref(false)

function emptyGame(): GameInput {
    return {
        GameName: "",
        GameDescription: "",
        ReleaseDate: "",
        CategoryID: "",
        ImageURL: null,

    }
}

const form = ref<GameInput>(emptyGame())

// async function loadCategories() {
//     try {
//         categories.value = ["01a1d086-eb63-703f-a886-f10f75a50f34","sss"]
//     }
// }

async function loadGame() {
    error.value = ""
    if (!props.gameId) {
        form.value = emptyGame()
        return
    }
    try {
        const game = await gamesServices.getById(props.gameId)
        form.value= {
            GameName: game.GameName,
            GameDescription: game.GameDescription,
            ReleaseDate: game.ReleaseDate,
            CategoryID: "01a1d086-eb63-703f-a886-f10f75a50f34",
            ImageURL: game.ImageURL
        }
    } catch (err) {
        error.value = "Cannot load this game"
        console.error(err)
    }
}

async function saveGame() {
    saving.value = true
    error.value = ""

    console.log("I HAVE CLICKED DA EDIT BATON to saev")
    try {
        if (props.gameId) {
            await gamesServices.update(props.gameId, form.value)
            console.log("try-if")
        } else {
            await gamesServices.create(form.value)
            console.log("try-else")
        }
        console.log(form.value)

        emit("saved")

        console.log("try-/")
        if (props.gameId) 
        {
            console.log("try-2if")
            form.value=emptyGame()
        }
    } catch (err) {
        console.log("catch")
        error.value = "Saving failed"
        console.error(err.message)
    } finally {
        saving.value = false
        console.log("finally")
    }
}

// onMounted(loadCategories)

watch( () => props.gameId, loadGame, {immediate: true})

</script>

<template>
    <section>
        <h2>{{ gameId ? "Edit Game" : "Create Game" }}</h2>

        <form @submit.prevent="saveGame">
            <label for="gameName">Game Name</label><br/>
            <input id="gameName" v-model="form.GameName" required/><br/><br/>

            <label for="gameDescription">Game Description</label><br/>
            <input id="gameDescription" v-model="form.GameDescription" required/><br/><br/>
            
            <label for="releaseDate">ReleaseDate</label><br/>
            <input id="releaseDate" type="date" v-model="form.ReleaseDate" required/><br/><br/>
<!--             proper implementation of category needed
            <label for="gameName">Game Name</label>
            <input id="gameName" v-model="form.GameName" required/> -->
            
            <label for="categoryId">CategoryID</label><br/>
            <input id="categoryId" v-model="form.CategoryID" required/><br/><br/>
            
            <label for="imageUrl">Where image</label><br/>
            <input id="imageUrl" type="url"v-model="form.ImageURL" required/><br/><br/>

            <p v-if="error">{{ error }}</p><br/><br/>

            <button type="submit" :diabled="saving">
                {{ saving ? "Saving game..." : "Save Game" }}
            </button><br/><br/>
            
        </form><br/><br/>

    </section>
</template>