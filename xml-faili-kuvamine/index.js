document.getElementById("app").innerHTML = "<table id='xmlTable'></table>"

const xmlhttp = new XMLHttpRequest()
xmlhttp.open("GET", "games.xml", false)
xmlhttp.send()
const XMLContent = xmlhttp.responseXML

console.log("XMLContent", XMLContent)

function getGamePlatforms(gameElement) {
    const gamePlatforms = gameElement.getElementsByTagName("platform")
    let result = ""
    for (let i = 0; i < gamePlatforms.length; i++) {
        const element = gamePlatforms[i];
        result += element.textContent + "/"
    }
    return result
}

function generateTable(XMLContent) {
    let tableRows = `<tr><th>Title</th><th>Price</th><th>Platform</th></tr>`
    let gameElements = XMLContent.getElementsByTagName("game")
    console.log("gameElements", gameElements);
    for (let i = 0; i < gameElements.length; i++) {
        const element = gameElements[i];
        const title = element.getElementsByTagName("title")[0].textContent
        const price = element.getElementsByTagName("price")[0].textContent
        const platforms = getGamePlatforms(element)
        tableRows += `<tr><td>${title}</td><td>${price}</td><td>${platforms}</td></tr>`
    }
    document.getElementById("xmlTable").innerHTML = tableRows
}

generateTable(XMLContent)