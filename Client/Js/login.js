// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");
console.log(passwordInput);
console.log(iconPassword);

iconPassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // İkon dəyişdirmək (şifrə göstərilib/gizlənildiyinə görə)
  const iconSrc =
    type === "password"
      ? "../Assets/Icons/eyeIcon.svg"
      : "../Assets/Icons/eye-off.svg";
  iconPassword.src = iconSrc;
});

// Formanın yoxlanılması
const loginButton = document.querySelector("#loginButton");
const useremailInput = document.querySelector("#useremail");
console.log(loginButton);

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const useremail = useremailInput.value.trim();
  const password = passwordInput.value.trim();

  // Boşluq yoxlanışı
  if (!useremail || !password) {
    alert("Please fill in both useremail and password.");
    return;
  }
  login();
  console.log("login button clicked");
});

async function login() {
  const formData = {
    password: passwordInput.value.trim(),
    email: useremailInput.value,
  };

  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    const login_token = data.data.tokens.access_token
  localStorage.setItem("login_token",login_token)
     console.log(data);
     
    if (data.data.tokens.access_token) {
      window.location.href = "./home.html";
    } else {
      alert("Invalid useremail or password");
    }
  } catch (err) {
    console.log(err);
  }
}
