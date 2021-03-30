const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${config.key}`;
const IMG = "https://image.tmdb.org/t/p/w1280";
const tvURL = `https://api.themoviedb.org/3/tv/popular?api_key=${config.key}&language=en-US`;

//doms
const movieBoxContainer = document.getElementById("main");
const tvBoxContainer = document.getElementById("tv-shows");

tvBoxContainer.addEventListener("click", (e) => {
  e.preventDefault();
  getMovies(apiURL, tvURL);
});

async function getMovies(contentType = "movie") {
  const url = contentType === "movie" ? apiURL : tvURL;
  // console.log(url);

  try {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results, contentType);
  } catch (err) {
    console.log(err);
  }
}

function showMovies(movies, type) {
  movieBoxContainer.innerHTML = "";

  // Movie Information
  // grabs the class .movie box from the html file.

  movies.forEach((movie) => {
    const {
      original_title,
      original_name,
      overview,
      vote_average,
      poster_path,
    } = movie;

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("movie-box");

    mainDiv.innerHTML += `<img class="movie-pic" src="${
      IMG + poster_path
    }" alt="movie of picture">
                    <div class="movie-info">
                        <h3 class="movie-title">${
                          type === "movie" ? original_title : original_name
                        }</h3>
                        <span class="movie-rating">${vote_average}</span>
                        </div><div class="information">
                        <h3 class="movie-title">${
                          type === "movie" ? original_title : original_name
                        }</h3>
                        <p class="movie-overview">${overview}</p>
                        </div>`;

    movieBoxContainer.appendChild(mainDiv); // prints to the DOM
  });
}

getMovies();

/*
TODO: 
how to add click event to get TV shows popularity? API Link is different. */
