var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  watchSlidesProgress: true,
  slidesPerView: 5,
  spaceBetween: 16,
  // loop: true,
});

var swiper3 = new Swiper(".mySwiper3", {
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 16,
  // loop: true,
});
const carusel2 = document.querySelector("#carusel2");
const swiper1 = document.querySelector("#swiper1");
const swiper_image = document.querySelector("#swiper_image");
async function getAllMovies() {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/movies",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const movies = await response.json();
    console.log(movies.data);
    swiper1.innerHTML = movies.data
      .map((movie) => {
        return `
       <div class="swiper-slide swiper_card">
              <div class="owarlay">
      </div>
<img src="${movie.cover_url}" alt="">
<div class="swiper_card_content">
<div class="swiper_content_top">
    Fantasy
</div>
<div class="">
    <h3>${movie.title}</h3>
</div>
</div>
</div>
      `;
      })
      .join("");

    carusel2.innerHTML = movies.data
      .map((movie) => {
        return `

        <div class="swiper-slide swiper_card2">
               <div class="owarlay">
      </div>
                                <img src="${movie.cover_url}" alt="">
                             <div class="swiper_card_content">
                                <div class="swiper_content_top">
                                    Fantasy
                                </div>
                                <div class="">
                                    <h3>${movie.title}</h3>
                                </div>
                             </div>
                            </div>
      
      `;
      })
      .join("");

    let oneMovieCarusel = movies.data.slice(0, 3);
    swiper_image.innerHTML = oneMovieCarusel
      .map((movie) => {
        return `
            <div class="swiper-slide swiper_image">
                 <div class="owarlay">
      </div>
                        <img src="${movie.cover_url}"  alt="">

                        <div class="swiper_content">
                            <div class="swiper_content_top">
                                Science Fiction
                            </div>
                            <h2 class="movie_title">${movie.title}</h2>
                            <p class="movie_desc">
                         ${movie.overview}
                            </p>
                            <div class="watch_btn">
                                <a class="watch_link" href="">Watch now</a>
                            </div>
                        </div>
                    </div>
        
        
        `;
      })
      .join("");
  } catch (errr) {
    console.log(errr);
  }
}

getAllMovies();
