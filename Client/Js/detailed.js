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

const postId = window.location.search.split("=")[1];

let dataid = null;
let youtubeEmbedLink = "";

const lostspaseinfo = document.querySelector("#lostspaseinfo");
const watchlinkbtn = document.querySelector("#watchlinkbtn");
const adfavbtn = document.querySelector("#adfavbtn");
const watchlinkhref = document.querySelector("#watchlinkhref");
const topactors = document.querySelector("#topactors");
const fragmanimage = document.querySelector("#fragmanimage");
const rightpanelbackimg = document.querySelector("#rightpanelbackimg");
const commentinput = document.querySelector("#commentinput");
const addcomentbtn = document.querySelector("#addcomentbtn");
const addedcommentare = document.querySelector("#addedcommentare");
//watchlik function START

watchlinkbtn.addEventListener("click", function () {
  getWatch();
});

async function getWatch() {
  try {
    const resp = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/movies/" + postId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const responce = await resp.json();
    console.log("responcecover", responce.data.cover_url);

    fragmanimage.src = responce.data.cover_url;
    rightpanelbackimg.style.backgroundImage = `url('${responce.data.cover_url}')`;
    const apifragmanlink = responce.data.fragman
      .split("youtu.be/")[1]
      ?.split("?")[0]; // ID `youtu.be/`-dən sonra gəlir
    if (apifragmanlink) {
      youtubeEmbedLink = `https://www.youtube.com/embed/${apifragmanlink}?autoplay=1`;
      console.log("youtubeEmbedLink", youtubeEmbedLink);
    } else {
      console.error("Link tapılmadı.");
    }
    console.log("responce", responce.data.actors);
    responce.data.actors.forEach((item) => {
      topactors.innerHTML += `
     <div class="swiper-slide">
                <div>
                  <img src="${item.img_url}" alt="" />
                  <p class="topcastext1">${item.name}</p>
                  <p class="topcastext2">${item.surname}</p>
                </div>
              </div>

      `;
    });

    console.log("responce", responce.data.watch_url);

    if (responce.data.watch_url) {
      watchlinkhref.href = responce.data.watch_url;
    } else {
      console.error("Link tapılmadı.");
      watchlinkhref.textContent = "No Link Available";
    }
  } catch (error) {
    console.log("error", error);
  }
}
getWatch();
//watchlik function END
let comments = [];

//comment function start
//add butonuna basanda
addcomentbtn.addEventListener("click", function () {
  const data = {
    comment: commentinput.value,
  };
  if (data.comment.trim() === "") {
    alert("Şərh daxil edin!");
    return;
  }
  console.log("data", data);
  commentinput.value = "";

  creatComment(data);
});
// comment yaradan funksiya
async function creatComment(commentdata) {
  try {
    const responce = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
        body: JSON.stringify(commentdata),
      }
    );
    const data2 = await responce.json();
    console.log("data2", data2);

    console.log("data2", data2.data);

    comments.unshift(data2.data);
    comments.forEach((element) => {
      addedcommentare.innerHTML = `
      <div class="comhead">
        <div class="comheadlogo">
          <img src="../Assets/Icons/adminlogo.svg" alt="" />
          <p>Anonymous</p>
        </div>
        <div>
          <p>${new Date(element.created_at).toLocaleString()}</p>
        </div>
      </div>
      <div class="comtext">
        <p>
        ${element.comment}
        </p>
      </div>
      `;
    });
    getComments();
  } catch (error) {
    console.log("error", error);
  }
}

//comment function  end
//comentlri gosteren funksiya start
async function getComments() {
  try {
    const responce = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies/${postId}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const res = await responce.json();

    console.log("commentsdata", res.data);
    res.data.forEach((element) => {
      addedcommentare.innerHTML += `
       <div class="comhead">
        <div class="comheadlogo">
          <img src="../Assets/Icons/adminlogo.svg" alt="" />
          <p>Anonymous</p>
        </div>
        <div>
          <p>${new Date(element.created_at).toLocaleString()}</p>
        </div>
      </div>
      <div class="comtext">
        <p>
        ${element.comment}
        </p>
      </div>
      
      `;
    });
  } catch (error) {
    console.log(error);
  }
}
getComments();
//comentlri gosteren funksiya end

//similar get funksiya start
async function getSimilar() {
  try {
    const responce = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const res = await responce.json();

    console.log("similardata", res.data);
  } catch (error) {
    console.log(error);
  }
}
getSimilar();

//similar get funksiya end

//IFRAME START

document.addEventListener("DOMContentLoaded", function () {
  const playfragmanbtn = document.querySelector("#playfragmanbtn");

  playfragmanbtn.addEventListener("click", function () {
    // YouTube embed link
    // const youtubeEmbedLink =
    //   "https://youtu.be/pBk4NYhWNMM?si=P_pBQBgZdNgDzsU7?autoplay=1";

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
