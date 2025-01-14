const creatBtn = document.querySelector("#creatBtn")
const movieModal = document.querySelector("#movieModal2")
const owarlay = document.querySelector(".owarlay")
const creat = document.querySelector("#creat")
const categoryModal = document.querySelector (".modal_category")
const deleteBtn = document.querySelector ("#deletebtn")
const delete2 = document.querySelector("#delete")
const modal_section = document.querySelector(".modal_section")

creatBtn.addEventListener("click",()=>{
    movieModal.classList.add('active');
})
owarlay.addEventListener("click",()=>{
    movieModal.classList.remove('active'); 
    categoryModal.style.display = "none"; 
    console.log("click");  
})

delete2.addEventListener("click",()=>{
console.log("click");
modal_section.classList.remove("active")
 
})
creat.addEventListener("click",()=>{
    movieModal.classList.add('active');
})
deleteBtn.addEventListener("click", () => {
  categoryModal.classList.add("active");
});

