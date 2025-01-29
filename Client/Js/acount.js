const userProfileImg = document.querySelector("#userProfileImg");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const profileImgInput = document.querySelector("#profileImgInput");
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");



async function getAccount() {
  try {
    let response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("login_token")}`,
        },
      }
    );
    
    let data = await response.json();
    console.log(data);
    userEmail.value = data.data.email;
    userName.value = data.data.full_name;
    profileImgInput.value = data.data.img_url;
    userProfileImg.src = data.data.img_url
      ? data.data.img_url
      : "https://cdn3.vectorstock.com/i/1000x1000/49/92/beautiful-woman-avatar-character-icon-vector-33984992.jpg"
  } catch (error) {
    console.log(error);
  }

  
}
getAccount();

async function updateAccount() {
  const data = {
    full_name: userName.value,
    email: userEmail.value,
    img_url: profileImgInput.value,
    password: passwordInput.value,
  };
  try {
      const response =await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${localStorage.getItem("login_token")}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    
    const result = await response.json();
    console.log(result);
    
    getAccount();
  } catch (error) {
    console.log(error);
  }
}

iconPassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconPassword.src="../Assets/Icons/eye-off.svg"
    iconPassword.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
  iconPassword.src="../Assets/Icons/eyeIcon.svg"
  }
});