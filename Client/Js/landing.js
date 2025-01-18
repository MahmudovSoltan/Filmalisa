

// faqItems.forEach(item => {
//     const question = item.querySelector('h3');
//     const content = item.querySelector('.faq_content');
//     question.addEventListener('click', () => {
//         const isVisible = content.style.display === 'block';
//         content.style.display = isVisible ? 'none' : 'block';
//     });
// });


const add = document.querySelector("#add1")
const paraqraf = document.querySelector("#paragraph1")
const image = document.querySelector("#image1")
add.addEventListener("click",()=>{
    paraqraf.classList.toggle("active")
    image.classList.toggle("element")
})

const addSecond = document.querySelector("#add2")
const paraqrafSecond = document.querySelector("#paragraph2")
const imageSecond = document.querySelector("#image2")
addSecond.addEventListener("click",()=>{
    paraqrafSecond.classList.toggle("active")
    imageSecond.classList.toggle("element")
})

const addThird = document.querySelector("#add3")
const paraqrafThird = document.querySelector("#paragraph3")
const imageThird = document.querySelector("#image3")
addThird.addEventListener("click",()=>{
    paraqrafThird.classList.toggle("active")
    imageThird.classList.toggle("element")
})

const addFourth = document.querySelector("#add4")
const paraqrafFourth = document.querySelector("#paragraph4")
const imageFourth = document.querySelector("#image4")
addFourth.addEventListener("click",()=>{
    paraqrafFourth.classList.toggle("active")
    imageFourth.classList.toggle("element")
})

const addFifth = document.querySelector("#add5")
const paraqrafFifth = document.querySelector("#paragraph5")
const imageFifth = document.querySelector("#image5")
addFifth.addEventListener("click",()=>{
    paraqrafFifth.classList.toggle("active")
    imageFifth.classList.toggle("element")
})

const addSixth = document.querySelector("#add6")
const paraqrafSixth = document.querySelector("#paragraph6")
const imageSixth = document.querySelector("#image6")
addSixth.addEventListener("click",()=>{
    paraqrafSixth.classList.toggle("active")
    imageSixth.classList.toggle("element")
 
})