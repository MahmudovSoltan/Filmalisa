var swiper3 = new Swiper(".mySwiper3", {
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 16,
});
const favorites = document.querySelector("#favorites");
const loading = document.querySelector("#loading")
const homemain = document.querySelector("#homemain")
async function getFavorites() {
  try {
    const response = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/movies/favorites",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login_token")}`,
      },
    });
    const data = await response.json();
    console.log(data.data);
    data.data.forEach((element) => {
      return favorites.innerHTML += `
         <div class="swiper-slide swiper_card2">
               <div class="owarlay"></div>
                                <a href="./detailed.html?post_id=${
                                  element.id
                                }" style="position: relative;z-index: 999;">
                                <div>
                                <img src="${element.cover_url}" alt="">
                                </div>
                                    </a>
                             <div class="swiper_card_content">
                                <div class="swiper_content_top">
                                    Fantasy
                                </div>
                                <div class="">
                                    <h3>${
                                      element.title.length > 40
                                        ? element.title.substring(0, 40) + "..."
                                        : element.title
                                    }
                                    
                                    
                                    </h3>
                                    <div class="slider_whatch_link">
                                    <a href="${
                                      element.watch_url
                                    }">Watch now <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.4577 7.93863L1.72741 2.20833L2.72883 1.20691L9.99088 8.46896L2.72883 15.731L1.72741 14.7296L7.4577 8.99929L7.98803 8.46896L7.4577 7.93863Z"
                                                fill="#0FEFFD" stroke="white" stroke-width="1.5" />
                                        </svg></a>
        
                                                  </div>
                                </div>
                             </div>
                            </div>
        
        `
    });
      homemain.style.opacity = "1"
    return loading.classList.add("loadFalse");
    
  } catch (error) {
    console.log(error);
  }
}
getFavorites()
