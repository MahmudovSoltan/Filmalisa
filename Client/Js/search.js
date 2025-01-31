const seracr_left_cards = document.querySelector(".seracr_left_cards");
const serachInput = document.querySelector("#serachInput");
const loading = document.querySelector("#loading");
const homemain = document.querySelector("#homemain");
const searchDiv = document.getElementById("searchDiv");
async function searchfunc() {
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
    const data = await response.json();
    console.log(data);

    seracr_left_cards.innerHTML = data.data.map((movie) => {
        return `
        <div class="swiper-slide swiper_card5" >
              <div class="owarlay">

      </div>
          <a href="./detailed.html?post_id=${
            movie.id
          }" style="position: relative;z-index: 999;">
          <img src="${movie.cover_url}" alt="" style="width: 292px;">
          </a>
               <div class="swiper_card_content">
           <div class="swiper_content_top">
                  ${movie.category.name}
             </div>
              <div class="">
    <h3>${
      movie.title.length > 40
        ? movie.title.substring(0, 40) + "..."
        : movie.title
    }</h3>
       <div class="slider_whatch_link">
                                    <a href="${
                                      movie.watch_url
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
        
        `;
      })
      .join("");
    homemain.style.opacity = "1";
    loading.classList.add("loadFalse");
  } catch (err) {
    console.log(err);
  }
}
searchfunc();

async function searchMovies() {
  loading.classList.remove("loadFalse");
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies?search=${serachInput.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const data = await response.json();
    seracr_left_cards.innerHTML = "";

    data.data.length > 0
      ? (seracr_left_cards.innerHTML = data.data.map((movie) => {
            return `
      <div class="swiper-slide swiper_card5" >
            <div class="owarlay">

    </div>
        <a href="./detailed.html?post_id=${
          movie.id
        }" style="position: relative;z-index: 999;">
        <img src="${movie.cover_url}" alt="" style="width: 292px;">
        </a>
             <div class="swiper_card_content">
         <div class="swiper_content_top">
               ${movie.category.name}
           </div>
            <div class="">
              <h3>${
                movie.title.length > 40
                  ? movie.title.substring(0, 40) + "..."
                  : movie.title
              }</h3>
     <div class="slider_whatch_link">
                                  <a href="${
                                    movie.watch_url
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
      
      `;
          })
          .join(""))
      : (searchDiv.style.display = "flex");
    loading.classList.add("loadFalse");
  } catch (err) {
    console.log(err);
  }
}
