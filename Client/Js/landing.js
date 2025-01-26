// FAQ Toggle Logic
const faqItems = document.querySelectorAll('.faq_item');

faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const content = item.querySelector('.faq_content');
    question.addEventListener('click', () => {
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';
    });
});


faqItems.forEach(item => {
    const addButton = item.querySelector('.vector_icon');
    const content = item.querySelector('.faq_content');   
    const image = item.querySelector('img');              

    addButton.addEventListener('click', () => {
        content.classList.toggle('active');
        image.classList.toggle('element'); 
    });
});
















