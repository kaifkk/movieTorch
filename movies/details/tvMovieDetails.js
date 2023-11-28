document.cookie = "exampleCookie=exampleValue; SameSite=None; Secure";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Log the movie ID to the console
console.log(movieId);

// function urlStateChange() {
//   const newUrl = window.location.origin + window.location.pathname;
//   history.replaceState({}, document.title, newUrl);
// }

// urlStateChange();

async function callMovieDetails() {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwOTg4YzliMDdlNjUyN2NiYzU2ZDNkMmYxZjhjMSIsInN1YiI6IjY1M2EwMjMzMjRmMmNlMDBjNThhN2VmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53zqp_-39YTk7DVQivx3c1ZIcGW7JfBOOhVAERqALrc",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.title);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function callMovieCredit() {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwOTg4YzliMDdlNjUyN2NiYzU2ZDNkMmYxZjhjMSIsInN1YiI6IjY1M2EwMjMzMjRmMmNlMDBjNThhN2VmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53zqp_-39YTk7DVQivx3c1ZIcGW7JfBOOhVAERqALrc",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.title);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// callMovieDetails();

async function MovieDetails() {
  const details = await callMovieDetails();
  const casts = await callMovieCredit();
  const nav = document.querySelector(".nav");
  const imgDiv = document.querySelector(".image-div");
  const storySection = document.querySelector(".story-section");
  const released = document.querySelector("#released");
  const runtimeSection = document.querySelector("#runtime-section");
  const statusSection = document.querySelector("#status");
  const directorSection = document.querySelector("#director-section");
  const imdbSection = document.querySelector("#imdb-section");
  const genreList = document.querySelector(".genre-list");
  const castWrapper = document.querySelector(".casts-wrapper");
  const url = "https://image.tmdb.org/t/p/original";
  const imdbURL = "https://www.imdb.com/title/";

  const title = document.createElement("h1");
  title.textContent = details.name;
  nav.appendChild(title);

  const img = document.createElement("img");
  img.src = `${url}${details.poster_path}`;
  imgDiv.appendChild(img);

  const story = document.createElement("p");
  story.textContent = details.overview;
  storySection.appendChild(story);

  const releaseDate = document.createElement("h4");
  releaseDate.textContent = details.release_date;
  released.appendChild(releaseDate);

  const runtime = document.createElement("h4");
  runtime.textContent = details.runtime + " min";
  runtimeSection.appendChild(runtime);

  const status = document.createElement("h4");
  status.textContent = details.status;
  statusSection.appendChild(status);

  const director = casts.crew.find((member) => member.job === "Director");
  const directorName = document.createElement("h4");
  directorName.textContent = director.name;
  directorSection.appendChild(directorName);

  const genreNames = details.genres.map((genre) => genre.name);
  const genre = document.createElement("a");
  genre.textContent = genreNames;
  genreList.appendChild(genre);
  //   console.log(genreNames);

  const imdbLink = document.createElement("a");
  const imdbLogo = document.createElement("i");
  imdbLogo.classList.add("fa-brands", "fa-imdb", "imdb-icon");
  imdbLink.href = `${imdbURL}${details.imdb_id}`;
  imdbLink.appendChild(imdbLogo);
  imdbSection.appendChild(imdbLink);

  const castNames = casts.cast.map((person) => person.name);
  const castProfile = casts.cast.map((person) => person.profile_path);
  const castCharacter = casts.cast.map((person) => person.character);

  //   const castImg = document.createElement("img");
  //   castImg.src = `${url}${castProfile}`;
  //   castWrapper.appendChild(castImg);
  const castName = document.createElement("h5");
  castName.textContent = castNames;
  castWrapper.appendChild(castNames);
  const characterName = document.createElement("p");
  characterName.textContent = castCharacter;
  castWrapper.appendChild(characterName);
}

MovieDetails();
