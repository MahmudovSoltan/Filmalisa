// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");
console.log(passwordInput);
console.log(iconPassword);

iconPassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // İkon dəyişdirmək (şifrə göstərilib/gizlənildiyinə görə)
    const iconSrc = type === "password" 
        ? "../Assets/Icons/eyeIcon.svg" 
        : "../Assets/Icons/eye-off.svg";
    iconPassword.src = iconSrc;
});

// Formanın yoxlanılması 
const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");
console.log(loginButton);

loginButton.addEventListener("click", (e) => {
    e.preventDefault()
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Boşluq yoxlanışı
    if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
    }
    login() 
    console.log("login button clicked");
    
})


async function login() {
    const formData = {
        password: passwordInput.value.trim(),
        email: usernameInput.value,
    };

    try {
        const response = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
       console.log(response);

    //    const data = await response.json();
       
        if (response.status === 200) {
            // window.location.href = "../../index.html";
        } else {
            // alert("Invalid username or password");
        }
    } catch (err) {
        console.log(err);
    }
}