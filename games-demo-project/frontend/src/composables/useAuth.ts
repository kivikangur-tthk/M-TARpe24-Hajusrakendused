import { ref, readonly } from "vue"
import { useRouter } from "vue-router"
import type { UserSummary } from "@/types/User"

const API_URL = import.meta.env.VITE_BACKEND_URL

const user = ref<UserSummary | null>(null)

export function useAuth() {
    const router = useRouter()

    const setUser = (userData: UserSummary | null): void => {
        user.value = userData
    }
    
    const logout = async (): Promise<void> => {
        try {
            await fetch(API_URL + "/authentication/logout", {
                method: "DELETE",
                credentials: "include"
            })            
        } finally {
            user.value = null
            await router.push("/login")
        }
    }

    return {
        user: readonly(user),
        setUser,
        logout
    }
}
