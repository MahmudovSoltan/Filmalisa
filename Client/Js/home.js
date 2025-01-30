var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1, // Hər dəfə bir slayd göstərilir
  spaceBetween: 30, // Slaydlar arasındakı boşluq
  loop: true, // Sonsuz dövrə
  effect: "fade", // Şəffaflıq effekti
  fadeEffect: {
    crossFade: true, // Daha hamar keçid üçün
  },
  autoplay: {
    delay: 3000, // Hər 3 saniyədən bir slayd dəyişir
    disableOnInteraction: false, // İstifadəçi müdaxilə etsə belə davam edir
    pauseOnMouseEnter: true, // Mausun üzərində olarkən durur
  },
  speed: 1000, // Animasiya sürəti (1 saniyə)
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Səhifəçəkliklər kliklənə bilər
  },
  navigation: {
    nextEl: ".swiper-button-next", // Növbəti slayd düyməsi
    prevEl: ".swiper-button-prev", // Əvvəlki slayd düyməsi
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
  // spaceBetween: 16,
  // loop: true,
});
const carusel2 = document.querySelector("#carusel2");
const swiper1 = document.querySelector("#swiper1");
const swiper_image = document.querySelector("#swiper_image");
const homemain = document.querySelector("#homemain")
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
      homemain.style.opacity = "1"
    let oneMovieCarusel = movies.data.slice(1, 4);
    const loading = document.querySelector("#loading")
    let imageOne = document.querySelector("#imageOne");
    let imageTwo = document.querySelector("#imageTwo");
    let imageThree = document.querySelector("#imageThree");
    const movieTitleOne = document.querySelector("#movieTitleOne");
    const movieTitleTwo = document.querySelector("#movieTitleTwo");
    const movieTitleThree = document.querySelector("#movieTitleThree");
    const description1 = document.querySelector("#description1");
    const description2 = document.querySelector("#description2");
    const description3 = document.querySelector("#description3");
    const swiper_content_top1 = document.querySelector("#swiper_content_top1") 
    const swiper_content_top2 = document.querySelector("#swiper_content_top2") 
    const swiper_content_top3 = document.querySelector("#swiper_content_top3") 
    const url3 = document.querySelector("#url3");
    const url2 = document.querySelector("#url2");
    const url1 = document.querySelector("#url1");
    movieTitleOne.textContent = oneMovieCarusel[0].title.substring(0, 100);
    movieTitleTwo.textContent = oneMovieCarusel[1].title.substring(0, 100);
    movieTitleThree.textContent = oneMovieCarusel[2].title.substring(0, 100);
    description1.textContent = oneMovieCarusel[0].overview.substring(0, 200);
    description2.textContent = oneMovieCarusel[1].overview.substring(0, 200);
    description3.textContent = oneMovieCarusel[2].overview.substring(0, 200);
    url3.href = oneMovieCarusel[2].watch_url;
    url2.href = oneMovieCarusel[1].watch_url;
    url1.href = oneMovieCarusel[0].watch_url;
    imageOne.src = oneMovieCarusel[0].cover_url;
    imageTwo.src = oneMovieCarusel[1].cover_url;
    imageThree.src = oneMovieCarusel[2].cover_url;
    swiper_content_top3.innerHTML = oneMovieCarusel[2].category.name
    swiper_content_top2.innerHTML = oneMovieCarusel[1].category.name
    swiper_content_top1.innerHTML = oneMovieCarusel[0].category.name
    console.log(swiper1);
    loading.classList.add("loadFalse")
  } catch (errr) {
    console.log(errr);
  }
}

getAllMovies();

async function getCattegories() {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/categories",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const categories = await response.json();
    const categoryTitle = document.querySelector("#categoryTitle");
    let categoty = categories.data;

    categoty.forEach((element, index) => {
      // Əgər filmlər yoxdursa, davam etmə
      if (!element.movies || element.movies.length === 0) {
        return;
      }

      // Şərtə görə fərqli swiper-lər yarat
      if (index % 2 === 0) {
        categoryTitle.innerHTML += `
            <div>
              <div class="category_title">
                <h2>${element.name}</h2>
                <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.4577 7.93863L1.72741 2.20833L2.72883 1.20691L9.99088 8.46896L2.72883 15.731L1.72741 14.7296L7.4577 8.99929L7.98803 8.46896L7.4577 7.93863Z"
                    fill="#0FEFFD" stroke="white" stroke-width="1.5" />
                </svg>
              </div>
              <div class="swiper mySwiper2">
                <div class="swiper-wrapper slider">
                  ${element.movies
                    .map(
                      (movie) => `
                  <div class="swiper-slide swiper_card5">
                    <div class="owarlay"></div>
                    <a href="./detailed.html?post_id=${movie.id}" style="position: relative;z-index: 999;">
                      <img src="${movie.cover_url}" alt="">
                    </a>
                    <div class="swiper_card_content">
                      <div class="swiper_content_top">${movie.category.name}</div>
                      <div class="">
                        <h3>${
                          movie.title.length > 40
                            ? movie.title.substring(0, 40) + "..."
                            : movie.title
                        }</h3>
                        <div class="slider_whatch_link">
                          <a href="${movie.watch_url}">
                            Watch now 
                            <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.4577 7.93863L1.72741 2.20833L2.72883 1.20691L9.99088 8.46896L2.72883 15.731L1.72741 14.7296L7.4577 8.99929L7.98803 8.46896L7.4577 7.93863Z"
                                fill="#0FEFFD" stroke="white" stroke-width="1.5" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                `
                    )
                    .join("")}
                </div>
              </div>
            </div>`;
      } else {
        categoryTitle.innerHTML += `
          <div>
            <div class="category_title">
              <h2>${element.name}</h2>
              <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.4577 7.93863L1.72741 2.20833L2.72883 1.20691L9.99088 8.46896L2.72883 15.731L1.72741 14.7296L7.4577 8.99929L7.98803 8.46896L7.4577 7.93863Z"
                  fill="#0FEFFD" stroke="white" stroke-width="1.5" />
              </svg>
            </div>
            <div class="swiper mySwiper3">
              <div class="swiper-wrapper slider">
                ${element.movies
                  .map(
                    (movie) => `
                  <div class="swiper-slide swiper_card2">
                    <div class="owarlay"></div>
                    <a href="./detailed.html?post_id=${movie.id}" style="position: relative;z-index: 999;">
                      <div>
                        <img src="${movie.cover_url}" alt="">
                      </div>
                    </a>
                    <div class="swiper_card_content">
                      <div class="swiper_content_top">${movie.category.name}</div>
                      <div class="">
                        <h3>${
                          movie.title.length > 40
                            ? movie.title.substring(0, 40) + "..."
                            : movie.title
                        }</h3>
                        <div class="slider_whatch_link">
                          <a href="${movie.watch_url}">
                            Watch now 
                            <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.4577 7.93863L1.72741 2.20833L2.72883 1.20691L9.99088 8.46896L2.72883 15.731L1.72741 14.7296L7.4577 8.99929L7.98803 8.46896L7.4577 7.93863Z"
                                fill="#0FEFFD" stroke="white" stroke-width="1.5" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>`;
      }
    });

    // Yeni swiper instansiyaları yaradılır
    new Swiper(".mySwiper2", {
      slidesPerView: 5,
      spaceBetween: 16,
      breakpoints: {
        // 320px-ə qədər ekranlarda
        320: {
            slidesPerView: 1,
            spaceBetween: 5
        },
        // 480px-ə qədər ekranlarda
        480: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        // 768px və ya daha böyük ekranlarda
        768: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        // 1024px və ya daha böyük ekranlarda
        1024: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
    });

    new Swiper(".mySwiper3", {
      slidesPerView: 3,
      breakpoints: {
        // 320px-ə qədər ekranlarda
        320: {
            slidesPerView: 1,
            spaceBetween: 5
        },
        // 480px-ə qədər ekranlarda
        480: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // 768px və ya daha böyük ekranlarda
        768: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        // 1024px və ya daha böyük ekranlarda
        1024: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
    });
  } catch (err) {
    console.log(err);
  }
}

getCattegories();

