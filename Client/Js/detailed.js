

// function addComment() {
function addComment() {
  const commentInput = document.querySelector("#commentInput");
  const addedcomment = document.querySelector("#addedcomment");

  if (commentInput.value.trim() !== "") {
    addedcomment.innerText += commentInput.value;
    commentInput.value = "";
    console.log(commentInput.value);
  } else {
    console.log("serh yazin");
  }// function addComment() {
//   const commentInput = document.querySelector("#commentInput");
//   const addedcomment = document.querySelector("#addedcomment");
//   data = commentInput.value.jSON;

//   if (commentInput.value.trim() !== "") {
//     addedcomment.innerText += commentInput.value;
//     commentInput.value = "";
//     console.log(commentInput.value);
//   } else {
//     console.log("serh yazin");
//   }
// }

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


}
