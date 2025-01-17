// FAQ Toggle Logic
const faqItems = document.querySelector('#faq_item1');
const faqParagraph =document.querySelector (".faq_content");

faqItems.addEventListener("click", () => {
    faqParagraph.classList.add("active")
    console.log("click");
    
} )
console.log(faqItems);
console.log(faqParagraph);



