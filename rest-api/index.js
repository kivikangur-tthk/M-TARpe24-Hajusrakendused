const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

var nextId = 14

const widgets = [
    { id: nextId++, "name": "Cizzbor", price: 29.99, "discount price": 7.99 },
    { id: nextId++, "name": "Woowo", price: 26.99 },
    { id: nextId++, name: "Crazlinger", price: 59.99 },
]

app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    const found = widgets.filter(widget => widget.id == req.params.id)    
    if (typeof found[0] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(found[0])
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || typeof req.body.price === 'undefined') {
        return res.status(400).send({ error: 'Required parameters: name, price' })
    }
    // Loo identifikaator - kõige suurem olemasolev id + 1
    let newWidget = {
        id: nextId++,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('http://localhost:8080/widgets/' + (newWidget.id)).send(
        newWidget
    )
})

app.delete('/widgets/:id',(req, res) => {
    const found = widgets.filter(widget => widget.id == req.params.id)    
    if (typeof found[0] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    // Otsi leitud widgeti positsioon
    const position = widgets.indexOf(found[0])
    // kustuta sellelt positsioonilt
    widgets.splice(position, 1)
    res.status(204).send()
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})