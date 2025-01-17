const creatBtn = document.querySelector("#creatBtn")
const movieModal = document.querySelector("#movieModal")
const owarlay = document.querySelector(".owarlay")
const creat = document.querySelector("#creat")


creatBtn.addEventListener("click",()=>{
    movieModal.classList.add('active');
})
owarlay.addEventListener("click",()=>{
    movieModal.classList.remove('active');  
})
creat.addEventListener("click",()=>{
    movieModal.classList.add('active');
})

table_delete_btn.addEventListener("click",()=>{
    movieModal.classList.add("active") 
})
owarlay2.addEventListener("click",()=>{
    movieModal.classList.remove("active") 
})