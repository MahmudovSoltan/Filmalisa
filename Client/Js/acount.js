const iserProfileImge = document.querySelector("#iserProfileImge");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const profileImageInput = document.querySelector("#profileImageInput");
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
          Authorization: "Bearer " + localStorage.getItem("login_token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    userEmail.value = data.data.email;
    userName.value = data.data.full_name;
    profileImageInput.value = data.data.img_url;
    iserProfileImge.src = data.data.img_url
      ? data.data.img_url
      : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  } catch (error) {
    console.log(error);
  }
}
getAccount();

async function updateAccount() {
  const data = {
    full_name: userName.value,
    email: userEmail.value,
    img_url: profileImageInput.value,
    password: passwordInput.value,
  };
  try {
      const response =await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("login_token"),
      },
      body: JSON.stringify(data),
    });
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