import express, { type Request, type Response, type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const games = [
    { id: 1, name: "Witcher 3", price: 5.55 },
    { id: 2, name: "Minecraft", price: 35.55 },
    { id: 3, name: "GTA 6", price: 999.55 },
]


app.get("/", (req:Request, res: Response) => {
    res.send("Töötab. Jah töötab.")
})

app.get("/games", (req:Request, res: Response) => {
    const result = games.map(game => ({ id: game.id, name: game.name }))   
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
