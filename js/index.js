document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form')
    form.addEventListener("submit, (e) => {
        e.preventDefault()
        //e.target[0].value
        getUsers(e.target[0.value])
        form.reset()
        // e.target[0].value = ""
        const userList = document.querySelector("#user-list")
        userList.textContent = ""
        const repoList = document.getElementById('repos-list')
        repoList.textContent = ""
    })
})

function getUsers(username) {
    fetch (`https://api.github.com/search/users?q=${username}`, {
        method: "GET"
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(response => response.items.map(item => displayUser(item)))
}

function displayUser(user) {
    //login and avatar_url
    const userList = document.querySelector('#user-list')
    const li = document.createElement("li")
    const image = document.createElement("img")
    image.src = user.avatar_url
    image.alt = user.login
    image.id = user.login
    image.addEventListener("click", getRepositories)
    const h3 = document.createElement("h3")
    h3.textContent = user.login
    li.append(image, h3)
    userList.append (li)
}

function getRepositories(event) {
    // console.log("event from getRepos", event.target.id)
    const repoList = document.getElementById('repos-list')
    repoList.textContent = ""
    fetch(`https://api.github.com/users/${event.target.id}/repos`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(response => response.map(r => displayRepository(r)))
}

function displayRepository(repo){
    const repoList = document.getElementById('repos-list')
    const li = document.createElement("li")
    li.textContent = repo.name
    repoList.append(li)
}