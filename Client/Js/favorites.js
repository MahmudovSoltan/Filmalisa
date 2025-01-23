var swiper3 = new Swiper(".mySwiper3", {
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 16,
});
const favorites = document.querySelector("#favorites");
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
         <div class="swiper-slide swiper_card">
                        <img src="${element.cover_url}" alt="">
                     <div class="swiper_card_content">
                        <div class="swiper_content_top">
                            Fantasy 
                        </div>
                        <div class="">
                            <h3>${element.title}</h3>
                        </div>
                     </div>
                    </div>
        
        `
    });
    
    return data;
  } catch (error) {
    console.log(error);
  }
}
getFavorites()
