const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${config.key}`;
const IMG = "https://image.tmdb.org/t/p/w1280";

//doms
const movieBoxContainer = document.getElementById("main");

async function getMovies() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    showMovies(data.results);
  } catch (err) {
    console.log(err);
  }
}

function showMovies(movies) {
  movieBoxContainer.innerHTML = "";
  // Movie Information
  // grabs the class .movie box from the html file.

  movies.forEach((movie) => {
    const { original_title, overview, vote_average, poster_path } = movie;

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("movie-box");

    mainDiv.innerHTML += `<img class="movie-pic" src="${
      IMG + poster_path
    }" alt="movie of picture">
                    <div class="movie-info">
                        <h3 class="movie-title">${original_title}</h3>
                        <span class="movie-rating">${vote_average}</span>
                        </div><div class="information">
                        <h3 class="movie-title">${original_title}</h3>
                        <p class="movie-overview">${overview}</p>
                        </div>`;

    movieBoxContainer.appendChild(mainDiv); // prints to the DOM
  });
}

getMovies();
