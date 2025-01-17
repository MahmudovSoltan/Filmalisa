// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");

iconPassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // İkon dəyişdirmək (şifrə göstərilib/gizlənildiyinə görə)
  const iconSrc =
    type === "password"
      ? "../Assets/Icons/login.icons/passwordright.svg"
      : "../Assets/Icons/login.icons/eye-off.svg";
  iconPassword.querySelector("img").src = iconSrc;
});

// Formanın yoxlanılması
const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Boşluq yoxlanışı
  if (!username || !password) {
    alert("Please fill in both username and password.");
    return;
  }
  creatAdmin();
});

async function creatAdmin() {
  const userData = {
    email: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };
  console.log(userData);

  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    usernameInput.value = "";
    passwordInput.value = "";
    const admin_tokon = data?.data?.tokens?.access_token;
    localStorage.setItem("admin_tokon", admin_tokon);

    window.location.href = "./dashboard.html";
  } catch (err) {
    console.log(err);
  }
}
