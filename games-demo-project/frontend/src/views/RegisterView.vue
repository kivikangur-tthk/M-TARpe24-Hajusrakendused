<script setup lang="ts">

import { ref} from "vue"
import RegisterForm from "../components/user/RegisterForm.vue"
/*userdetails ka*/

const selectedUserId = ref<string | null>(null)

    function selectUser(id: string) {
        selectedUserId.value = id
    }

</script>

<template>
    <div>
        <h1>sign up for user</h1>
        <RegisterForm />
    </div>
</template>