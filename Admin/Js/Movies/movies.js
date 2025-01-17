const creatBtn = document.querySelector("#creatBtn")
const movieModal2 = document.querySelector("#movieModal2")
const owarlay = document.querySelector(".owarlay")
const creat = document.querySelector("#creat")
const table_delete_btn = document.querySelector(".table_delete_btn")
const movieModal = document.querySelector("#movieModal")
const owarlay2 = document.querySelector("#owarlay2")
console.log(movieModal);

creatBtn.addEventListener("click",()=>{
    movieModal2.classList.add('active');
})
owarlay.addEventListener("click",()=>{
    movieModal2.classList.remove('active');  
})
creat.addEventListener("click",()=>{
    movieModal2.classList.add('active');
})

table_delete_btn.addEventListener("click",()=>{
    movieModal.classList.add("active") 
})
owarlay2.addEventListener("click",()=>{
    movieModal.classList.remove("active") 
})