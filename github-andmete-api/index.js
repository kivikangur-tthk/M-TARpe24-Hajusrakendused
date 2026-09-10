let givenProfile = ""
let profileName = ""
let profileId = ""
let profileLink = ""
let profileRepos = ""

let fetchProfile = async (personalToken) => {
    let fetchedData
    const headers = new Headers()
    headers.set("Authorization", personalToken)
    await fetch(`https://api.github.com/users/${givenProfile}`, {
        headers
    })
    .then((response) => response.json())
    .then((data) => fetchedData = data)
    .catch((reason) => console.log("Failed:", reason))
    let errorMessage = ''
    if (fetchedData.status === "404") {
        errorMessage = fetchedData.message
    }
    document.getElementById("error").innerHTML = errorMessage
    profileName = fetchedData.login
    profileId = fetchedData.id
    profileLink = fetchedData.html_url
    profileRepos = fetchedData.public_repos
    renderContent()
}

const input = document.querySelector("input")
input.addEventListener("change", updateContent)

function updateContent(e) {
    const personalToken = prompt("Insert your github personal token")
    givenProfile = e.target.value
    fetchProfile(personalToken)
}

function renderContent() {
    document.getElementById("content").innerHTML = `
    <h2 id="name">Name: ${profileName}</h2>
    <p id="id">Id: ${profileId}</p>
    <p id="repos">Public repos: ${profileRepos}</p>
    <p id="url">
        Link: 
        <a href="${profileLink}" target="_blank">
            ${profileName}
        </a>
    </p>
    `
}
renderContent()