const seracr_left_cards = document.querySelector(".seracr_left_cards");

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

    seracr_left_cards.innerHTML = data.data.map((item) => {
      return `
        <div class="swiper_card">
                    <div class="owarlay">
      </div>
<img src="${item.cover_url}" alt="">
<div class="swiper_card_content">
<div class="swiper_content_top">
    Fantasy
</div>
<div class="">
    <h3>Wonder Woman 1984</h3>
</div>
</div>
</div>
        
        `;
    }).join("");
  } catch (err) {
    console.log(err);
  }
}
searchfunc();
