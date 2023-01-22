const url = "https://striveschool-api.herokuapp.com/api/movies/"
const params = new URLSearchParams(location.search)
const id = params.get("id")



const addMovie = async () => {
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
        if(res.ok) {
        console.log(res)   
        }
    } catch (error) {
        console.log(error)
    } 
    getGenres()
}

window.onload = async () => {
    await getGenres()
}

const getGenres = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
        } 
        const res = await fetch(url, options)
        const genres = await res.json()
        renderGenres(genres)
        getMovies(genres)
    } catch (error) {
        console.log(error)
    }
}



const renderGenres = async (arrayOfGenres) => {
    const listBackoffice = document.querySelector("#genres")
    listBackoffice.innerHTML = "";
    arrayOfGenres.forEach(genre => 
        listBackoffice.innerHTML += `
        <button class="dropdown-item" href="" onclick="getMovies('${genre}')">${genre}</button>
        `,
)}


const getMovies = async (genres) => {
    try {
        const options = { 
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
            }
        const res = await fetch(url + genres, options)
        const genre = await res.json()
        renderMovies(genre)
    } catch (error) {
        console.log(error)
    }
}

const renderMovies = (arrayOfSingleMovie) => {
    const card = document.querySelector("#movies")
    card.innerHTML = "";
    arrayOfSingleMovie.forEach(singleMovie => {
        const {name, description, category, imageUrl, _id} = singleMovie;
        card.innerHTML += `<div class="card col-lg-3 col-md-4 col-sm-6">
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body px-0 d-flex flex-column ">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">${category}</p>
          <div class="d-flex justify-content-center align-items-end">
          <a href='./edit-movie.html?id=${_id}' onclick="getMovies('${category}')" class='btn btn-primary m-1 mt-auto'> <i class="bi bi-pencil-square"></i> </a>
          <a class='btn btn-info rounded-pill m-1 ' onclick='deleteMovie("${_id}")'> <i class="bi bi-trash3"></i> Delete </a>
          </div>
        </div>
      </div>`
     });
}


const deleteMovie = async (idToDelete) => {
    try {
        let res = await fetch(url + "/" + idToDelete,
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
            document.querySelector("#movie-name").value ="";
            document.querySelector("#movie-description").value = "";
            document.querySelector("#movie-category").value= "";
            document.querySelector("#movie-url").value ="";
        }
    } catch(error) {
        console.log(error)
    }
}


