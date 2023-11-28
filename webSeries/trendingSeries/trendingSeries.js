document.cookie = "exampleCookie=exampleValue; SameSite=None; Secure";

async function callTrendingMovies(pageNum) {
  const url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${pageNum}`;

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
    console.log(error);
  }
}

async function totalPages() {
  const url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1`;

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
    return result.total_pages;
  } catch (error) {
    console.log(error);
  }
}


// callTrendingMovies();
async function trendingMovies(pageNum) {
  const trending = await callTrendingMovies(pageNum);
  const mediaScroll = document.querySelector(".series");
  const url = "https://image.tmdb.org/t/p/original";

  for (let i = 0; i < trending.length; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("cards");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");
    wrapper.appendChild(imageDiv);
    const image = document.createElement("img");
    image.src = `${url}${trending[i].poster_path}`;
    imageDiv.appendChild(image);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");
    wrapper.appendChild(titleDiv);
    const titleText = document.createElement("div");
    titleText.classList.add("title-text");
    titleDiv.appendChild(titleText);
    const title = document.createElement("h4");
    title.textContent = trending[i].name;
    titleText.appendChild(title);

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

    // const tag = document.createElement("a");
    // tag.href = `../../movies/details/movieDetails.html?id=${trending[i].id}`;
    // wrapper.appendChild(tag);
    // const ratingDiv = document.createElement("div");
    // ratingDiv.classList.add("rating-div");
    // tag.appendChild(ratingDiv);
    // const ratingProgress = document.createElement("div");
    // ratingProgress.classList.add("rating-progress");
    // ratingProgress.style.background = `conic-gradient(#2ae863 ${
    //     trending[i].vote_average.toFixed(1) * 10 * 3.6
    //   }deg, #ededed15 0deg)`;
    // ratingDiv.appendChild(ratingProgress);
    // const ratingValue = document.createElement("div");
    // ratingValue.classList.add("rating-value");
    // ratingValue.textContent = trending[i].vote_average.toFixed(1);
    // ratingProgress.appendChild(ratingValue);

    // mediaScroll.appendChild(wrapper);
  }
}

trendingMovies(1);
console.log("Script is running");
let currenPage = 1;

(async () => {
  total = await totalPages();

window.addEventListener("scroll", async () => {
    if (
      window.scrollY + window.innerHeight + 200 >=
      document.documentElement.scrollHeight
    ) {
      if (currenPage < total) {
        currenPage++;
        await trendingMovies(currenPage);
        console.log("current Page: ", currenPage);
      } else {
        console.log("All pages have been loaded");
      }
    }

});
})();
