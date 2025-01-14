const creatBtn = document.querySelector("#creatBtn")
const movieModal = document.querySelector("#movieModal2")
const owarlay = document.querySelector(".owarlay")
const creat = document.querySelector("#creat")
const categoryModal = document.querySelector (".modal_category")
const deleteBtn = document.querySelector ("#deletebtn")

creatBtn.addEventListener("click",()=>{
    movieModal.classList.add('active');
})
owarlay.addEventListener("click",()=>{
    movieModal.classList.remove('active'); 
    categoryModal.classList.remove("active"); 
})
creat.addEventListener("click",()=>{
    movieModal.classList.add('active');
})
deleteBtn.addEventListener("click", () => {
  categoryModal.classList.add("active");
});

