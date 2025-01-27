const movieModal = document.querySelector("#movieModal");
const deleteBtn = document.querySelector(".table_delete_btn");
const exitModal = document.querySelector(".owarlay");
const contactTable = document.querySelector("#contact_table");
const loading = document.querySelector("#loading")

deleteBtn.addEventListener("click", () => {
  movieModal.classList.add("active");
});
exitModal.addEventListener("click", () => {
  movieModal.classList.remove("active");
});



async function deleteContact(id) {
  loading.classList.remove("loadFalse")
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const contact = await response.json();
    console.log("data", id);
    loading.classList.add("loadFalse")
  }
  catch (error) {
    console.log(error);
  }
}

async function getContact() {
  try {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MywiaWF0IjoxNzM3MjA3MjA2LCJleHAiOjE3NjgzMTEyMDZ9.tIYNB1De_mp7T0z1ymWbCxnuFJjnGuJSVfM_jZ56IUY";
    const response = await fetch
      ("https://api.sarkhanrahimli.dev/api/filmalisa/admin/contacts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
          },
        }
      );
    const contact = await response.json();
    console.log("data", contact.data);
    contact.data.forEach((contact) => {
      contactTable.innerHTML += `
      <tr>
      <td>${contact.id}</td>
      <td>${contact.full_name}</td>
      <td>${contact.email}</td>
      <td>${contact.reason}</td>
      <td>
        <button class="table_delete_btn" onclick="deleteContact(${contact.id})">Delete</button>
      </td>
    </tr>
      `
    })
    loading.classList.add("loadFalse")
  }
  catch (error) {
    console.log(error);
  }
}

getContact();














function logOutFunc() {
  localStorage.removeItem("Admin_token")
  window.location.href = './login.html'
}