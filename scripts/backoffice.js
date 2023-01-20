const url = "https://striveschool-api.herokuapp.com/api/movies"
const category = "Horror";

const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id)


const addMovie = async (publishMovie) => {
    try {
        const name = document.querySelector("#movie-name").value
        const description = document.querySelector("#movie-description").value
        const category = document.querySelector("#movie-category").value
        const imageUrl = document.querySelector("#movie-url").value
        const movie = {name, description, category, imageUrl}
        const options = { 
            method: "POST",
            body: JSON.stringify(movie),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            })
            }
        let res = await fetch(url, options)
        console.log(movie)
        if(res.ok) {
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
    getMovies()
}

window.onload = async () => {
    await getMovies()
}

const getMovies = async (category) => {
    try {
        const options = { 
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
            }
        const res = await fetch(url + "/" + category, options)
        const movies = await res.json()
        renderMovies(movies)
        console.log(movies)
    } catch (error) {
        console.log(error)
    }
}

const renderMovies = (arrayOfMovies) => {
    const card = document.querySelector("#movies")
    card.innerHTML = "";
    arrayOfMovies.forEach(singleMovie => {
       const {name, description, category, imageUrl, _id} = singleMovie;
       card.innerHTML += `<div class="card">
       <img src="${imageUrl}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${name}</h5>
         <p class="card-text">${description}</p>
         <p class="card-text">${category}</p>
         <a href='./backoffice.html?id=${_id}' class='btn btn-primary m-1'> <i class="bi bi-pencil-square"></i> </a>
         <a class='btn btn-info rounded-pill m-1' onclick='deleteMovie("${_id}")'> <i class="bi bi-trash3"></i> Delete </a>
       </div>
     </div>`
    });
}

const deleteMovie = async (idToDelete) => {
    try {
        let res = await fetch(url + idToDelete,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
        })
        console.log(res)
        if (res.ok) {
            await getMovies()
        }
    } catch (error) {
    console.log(error)
    }
}

const editMovie = async() => {
    try {
        const editedMovie = {
            name : document.querySelector("#movie-name").value,
            description : document.querySelector("#movie-description").value,
            category : document.querySelector("#movie-category").value,
            imageUrl : document.querySelector("#movie-url").value,
        }
        const res = await fetch(url + id, {
            method: "PUT", 
            body: JSON.stringify(editedMovie),
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo",
          }),
          
        }) 
        if(res.ok) {
            console.log(res)
            getMovies()
            document.querySelector("#movie-name").value ="";
            document.querySelector("#movie-description").value = "";
            document.querySelector("#movie-category").value= "";
            document.querySelector("#movie-url").value ="";
        }
    } catch(error) {
        console.log(error)
    }
}