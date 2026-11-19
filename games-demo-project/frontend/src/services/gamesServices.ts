import type { Game, GameSummary, GameInput, Category } from "../types/Game"
const API_URL = import.meta.env.VITE_BACKEND_URL
/**/
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(API_URL + endpoint, options)

    if (!response.ok) {
        throw new Error(
            `Request has failed, status is: ${response.status}`
        )
    }
    if (response.status === 204) {
        return undefined as T
    }
    return response.json() as Promise<T>
}
/* service */

export const gamesServices = {
    getAll(): Promise<GameSummary[]> 
    {
        return request<GameSummary[]>("/games")
    },
    getById(id: string): Promise<Game> 
    {
        return request<Game>(`/games/${id}`)
    },
    create(game:GameInput): Promise<void> {
        return request<void>("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
    },
    update(id: string, game: GameInput): Promise<void> {
        return request<void>(`/games/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(game)
        })
    },
    delete(id: string): Promise<void> {
        return request<void>(`/games/${id}`, {
            method: "DELETE"
        })
    }
}
