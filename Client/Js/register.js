// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");
const useremailInput = document.querySelector("#email");
const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");
const registerInfo = document.querySelector("#registerInfo")
iconPassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  const iconSrc =
    type === "password"
      ? "../Assets/Icons/eyeIcon.svg"
      : "../Assets/Icons/eye-off.svg";
  iconPassword.src = iconSrc;
});

console.log(usernameInput);

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !password) {
    registerInfo.innerHTML = "Registration failed. Please try again."
    registerInfo.classList.add("error-message")
    return;
  }
  register();
});

async function register() {
  const data = {
    password: passwordInput.value.trim(),
    full_name: usernameInput.value,
    email: useremailInput.value,
  };
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
       console.log(response);
       
    if (response.status === 201) {
      const data = await response.json();
      localStorage.setItem("Admin_token", data.token);
      window.location.href = "./login.html";
      registerInfo.innerHTML = "Your account has been created successfully."
      registerInfo.classList.add("success-message")
    } else {
        registerInfo.innerHTML ="Invalid username or password";
        registerInfo.classList.add("error-message")
    }
  } catch (err) {
    console.log(err);
  }
}
