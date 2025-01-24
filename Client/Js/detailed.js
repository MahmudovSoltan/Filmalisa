function addComment() {
  const commentInput = document.querySelector("#commentInput");
  const addedcomment = document.querySelector("#addedcomment");
  data = commentInput.value.jSON;

  if (commentInput.value.trim() !== "") {
    addedcomment.innerText += commentInput.value;
    commentInput.value = "";
    console.log(commentInput.value);
  } else {
    console.log("serh yazin");
  }
}

// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

var swiper = new Swiper(".mySwiper", {
  watchSlidesProgress: true,
  slidesPerView: 5,
  spaceBetween: 24,
});

var swiper3 = new Swiper(".mySwiper3", {
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 16,
  loop: true,
});

//IFRAME START

document.addEventListener("DOMContentLoaded", function () {
  const playfragmanbtn = document.querySelector("#playfragmanbtn");

  playfragmanbtn.addEventListener("click", function () {
    // YouTube embed link
    const youtubeEmbedLink =
      "https://www.youtube.com/embed/VI6fuv_6_C8?si=iiLk9LBDQJ5jzd7v?autoplay=1";

    // Iframe və overlay yoxdursa, yaradın
    if (!document.querySelector(".youtube-iframe")) {
      // Overlay yaratmaq
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      document.body.appendChild(overlay);

      // Iframe yaratmaq
      const iframe = document.createElement("iframe");
      iframe.src = youtubeEmbedLink;
      iframe.classList.add("youtube-iframe", "centered");
      document.body.appendChild(iframe);

      // Overlay və iframe-i göstərmək
      overlay.style.display = "block";
      iframe.style.display = "block";

      // Overlay-i bağlama funksiyası
      overlay.addEventListener("click", function () {
        iframe.remove();
        overlay.remove();
      });
    }
  });
});

//IFRAME END

let dataid = null;

const lostspaseinfo = document.querySelector("#lostspaseinfo");
const watchlinkbtn = document.querySelector("#watchlinkbtn");
const adfavbtn = document.querySelector("#adfavbtn");

//watchlik function START

watchlinkbtn.addEventListener("click", function () {
  getWatch();
});

async function getWatch() {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmtoYW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3Mzc3MDAzMDQsImV4cCI6MTc2ODgwNDMwNH0.fLcDRLtvvIR66B5PKZVns5vod6hw_JNBD5yG1L9BGmA";

    const resp = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/movies",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Client_token")}`,
        },
      }
    );
    const responce = await resp.json();
    localStorage.setItem("Client_token", token);
    console.log("responce", responce.data);
    responce.data.forEach((item) => {
      const watchlinkin = item.watch_url;
      console.log("watchlinkin", watchlinkin);
    });
  } catch (error) {
    console.log("error", error);
  }
}

//watchlik function END
