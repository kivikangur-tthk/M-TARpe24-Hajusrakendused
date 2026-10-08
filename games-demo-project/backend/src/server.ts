import express, { type Request, type Response, type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

let nextGameId = 1
const games: {id: number, name: string, price?:number|undefined }[] = [
    { id: nextGameId++, name: "Witcher 3", price: 5.55 },
    { id: nextGameId++, name: "Minecraft", price: 35.55 },
    { id: nextGameId++, name: "GTA 6", price: 999.55 },
    { id: nextGameId++, name: "Team Fortress 2" },
]


app.get("/", (req:Request, res: Response) => {
    res.send("Töötab. Jah töötab.")
})

app.get("/games", (req:Request, res: Response) => {
    const result = games.map(game => ({ id: game.id, name: game.name }))   
    res.send(result)
})

app.get("/games/:id",(req:Request, res: Response) => {
    if (!req.params.id) { // Could never happen
        res.status(400).send({error: "ID required"})
        return
    }
    const gameId = req.params.id ? 
        typeof req.params.id === "string" ?
            parseInt(req.params.id) 
            : parseInt(req.params.id[0]!) 
        : null
    const result = games.filter(game => game.id === gameId)[0]
    if (result === undefined) {
        res.status(404).send({error:"Game not found"})
        return
    }
    res.send(result)
})

app.post("/games", (req:Request, res:Response) => {
    const name = req.body?.name as string
    const price = req.body?.price !== undefined ? parseFloat(req.body.price) : undefined
    if (!name) {
        res.status(400).send({error: "Missing required parameter 'name'"})
        return
    }
    if (Number.isNaN(price)) {
        res.status(400).send({error: "Parameter 'price' must be a number"})
        return        
    }    
    const newGame = {
        id: nextGameId++,
        name: name,
        price: price
    }
    games.push(newGame)
    res.status(201)
        .location(`http://localhost:${PORT}/games/` + (newGame.id))
        .send(newGame)
})

// TODO - mängu kustutamine

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
