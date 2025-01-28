const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".owarlay");
const contactTable = document.querySelector("#contact_table");
const loading = document.querySelector("#loading")


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
    console.log("data", contact);
    contact.data.forEach((contact,i) => {
      contactTable.innerHTML += `
      <tr>
      <td>${i+1}</td>
      <td>${contact.full_name}</td>
      <td>${contact.email}</td>
      <td>${contact.reason}</td>
      <td>
        <button class="table_delete_btn" onclick="handleId(${contact.id})">Delete</button>
      </td>
    </tr>
      `
    })
    loading.classList.add("loadFalse")
    const deleteBtn = document.querySelectorAll(".table_delete_btn");
    deleteBtn.forEach ((btn) => {
      btn.addEventListener("click", () => {
        movieModal.classList.add("active");
      });
    });
  }
  catch (error) {
    console.log(error);
  }
}


getContact();

async function deleteContact() {
  try {
    
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/contact/${contactId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const contact = await response.json();
    console.log("data", contact);
    window.location.reload();
  }
  catch (error) {
    console.log(error
      
    );
  }
}

function logOutFunc() {
  localStorage.removeItem("Admin_token")
  window.location.href = './login.html'
}