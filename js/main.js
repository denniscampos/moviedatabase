const API_KEY = "ec89c9f730c73e1aa9bb7e293afc6f93";
const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const IMG = "https://image.tmdb.org/t/p/w1280";

async function getMovies() {
  const res = await fetch(apiURL);
  const data = await res.json();

  console.log(data);
  // Movie Information
  // grabs the class .movie box from the html file.
  const mainDiv = document.createElement("div");
  mainDiv.className = "main-container";
  for (let i = 0; i < data.results.length; i++) {
    // if this out the loop it will not loop with the other items
    // const myDiv = document.createElement("div");
    // myDiv.className = "movie-box"
    const movieTitle = data.results[i].original_title;
    const movieVotes = data.results[i].vote_average;
    const imgData = data.results[i].poster_path;
    // myDiv.querySelectorAll('movie-box')
    mainDiv.innerHTML += `<div class="movie-box"><img class="movie-pic" src="${
      IMG + imgData
    }" alt="movie of picture">
                    <div class="movie-info">
                        <h3 class="movie-title">${movieTitle}</h3>
                        <span class="movie-rating">${movieVotes}</span>
                        </div></div>`;
    console.log();
    document.body.appendChild(mainDiv); // prints to the DOM

    try {
      await fetch(apiURL);
    } catch (err) {
      alert(err);
    }
  }
}
getMovies();
