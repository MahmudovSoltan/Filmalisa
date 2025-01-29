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

// Contactform APİ hissesi

    // Formdan məlumatları alırıq
    let fullName = document.querySelector("#nameInput");
    let email = document.querySelector("#emailInput");
    let reason = document.querySelector("#reasonInput");
    let sendInfo = document.querySelector("#sendInfo");

    // API-ə POST istəyi göndəririk
    async function getContact() {
        const formData = {
            full_name: fullName.value,
            email: email.value,
            reason: reason.value
        };
        console.log(formData);
        try {
            const response = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",               
                  },
                body: JSON.stringify(formData) // Form məlumatlarını göndəririk
            });

            // API-dən cavabı alırıq
            const data = await response.json();

            fullName.value = "";
            email.value = "";
            reason.value = "";

            // Cavabda problem varsa
            if (!data.result) {
                sendInfo.innerHTML= "Please fill in all fields";
                sendInfo.style.color = "#ff4d4d";          
            }else {
                sendInfo.innerHTML = "Your message has been sent successfully!";   
                sendInfo.style.color = "#2e7d32";             
            }

            console.log('Server response:', data);

            // API-dən alınan məlumatı göstəririk 
            console.log('Received data:', data.data);
            // Məsələn, serverdən gələn `full_name` və `email`-i göstərə bilərik:
            alert(`Thank you ${data.data.full_name}, we have received your message!`);

        } catch (error) {
            console.log('Error:', error); 
        }
    }