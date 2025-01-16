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
