document.cookie = "exampleCookie=exampleValue; SameSite=None; Secure";

async function callTrendingWebSeriesA_DayBanner() {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

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
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

async function callTrendingSeriesSlide() {
  const url =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1";

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
    return result.results;
    // console.log(result.results);
  } catch (error) {
    console.log(error);
  }
}

async function callTopratedMoviesSlide() {
    const url = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  
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
      return result.results;
      // console.log(result.results);
    } catch (error) {
      console.log(error)
    }
  }


function generateRandomIndices(max, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

let isMouseClick = false;

async function trendingWebSeriesA_DayBanner() {
  const webSeriesA_Day = await callTrendingWebSeriesA_DayBanner();
  const posterDiv = document.querySelector(".poster");
  const innerLeft = document.querySelector(".inner-left");
  const imageURL = "https://image.tmdb.org/t/p/original";
  const randomIndices = generateRandomIndices(webSeriesA_Day.length, 1);

  for (let i = 0; i < 1; i++) {
    // moviesTrailer(trendingMoviesA_Day[randomIndices[i]].id);

    const rating = webSeriesA_Day[randomIndices[i]].vote_average;
    document.documentElement.style.setProperty("--rating", rating);

    const movieTitle = document.createElement("h1");
    movieTitle.textContent = webSeriesA_Day[randomIndices[i]].name;
    movieTitle.classList.add("series-title");

    const ratingAndYearDiv = document.createElement("div");
    ratingAndYearDiv.classList.add("rating-year");
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    const starsDiv = document.createElement("div");
    starsDiv.classList.add("Stars");
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("year");
    const year = document.createElement("p");
    year.textContent = webSeriesA_Day[randomIndices[i]].first_air_date;

    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story");
    const story = document.createElement("p");
    story.textContent = webSeriesA_Day[randomIndices[i]].overview;

    const trailerButtonDiv = document.createElement("div");
    trailerButtonDiv.classList.add("trailer-button");
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("trailerBtn");
    const playIcon = document.createElement("i");
    playIcon.classList.add("ri-play-fill");
    const buttonText = document.createElement("p");
    buttonText.textContent = "Watch Trailer";

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");
    const imgInner = document.createElement("div");
    imgInner.classList.add("img-inner");
    const poster = document.createElement("img");
    poster.src = `${imageURL}${webSeriesA_Day[randomIndices[i]].backdrop_path}`;

    innerLeft.appendChild(movieTitle);

    ratingDiv.appendChild(starsDiv);
    ratingAndYearDiv.appendChild(ratingDiv);
    innerLeft.appendChild(ratingAndYearDiv);
    yearDiv.appendChild(year);
    ratingAndYearDiv.appendChild(yearDiv);

    storyDiv.appendChild(story);
    innerLeft.appendChild(storyDiv);

    button.appendChild(playIcon);
    button.appendChild(buttonText);
    trailerButtonDiv.appendChild(button);
    innerLeft.appendChild(trailerButtonDiv);

    rightDiv.appendChild(imgInner);
    rightDiv.appendChild(poster);
    posterDiv.appendChild(rightDiv);

    const trailerBtn = document.querySelector(".trailerBtn");
    trailerBtn.addEventListener("click", () => {
      if (!isMouseClick) {
        seriesTrailer(webSeriesA_Day[randomIndices[i]].id);
        isMouseClick = true;
      }
    });
  }
}

async function seriesTrailer(series_id) {
  const url = `https://api.themoviedb.org/3/tv/${series_id}/videos`;

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
    // return result.results;
    for (const video of result.results) {
      if (video.type === "Trailer") {
        console.log("Trailer Found");
        console.log(video.key);
        trailer(video.key);
        break;
      } else {
        console.log("Trailer Not Found");
        // alert("Hello World!");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function trailer(series_id) {
  // alert("Hello World!");
  const trailerDiv = document.querySelector(".trailer-div");
  const body = document.querySelector("body");
  body.style.overflowY = "hidden";
  trailerDiv.style.position = "absolute";
  trailerDiv.style.width = "100vw";
  trailerDiv.style.height = "100vh";
  trailerDiv.style.backgroundColor = "black";
  trailerDiv.style.zIndex = "99";
  trailerDiv.style.display = "flex";
  trailerDiv.style.alignItems = "center";
  trailerDiv.style.justifyContent = "center";
  trailerDiv.style.flexDirection = "column";

  const closeDiv = document.createElement("div");
  closeDiv.classList.add("close");
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("ri-close-fill", "close-icon");

  const spaceForTrailerDiv = document.createElement("div");
  spaceForTrailerDiv.classList.add("space-for-trailer");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${series_id}?rel=0&autoplay=1&mute=1`;
  // MWOlnZSnXJo

  trailerDiv.appendChild(closeDiv);
  trailerDiv.appendChild(spaceForTrailerDiv);
  closeDiv.appendChild(closeIcon);
  spaceForTrailerDiv.appendChild(iframe);

  const close = document.querySelector(".close-icon");
  close.addEventListener("click", () => {
    trailerClose();
    isMouseClick = false;
  });
}

async function trailerClose() {
  const trailerDiv = document.querySelector(".trailer-div");
  const body = document.querySelector("body");
  body.style.overflowY = "";
  trailerDiv.style.position = "";
  trailerDiv.style.width = "";
  trailerDiv.style.height = "";
  trailerDiv.style.backgroundColor = "";
  trailerDiv.style.zIndex = "";
  trailerDiv.style.display = "";
  trailerDiv.style.alignItems = "";
  trailerDiv.style.justifyContent = "";
  trailerDiv.style.flexDirection = "";

  // Find and remove closeDiv
  const closeDiv = trailerDiv.querySelector(".close");
  if (closeDiv) {
    closeDiv.remove();
  }

  // Find and remove spaceForTrailerDiv
  const spaceForTrailerDiv = trailerDiv.querySelector(".space-for-trailer");
  if (spaceForTrailerDiv) {
    spaceForTrailerDiv.remove();
  }
}

trendingWebSeriesA_DayBanner();

async function trendingSeriesSlide() {
    const trending = await callTrendingSeriesSlide();
    const mediaScroll = document.querySelector(".media-scroll");
    const url = "https://image.tmdb.org/t/p/original";
  
    for (let i = 0; i < trending.length; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("cards");
  
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-div");
      wrapper.appendChild(imageDiv);
      const image = document.createElement("img");
      image.src = `${url}${trending[i].poster_path}`;
      imageDiv.appendChild(image)
  
      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title-div");
      wrapper.appendChild(titleDiv);
      const title = document.createElement("h5");
      title.textContent = trending[i].name;
      titleDiv.appendChild(title);
  
      const ratingDiv = document.createElement("div");
      ratingDiv.classList.add("rating-div");
      wrapper.appendChild(ratingDiv);
      const ratingProgress = document.createElement("div");
      ratingProgress.classList.add("rating-progress");
      ratingProgress.style.background = `conic-gradient(#2ae863 ${
        trending[i].vote_average.toFixed(1) * 10 * 3.6
      }deg, #ededed15 0deg)`;
      ratingDiv.appendChild(ratingProgress);
      const ratingValue = document.createElement("h3");
      ratingValue.classList.add("rating-value");
      ratingValue.textContent = trending[i].vote_average.toFixed(1);
      ratingProgress.appendChild(ratingValue);
  
      mediaScroll.appendChild(wrapper);
  }
  }
  
  trendingSeriesSlide();

  async function topratedMoviesSlide() {
    const upcoming = await callTopratedMoviesSlide();
    const mediaScroll = document.querySelector(".toprated-media-scroll");
    const url = "https://image.tmdb.org/t/p/original";
  
    for (let i = 0; i < upcoming.length; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("cards");
  
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-div");
      wrapper.appendChild(imageDiv);
      const image = document.createElement("img");
      image.src = `${url}${upcoming[i].poster_path}`;
      imageDiv.appendChild(image)
  
      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title-div");
      wrapper.appendChild(titleDiv);
      const title = document.createElement("h5");
      title.textContent = upcoming[i].title;
      titleDiv.appendChild(title);
  
      const ratingDiv = document.createElement("div");
      ratingDiv.classList.add("rating-div");
      wrapper.appendChild(ratingDiv);
      const ratingProgress = document.createElement("div");
      ratingProgress.classList.add("rating-progress");
      ratingProgress.style.background = `conic-gradient(#2ae863 ${
        upcoming[i].vote_average.toFixed(1) * 10 * 3.6
      }deg, #ededed15 0deg)`;
      ratingDiv.appendChild(ratingProgress);
      const ratingValue = document.createElement("h3");
      ratingValue.classList.add("rating-value");
      ratingValue.textContent = upcoming[i].vote_average.toFixed(1);
      ratingProgress.appendChild(ratingValue);
  
      mediaScroll.appendChild(wrapper);
  }
  }
  
  topratedMoviesSlide();