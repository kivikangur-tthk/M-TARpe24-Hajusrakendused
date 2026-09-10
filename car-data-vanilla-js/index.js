const myJson = [
    {
        color: "Rose red",
        tintedWindows: false,
        wheels: 4,
        roofCargo: null,
        entertainment: ["FM Radio", "MP3, MP4 and MKV player", "harman/kardon speakers"],
        accessories: ["satnav", "cruise control"]
    },
    {
        color: "Navy blue",
        tintedWindows: true,
        wheels: 4,
        roofCargo: "Thule",
        entertainment: ["FM Radio", "Apple CarPlay/Android Auto", "Bowers & Wilkins Premium Sound speakers"],
        accessories: ["self drive system", "luggage cover"]
    }
]
 let dataHtml = `
    <div id="json">
        <h1>Car properties</h1>
`
for (let i = 0; i < myJson.length; i++) {
    dataHtml += `        
        <h2>${i + 1}. car</h2>
        <p>Color: ${myJson[i].color}</p>
        <p>Tinted windows: ${myJson[i].tintedWindows}</p>
        <p>Wheels: ${myJson[i].wheels}</p>
        <p>Roof cargo: ${myJson[i].roofCargo}</p>
        <p>Audio system: ${myJson[i].entertainment}</p>
        <p>Accessories: ${myJson[i].accessories}</p>
    `
}
dataHtml += "</div>"

document.getElementById("app").innerHTML = dataHtml
