// Şifrəni göstərmək/gizlətmək funksiyası
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");

loading.classList.add("loadFalse")
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
  const error_masge = document.querySelector("#error_masge")
  const data = {
    email: usernameInput.value.trim(),
    password: passwordInput.value,
  };
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const resp = await response.json();
    const token = resp?.data?.tokens?.access_token;
    localStorage.setItem("Admin_token", token);
    if (token) {
      window.location.href = "./dashboard.html";
    }else{
       error_masge.innerHTML = "Sef kod yazmisan yada email sehvdir"
    }
    
  } catch (err) {
    console.log(err);
   
  }
}
