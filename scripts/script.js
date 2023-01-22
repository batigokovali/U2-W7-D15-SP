const url = "https://striveschool-api.herokuapp.com/api/movies/"
const category = "horror";
const params = new URLSearchParams(location.search)
const id = params.get("id")
let genresArray = [];

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
        genresArray = [genres]
    } catch (error) {
        console.log(error)
    }
}

const getMovies = async (genres) => {
    try {
        const options = { 
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
            }
            for (let i = 0; i<genres.length; i++)
            {
                const res = await fetch(url + genres[i], options)
                const moviesArray = await res.json()
                renderMovies(moviesArray)
            }
            
        }
    catch (error) {
    console.log(error)}}


const renderGenres = async (arrayOfGenres) => {
    const list = document.querySelector("#genres-front")
    list.innerHTML = "";
    arrayOfGenres.forEach(genre => 
        list.innerHTML += `
        <h1 class="text-white mt-3" href="" >${genre}</h1>
        <div class="row" id="${genre}"></div>
        `,
)}



const renderMovies = (moviesArray)  => {
for (i = 0; i<1; i++)
{
    let movies = document.getElementById(moviesArray[i].category)
    for (let i = 0; i<moviesArray.length; i++)
    {
        movies.innerHTML += `
        <div class="card col-lg-2 col-md-3 col-sm-6 bg-transparent">
        <img src="${moviesArray[i].imageUrl}" class="card-img-top" alt="...">
        </div>
        `
    }
}   
}