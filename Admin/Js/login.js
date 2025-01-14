// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");

iconPassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // İkon dəyişdirmək (şifrə göstərilib/gizlənildiyinə görə)
    const iconSrc = type === "password" 
        ? "../Assets/Icons/login.icons/passwordright.svg" 
        : "../Assets/Icons/login.icons/eye-off.svg";
    iconPassword.querySelector("img").src = iconSrc;
});

// Formanın yoxlanılması 
const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");

loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Boşluq yoxlanışı
    if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
    }
})
