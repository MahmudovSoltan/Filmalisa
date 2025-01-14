const movieModal = document.querySelector("#movieModal");
const deleteBtn = document.querySelector(".table_delete_btn");
const exitModal = document.querySelector(".owarlay");
deleteBtn.addEventListener("click", () => {
  movieModal.classList.add("active");
});
exitModal.addEventListener("click", () => {
  movieModal.classList.remove("active");
});
