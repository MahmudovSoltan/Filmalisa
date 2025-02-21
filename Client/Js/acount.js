const userProfileImg = document.querySelector("#userProfileImg");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const profileImgInput = document.querySelector("#profileImgInput");
const passwordInput = document.querySelector("#password");
const iconPassword = document.querySelector("#iconPassword");
const loading = document.querySelector("#loading");
const userUpdsteInfo = document.querySelector("#userUpdsteInfo");
const homemain = document.querySelector("#homemain");
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
    loading.classList.add("loadFalse");
    homemain.style.opacity = "1";
    console.log(data);
    userEmail.value = data.data.email;
    userName.value = data.data.full_name;
    profileImgInput.value = data.data.img_url;
    userProfileImg.src = data.data.img_url
      ? data.data.img_url
      : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
   
  } catch (error) {
    console.log(error);
  }
}
getAccount();

async function updateAccount() {
  loading.classList.remove("loadFalse");
  const data = {
    full_name: userName.value,
    email: userEmail.value,
    img_url: profileImgInput.value,
    password: passwordInput.value,
  };
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("login_token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);

    const result = await response.json();
    console.log(result);

    getAccount();
    loading.classList.add("loadFalse");
    if (response.status === 200) {
      userUpdsteInfo.innerHTML = "User information updated successfully!";
      userUpdsteInfo.classList.add("success");
    } else {
      userUpdsteInfo.innerHTML =
        "Error updating user information. Please try again.";
      userUpdsteInfo.classList.add("error");
    }
    setTimeout(() => {
      userUpdsteInfo.innerHTML = "";
      userUpdsteInfo.classList.remove("error");
      userUpdsteInfo.classList.remove("success");
    }, 3000);
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


