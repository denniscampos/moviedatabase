const API_KEY = "ec89c9f730c73e1aa9bb7e293afc6f93";

const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const IMG = "https://image.tmdb.org/t/p/w1280";
const tvURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

//doms
const formInput = document
  .querySelector("#form")
  .addEventListener("submit", searchContent);
const searchInput = document.querySelector(".search");
const movieBoxContainer = document.getElementById("main");
const tvBoxContainer = document.getElementById("tv-shows");
const upcomingMovies = document.getElementById("upcoming-movies");

// event listeners
tvBoxContainer.addEventListener("click", (e) => {
  e.preventDefault();
  getMovies(apiURL, tvURL);
});

upcomingMovies.addEventListener("click", (e) => {
  e.preventDefault();
  testMovies(upcomingURL);
});

// url functions
async function getMovies(contentType = "movie") {
  const url = contentType === "movie" ? apiURL : tvURL;

  try {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results, contentType);
  } catch (err) {
    console.log(err);
  }
}

async function searchContent() {
  const res = await fetch(searchURL);
  const data = await res.json();
}

async function testMovies() {
  const url = upcomingURL;
  try {
    const res = await fetch(url);
    const data = await res.json();
    moreTestMovies(data.results);
    console.log(data.results);
  } catch (err) {
    console.log(err);
  }
}

// dom instructions
function moreTestMovies(movies, type) {
  console.log("hello");

  movieBoxContainer.innerHTML = "";

  movies.forEach((movie) => {
    const {
      original_title,
      overview,
      vote_average,
      poster_path,
      original_name,
    } = movie;

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("movie-box");

    mainDiv.innerHTML += `<img class="movie-pic" src="${
      IMG + poster_path
    }" alt="movie of picture">
                    <div class="movie-info">
                        <h3 class="movie-title">${original_title}</h3>
                        <span class="movie-rating">${vote_average}</span>
                        </div><div class="information">
                        <h3 class="movie-title">${
                          type === "movie" ? original_title : original_name
                        }</h3>
                        <p class="movie-overview">${overview}</p>
                        </div>`;

    movieBoxContainer.appendChild(mainDiv);
  });
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
