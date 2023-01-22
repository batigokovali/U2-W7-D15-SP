const url = "https://striveschool-api.herokuapp.com/api/movies/"
const category = "horror";
const params = new URLSearchParams(location.search)
const id = params.get("id")
let genresArray = [];
let moviesArray = [];

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
        genresArray = [...genres]
        console.log(genres)
    } catch (error) {
        console.log(error)
    }
}

const getMovies = async () => {
    try {
        const options = { 
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDIzZWU3MzczODAwMTUzNzQzYjIiLCJpYXQiOjE2NzQxMzc2MjAsImV4cCI6MTY3NTM0NzIyMH0.lW0cx9aTKiLUaPLpRv2gXUgac5CwauCPFmdAyMuqCdo"
            }
            }
            for (let i = 0; i<genresArray.length; i++)
            {
                const res = fetch(url + genresArray[i], options)
                const movie = (await res).json()
                moviesArray = [movie]
                renderMovies(movie)
            }
            
        }
    catch (error) {
    console.log(error)}}


const renderGenres = async (arrayOfGenres) => {
    const list = document.querySelector("#genres-front")
    list.innerHTML = "";
    arrayOfGenres.forEach(genre => 
        list.innerHTML += `
        <h1 class="text-white" href="" >${genre}</h1>
        `,
)}




const  renderMovies = (movie)  => {
    const movies = document.querySelector("#movies")
    console.log(movie)




    // movies.innerHTML = "";
    // for (let i= 0; i<moviesArray.length; i++)
    // {
    //     console.log(moviesArray[i])
    //     movies.innerHTML += `
    //     <div class="card col-lg-2 col-md-4 col-sm-6 bg-transparent">
    //     <img src="${moviesArray[i].imageUrl}" class="card-img-top" alt="...">
    //     </div>
    //     `
    // }
}

