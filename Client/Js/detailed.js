function addComment() {
  const commentInput = document.querySelector("#commentInput");
  const addedcomment = document.querySelector("#addedcomment");
  data = commentInput.value.jSON;

  if (commentInput.value.trim() !== "") {
    addedcomment.innerText += commentInput.value;
    commentInput.value = "";
    // console.log(commentInput.value);
  } else {
    // console.log("serh yazin");
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
  slidesPerView: 7,
  spaceBetween: 24,
  breakpoints: {
    // 320px-ə qədər ekranlarda
    320: {
        slidesPerView: 4,
        spaceBetween: 5
    },
    // 480px-ə qədər ekranlarda
    575: {
        slidesPerView: 4,
        spaceBetween: 10
    },
    // 768px və ya daha böyük ekranlar
}
});

var swiper3 = new Swiper(".mySwiper3", {
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 16,
  loop: true,
  breakpoints: {
    // 320px-ə qədər ekranlarda
    320: {
        slidesPerView: 1,
        spaceBetween: 5
    },
    // 480px-ə qədər ekranlarda
    575: {
        slidesPerView: 1,
        spaceBetween: 10
    },
    1024:{
      slidesPerView: 3,
      spaceBetween: 10
    }
  
}
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
const simmovswiper = document.querySelector("#simmovswiper");
const addfavbtn = document.querySelector("#addfavbtn");
const loading = document.querySelector("#loading")

let categoryid = null;
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
    console.log("responcecover", responce.data);
    categoryid = responce.data.category.id;
    console.log("categoryid", categoryid);

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
    // console.log("responce", responce.data.actors);
    responce.data.actors.forEach((item) => {
      topactors.innerHTML += `
     <div class="swiper-slide" style="height: 200px;">
                <div>
                  <img src="${item.img_url}" alt="" style="height: 150px;" />
                  <p class="topcastext1">${item.name}</p>
                  <p class="topcastext2">${item.surname}</p>
                </div>
              </div>

      `;
    });

    // console.log("responce", responce.data.watch_url);
    loading.classList.add("loadFalse")

    if (responce.data.watch_url) {
      watchlinkhref.href = responce.data.watch_url;
    } else {
      console.error("Link tapılmadı.");
      watchlinkhref.textContent = "No Link Available";
    }
  } catch (error) {
    // console.log("error", error);
  }
}
getWatch();
//watchlik function END
let comments = [];
let similardata = [];

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
  // console.log("data", data);
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
    // console.log("data2", data2);

    // console.log("data2", data2.data);

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
    // console.log("error", error);
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

    // console.log("commentsdata", res.data);
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
    // console.log(error);
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
    similardata = res.data.find((item) => item.id === categoryid);
    console.log("postId", postId);

    console.log("similardata", similardata);
    const filteredMovies = similardata.movies.filter((item) => item.id != postId);
    console.log(filteredMovies);
    
    
    filteredMovies?.forEach((element) => {
      simmovswiper.innerHTML += `
      <div class="swiper-slide swiper_card2"  style="height: 655px;">
                    <div class="owarlay"></div>
                    <a href="./detailed.html?post_id=${element.id}" style="position: relative;z-index: 999;">
                      <div>
                        <img style="height: 655px !important" src="${element.cover_url}" alt="">
                      </div>
                    </a>
                    <div class="swiper_card_content">
                      <div class="swiper_content_top">${element.category.name}</div>
                      <div class="">
                        <h3>${
                          element.title.length > 40
                            ? element.title.substring(0, 40) + "..."
                            : element.title
                        }</h3>
                        <div class="slider_whatch_link">
                          <a href="${element.watch_url}">
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
      `;
    });
  } catch (error) {
    console.log(error);
  }
}
getSimilar();

//similar get funksiya end

//add to favorite function start
addfavbtn.addEventListener("click", function () {
  getaddFavori();
});

async function getaddFavori() {
  try {
    const responce = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movie/${postId}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    const favdata = await responce.json();
    console.log("responce", responce);

    console.log("favdata", favdata);

    if (favdata.message == "Successfully added favorites") {
      addfavbtn.classList.add("activefav");
    } else {
      addfavbtn.classList.remove("activefav");
    }
  } catch (error) {
    console.log(error);
  }
}

//add to favorite function end

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


document.addEventListener("DOMContentLoaded", function () {
  const mobileFrqman = document.querySelector("#mobileFrqman")

  mobileFrqman.addEventListener("click", function () {
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

///-----------



