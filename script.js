const sections = gsap.utils.toArray(".page");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".main",
    pin: true,
    scrub: 0.5,
    snap: 1 / (sections.length - 1),
    start: "top top",
    end: 2000,
  },
});

let flag = 0;

$(".fotter").click(function () {
  if (flag == 0) {
    $(".second-fotter").hide();
    flag = 1;
  } else {
    $(".second-fotter").show();
    flag = 0;
  }
});

// Trending cards api call
async function callTrendingMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

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

async function trendingMovies() {
  const trending = await callTrendingMovies();
  const cardContainer = document.querySelector(".card-wrapper");
  const url = "https://image.tmdb.org/t/p/original";
  const randomIndices = generateRandomIndices(trending.length, 4);

  for (let i = 0; i < 4; i++) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("cards", "card-effect");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("imgage-div");
    const image = document.createElement("img");
    image.src = `${url}${trending[randomIndices[i]].poster_path}`;
    image.classList.add("img");

    const titlediv = document.createElement("div");
    titlediv.classList.add("title-div");
    const title = document.createElement("h5");
    title.textContent = trending[randomIndices[i]].title;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-div");
    const ratingProgress = document.createElement("div");
    ratingProgress.classList.add("rating-progress");
    ratingProgress.style.background = `conic-gradient(#2ae863 ${
      trending[randomIndices[i]].vote_average.toFixed(1) * 10 * 3.6
    }deg, #ededed15 0deg)`;
    const ratingValue = document.createElement("h3");
    ratingValue.textContent =
      trending[randomIndices[i]].vote_average.toFixed(1);
    ratingValue.classList.add("rating-value");

    movieCard.appendChild(imageDiv);
    imageDiv.appendChild(image);
    movieCard.appendChild(titlediv);
    titlediv.appendChild(title);
    movieCard.appendChild(ratingDiv);
    ratingDiv.appendChild(ratingProgress);
    ratingProgress.appendChild(ratingValue);
    cardContainer.appendChild(movieCard);
  }
}

trendingMovies();
