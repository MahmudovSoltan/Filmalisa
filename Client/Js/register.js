const userName = document.querySelector("#username");
const userEmail = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");
const loginButton = document.querySelector("#loginButton");

async function getAccount() {
  const data = {
    full_name: userName.value,
    email: userEmail.value,
    password: passwordInput.value,
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
    console.log(data);

    const result = await response.json();
    console.log(result);
    if (result.result) {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log(error);
  }
}

iconPassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconPassword.src = "../Assets/Icons/eye-off.svg";
    iconPassword.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    iconPassword.src = "../Assets/Icons/eyeIcon.svg";
  }
});

loginButton.addEventListener("click", getAccount);
