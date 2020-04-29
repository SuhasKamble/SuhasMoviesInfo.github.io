let searchTxt = document.getElementById('searchTxt');
let searchBtn = document.getElementById('searchBtn');
let info = document.getElementById('info');
let output = document.getElementById('output')



searchBtn.addEventListener('click',()=>{
searchTxt=searchTxt.value ;
let url=`http://www.omdbapi.com/?apikey=5e0a7faa&s=${searchTxt}`

fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)

        let moviesInfo = data.Search
        let movies = ""
        moviesInfo.forEach(function(element, index) {
            console.log(element)

            let fetched = `<div class="card mx-3 my-3 movies" style="width: 18rem;">
            <img src="${element.Poster}"  class="card-img-top added" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.Title}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary" onclick="movieSelected('${element.imdbID}')" >Movie Details</a>
            </div>
          </div>`
          
          movies +=fetched
            
        });
        info.innerHTML=movies
        
    })
    .catch((err)=>{
        console.log(err)
    })
})

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    console.log(id)
    window.location='movies.html'
    return false;

   
}

function getMovies(){
  let  moviesid =sessionStorage.getItem("movieId")

    
    let api = `http://www.omdbapi.com/?apikey=5e0a7faa&i=${moviesid}`
    fetch(api)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
       let  moviesImdf= `
        <div class="card" text-center>
  <img src="${data.Poster}"  class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.Title}</h5>
    <h5 class="card-title">Actors</h5>
    <p class="card-text">${data.Actors}</p>
    <h5 class="card-title">Awards</h5>
    <p class="card-text">${data.Awards}</p>
    <h5 class="card-title">Year</h5>
    <p class="card-text">${data.Year}</p>
    <h5 class="card-title">Rated</h5>
    <p class="card-text">${data.Rated}</p>
    <h5 class="card-title">Writer</h5>
    <p class="card-text">${data.Writer}</p>
    <h5 class="card-title">imdfRating</h5>
    <p class="card-text">${data.imdbRating}</p>
    <h5 class="card-title">Realesed</h5>
    <p class="card-text">${data.Released}</p>
    <h5 class="card-title">imdbVotes</h5>
    <p class="card-text">${data.imdbVotes}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`

output.innerHTML=moviesImdf


    })
}